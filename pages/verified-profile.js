import React, { useState, useEffect, useRef } from "react";
import HeaderLoggedIn from "core/loggedInHeader";
import { Inputs } from "../core";
import { Field, reduxForm } from "redux-form";
import validate from "modules/auth/forms/validate/validate";
import "react-tabs/style/react-tabs.css";
import Image from "next/image";
import NoImage from "assets/img/no-image.png";
import Link from "next/link";
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

const VerifiedProfilePage = (props) => {
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

  return (
    <div className="inner-page">
      <HeaderLoggedIn />
      <div className="inner-part-page">
        <div className="">
          <form>
            <div className="container">
              <div className="auth-section verified-profile-logo">
                <h3>Verification</h3>
                <img src="/images/line.png" alt="line" className="" />
                <h4>Get Verified</h4>

                <p>
                  Complete your verification to be more trusted by other
                  members. It takes just a minute!
                </p>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default reduxForm({
  form: "VerifiedProfilePage", // <------ same form name
  destroyOnUnmount: false, // <------ preserve form data
  forceUnregisterOnUnmount: true, // <------ unregister fields on unmount
  validate,
})(withAuth(VerifiedProfilePage));
