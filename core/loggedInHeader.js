import React, { useState, useEffect } from "react";
import Link from "next/link";
import { CustomIcon } from "core/icon";
import UserImg from "assets/img/profile.png";
import SideBar from "./sidebar";
import useWindowSize from "utils/useWindowSize";
import { useSelector } from "react-redux";
import _ from "lodash";
import { useRouter } from "next/router";
import { apiRequest } from "utils/Utilities";
import io from "socket.io-client";
import SideBarPopup from "./sideBarPopup";
import Image from "next/image";
import close1 from "../assets/close1.png";
// const socket = io("https://staging-api.secrettime.com/", {
//   autoConnect: true,
// });

export default function HeaderLoggedIn({
  fixed,
  isBlack,
  unReadedConversationLength,
}) {
  const [isActive, setActive] = useState(false);
  const width = useWindowSize();
  const router = useRouter();
  const user = useSelector((state) => state.authReducer.user);
  const [conversations, setConversations] = useState([]);
  const [modalIsOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (modalIsOpen || isActive) {
      // stop scrolling page
      document.body.style.overflow = "hidden";
    } else {
      // allow scrolling page
      document.body.style.overflow = "unset";
    }
  }, [modalIsOpen, isActive]);

  function toggleModal() {
    setIsOpen(!modalIsOpen);
  }
  // useEffect(() => {
  //   getConversations();
  // }, [user]);

  // useEffect(() => {
  //   socket.on(`request-${user._id}`, (message) => {
  //     console.log("reqested message header", message);
  //     getConversations();
  //   });
  // }, [socket.connected]);

  // useEffect(() => {
  //   if (socket.connected) {
  //     socket.on(`recieve-${user._id}`, (message) => {
  //       console.log("recieve message header", message);
  //       getConversations();
  //     });
  //   }
  // }, [socket.connected]);

  // const getConversations = async () => {
  //   try {
  //     const res = await apiRequest({
  //       method: "GET",
  //       url: `chat/chatroom-list`,
  //     });
  //     // console.log("res", res.data?.data?.chatRooms);
  //     const conversations =
  //       res.data?.data?.chatRooms.length > 0
  //         ? res.data?.data?.chatRooms.filter((chat) => chat !== null)
  //         : [];
  //     setConversations(conversations);
  //   } catch (err) {
  //     console.log("err", err);
  //   }
  // };

  const unReadMessagesLength = unReadedConversationLength
    ? unReadedConversationLength
    : 0;

  const sidbarCloseOutsideClick = (event) => {
    const target = document.querySelector("#sidebar-header");
    const withinBoundaries = event.composedPath().includes(target);
    if (withinBoundaries) {
      setActive(false);
      document.body.classList.remove("open-sidebar");
    }
  };

  useEffect(() => {
    document.addEventListener("click", sidbarCloseOutsideClick);
  }, []);

  useEffect(() => {
    return () => {
      setActive(false);
      document.body.classList.remove("open-sidebar");
    };
  }, []);

  const toggleClass = () => {
    if (width?.width > 480) {
      toggleModal();
    } else {
      setActive(!isActive);
      document.body.classList.toggle("open-sidebar");
    }
  };
  return (
    <header
      style={fixed ? { position: "fixed", width: "100%", zIndex: "99" } : {}}
      className={`py-3 py-md-3 loggedin_user ${isBlack && "is-black-head"}`}
    >
      <div className="container">
        <div className="row align-items-center">
          <div className="col-md-4 col-2">
            <div className="logo">
              <>
                <Link href="/auth/login">
                  <h3 className="d-md-none mb-0 st-logo">ST</h3>
                </Link>
                <Link href="/auth/login">
                  <img
                    src="/images/logo.svg"
                    width="159"
                    alt="Logo"
                    className="d-none d-md-block"
                  />
                </Link>
              </>
            </div>
          </div>
          <div className="col-md-8 col-10">
            <nav>
              <ul className="d-flex justify-content-end mb-0 align-items-center">
                <li>
                  <button
                    id="message-icon"
                    className="message_link"
                    onClick={() => router.push("/messages")}
                    type="button"
                  >
                    <CustomIcon.Envelope color={"#fff"} size={20} />

                    {width?.width > 767 && (
                      <>
                        <Link href="/messages">
                          <a className="forgot-passwrd">Messages</a>
                        </Link>
                      </>
                    )}
                    {unReadMessagesLength > 0 && (
                      <span className="top-bages">
                        {/* {unReadMessagesLength} */}
                      </span>
                    )}
                  </button>
                </li>
                <li>
                  <div className="user-profile-details">
                    <figure
                      className={`user_img_header ${
                        modalIsOpen ? "invisible" : ""
                      } `}
                      onClick={toggleClass}
                      data-bs-toggle="modal"
                      data-bs-target="#exampleModal"
                      role="button"
                    >
                      <img
                        src={!_.isEmpty(user) ? user.images[0] : UserImg}
                        alt="user image"
                        width={32}
                        height={32}
                      />
                    </figure>
                  </div>
                </li>
              </ul>
              {width?.width > 480 ? (
                <SideBarPopup
                  isOpen={modalIsOpen}
                  toggle={toggleModal}
                ></SideBarPopup>
              ) : (
                <div
                  id="sidebar-header"
                  className={
                    isActive ? "sidebar-nav open_nav_menu" : "sidebar-nav"
                  }
                >
                  <SideBar />
                </div>
              )}
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
}
