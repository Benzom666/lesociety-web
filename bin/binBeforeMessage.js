import React, { useState, useEffect } from "react";
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
                          <span>27</span> Requests
                        </Tab>
                      </TabList>
                      <TabPanel>
                        <div className="user-list-wrap">
                          <ul>
                            <li>
                              <figure>
                                <Image
                                  src={UserImg}
                                  alt="user image"
                                  width={40}
                                  height={40}
                                />
                              </figure>
                              <span className="user-details">
                                <h3>Jim Clarkson</h3>
                              </span>
                            </li>
                            <li className="unread">
                              <figure>
                                <Image
                                  src={UserImg2}
                                  alt="user image"
                                  width={40}
                                  height={40}
                                />
                              </figure>
                              <span className="user-details">
                                <h3>
                                  Mat Daemon{" "}
                                  <span className="unread_indicator"></span>
                                </h3>
                              </span>
                            </li>
                            <li>
                              <figure>
                                <Image
                                  src={UserImg3}
                                  alt="user image"
                                  width={40}
                                  height={40}
                                />
                              </figure>
                              <span className="user-details">
                                <h3>Liam Benjamin</h3>
                              </span>
                            </li>
                            <li>
                              <figure>
                                <Image
                                  src={UserImg4}
                                  alt="user image"
                                  width={40}
                                  height={40}
                                />
                              </figure>
                              <span className="user-details">
                                <h3>Jim Clarkson</h3>
                              </span>
                            </li>
                            <li className="unread">
                              <figure>
                                <Image
                                  src={UserImg}
                                  alt="user image"
                                  width={40}
                                  height={40}
                                />
                              </figure>
                              <span className="user-details">
                                <h3>
                                  Mat Daemon{" "}
                                  <span className="unread_indicator"></span>
                                </h3>
                              </span>
                            </li>
                            <li>
                              <figure>
                                <Image
                                  src={UserImg2}
                                  alt="user image"
                                  width={40}
                                  height={40}
                                />
                              </figure>
                              <span className="user-details">
                                <h3>Liam Benjamin</h3>
                              </span>
                            </li>
                            <li>
                              <figure>
                                <Image
                                  src={UserImg3}
                                  alt="user image"
                                  width={40}
                                  height={40}
                                />
                              </figure>
                              <span className="user-details">
                                <h3>Jim Clarkson</h3>
                              </span>
                            </li>
                            <li className="unread">
                              <figure>
                                <Image
                                  src={UserImg4}
                                  alt="user image"
                                  width={40}
                                  height={40}
                                />
                              </figure>
                              <span className="user-details">
                                <h3>
                                  Mat Daemon{" "}
                                  <span className="unread_indicator"></span>
                                </h3>
                              </span>
                            </li>
                            <li>
                              <figure>
                                <Image
                                  src={UserImg}
                                  alt="user image"
                                  width={40}
                                  height={40}
                                />
                              </figure>
                              <span className="user-details">
                                <h3>Liam Benjamin</h3>
                              </span>
                            </li>
                          </ul>
                        </div>
                      </TabPanel>
                      <TabPanel>
                        <div className="user-list-wrap">
                          <ul>
                            <li>
                              <figure>
                                <Image
                                  src={UserImg}
                                  alt="user image"
                                  width={40}
                                  height={40}
                                />
                              </figure>
                              <span className="user-details">
                                <h3>Jim Clarkson</h3>
                              </span>
                            </li>
                            <li className="unread">
                              <figure>
                                <Image
                                  src={UserImg2}
                                  alt="user image"
                                  width={40}
                                  height={40}
                                />
                              </figure>
                              <span className="user-details">
                                <h3>
                                  Mat Daemon{" "}
                                  <span className="unread_indicator"></span>
                                </h3>
                              </span>
                            </li>
                            <li>
                              <figure>
                                <Image
                                  src={UserImg3}
                                  alt="user image"
                                  width={40}
                                  height={40}
                                />
                              </figure>
                              <span className="user-details">
                                <h3>Liam Benjamin</h3>
                              </span>
                            </li>
                            <li>
                              <figure>
                                <Image
                                  src={UserImg4}
                                  alt="user image"
                                  width={40}
                                  height={40}
                                />
                              </figure>
                              <span className="user-details">
                                <h3>Jim Clarkson</h3>
                              </span>
                            </li>
                            <li className="unread">
                              <figure>
                                <Image
                                  src={UserImg}
                                  alt="user image"
                                  width={40}
                                  height={40}
                                />
                              </figure>
                              <span className="user-details">
                                <h3>
                                  Mat Daemon{" "}
                                  <span className="unread_indicator"></span>
                                </h3>
                              </span>
                            </li>
                            <li>
                              <figure>
                                <Image
                                  src={UserImg2}
                                  alt="user image"
                                  width={40}
                                  height={40}
                                />
                              </figure>
                              <span className="user-details">
                                <h3>Liam Benjamin</h3>
                              </span>
                            </li>
                            <li>
                              <figure>
                                <Image
                                  src={UserImg3}
                                  alt="user image"
                                  width={40}
                                  height={40}
                                />
                              </figure>
                              <span className="user-details">
                                <h3>Jim Clarkson</h3>
                              </span>
                            </li>
                            <li className="unread">
                              <figure>
                                <Image
                                  src={UserImg4}
                                  alt="user image"
                                  width={40}
                                  height={40}
                                />
                              </figure>
                              <span className="user-details">
                                <h3>
                                  Mat Daemon{" "}
                                  <span className="unread_indicator"></span>
                                </h3>
                              </span>
                            </li>
                            <li>
                              <figure>
                                <Image
                                  src={UserImg}
                                  alt="user image"
                                  width={40}
                                  height={40}
                                />
                              </figure>
                              <span className="user-details">
                                <h3>Liam Benjamin</h3>
                              </span>
                            </li>
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
                        <Link href="/user/user-list">
                          <a className="create-date">View Gallery</a>
                        </Link>
                      </div>
                    </div> */}
                    <div className="message-chat-wrap">
                      <div className="top-head">
                        <div className="user-thumb">
                          <figure>
                            <Image
                              src={UserImg}
                              alt="user image"
                              width={40}
                              height={40}
                            />
                          </figure>
                          <span className="user-details">
                            <h3>Liam Benjamin</h3>
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
                            <div className="dropdown-list" id="action_dropdown">
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
                            <li className="send">
                              <div className="message_content">
                                <span className="message_time">
                                  2 minutes ago
                                </span>
                                Hi Sana
                              </div>
                            </li>
                            <li className="receive">
                              <div className="message_content">
                                <span className="message_time">
                                  0 minutes ago
                                </span>
                                Hello John
                              </div>
                            </li>
                            <li className="send">
                              <div className="message_content">
                                <span className="message_time">
                                  2 minutes ago
                                </span>
                                Hello I am testing the message content and
                                verigy all category and kfj fnwejweour
                              </div>
                            </li>
                            <li className="receive">
                              <div className="message_content">
                                <span className="message_time">
                                  0 minutes ago
                                </span>
                                I am testing the message content and verigy all
                                category and kfj fnwejweour
                              </div>
                            </li>
                            <li className="send">
                              <div className="message_content">
                                <span className="message_time">
                                  2 minutes ago
                                </span>
                                Hello I am testing the message content and
                                verigy all category esting the message content
                                and verigy all category and kfj fnwejweour
                              </div>
                            </li>
                          </ul>
                        </div>
                        <div className="input_write_sec">
                          <input
                            type="text"
                            placeholder="Type your message here…"
                          />
                          <button type="button" className="send_btn">
                            <IoIosSend size={25} color={"#F24462"} />
                          </button>
                        </div>
                      </div>
                    </div>
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
