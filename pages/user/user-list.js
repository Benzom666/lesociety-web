import React, { useState, useEffect } from "react";
import HeaderLoggedIn from "core/loggedInHeader";
import Image from "next/image";
import Footer from "core/footer";
import router from "next/router";
import LocationPopup from "@/core/locationPopup";
import withAuth from "../../core/withAuth";
import { apiRequest, countriesCode } from "utils/Utilities";
import {
  fetchCities,
  fetchLiveLocation,
} from "../../modules/auth/forms/steps/validateRealTime";
import { useDispatch, useSelector } from "react-redux";
import DatePopup from "core/createDatePopup";
import useWindowSize from "utils/useWindowSize";
import { Formik, Field, Form } from "formik";
import * as Yup from "yup";
import CustomInput from "Views/CustomInput";
import { IoIosSend } from "react-icons/io";
import { useRef } from "react";
import SkeletonArticle from "@/modules/skeleton/SkeletonArticle";
import io from "socket.io-client";
import { removeCookie } from "utils/cookie";
import MessageSend from "assets/message_send.png";
import MessageSend2 from "assets/message_send2.png";
import LocationModalPopUp from "@/core/locationModalPopUp";
import classNames from "classnames";
import { change } from "redux-form";
import DateAndLocation from "@/modules/location/DateAndLocation";
import {
  changeSelectedLocationPopup,
  logout,
} from "@/modules/auth/authActions";

export const socket = io("https://staging-api.secrettime.com/", {
  reconnection: true,
  autoConnect: true,
  transports: ["websocket", "polling", "flashsocket"],
  reconnectionDelay: 1000,
  reconnectionDelayMax: 5000,
  reconnectionAttempts: Infinity,
});

function UserList(props) {
  const { width } = useWindowSize();
  const [classPopup, setPopupClass] = React.useState("hide");
  const [textClass, setTextSlideClass] = React.useState("");
  const [locationPopup, setLocationPoup] = React.useState(false);
  const [selectedLocation, setLocation] = React.useState({});

  const user = useSelector((state) => state.authReducer.user);
  const state = useSelector((state) => state.authReducer);
  const [modalIsOpen, setIsOpen] = React.useState(user?.gender === "female");
  const [receiverData, setReceiverData] = React.useState("");
  const [messageError, setMessageError] = React.useState("");
  const [conversations, setConversations] = useState([]);
  const [alreadyMessagedFromUser, setAlreadyMessagedFromUser] = useState(false);
  const [countries, setCountry] = useState("");
  const dispatch = useDispatch();
  const country = user?.country && countriesCode[user?.country];
  const [searchStatus, setSearchStaus] = useState(false);

  // for current location
  const [currentLocationLoading, setCurrentLocationLoading] = useState(false);

  const [show, setShow] = useState(false);

  // for notification
  const [count, setCount] = useState(0);

  // useEffect(() => {
  //   if (user?.gender === "male" && state?.showSelectedLocationPopup) {
  //     setShow(true);
  //   }
  // }, [user]);

  const isIOS = /iPhone|iPad|iPod/.test(navigator.userAgent);
  const isAndroid = /Android/.test(navigator.userAgent);

  console.log("isIOS", isIOS, isAndroid);

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
    if (router?.query?.city) {
      setLocation({
        city: router?.query?.city,
        country: router?.query?.country,
        province: router?.query?.province,
      });
      if (user?.location !== router?.query?.city) {
        setSearchStaus(true);
      }
    } else {
      setLocation({
        city: user?.location,
        country: country,
        province: user?.province,
      });
    }
  }, [user?.location]);

  useEffect(() => {
    getConversations();
  }, []);

  useEffect(() => {
    socket.on(`request-${user?._id}`, (message) => {
      console.log("reqested message header", message);
      getConversations();
    });
  }, [socket.connected]);

  useEffect(() => {
    socket.on(`recieve-${user?._id}`, (message) => {
      console.log("recieve message header", message);
      getConversations();
    });
  }, [socket.connected]);

  useEffect(() => {
    console.log("Notif socket connected", socket.connected);
    socket.on("connect", () => {
      console.log(socket.id);
    });
    setTimeout(() => {
      socket.on(`push-notification-${user.email}`, (message) => {
        console.log("notif received", message);
        const unc = message?.notifications?.filter(
          (item) => item.status === 0 && item.type !== "notification"
        ).length;
        localStorage.setItem("unreadNotifCount", JSON.stringify(unc));
        setCount(unc);
      });
    }, 500);
  }, [socket.connected]);

  useEffect(() => {
    if (classPopup === "show") {
      // stop scrolling page
      document.body.style.overflow = "hidden";
    } else {
      // allow scrolling page
      document.body.style.overflow = "unset";
    }
  }, [classPopup]);

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
      //   if (
      //     err?.response?.status === 401 &&
      //     err?.response?.data?.message === "Failed to authenticate token!"
      //   ) {
      //     setTimeout(() => {
      //       logout(router, dispatch);
      //     }, 100);
      //   }
      //   return err;
    }
  };

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
  };

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
      setAlreadyMessagedFromUser(true);
      console.log("res", res);
      values.message = "";
    } catch (err) {
      setMessageError(err.response?.data?.message ?? "");
      // if (
      //   err?.response?.status === 401 &&
      //   err?.response?.data?.message === "Failed to authenticate token!"
      // ) {
      //   setTimeout(() => {
      //     logout(router, dispatch);
      //   }, 100);
      // }
      // return err;
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

  useEffect(() => {
    if (user?.gender === "male") {
      setCountry(user?.country_code);
    }
  }, []);

  const handleFectchCurrentLocation = () => {
    setCurrentLocationLoading(true);
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        if (
          position.coords.latitude !== undefined &&
          position.coords.longitude !== undefined
        ) {
          const locations = await fetchLiveLocation(
            position.coords.latitude,
            position.coords.longitude,
            countries
          );
          const location = locations[0];
          setLocation({
            city: location.name,
            country: location?.country[0]?.short_code,
            province: location?.province[0]?.short_code?.split("-")[1],
            stateName: location?.province[0]?.text,
            countryName: location?.country[0]?.text,
          });
          // setShow(false);
          dispatch(changeSelectedLocationPopup(false));
          dispatch(change("LocationPopup", "enter_city", location?.name));
          setCurrentLocationLoading(false);
        }
      },
      (err) => {
        setCurrentLocationLoading(false);
      },
      { enableHighAccuracy: true }
    );
  };

  // useEffect(() => {
  //   socket.auth = { user: user };
  //   socket.connect();
  //   console.log("socket", socket.auth);
  //   socket.on("connect", () => {
  //     console.log("connected", socket.connected);
  //   });
  //   socket.on("disconnect", (reason) => {
  //     console.log("socket disconnected reason", reason);
  //   });
  // }, []);

  // useEffect(() => {
  //   socket.on("connect_error", () => {
  //     console.log("connect_error");
  //     socket.auth = { user: user };
  //     socket.connect();
  //   });
  // }, [!socket.connected]);

  // useEffect(() => {
  //   // if (socket.connected) {
  //   console.log("Notif socket connected", socket.connected);
  //   //`push-notification-${user?.email}`
  //   socket.on(`push-notification-${user?.email}`, (message) => {
  //     console.log("notif received", message);
  //   });
  //   // }
  // }, [socket.connected]);

  // if (show) {
  //   return (
  //     <LocationModalPopUp
  //       onClose={() => {
  //         setShow(false);
  //         dispatch(changeSelectedLocationPopup(false));
  //       }}
  //       show={show}
  //       handleFectchCurrentLocation={handleFectchCurrentLocation}
  //       currentLocationLoading={currentLocationLoading}
  //     />
  //   );
  // }

  return (
    <div className="inner-page" id="infiniteScroll">
      <HeaderLoggedIn
        fixed={width < 767}
        isBlack={locationPopup}
        unReadedConversationLength={unReadedConversationLength}
        count={count}
        setCount={setCount}
      />
      {/* <div
        className={classNames(
          `modal fade ${show ? "show d-block modal-open" : "d-none"}`,
          width > 1399 && "modal-fade-1"
        )}
      ></div> */}
      <div className="inner-part-page">
        <div className="pt-5 pb-4">
          <div className="container user_list_wrap">
            <div className="row">
              <div className="col-md-2"></div>
              <div className="col-md-8">
                <div className="row">
                  <div className="col-md-12">
                    <div className="d-flex align-items-center justify-content-center justify-content-md-between pb-3 top-space">
                      <span className="hidden-sm">Nearby</span>
                      {width < 430 ? (
                        <div
                          className="d-flex align-items-center justify-content-end"
                          // style={
                          //   (scrollType === "up" || "down") &&
                          //   scrollPosition > 5 &&
                          //   !locationPopup
                          //     ? width > 767
                          //       ? {
                          //           position: "fixed",
                          //           width: "59%",
                          //           zIndex: "10",
                          //         }
                          //       : {
                          //           position: "fixed",
                          //           left: "34%",
                          //           zIndex: "10",
                          //         }
                          //     : { position: "relative" }
                          // }
                        >
                          {/* <span className="hidden-sm">Nearby</span> */}
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
                      ) : null}
                    </div>
                  </div>
                </div>
                <DateAndLocation
                  currentLocationLoading={currentLocationLoading}
                  selectedLocation={selectedLocation}
                  show={show}
                  openPopup={openPopup}
                  closePopup={closePopup}
                  receiverData={receiverData}
                  alreadyMessagedFromUser={alreadyMessagedFromUser}
                  setAlreadyMessagedFromUser={setAlreadyMessagedFromUser}
                  setLocation={setLocation}
                  growDiv={growDiv}
                  searchStatus={searchStatus}
                />
              </div>
              {width > 767 && (
                <div className="col-md-2">
                  <div
                    className="d-flex align-items-center justify-content-end"
                    style={{ marginTop: "26px" }}
                    // style={
                    //   (scrollType === "up" || "down") &&
                    //   scrollPosition > 5 &&
                    //   !locationPopup
                    //     ? width > 767
                    //       ? { position: "fixed", width: "59%", zIndex: "99" }
                    //       : { position: "fixed", left: "34%", zIndex: "99" }
                    //     : { position: "relative" }
                    // }
                  >
                    {/* <span className="hidden-sm">Nearby</span> */}
                    <div
                      onClick={() => setLocationPoup(true)}
                      className="selct-wrap-sort position-fixed"
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
              )}
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
        <Formik
          initialValues={{
            message: "",
          }}
          validationSchema={Yup.object({
            message: Yup.string().required("Please enter your message"),
          })}
          onSubmit={(values) => {
            if (values.message?.trim() !== "") {
              handleSubmit(values);
            }
          }}
        >
          {(formProps) => {
            return (
              <Form>
                <span
                  onClick={() => {
                    closePopup();
                    formProps.setFieldValue("message", "");
                  }}
                  className="close-button"
                >
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
                  "
                  {receiverData?.user_data?.length > 0 &&
                    receiverData?.user_data[0]?.tagline}
                  "
                </p>
                <div>
                  <div
                    className=""
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      width: "100%",
                    }}
                  >
                    <Field
                      className={`${textClass}`}
                      placeholder="Type your message here…"
                      name="message"
                      id="message"
                      component={CustomInput}
                      style={{
                        width: "80%",
                      }}
                    />
                    <button
                      type="button"
                      style={{
                        background: "transparent",
                        border: "none",
                        paddingBottom: "10px",
                        paddingTop: "8px",
                        width: "20%",
                        display: "flex",
                        justifyContent: "flex-start",
                      }}
                      // className="icon-move-1"
                    >
                      <Image
                        src={
                          formProps.values.message === ""
                            ? MessageSend
                            : MessageSend2
                        }
                        alt="send-btn"
                        type="submit"
                        onClick={() => {
                          handleSubmit(formProps.values);
                          formProps.resetForm();
                        }}
                        width={35}
                        height={35}
                      />
                    </button>
                  </div>
                </div>
              </Form>
            );
          }}
        </Formik>
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
        setSearchStaus={setSearchStaus}
      />
    </div>
  );
}

export default withAuth(UserList);
