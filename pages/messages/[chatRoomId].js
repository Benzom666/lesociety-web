import { useRouter } from "next/router";
import React, { useState, useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import { apiRequest, dateCategory } from "utils/Utilities";
import io from "socket.io-client";
import { BiDotsHorizontalRounded } from "react-icons/bi";
import { format } from "timeago.js";
import { IoIosSend, IoMdSearch } from "react-icons/io";
import Image from "next/image";
import withAuth from "@/core/withAuth";

const socket = io.connect("http://staging-api.secrettime.com/");

function ChatMessages(props) {
  const [currentChat, setCurrentChat] = React.useState(null);
  const user = useSelector((state) => state.authReducer.user);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [arrivalMessage, setArrivalMessage] = useState("");
  const [isActive, setActive] = useState(false);
  const router = useRouter();
  const scrollRef = useRef();

  useEffect(() => {
    socket.auth = { user: user };
    socket.connect();
    console.log("socket", socket.auth);
    socket.on("connect", () => {
      console.log("connected mobile", socket.connected);
    });
    socket.on("disconnect", (reason) => {
      console.log("socket disconnected reason", reason);
    });
    console.log("I am called");
  }, [!socket.connected]);

  useEffect(() => {
    socket.on("connect_error", () => {
      console.log("connect_error");
      socket.auth = { user: user };
      socket.connect();
    });
  }, [!socket.connected]);

  useEffect(() => {
    if (router?.query?.chatRoomId) {
      getChatHistory(router?.query?.chatRoomId);
      getConversations();
    }
    return () => {};
  }, [router?.query]);

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
    console.log("socket request message mobile", socket.connected);
    socket.on(`request-${user._id}`, (message) => {
      console.log("reqested message", message);
      getConversations();
    });
    // }
  }, [socket.connected]);

  useEffect(() => {
    if (socket.connected) {
      console.log("socket receiver message mobile", socket.connected);
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

  const toggleClass = () => {
    setActive(!isActive);
    // document.body.classList.toggle("open-sidebar");
  };

  const getChatHistory = async (chatRoomId) => {
    try {
      const data = {
        chatRoomId: chatRoomId,
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
  const category = dateCategory.find(
    (item) =>
      item?.label === currentChat?.date_id?.standard_class_date ||
      item?.label === currentChat?.date_id?.middle_class_dates ||
      item?.label === currentChat?.date_id?.executive_class_dates
  );
  const getConversations = async () => {
    try {
      const res = await apiRequest({
        method: "GET",
        url: `chat/chatroom-list`,
      });
      // console.log("res", res.data?.data?.chatRooms);
      const conversations =
        res.data?.data?.chatRooms.length > 0
          ? res.data?.data?.chatRooms.filter(
              (chat) => chat !== null && chat._id === router?.query?.chatRoomId
            )?.length > 0
            ? res.data?.data?.chatRooms.filter(
                (chat) =>
                  chat !== null && chat._id === router?.query?.chatRoomId
              )[0]
            : ""
          : "";
      setCurrentChat(conversations);
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
      }));
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

    socket.emit("sendMessage", data);
    setMessages((prev) => [
      ...prev,
      {
        message: newMessage,
        sender_id: user?._id,
        sent_time: Date.now(),
      },
    ]);
    setNewMessage("");
  };

  // console.log("currentChat", currentChat);
  console.log("socket connected message mobile", socket.connected);

  return (
    <div className="container message h-100">
      <div className="message-content-side">
        {currentChat &&
          (currentChat?.status === 1 || currentChat?.status === 2) && (
            <div className="message-chat-wrap">
              <div className="top-head message-header-dates">
                <div className="user-thumb user-thumb-data">
                  <figure className="user_img_header">
                    <Image
                      src={
                        currentChat?.user?.images?.length > 0 &&
                        currentChat?.user?.images
                          ? currentChat?.user?.images[0]
                          : (user.images && user.images[0]) || NoImage
                      }
                      alt="user image"
                      width={32}
                      height={32}
                    />
                  </figure>
                  <span className="user-details">
                    <h3>{currentChat?.user?.user_name ?? ""}</h3>
                  </span>
                  <div className="user-details">
                    <div className="action_btn_list">
                      <span onClick={toggleClass}>
                        <BiDotsHorizontalRounded
                          size={35}
                          color={"rgba(255, 255, 255, 0.7)"}
                        />
                      </span>
                      {isActive && (
                        <div className="dropdown-list" id="action_dropdown">
                          <ul>
                            {currentChat?.status === 2 ? (
                              currentChat?.blocked_by?._id == user?._id && (
                                <li>
                                  <a>Unblock</a>
                                </li>
                              )
                            ) : (
                              <li onClick={() => blockChat(currentChat)}>
                                <a>Block</a>
                              </li>
                            )}
                          </ul>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                <div className="message-header-dates-data">
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
                </div>
              </div>
              <div className="chat_message_wrap">
                <div className="message_list_wrap">
                  <ul className="chat_message_scroll">
                    {messages.length > 0 &&
                      messages.map((message, index) => {
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
                    <div className="text-center">You have been blocked</div>
                  )
                ) : (
                  <div className="input_write_sec">
                    <input
                      type="text"
                      placeholder="Type your message here…"
                      onChange={(e) => setNewMessage(e.target.value)}
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
          )}
      </div>
    </div>
  );
}

export default withAuth(ChatMessages);
