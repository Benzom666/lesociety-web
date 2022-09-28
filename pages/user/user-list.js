import React, { useState, useEffect } from "react";
import HeaderLoggedIn from "core/loggedInHeader";
import NoImage from "assets/img/no-image.png";
import Image from "next/image";
import Footer from "core/footer";
import SubHeading from "@/core/SubHeading";
import InfiniteScroll from "react-infinite-scroll-component";
import UserCardList from "@/core/UserCardList";
import LocationPopup from "@/core/locationPopup";
import withAuth from "../../core/withAuth";
import { apiRequest, countriesCode } from "utils/Utilities";
import { fetchLiveLocation } from "../../modules/auth/forms/steps/validateRealTime";
import { useSelector } from "react-redux";
import DatePopup from "core/createDatePopup";
import router from "next/router";
import useWindowSize from "utils/useWindowSize";
import axios from "axios";
import { Formik, Field, Form } from "formik";
import * as Yup from "yup";
import CustomInput from "Views/CustomInput";
import { IoIosSend } from "react-icons/io";
import { useRef } from "react";
import SkeletonArticle from "@/modules/skeleton/SkeletonArticle";
import SkeletonDate from "@/modules/skeleton/Dates/SkeletonDates";
import io from "socket.io-client";

export const socket = io("https://staging-api.secrettime.com/", {
  autoConnect: true,
});

function UserList(props) {
  const { width } = useWindowSize();
  const [dateId, setDateId] = React.useState("");
  const [dates, setDates] = React.useState([]);
  const [scrollPosition, setScrollPosition] = React.useState(0);
  const [scrollType, setScrollType] = React.useState("down");
  const [classPopup, setPopupClass] = React.useState("hide");
  const [textClass, setTextSlideClass] = React.useState("");
  const [locationPopup, setLocationPoup] = React.useState(false);
  const [selectedLocation, setLocation] = React.useState({});
  const [page, setPage] = React.useState(1);
  const [loading, setLoader] = React.useState(true);
  const [pagination, setPagination] = React.useState("");
  const user = useSelector((state) => state.authReducer.user);
  const country = user?.country && countriesCode[user.country];
  const [modalIsOpen, setIsOpen] = React.useState(user.gender === "female");
  const [receiverData, setReceiverData] = React.useState("");
  const [messageError, setMessageError] = React.useState("");
  const scrollRef = useRef();
  const [conversations, setConversations] = useState([]);

  useEffect(() => {
    socket.auth = { user: user };
    socket.connect();
    socket.on("connect", () => {
      console.log("connected");
    });
    socket.on("disconnect", (reason) => {
      console.log("socket disconnected reason", reason);
    });
  }, [!socket.connected]);

  socket.on(
    "connect_error",
    () => {
      console.log("connect_error");
      socket.auth = { user: user };
      socket.connect();
    },
    [!socket.connected]
  );

  useEffect(() => {
    getConversations();
  }, []);

  useEffect(() => {
    socket.on(`request-${user._id}`, (message) => {
      console.log("reqested message header", message);
      getConversations();
    });
  }, [socket.connected]);

  useEffect(() => {
    socket.on(`recieve-${user._id}`, (message) => {
      console.log("recieve message header", message);
      getConversations();
    });
  }, [socket.connected]);

  const unReadedConversationLength = conversations?.filter(
    (c) =>
      c?.message &&
      !c.message?.read_date_time &&
      c?.message?.sender_id !== user?._id
  )?.length;

  const getConversations = async () => {
    try {
      const res = await apiRequest({
        method: "GET",
        url: `chat/chatroom-list`,
      });
      // console.log("res", res.data?.data?.chatRooms);
      const conversations =
        res.data?.data?.chatRooms.length > 0
          ? res.data?.data?.chatRooms.filter((chat) => chat !== null)
          : [];
      setConversations(conversations);
    } catch (err) {
      console.log("err", err);
    }
  };

  const lastClickedDate = () => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  const fetchDate = async (params) => {
    try {
      setLoader(true);
      const res = await apiRequest({
        url: "date",
        params: params,
      });
      console.log("res dates of user", res);
      if (res?.data?.data?.pagination?.current_page !== 1) {
        res?.data?.data?.dates.sort(function (a, b) {
          return new Date(b.created_at) - new Date(a.created_at);
        });
        setDates([...dates, ...res?.data?.data?.dates]);
      } else {
        res?.data?.data?.dates.sort(function (a, b) {
          return new Date(b.created_at) - new Date(a.created_at);
        });
        setDates(res?.data?.data?.dates);
      }
      setPagination(res?.data?.data?.pagination);
      setLoader(false);
    } catch (err) {
      setDates([]);
      setLoader(false);
    }
  };

  useEffect(() => {
    if (selectedLocation?.city) {
      const params = {
        location: selectedLocation?.city,
        current_page: page,
        per_page: 2,
        province: selectedLocation?.province,
      };
      fetchDate(params);
    }
  }, [selectedLocation]);

  useEffect(() => {
    if (router?.query?.city) {
      setLocation({
        city: router?.query?.city,
        country: router?.query?.country,
        province: router?.query?.province,
      });
    } else {
      setLocation({
        city: user.location,
        country: country,
        province: user?.province,
      });
    }
  }, [user?.location]);

  const closePopup = () => {
    setPopupClass("hide");
  };

  const openPopup = (item) => {
    setPopupClass("show");
    const icon = document?.querySelector(".icon-move");
    const dummyIcon = document?.querySelector(".icon-move-1");
    const dimension = dummyIcon?.getBoundingClientRect();
    icon.style.left = dimension?.left + "px";
    icon.style.top = dimension?.top - 310 + "px";

    setReceiverData(item);
    // if click on message icon
    // if (icon) {
    //   icon.addEventListener("click", () => {
    //   });
    // }
    // how to get value of input
  };

  // create async function to fetch data
  // const postMessageData = async (receiverData) => {};

  const handleSubmit = async (values) => {
    moveIcon();
    console.log("values", values);
    try {
      const data = {
        senderId: user?._id ?? "",
        recieverId:
          receiverData?.user_data?.length > 0
            ? receiverData?.user_data[0]?._id
            : "",
        message: values.message ?? "",
        dateId: receiverData?._id ?? "",
      };
      const res = await apiRequest({
        data: data,
        method: "POST",
        url: `chat/request`,
      });
      console.log("res", res);
      values.message = "";
    } catch (err) {
      setMessageError(err.response?.data?.message ?? "");
    }
    return;
  };

  function growDiv(id) {
    // setDateId(id)
    let growDiv = document.getElementById("message-popup");
    if (growDiv.style?.top) {
      growDiv.style.top = "100%";
    } else {
      growDiv.style.top = "unset";
    }
  }

  const moveIcon = () => {
    setTextSlideClass("show");
    const element = document.querySelector(".icon-move");
    const target = document.getElementById("message-icon");
    if (target && element) {
      element.style.opacity = 1;
      const xT = target.offsetLeft;
      const yT = target.offsetTop;
      const xE = element.offsetLeft;
      const yE = element.offsetTop;
      // set elements position to their position for smooth animation
      element.style.left = xE + "px";
      element.style.top = yE + "px";
      // set their position to the target position
      // the animation is a simple css transition
      element.style.left = xT + 5 + "px";
      element.style.top = yT + 5 + "px";
      target.scrollIntoView();
    }
    setTimeout(() => {
      element.style.opacity = 0;
      closePopup();
      setTextSlideClass("");
    }, 1000);
  };

  document.addEventListener("scroll", function () {
    const reveals = document.querySelectorAll("#scrolldiv");

    for (let i = 0; i < reveals.length; i++) {
      const windowHeight = window.innerHeight;
      const elementTop = reveals[i].getBoundingClientRect().top;
      //   const elementVisible = reveals[i]?.clientHeight;
      if (elementTop < windowHeight) {
        reveals[i].classList.add("scrollActive");
      } else {
        reveals[i].classList.remove("scrollActive");
      }
    }
  });

  const nextPage = () => {
    const params = {
      location: selectedLocation?.city,
      province: selectedLocation?.province,
      current_page: page + 1,
      per_page: 2,
    };
    setPage(page + 1);
    fetchDate(params);
  };

  const handleScroll = () => {
    const position = window.pageYOffset;
    if (scrollPosition > position) {
      setScrollType("up");
    } else {
      setScrollType("down");
    }
    setScrollPosition(position);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [scrollPosition]);

  // console
  // console.log("unReadedConversationLength", unReadedConversationLength);
  return (
    <div className="inner-page" id="infiniteScroll">
      <HeaderLoggedIn
        fixed={width < 767}
        isBlack={locationPopup}
        unReadedConversationLength={unReadedConversationLength}
      />
      <div className="inner-part-page">
        <div className="pt-5 pb-4">
          <div className="container user_list_wrap">
            <div className="row">
              <div className="col-md-2"></div>
              <div className="col-md-8">
                <div className="row">
                  <div className="col-md-12">
                    <div
                      className="d-flex align-items-center justify-content-center justify-content-md-between pb-3 top-space"
                      style={
                        (scrollType === "up" || "down") &&
                        scrollPosition > 5 &&
                        !locationPopup
                          ? width > 767
                            ? { position: "fixed", width: "59%", zIndex: "99" }
                            : { position: "fixed", left: "34%", zIndex: "99" }
                          : { position: "relative" }
                      }
                    >
                      <span className="hidden-sm">Nearby</span>
                      <div
                        onClick={() => setLocationPoup(true)}
                        className="selct-wrap-sort"
                      >
                        <label>
                          <span className="city-txt city-txt-gallary">
                            {selectedLocation?.city},{" "}
                            {selectedLocation?.province?.toUpperCase()}
                          </span>
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
                <InfiniteScroll
                  scrollableTarget="infiniteScroll"
                  dataLength={dates.length}
                  next={nextPage}
                  hasMore={pagination?.total_pages !== page}
                  style={{ overflowX: "hidden" }}
                >
                  <div className="row">
                    {loading
                      ? [1, 2, 3, 4, 5, 6].map((n) => (
                          <div className={`col-xl-6 col-lg-12`}>
                            <SkeletonDate key={n} theme="dark" />
                          </div>
                        ))
                      : dates.length > 0
                      ? dates.map((item, index) => (
                          <div
                            className={`col-xl-6 col-lg-12 ${
                              (width > 767 && (index === 2 || index === 3)) ||
                              index === 0 ||
                              index === 1
                                ? "scrollActive"
                                : ""
                            }`}
                            id={`scrolldiv`}
                            key={index}
                            onClick={() => {
                              // if (index === dates?.length - 1) {
                              lastClickedDate();
                              // }
                            }}
                          >
                            {width > 767 ? (
                              <UserCardList
                                setDateId={setDateId}
                                date={item}
                                cardId={`grow-${index}`}
                                openPopup={() => {
                                  openPopup(item);
                                }}
                                closePopup={closePopup}
                                dateId={dateId}
                                isDesktopView={true}
                                key={index}
                                ref={scrollRef}
                                loading={loading}
                              />
                            ) : (
                              <UserCardList
                                setDateId={setDateId}
                                date={item}
                                cardId={`grow-${index}`}
                                openPopup={() => {
                                  openPopup(item);
                                }}
                                closePopup={closePopup}
                                growDiv={growDiv}
                                dateId={dateId}
                                key={index}
                                ref={scrollRef}
                                loading={loading}
                              />
                            )}
                          </div>
                        ))
                      : !loading && (
                          <div className="no-message-card-date">
                            <figure>
                              <Image
                                src={NoImage}
                                alt="NoImage"
                                width={205}
                                height={140}
                              />
                            </figure>
                            <h6>
                              Sorry, no dates found for the selected location
                            </h6>
                            <SubHeading title="Find a date by changing the location!" />
                          </div>
                        )}
                  </div>
                </InfiniteScroll>
              </div>
              <div className="col-md-2"></div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
      <svg
        onClick={moveIcon}
        className="icon-move"
        width="14"
        height="14"
        viewBox="0 0 14 14"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M13.6048 0.407386C13.2546 0.0480202 12.7364 -0.0858618 12.2532 0.0550622L0.9856 3.33166C0.47579 3.4733 0.114443 3.87988 0.0171013 4.39639C-0.0823407 4.92205 0.265006 5.58935 0.718788 5.86838L4.24193 8.03376C4.60328 8.25573 5.06967 8.20008 5.36869 7.89845L9.40303 3.83901C9.6061 3.62762 9.94224 3.62762 10.1454 3.83901C10.3484 4.04336 10.3484 4.37455 10.1454 4.58594L6.104 8.64612C5.80426 8.94698 5.74826 9.41556 5.96883 9.77914L8.12154 13.3377C8.37361 13.7604 8.80782 14 9.28396 14C9.34003 14 9.40303 14 9.4591 13.9929C10.0053 13.9225 10.4395 13.5491 10.6005 13.0206L13.9409 1.76735C14.088 1.2882 13.9549 0.766759 13.6048 0.407386Z"
          fill="#686868"
        />
      </svg>
      <div id="message-popup" className={`message-popup ${classPopup}`}>
        <span onClick={closePopup} className="close-button">
          <svg
            width="14"
            height="14"
            viewBox="0 0 14 14"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12.9924 12.9926L1.00244 1.00006"
              stroke="white"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M12.9887 1.00534L1.00873 12.9853"
              stroke="white"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </span>
        <p className="msg">
          “If you’re not amazed by the stars then we can’t hang”
        </p>
        <div>
          <Formik
            initialValues={{
              message: "",
            }}
            validationSchema={Yup.object({
              message: Yup.string().required("Please enter your message"),
            })}
            onSubmit={handleSubmit}
          >
            {(formProps) => {
              return (
                <Form>
                  <div className="">
                    <Field
                      className={`${textClass}`}
                      placeholder="Type your message here…"
                      name="message"
                      id="message"
                      component={CustomInput}
                    />

                    <IoIosSend
                      size={25}
                      color={"#686868"}
                      type="submit"
                      onClick={() => {
                        handleSubmit(formProps.values);

                        formProps.resetForm();
                      }}
                    />
                    {/* create svg with onclick */}

                    {/* <svg
                      type="submit"
                      onClick={() => handleSubmit()}
                      className="icon-move-1"
                      width="14"
                      height="14"
                      viewBox="0 0 14 14"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      pointerEvents="none"
                    >
                      <path
                        d="M13.6048 0.407386C13.2546 0.0480202 12.7364 -0.0858618 12.2532 0.0550622L0.9856 3.33166C0.47579 3.4733 0.114443 3.87988 0.0171013 4.39639C-0.0823407 4.92205 0.265006 5.58935 0.718788 5.86838L4.24193 8.03376C4.60328 8.25573 5.06967 8.20008 5.36869 7.89845L9.40303 3.83901C9.6061 3.62762 9.94224 3.62762 10.1454 3.83901C10.3484 4.04336 10.3484 4.37455 10.1454 4.58594L6.104 8.64612C5.80426 8.94698 5.74826 9.41556 5.96883 9.77914L8.12154 13.3377C8.37361 13.7604 8.80782 14 9.28396 14C9.34003 14 9.40303 14 9.4591 13.9929C10.0053 13.9225 10.4395 13.5491 10.6005 13.0206L13.9409 1.76735C14.088 1.2882 13.9549 0.766759 13.6048 0.407386Z"
                        fill="#686868"
                      />
                    </svg> */}
                  </div>
                </Form>
              );
            }}
          </Formik>
        </div>
        <p className="tip">Tip: ask her which date she prefers</p>
      </div>
      {/* <DatePopup
                modalIsOpen={modalIsOpen}
                closeModal={closeModal}
            /> */}
      <LocationPopup
        modalIsOpen={locationPopup}
        closeModal={() => setLocationPoup(false)}
        selectedLocation={selectedLocation}
        setLocation={setLocation}
      />
    </div>
  );
}

export default withAuth(UserList);
