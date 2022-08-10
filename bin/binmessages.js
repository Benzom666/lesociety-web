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
import { apiRequest, apiRequestChatHistory } from "utils/Utilities";
import { format } from "timeago.js";
import qs from "qs";
import { getCookie } from "utils/cookie";
import axios from "axios";
import UserCardListForMessage from "../core/UserCardListForMessage";

const socket = io.connect("ws://staging-api.secrettime.com/");

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
  const [conversations, setConversations] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [chatHistory, setChatHistory] = useState([]);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const scrollRef = useRef();
  // const socket = useRef();

  useEffect(() => {
    socket.auth = { user: user };
    socket.connect();
    getConversations();
  }, [user]);

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

  const sendMessage = async () => {
    const data = {
      chatRoomId: currentChat?.message?.room_id,
      recieverId: currentChat?.user?._id,
      message: newMessage,
    };
    socket.emit("sendMessage", data);
  };

  useEffect(() => {
    socket.emit(`recieve-${currentChat?.user?._id}`, (message) => {
      console.log("message socket on", message);
    });
  }, []);
  useEffect(() => {
    arrivalMessage &&
      currentChat?.members.includes(arrivalMessage.sender) &&
      setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage, currentChat]);
  const receiveMessage = async () => {};

  const getChatHistory = async (currentChat) => {
    try {
      const data = {
        chatRoomId: currentChat?.message?.room_id,
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

  // consoles
  console.log("conversations", conversations);
  console.log("currentChat", currentChat);

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
                    <Tabs>
                      <TabList>
                        <Tab>Conversations</Tab>
                        <Tab>
                          <UserCardListForMessage
                            conversations={conversations}
                            getConversations={getConversations}
                            user={user}
                            setCurrentChat={setCurrentChat}
                          />
                        </Tab>
                      </TabList>
                      <TabPanel>
                        <div className="user-list-wrap">
                          <ul>
                            {conversations?.length > 0
                              ? conversations.filter((c) => c.status == 1)
                                  ?.length > 0
                                ? conversations
                                    .filter((c) => c.status == 1)
                                    ?.map((c) => {
                                      return (
                                        <li
                                          onClick={() => {
                                            getChatHistory(c);
                                            setCurrentChat(c);
                                          }}
                                        >
                                          <figure>
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
                                              width={40}
                                              height={40}
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
                              conversations.filter((c) => c.status == 0)
                                ?.length == 0) &&
                              "No Requests"}
                          </ul>
                        </div>
                      </TabPanel>
                    </Tabs>
                  </div>
                </div>
                <div className="col-md-8 col-lg-9 p-0">
                  <div className="message-content-side">
                    {/* <div className="no-message-card">
                                            <figure>
                                                <Image
                                                    src={NoImage}
                                                    alt="NoImage"
                                                    width={205}
                                                    height={140}
                                                />
                                            </figure>
                                            <h3>Sorry, no messages yet</h3>
                                            <SubHeading title="Find a girl you like and lock in your first date!" />
                                            <div className="d-flex align-items-center my-4 header_btn_wrap">
                                                <Link href="/user/user-list"><a className="create-date">View Gallery</a></Link>
                                            </div>
                                        </div> */}
                    {currentChat && currentChat?.status === 0 ? (
                      <UserCardList currentChat={currentChat} />
                    ) : // <div className="message-chat-wrap">
                    //   <div className="top-head">
                    //     <div className="user-thumb">
                    //       <figure>
                    //         <Image
                    //           src={
                    //             currentChat?.user?.images?.length > 0 &&
                    //             currentChat?.user?.images
                    //               ? currentChat?.user?.images[0]
                    //               : (user.images && user.images[0]) || NoImage
                    //           }
                    //           alt="user image"
                    //           width={40}
                    //           height={40}
                    //         />
                    //       </figure>
                    //       <span className="user-details">
                    //         <h3>{currentChat?.user?.user_name ?? ""}</h3>
                    //       </span>
                    //     </div>
                    //     <div className="user-details">
                    //       <div className="tag_wrap">
                    //         <ul>
                    //           <li>
                    //             <CustomIcon.Sporty color={"#fff"} size={20} />
                    //             <span>Get sporty</span>
                    //           </li>
                    //           <li>
                    //             <CustomIcon.OutdoorAdventure
                    //               color={"white"}
                    //               size={20}
                    //             />
                    //             <span>Adventure</span>
                    //           </li>
                    //         </ul>
                    //       </div>
                    //       <h4 className="price_per_hour">
                    //         $80 / <span>2hr</span>
                    //       </h4>
                    //       <div className="action_btn_list">
                    //         <span onClick={toggleClass}>
                    //           <BiDotsHorizontalRounded
                    //             size={35}
                    //             color={"rgba(255, 255, 255, 0.7)"}
                    //           />
                    //         </span>
                    //         <div
                    //           className="dropdown-list"
                    //           id="action_dropdown"
                    //         >
                    //           <ul>
                    //             <li>
                    //               <Link href="/">
                    //                 <a>
                    //                   Setting <FiChevronRight size={22} />{" "}
                    //                 </a>
                    //               </Link>
                    //             </li>
                    //             <li>
                    //               <Link href="/">
                    //                 <a>
                    //                   Privacy <FiChevronRight size={22} />
                    //                 </a>
                    //               </Link>
                    //             </li>
                    //             <li>
                    //               <Link href="/">
                    //                 <a>
                    //                   Terms <FiChevronRight size={22} />
                    //                 </a>
                    //               </Link>
                    //             </li>
                    //           </ul>
                    //         </div>
                    //       </div>
                    //     </div>
                    //   </div>
                    //   <div className="chat_message_wrap">
                    //     <div className="message_list_wrap">
                    //       <ul>
                    //         {currentChat?.message?.sender_id == user?._id ? (
                    //           <li className="send">
                    //             <div className="message_content">
                    //               <span className="message_time">
                    //                 {format(currentChat?.message?.sent_time)}
                    //               </span>
                    //               {currentChat?.message?.message}
                    //             </div>
                    //           </li>
                    //         ) : (
                    //           <li className="receive">
                    //             <div className="message_content">
                    //               <span className="message_time">
                    //                 {format(currentChat?.message?.sent_time)}
                    //               </span>
                    //               {currentChat?.message?.message}
                    //             </div>
                    //           </li>
                    //         )}

                    //         <li className="message-confirmation">
                    //           <span>Please accept the message</span>
                    //           <div className="">
                    //             <button
                    //               type="button"
                    //               onClick={() => console.log("Cancel")}
                    //             >
                    //               Cancel
                    //             </button>
                    //             <button
                    //               type="button"
                    //               onClick={() =>
                    //                 postApprovedConversation(currentChat)
                    //               }
                    //             >
                    //               Accept
                    //             </button>
                    //           </div>
                    //         </li>
                    //       </ul>
                    //     </div>
                    //     {/* <div className="input_write_sec">
                    //       <input
                    //         type="text"
                    //         placeholder="Type your message here…"
                    //       />
                    //       <button type="button" className="send_btn">
                    //         <IoIosSend size={25} color={"#F24462"} />
                    //       </button>
                    //     </div> */}
                    //   </div>
                    // </div>
                    currentChat && currentChat?.status === 1 ? (
                      <div className="message-chat-wrap">
                        <div className="top-head">
                          <div className="user-thumb">
                            <figure>
                              <Image
                                src={
                                  currentChat?.user?.images?.length > 0 &&
                                  currentChat?.user?.images
                                    ? currentChat?.user?.images[0]
                                    : (user.images && user.images[0]) || NoImage
                                }
                                alt="user image"
                                width={40}
                                height={40}
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
                                  <CustomIcon.Sporty color={"#fff"} size={20} />
                                  <span>Get sporty</span>
                                </li>
                                <li>
                                  <CustomIcon.OutdoorAdventure
                                    color={"white"}
                                    size={20}
                                  />
                                  <span>Adventure</span>
                                </li>
                              </ul>
                            </div>
                            <h4 className="price_per_hour">
                              $80 / <span>2hr</span>
                            </h4>
                            <div className="action_btn_list">
                              <span onClick={toggleClass}>
                                <BiDotsHorizontalRounded
                                  size={35}
                                  color={"rgba(255, 255, 255, 0.7)"}
                                />
                              </span>
                              <div
                                className="dropdown-list"
                                id="action_dropdown"
                              >
                                <ul>
                                  <li>
                                    <Link href="/">
                                      <a>
                                        Setting <FiChevronRight size={22} />{" "}
                                      </a>
                                    </Link>
                                  </li>
                                  <li>
                                    <Link href="/">
                                      <a>
                                        Privacy <FiChevronRight size={22} />
                                      </a>
                                    </Link>
                                  </li>
                                  <li>
                                    <Link href="/">
                                      <a>
                                        Terms <FiChevronRight size={22} />
                                      </a>
                                    </Link>
                                  </li>
                                </ul>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="chat_message_wrap">
                          <div className="message_list_wrap">
                            <ul>
                              {messages.length > 0 &&
                                messages.map((message) => {
                                  console.log(
                                    "message.sender_id",
                                    message.sender_id
                                  );
                                  console.log("user?._id", user?._id);
                                  return (
                                    <li className="send">
                                      <div className="message_content">
                                        <span className="message_time">
                                          {format(message?.sent_time)}
                                        </span>
                                        {message?.message}
                                      </div>
                                    </li>
                                  );
                                  // if (message.sender_id == user?._id) {
                                  //   return (
                                  //     <li className="send">
                                  //       <div className="message_content">
                                  //         <span className="message_time">
                                  //           {format(message?.sent_time)}
                                  //         </span>
                                  //         {message?.message}
                                  //       </div>
                                  //     </li>
                                  //   );
                                  // } else {
                                  //   return (
                                  //     <li className="receive">
                                  //       <div className="message_content">
                                  //         <span className="message_time">
                                  //           {format(message?.sent_time)}
                                  //         </span>
                                  //         {message.message}
                                  //       </div>
                                  //     </li>
                                  //   );
                                  // }
                                })}
                            </ul>
                          </div>
                          <div className="input_write_sec">
                            <input
                              type="text"
                              placeholder="Type your message here…"
                              onChange={(e) => setNewMessage(e.target.value)}
                            />
                            <button
                              type="button"
                              className="send_btn"
                              onClick={sendMessage}
                            >
                              <IoIosSend size={25} color={"#F24462"} />
                            </button>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <span className="no-conversation-text">
                        Open a conversation to start a chat.
                      </span>
                    )}
                  </div>
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
