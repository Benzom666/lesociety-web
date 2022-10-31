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
import { deAuthenticateAction, logout } from "../modules/auth/authActions";
import { useRouter } from "next/router";
import _ from "lodash";
import { BiTime } from "react-icons/bi";
import { reset } from "redux-form";

export default function SideBar() {
  const user = useSelector((state) => state.authReducer.user);
  const formValue = useSelector((state) => state.form);
  const dispatch = useDispatch();
  const router = useRouter();
  const [documentUpoaded, setDocumentUpoaded] = useState(false);

  console.log("formValue", formValue);
  useEffect(() => {
    if (user?.selfie && user?.document) {
      setDocumentUpoaded(true);
    }
  }, [user]);
  return (
    <>
      <div className="sidebar_wrap">
        <div className="user-card-sidebar">
          <div className="d-flex align-items-center mb-4">
            <figure className="mb-0 p-0">
              <img
                src={!_.isEmpty(user) ? user.images[0] : UserImg}
                alt="user image"
                width={50}
                height={50}
              />
            </figure>
            <span className="userdetails">
              <H5>{user?.user_name || ""}</H5>
              <SubHeading title="Member since Jan 2021" />
            </span>
          </div>
          <div className="d-flex align-items-center mb-0 header_btn_wrap">
            <Link href="/user/user-profile">
              <a>View Profile</a>
            </Link>
            <Link href="/auth/profile?edit=true">
              <a>Edit Profile</a>
            </Link>
          </div>
        </div>
        <div className="verification_card_header text-center mb-3">
          <div className="mb-5">
            {/* <HiBadgeCheck color={"white"} size={50} /> */}
          </div>
          <div className="d-flex align-items-center mb-0 header_btn_wrap">
            <button
              type="button"
              style={{ marginTop: "-42px" }}
              className="d-flex align-items-center justify-content-center"
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
          <div className="verification_card_header text-center mb-2">
            {/* <div className="mb-2">
              <CustomIcon.ChampaignCaviar color={"#AFABAB"} size={50} />
            </div> */}
            {/* <SubHeading title="Stay ahead of the crowd" /> */}
            <div className="d-flex align-items-center mb-0 mt-3 header_btn_wrap">
              <button
                onClick={() => router.push("/create-date/choose-city")}
                type="button"
                className="create-date"
              >
                Create New Date
              </button>
            </div>
            <SubHeading title="Stay ahead of the crowd" />
          </div>
        )}
        <div className="user-card-sidebar">
          <div className="sidebar_nav_links">
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
          <div className="d-flex align-items-center mb-0 header_btn_wrap log-btn">
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
                // router.push("/auth/login");
                // refresh page
              }}
            >
              Log Out
            </button>
          </div>
          <SubHeading title="SecretTime. Copywrite 2021" />
        </div>
      </div>
    </>
  );
}
