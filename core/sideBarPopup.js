import React, { useState, useEffect } from "react";
import Link from "next/link";
import { CustomIcon } from "core/icon";
import UserImg from "assets/img/profile.png";
import Image from "next/image";
import SubHeading from "./SubHeading";
import H5 from "./H5";
import { HiBadgeCheck } from "react-icons/hi";
import { FiChevronRight } from "react-icons/fi";
import { useSelector, useDispatch } from "react-redux";
import { deAuthenticateAction } from "../modules/auth/authActions";
import { useRouter } from "next/router";
import _ from "lodash";
import { BiTime } from "react-icons/bi";
import close1 from "../assets/close1.png";
import { reset } from "redux-form";

function sideBarPopup({ isOpen, toggle }) {
  const user = useSelector((state) => state.authReducer.user);
  const dispatch = useDispatch();
  const router = useRouter();
  const [documentUpoaded, setDocumentUpoaded] = useState(false);

  useEffect(() => {
    if (user?.selfie && user?.document) {
      setDocumentUpoaded(true);
    }
  }, [user]);
  return (
    <div
      className={`modal fade ${isOpen ? "show d-block" : "d-none"}`}
      id="sidebarPop"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
      style={{ margin: "15px" }}
    >
      <div
        className="modal-dialog modal-custom-dailog"
        style={{ marginTop: "40px" }}
      >
        <div
          className="modal-content"
          style={{
            backgroundColor: "black",
            width: "340px",
            borderRadius: "10px",
          }}
        >
          <div className="modal-header p-0" style={{ borderBottom: "none" }}>
            <button
              type="button"
              className="btn-close btn-custom"
              data-bs-dismiss="modal"
              aria-label="Close"
              onClick={toggle}
            >
              <Image
                src={close1}
                alt="user image"
                width={32}
                height={32}
                // className="date-preview-img"
              />
            </button>
          </div>
          <div className="modal-body">
            <div className="sidebar_wrap">
              <div className="user-card-sidebar">
                <div className="d-flex align-items-center mb-2">
                  <figure className="mb-0 p-0">
                    <img
                      src={!_.isEmpty(user) ? user.images[0] : UserImg}
                      alt="user image"
                      width={40}
                      height={40}
                    />
                  </figure>
                  <span className="userdetails">
                    <H5>{user?.user_name || ""}</H5>
                    <SubHeading title="Member since Jan 2021" />
                  </span>
                </div>
                <div className="d-flex align-items-center mb-0 header_btn_wrap">
                  <Link href="/user/user-profile">
                    <a style={{ height: "35px" }}>View Profile</a>
                  </Link>
                  <Link href="/auth/profile?edit=true">
                    <a style={{ height: "35px" }}>Edit Profile</a>
                  </Link>
                </div>
              </div>
              <div className="verification_card_header text-center mb-3">
                <div className="d-flex align-items-center mb-0 header_btn_wrap">
                  <button
                    type="button"
                    className="d-flex align-items-center justify-content-center profile-btn"
                    onClick={() => router.push("/verified-profile")}
                  >
                    <span>
                      {user?.verified
                        ? "VERIFIED"
                        : !documentUpoaded
                        ? "VERIFY PROFILE"
                        : "PENDING"}
                    </span>
                    {user?.verified ? (
                      <HiBadgeCheck
                        color={"white"}
                        size={25}
                        style={{ paddingLeft: "5px" }}
                      />
                    ) : !documentUpoaded ? (
                      <HiBadgeCheck
                        color={"white"}
                        size={25}
                        style={{ paddingLeft: "5px" }}
                      />
                    ) : (
                      <BiTime
                        color={"white"}
                        size={25}
                        style={{ paddingLeft: "5px" }}
                      />
                    )}
                  </button>
                </div>
                <SubHeading title="Let them know you are real" />
              </div>
              {user.gender === "female" && (
                <div className="verification_card_header text-center mb-0">
                  {/* <div className="mb-1">
                                        <CustomIcon.ChampaignCaviar color={"#AFABAB"} size={50} />
                                    </div> */}
                  {/* <SubHeading title="Stay ahead of the crowd" /> */}
                  <div className="d-flex align-items-center mb-0 mt-1 header_btn_wrap">
                    <button
                      onClick={() => router.push("/create-date/choose-city")}
                      type="button"
                      className="create-date createdate-btn"
                    >
                      Create New Date
                    </button>
                  </div>
                  <SubHeading title="Stay ahead of the crowd" />
                </div>
              )}
              <div className="user-card-sidebar">
                <div
                  className="sidebar_nav_links "
                  style={{ paddingTop: "15px" }}
                >
                  <ul>
                    <li>
                      <Link href="/">
                        <a>
                          Notification <FiChevronRight size={22} />{" "}
                        </a>
                      </Link>
                    </li>
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
              <div className="bottom-footer-sidebar">
                <div className="d-flex align-items-center mb-0 header_btn_wrap log-btn login-btn">
                  <button
                    className="log-btn"
                    type="button"
                    onClick={() => {
                      dispatch(reset("signupStep2"));
                      dispatch(reset("signupStep3"));
                      dispatch(reset("DatePreview"));
                      dispatch(reset("RegisterFormMale"));
                      dispatch(reset("RegisterForm"));
                      dispatch(reset("forgotpassword"));
                      dispatch(reset("LoginForm"));
                      dispatch(reset("SecondStep"));
                      dispatch(reset("ThirdStep"));
                      dispatch(reset("CreateStepFour"));
                      dispatch(reset("CreateStepOne"));
                      dispatch(reset("CreateStepThree"));
                      dispatch(reset("CreateStepTwo"));
                      dispatch(reset("SkeletonUserProfile"));
                      dispatch(reset("Messages"));
                      dispatch(reset("VerifiedProfilePage"));
                      dispatch(reset("ChooseCity"));
                      dispatch(deAuthenticateAction());
                      window.location.reload();
                    }}
                  >
                    Log Out
                  </button>
                </div>
                <SubHeading title="SecretTime. Copywrite 2021" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default sideBarPopup;

//calc(-0.5 * var(--bs-gutter-x))
