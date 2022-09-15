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

const UserCardListForMessage = ({
  conversations,
  isDesktopView,
  getConversations,
  setCurrentChat,
  tabIndexChange,
  socket,
}) => {
  const [modalIsOpen, setIsOpen] = React.useState(false);
  const [dateDetailsIsOpen, setDateDetailsIsOpen] = React.useState(false);
  const [msgModal, setMsgModal] = React.useState(false);
  const user = useSelector((state) => state.authReducer.user);
  const router = useRouter();
  const growRef = useRef(null);

  function openModal() {
    setIsOpen(true);
  }
  function closeModal() {
    setIsOpen(false);
  }

  const postApprovedConversation = async (room_id, conversation) => {
    setCurrentChat(conversation);
    try {
      const data = {
        chatRoomId: room_id,
        senderId: user?._id,
      };
      const res = await apiRequest({
        data,
        method: "POST",
        url: `chat/accept`,
      });
      console.log("res.data", res.data);
      getConversations();
      closeModal();
      setCurrentChat((prev) => ({
        ...prev,
        status: res?.data?.data?.chatRoom?.status,
      }));

      tabIndexChange(0);
    } catch (err) {
      console.log("err", err);
    }

    const data = {
      chatRoomId: room_id ?? "",
      recieverId: conversation?.user?.id ?? "",
      message: "",
    };

    socket.emit("sendMessage", data);
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
      <span onClick={openModal}>
        <span>
          {conversations?.length > 0
            ? conversations.filter(
                (c) => c.status == 0 && c.message?.sender_id !== user?._id
              )?.length > 0 &&
              conversations.filter(
                (c) => c.status == 0 && c.message?.sender_id !== user?._id
              )?.length
            : ""}
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
              <IoIosClose
                size={25}
                className="close_btn"
                onClick={closeModal}
                color={"#A8A8A8"}
              />
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
                          return (
                            <div key={index}>
                              <H5>{conversation?.user?.user_name} is</H5>
                              <CustomIcon.IntrestedText
                                color={"white"}
                                size={140}
                              />
                              <figure>
                                <Image
                                  src={profilePic}
                                  alt="user image"
                                  width={500}
                                  height={600}
                                />
                                <span className="image_tagline">
                                  {conversation?.message?.message}
                                </span>
                              </figure>
                              <div className="d-flex align-items-center my-4 header_btn_wrap">
                                <a
                                  className="create-date"
                                  onClick={() => {
                                    postApprovedConversation(
                                      conversation?.message?.room_id,
                                      conversation
                                    );
                                  }}
                                >
                                  REPLY BACK
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
