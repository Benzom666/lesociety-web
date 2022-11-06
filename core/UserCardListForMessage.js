import React, { useRef } from "react";
import UserImg from "assets/img/profile.png";
import UserImg3 from "assets/img/user-3.png";
import UserImg4 from "assets/img/user-4.png";
import { useSelector } from "react-redux";
import Image from "next/image";
import { CustomIcon } from "core/icon";
import Modal from "react-modal";
import Link from "next/link";
import H5 from "./H5";
import { dateCategory } from "utils/Utilities";
import { IoIosClose } from "react-icons/io";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { HiLockOpen } from "react-icons/hi";
import { useRouter } from "next/router";
import { apiRequest } from "./../utils/Utilities";
import SkeletonUserCardListForMessage from "@/modules/skeleton/SkeletonUserCardListForMessage";
import SkeletonElement from "@/modules/skeleton/SkeletonElement";

const UserCardListForMessage = ({
  conversations,
  setConversations,
  isDesktopView,
  getConversations,
  setCurrentChat,
  tabIndexChange,
  selectedTabIndex,
  socket,
  toggleChat,
  mobile,
}) => {
  const [modalIsOpen, setIsOpen] = React.useState(false);
  const [dateDetailsIsOpen, setDateDetailsIsOpen] = React.useState(false);
  const [msgModal, setMsgModal] = React.useState(false);
  const [pageLoading, setPageLoading] = React.useState(true);
  const user = useSelector((state) => state.authReducer.user);
  const router = useRouter();
  const growRef = useRef(null);

  function openModal() {
    setIsOpen(true);
    //backgroundColor:"black"
    setPageLoading(true);
  }
  function closeModal() {
    setIsOpen(false);
    setPageLoading(false);
  }

  const postApprovedConversation = async (room_id, conversation) => {
    setCurrentChat(conversation);
    console.log("conversation", conversation);
    try {
      const data = {
        chatRoomId: room_id,
        senderId: conversation?.user?.id,
        // senderId: user?._id,
      };
      const res = await apiRequest({
        data,
        method: "POST",
        url: `chat/accept`,
      });
      console.log("res.data", res.data);
      // getConversations();
      setConversations((prev) => {
        const index = prev.findIndex((item) => item._id === room_id);
        prev[index].status = 1;
        return [...prev];
      });
      closeModal();
      setCurrentChat((prev) => ({
        ...prev,
        status: res?.data?.data?.chatRoom?.status,
      }));

      tabIndexChange(0);
    } catch (err) {
      console.log("err", err);
    }

    // const data = {
    //   chatRoomId: room_id ?? "",
    //   recieverId: conversation?.user?.id ?? "",
    //   message: "",
    // };

    // socket.emit("sendMessage", data);
  };

  const showText = (text) => {
    if (text?.length > 40) {
      return text.substring(0, 40) + "...";
    } else {
      return text;
    }
  };

  const settings = {
    dots: false,
    arrows: false,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    centerMode: true,
    centerPadding: "0",
  };
  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      width: "310px",
      background: "transparent",
      height: "100%",
      overFlow: "hidden",
    },
  };

  return (
    <>
      <span
        onClick={openModal}
        className={`${
          conversations.filter(
            (c) => c.status == 0 && c.message?.sender_id !== user?._id
          )?.length === 0 &&
          selectedTabIndex !== 1 &&
          "request__header"
        }`}
      >
        <span>
          {
            // conversations?.length > 0
            //   ? conversations.filter(
            //       (c) => c.status == 0 && c.message?.sender_id !== user?._id
            //     )?.length > 0 &&
            conversations.filter(
              (c) => c.status == 0 && c.message?.sender_id !== user?._id
            )?.length
            // : ""
          }
        </span>{" "}
        Requests
      </span>

      {!isDesktopView &&
        conversations?.length > 0 &&
        conversations?.filter(
          (c) => c.status == 0 && c.message?.sender_id !== user?._id
        )?.length > 0 && (
          <Modal
            isOpen={modalIsOpen}
            onRequestClose={closeModal}
            style={customStyles}
            className="intrested_model"
          >
            <div className="model_content">
              {pageLoading ? (
                <SkeletonElement type="close-icon-view-profile" />
              ) : (
                <IoIosClose
                  size={25}
                  className="close_btn"
                  onClick={closeModal}
                  color={"#A8A8A8"}
                />
              )}

              <Slider {...settings}>
                {conversations.length > 0
                  ? conversations.filter((c) => c.status == 0)?.length > 0
                    ? conversations
                        .filter((c) => c.status == 0)
                        .map((conversation, index) => {
                          const profilePic =
                            conversation.user?.images.length > 0
                              ? conversation.user?.images[0]
                              : "";

                          setTimeout(() => {
                            if (profilePic) {
                              setPageLoading(false);
                            }
                          }, 5000);

                          return pageLoading ? (
                            <SkeletonUserCardListForMessage
                              conversation={conversation}
                              getConversations={getConversations}
                              user={user}
                              setCurrentChat={setCurrentChat}
                              tabIndexChange={tabIndexChange}
                              selectedTabIndex={selectedTabIndex}
                              socket={socket}
                              profilePic={profilePic}
                            />
                          ) : (
                            <div key={index}>
                              <H5 style1={true}>
                                {conversation?.user?.user_name} is
                              </H5>
                              <CustomIcon.IntrestedText
                                color={"white"}
                                size={140}
                              />
                              <figure>
                                <Image
                                  src={profilePic}
                                  alt="user image"
                                  width={280}
                                  height={420}
                                />
                                <span className="image_tagline">
                                  {showText(conversation?.message?.message)}
                                </span>
                              </figure>
                              <div className="d-flex align-items-center my-4 header_btn_wrap">
                                <a
                                  className="create-date"
                                  onClick={() => {
                                    if (mobile) {
                                      toggleChat(conversation);
                                    }
                                    postApprovedConversation(
                                      conversation?.message?.room_id,
                                      conversation
                                    );
                                  }}
                                >
                                  START CONVERSATION
                                </a>
                              </div>
                              <div className="my-4 bottom_content">
                                {/* <Link href="/user/user-profile"> */}
                                <a
                                  className="view_profile"
                                  onClick={() =>
                                    router.push(
                                      `/user/user-profile/${conversation?.user?.user_name}`
                                    )
                                  }
                                >
                                  <HiLockOpen /> View Profile
                                </a>
                                {/* </Link> */}
                                <p>
                                  {conversation?.user?.user_name} has granted
                                  you the access to his profile
                                </p>
                              </div>
                            </div>
                          );
                        })
                    : "No Request yet"
                  : "No Request yet"}
              </Slider>
            </div>
          </Modal>
        )}
    </>
  );
};

export default UserCardListForMessage;
