import React, { useState, useEffect, useRef } from "react";
import HeaderLoggedIn from "core/loggedInHeader";
import Footer from "core/footer";
import { Inputs } from "../core";
import { Field, reduxForm } from "redux-form";
import validate from "modules/auth/forms/validate/validate";
import { IoIosSend, IoMdSearch } from "react-icons/io";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import Image from "next/image";
import UserImg from "assets/img/userimg.jpg";
import UserImg2 from "assets/img/profile.png";
import UserImg3 from "assets/img/user-3.png";
import UserImg4 from "assets/img/user-4.png";
import NoImage from "assets/img/no-image.png";
import SubHeading from "@/core/SubHeading";
import Link from "next/link";
import { CustomIcon } from "core/icon";
import { BiDotsHorizontalRounded } from "react-icons/bi";
import { FiChevronRight } from "react-icons/fi";
import withAuth from "../core/withAuth";
import io from "socket.io-client";
import { useSelector } from "react-redux";
import {
  apiRequest,
  apiRequestChatHistory,
  dateCategory,
} from "utils/Utilities";
import { format } from "timeago.js";
import qs from "qs";
import { getCookie } from "utils/cookie";
import axios from "axios";
import UserCardListForMessage from "./../core/UserCardListForMessage";
import { useRouter } from "next/router";
import useWindowSize from "utils/useWindowSize";
import { socket } from "./user/user-list";

// const socket = io.connect("https://staging-api.secrettime.com/");

// const socket = io("https://staging-api.secrettime.com/", {
//   autoConnect: true,
// });

const Messages = (props) => {
  const {
    handleSubmit,
    invalid,
    previousPage,
    pristine,
    reset,
    submitting,
    touched,
  } = props;

  const [isActive, setActive] = useState(false);
  const user = useSelector((state) => state.authReducer.user);
  const [selectedTabIndex, setSelectedTabIndex] = useState(0);
  const [conversations, setConversations] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [chatHistory, setChatHistory] = useState([]);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [arrivalMessage, setArrivalMessage] = useState("");
  const scrollRef = useRef();
  const [chatModal, setChatModal] = useState(false);
  const { width } = useWindowSize();
  const mobile = width < 768;
  const router = useRouter();

  useEffect(() => {
    socket.auth = { user: user };
    socket.connect();
    console.log("socket", socket.auth);
    socket.on("connect", () => {
      console.log("connected", socket.connected);
    });
    socket.on("disconnect", (reason) => {
      console.log("socket disconnected reason", reason);
    });
  }, []);

  useEffect(() => {
    socket.on("connect_error", () => {
      console.log("connect_error");
      socket.auth = { user: user };
      socket.connect();
    });
  }, []);

  // useEffect(() => {
  // setTimeout(() => {
  //   socket.close();
  // }, 10000);
  // }, []);

  useEffect(() => {
    getConversations();
  }, [user]);

  useEffect(() => {
    // if (socket.connected) {
    socket.on(`requestAccept-${user._id}`, (message) => {
      console.log("requestAccept message", message);
      getConversations();
    });
    // }
  }, [socket.connected]);

  useEffect(() => {
    // if (socket.connected) {
    console.log("socket request message will", socket.connected);
    socket.on(`request-${user._id}`, (message) => {
      console.log("reqested message", message);
      getConversations();
    });
    // }
  }, [socket.connected]);

  useEffect(() => {
    if (socket.connected) {
      console.log("socket receiver message will", socket.connected);
      socket.on(`recieve-${user._id}`, (message) => {
        console.log("reciever message", message);
        if (message.message == "") {
          return getConversations();
        }
        return setArrivalMessage({
          message: message.message,
          sender_id: message.sender_id,
          sent_time: Date.now(),
          room_id: message?.room_id,
          receiver_id: message?.receiver_id,
        });
      });
    }
  }, [socket.connected]);

  useEffect(() => {
    if (arrivalMessage && currentChat?._id === arrivalMessage?.room_id) {
      setMessages((prev) => [...prev, arrivalMessage]);
    }
  }, [arrivalMessage, currentChat]);

  useEffect(() => {
    if (socket.connected) {
      socket.on(`requestBlock-${user._id}`, (message) => {
        console.log("Blocked Chat", message);
        setCurrentChat((prev) => ({
          ...prev,
          status: message?.status,
        }));
      });
    }
  }, [socket.connected]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    if (currentChat) {
      getChatHistory(currentChat);
    }
  }, [currentChat]);

  // Fuctions

  const toggleChat = (currentChat) => {
    setChatModal(true);
    router.push(`messages/${currentChat?._id}`);
  };

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

  const sendMessage = async (e) => {
    e.preventDefault();

    const data = {
      chatRoomId: currentChat?.message?.room_id ?? "",
      recieverId: currentChat?.user?.id ?? "",
      message: newMessage,
    };

    console.log("socket.connected", socket.connected);
    socket.emit("sendMessage", data);
    setMessages((prev) => [
      ...prev,
      {
        message: newMessage,
        sender_id: user?._id,
        sent_time: Date.now(),
      },
    ]);
    // getChatHistory(currentChat);
    setNewMessage("");
  };

  const tabIndexChange = (index) => {
    setSelectedTabIndex(index);
  };

  const getChatHistory = async (currentChat) => {
    try {
      const data = {
        chatRoomId: currentChat?.message?.room_id ?? currentChat?._id,
      };

      const res = await apiRequest({
        method: "GET",
        url: `chat/chatroom-history`,
        params: data,
      });
      setMessages(res.data?.data?.chat);
    } catch (err) {
      console.log("err", err);
    }
  };

  const blockChat = async (currentChat) => {
    try {
      const data = {
        chatRoomId: currentChat?.message?.room_id,
        recieverId: currentChat?.user?.id,
      };

      const res = await apiRequest({
        data: data,
        method: "POST",
        url: `chat/block`,
      });
      console.log("res", res);
      setCurrentChat((prev) => ({
        ...prev,
        status: res?.data?.data?.chatRoom?.status,
        blocked_by: {
          _id: user?._id,
        },
      }));
      getConversations();
    } catch (err) {
      console.log("err", err);
    }
  };

  const sidbarCloseOutsideClick = (event) => {
    const target = document.querySelector("#action_dropdown");
    const withinBoundaries = event.composedPath().includes(target);
    if (withinBoundaries) {
      setActive(false);
      // document.body.classList.remove("open-sidebar");
    }
  };

  useEffect(() => {
    document.addEventListener("click", sidbarCloseOutsideClick);
  }, []);
  const toggleClass = () => {
    setActive(!isActive);
    // document.body.classList.toggle("open-sidebar");
  };
  const category = dateCategory.find(
    (item) =>
      item?.label === currentChat?.date_id?.standard_class_date ||
      item?.label === currentChat?.date_id?.middle_class_dates ||
      item?.label === currentChat?.date_id?.executive_class_dates
  );
  // consoles
  console.log("socket connected message", socket.connected);

  // console.log("socket", socket);
  // console.log("currentChat", currentChat);
  // console.log("arrivalMessage", arrivalMessage);
  // console.log("category", category);
  // console.log("conversation", conversations);
  return (
    <div className="inner-page">
      <HeaderLoggedIn />
      <div className="inner-part-page">
        <div className="">
          <form onSubmit={handleSubmit}>
            <div className="container message">
              <div className="row">
                <div className="col-md-4 col-lg-3 p-0">
                  <div className="message_sidebar_wrap">
                    <Field
                      name="search"
                      type="text"
                      component={Inputs.inputFieldWithIcon}
                      placeholder=" Search"
                      icon={<IoMdSearch size={20} />}
                    />
                    <Tabs
                      selectedIndex={selectedTabIndex}
                      onSelect={tabIndexChange}
                    >
                      {user.gender === "female" ? (
                        <TabList>
                          <Tab>Conversations</Tab>
                          <Tab>
                            <UserCardListForMessage
                              conversations={conversations}
                              getConversations={getConversations}
                              user={user}
                              setCurrentChat={setCurrentChat}
                              tabIndexChange={tabIndexChange}
                              socket={socket}
                            />
                          </Tab>
                        </TabList>
                      ) : (
                        <TabList>
                          <Tab>Conversations</Tab>
                        </TabList>
                      )}
                      <TabPanel>
                        <div className="user-list-wrap">
                          <ul>
                            {conversations?.length > 0
                              ? conversations.filter(
                                  (c) => c.status == 1 || c.status == 2
                                )?.length > 0
                                ? conversations
                                    .filter(
                                      (c) => c.status == 1 || c.status == 2
                                    )
                                    ?.map((c) => {
                                      return (
                                        <li
                                          onClick={() => {
                                            setCurrentChat(c);
                                            if (mobile) {
                                              toggleChat(c);
                                            }
                                          }}
                                        >
                                          <figure className="user_img_header">
                                            <Image
                                              src={
                                                c.user?.images?.length > 0 &&
                                                c.user?.images
                                                  ? c.user?.images[0]
                                                  : (user.images &&
                                                      user.images[0]) ||
                                                    NoImage
                                              }
                                              alt="user image"
                                              width={32}
                                              height={32}
                                            />
                                          </figure>
                                          <span className="user-details">
                                            <h3>{c?.user?.user_name ?? ""}</h3>
                                          </span>
                                        </li>
                                      );
                                    })
                                : "No Conversations"
                              : "No Conversations"}
                          </ul>
                        </div>
                      </TabPanel>
                      <TabPanel>
                        <div className="user-list-wrap">
                          <ul>
                            {(conversations?.length == 0 ||
                              conversations.filter(
                                (c) =>
                                  c.status == 0 &&
                                  c.message?.sender_id !== user?._id
                              )?.length == 0) &&
                              "No Requests"}
                          </ul>
                        </div>
                      </TabPanel>
                    </Tabs>
                  </div>
                </div>
                <div className="col-md-8 col-lg-9 p-0">
                  {!mobile && (
                    <div className="message-content-side">
                      {currentChat && currentChat?.status === 0 ? (
                        <>{/* <UserCardList currentChat={currentChat} /> */}</>
                      ) : currentChat &&
                        (currentChat?.status === 1 ||
                          currentChat?.status === 2) ? (
                        <div className="message-chat-wrap">
                          <div className="top-head">
                            <div className="user-thumb">
                              <figure className="user_img_header">
                                <Image
                                  src={
                                    currentChat?.user?.images?.length > 0 &&
                                    currentChat?.user?.images
                                      ? currentChat?.user?.images[0]
                                      : (user.images && user.images[0]) ||
                                        NoImage
                                  }
                                  alt="user image"
                                  width={32}
                                  height={32}
                                />
                              </figure>
                              <span className="user-details">
                                <h3>{currentChat?.user?.user_name ?? ""}</h3>
                              </span>
                            </div>
                            <div className="user-details">
                              <div className="tag_wrap">
                                <ul>
                                  <li>
                                    <span>{category?.icon}</span>
                                    <span>{category?.label}</span>
                                  </li>
                                </ul>
                              </div>
                              <h4 className="price_per_hour">
                                ${currentChat?.date_id?.price} /{" "}
                                <span>{currentChat?.date_id?.date_length}</span>
                              </h4>
                              <div className="action_btn_list">
                                <span onClick={toggleClass}>
                                  <BiDotsHorizontalRounded
                                    size={35}
                                    color={"rgba(255, 255, 255, 0.7)"}
                                  />
                                </span>
                                {isActive && (
                                  <div
                                    className="dropdown-list"
                                    id="action_dropdown"
                                  >
                                    <ul>
                                      {currentChat?.status === 2 ? (
                                        currentChat?.blocked_by?._id ==
                                          user?._id && (
                                          <li>
                                            <a>Unblock</a>
                                          </li>
                                        )
                                      ) : (
                                        <li
                                          onClick={() => blockChat(currentChat)}
                                        >
                                          <a>Block</a>
                                        </li>
                                      )}
                                    </ul>
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                          <div className="chat_message_wrap">
                            <div className="message_list_wrap">
                              <ul className="chat_message_scroll">
                                {messages.filter(
                                  (message) => message?.message !== ""
                                ).length > 0 &&
                                  messages
                                    .filter(
                                      (message) => message?.message !== ""
                                    )
                                    .map((message, index) => {
                                      return (
                                        <li
                                          className={
                                            message.sender_id === user._id
                                              ? "send"
                                              : "receive"
                                          }
                                          key={index}
                                          ref={scrollRef}
                                        >
                                          <div className="message_content">
                                            <span className="message_time">
                                              {format(message?.sent_time)}
                                            </span>
                                            {message?.message}
                                          </div>
                                        </li>
                                      );
                                    })}
                              </ul>
                            </div>
                            {currentChat?.status === 2 ? (
                              currentChat?.blocked_by?._id == user?._id ? (
                                <div className="text-center">
                                  you have blocked this chat
                                </div>
                              ) : (
                                <div className="text-center">
                                  You have been blocked
                                </div>
                              )
                            ) : (
                              <div className="input_write_sec">
                                <input
                                  type="text"
                                  placeholder="Type your message here…"
                                  onChange={(e) =>
                                    setNewMessage(e.target.value)
                                  }
                                  value={newMessage}
                                  onKeyPress={(event) => {
                                    event.key === "Enter" && sendMessage(event);
                                  }}
                                />
                                <button
                                  type="button"
                                  className="send_btn"
                                  onClick={sendMessage}
                                >
                                  <IoIosSend size={25} color={"#F24462"} />
                                </button>
                              </div>
                            )}
                          </div>
                        </div>
                      ) : (
                        <span className="no-conversation-text">
                          Open a conversation to start a chat.
                        </span>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default reduxForm({
  form: "Messages", // <------ same form name
  destroyOnUnmount: false, // <------ preserve form data
  forceUnregisterOnUnmount: true, // <------ unregister fields on unmount
  validate,
})(withAuth(Messages));
