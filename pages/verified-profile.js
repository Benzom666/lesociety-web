import React, { useState, useEffect, useRef } from "react";
import HeaderLoggedIn from "core/loggedInHeader";
import { IoIosArrowBack } from "react-icons/io";
import { Inputs } from "core";
import { reduxForm } from "redux-form";
import validate from "modules/auth/forms/validate/validate";
import "react-tabs/style/react-tabs.css";
import Image from "next/image";
import NoImage from "assets/img/no-image.png";
import Link from "next/link";
import { BiDotsHorizontalRounded } from "react-icons/bi";
import { FiChevronRight } from "react-icons/fi";
import withAuth from "../core/withAuth";
import io from "socket.io-client";
import { useDispatch, useSelector } from "react-redux";
import {
  apiRequest,
  apiRequestChatHistory,
  dateCategory,
  imageUploader,
} from "utils/Utilities";
import { format } from "timeago.js";
import qs from "qs";
import classNames from "classnames";

import axios from "axios";
import UserCardListForMessage from "./../core/UserCardListForMessage";
import { useRouter } from "next/router";
import useWindowSize from "utils/useWindowSize";
import { HiBadgeCheck } from "react-icons/hi";
import { FaSpinner } from "react-icons/fa";
import { Formik, Field, Form } from "formik";
import * as Yup from "yup";
import VerifiedUploadIcon from "@/modules/verifiedProfile/VerifiedUploadIcon";
import { AUTHENTICATE_UPDATE } from "@/modules/auth/actionConstants";
import { toast } from "react-toastify";
import VerifiedProfileMobileHeader from "@/core/VerifiedProfileMobileHeader";

const VerifiedProfilePage = (props) => {
  const { invalid, previousPage, pristine, reset, submitting, touched } = props;
  const [isActive, setActive] = useState(false);
  const user = useSelector((state) => state.authReducer.user);
  const { width } = useWindowSize();
  const mobile = width < 768;
  const [loading, setLoading] = useState(false);
  const [showText, setShowText] = useState(false);
  const [documentUpoaded, setDocumentUpoaded] = useState(false);
  const [error, setError] = useState("");
  const [selfie, setSelfie] = useState("");
  const [documentId, setDocumentId] = useState("");
  const dispatch = useDispatch();
  const router = useRouter();
  //  const [isUpload,setIsUpload] =useState(false);

  console.log(width);
  const selfieRef = useRef(null);
  const documentRef = useRef(null);
  useEffect(() => {
    if (user?.selfie && user?.document) {
      setDocumentUpoaded(true);
    }
  }, []);

  const handleSubmit = async (values) => {
    console.log("values", values);

    setLoading(true);
    try {
      const imageUploaded = await imageUploader([
        values.selfie,
        values.document,
      ]);
      console.log("imageUploaded", imageUploaded);

      if (imageUploaded.length > 0) {
        try {
          const data = {
            selfie: imageUploaded[0].url ?? "",
            document: imageUploaded[1].url ?? "",
            email: user.email,
          };

          const res = await apiRequest({
            data: data,
            method: "POST",
            url: `user/get-verified`,
          });
          console.log("res", res);
          setLoading(false);
          setDocumentUpoaded(true);
          if (res?.data) {
            dispatch({
              type: AUTHENTICATE_UPDATE,
              payload: {
                document: res?.data?.data?.user?.document,
                selfie: res?.data?.data?.user?.selfie,
              },
            });
            // show success message
            toast.success(
              "Your document are succesfully sumbimitted please wait for admin to verify it"
            );
            setTimeout(() => {
              router.push("/user/user-list");
            }, 5000);
          }
        } catch (err) {
          setError(err.response?.data?.message ?? "");
          setLoading(false);
          console.log("err", err);
        }
      }
    } catch (err) {
      console.log("err", err);
    }

    return;
  };

  // console.log("selfie", selfie);
  // console.log("documentId", documentId);

  return (
    <div className="inner-page">
      {width > 450 ? <HeaderLoggedIn /> : <VerifiedProfileMobileHeader />}
      <div className="inner-part-page">
        <div
          //className="d-flex justify-content-center"
          className={width > 480 && "d-flex justify-content-center"}
        >
          <Formik
            initialValues={{
              email: user?.email,
              selfie: "",
              document: "",
            }}
            validationSchema={Yup.object({})}
            onSubmit={handleSubmit}
          >
            {(formProps) => {
              return (
                <Form>
                  <div className="top-head mt-5 mb-3 text-center w-100 document-verfied">
                    <p></p>
                    {width > 450 ? (
                      <>
                        {" "}
                        <h2
                          className="mb-0"
                          style={{ fontSize: "32px", letterSpacing: "0.083px" }}
                        >
                          Verification
                        </h2>
                        <svg
                          width="86"
                          height="2"
                          viewBox="0 0 86 2"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          className="verified-under-line-size"
                        >
                          <path
                            d="M0 1H86"
                            stroke="url(#paint0_linear_1502:2374)"
                          />
                          <defs>
                            <linearGradient
                              id="paint0_linear_1502:2374"
                              x1="96.6181"
                              y1="-1.73994"
                              x2="7.45495"
                              y2="-1.73994"
                              gradientUnits="userSpaceOnUse"
                            >
                              <stop stop-color="#FA789B" stopOpacity="0.01" />
                              <stop offset="0.489981" stopColor="#F02D4E" />
                              <stop
                                offset="1"
                                stopColor="#F24362"
                                stopOpacity="0.01"
                              />
                            </linearGradient>
                          </defs>
                        </svg>
                      </>
                    ) : null}
                    <HiBadgeCheck color={"white"} size={50} className="m-4" />

                    <h3 style={{ fontSize: "35px", marginBottom: "14px" }}>
                      Get Verified
                    </h3>
                    <div className="verfied-profile-text">
                      <p className="mb-0">
                        Complete your verification to be more trusted
                      </p>
                      <p className="m-0">
                        {" "}
                        by other members. It takes just a minute!
                      </p>
                    </div>

                    <div
                      className={classNames(
                        ` ${
                          selfieRef?.current?.value
                            ? "verifieed-upload-active"
                            : "verified-upload"
                        }`,
                        width < 480 ? "verified-upload-mobile" : ""
                      )}
                      //{width > 480 && 'd-flex justify-content-center'
                      onClick={() => {
                        selfieRef?.current?.click();
                      }}
                    >
                      <input
                        className="form-control"
                        type="file"
                        accept="image/*"
                        hidden
                        ref={selfieRef}
                        onChange={(e) => {
                          formProps.setFieldValue("selfie", e.target.files);
                        }}
                        // onChange={(e) => imageChange(e, setSelfie)}
                      />

                      <div
                        className={
                          width > 450
                            ? "verified-upload-btn"
                            : "verified-upload-btn-1"
                        }
                      >
                        <VerifiedUploadIcon
                          documentUpoaded={selfieRef?.current?.value}
                        />

                        {selfieRef?.current?.value ? (
                          <p className="mb-0 document-uploaded">
                            File is successfully uploaded
                          </p>
                        ) : (
                          <p className="mb-0">Upload clear selfie</p>
                        )}
                      </div>
                    </div>
                    <div
                      className={classNames(
                        ` ${
                          documentRef?.current?.value
                            ? "verifieed-upload-active"
                            : "verified-upload-2"
                        }`,
                        width < 480 ? "verified-upload-mobile" : ""
                      )}
                      onClick={() => {
                        documentRef?.current?.click();
                      }}
                    >
                      <input
                        className="form-control"
                        type="file"
                        accept="image/*"
                        hidden
                        ref={documentRef}
                        onChange={(e) => {
                          formProps.setFieldValue("document", e.target.files);
                        }}
                        // onChange={(e) => imageChange(e, setDocumentId)}
                      />
                      <div
                        className={
                          width > 450
                            ? "verified-upload-btn"
                            : "verified-upload-btn-1"
                        }
                      >
                        <VerifiedUploadIcon
                          documentUpoaded={documentRef?.current?.value}
                        />
                        <p className="mb-0">
                          {documentRef?.current?.value ? (
                            <p className="mb-0 document-uploaded">
                              File is successfully uploaded
                            </p>
                          ) : (
                            <p className="mb-0">
                              Upload a valid passport or driver’s license
                            </p>
                          )}
                        </p>
                      </div>
                    </div>
                    <div className={width < 480 ? "verifed-btn-mobile" : ""}>
                      <div className={`secret-input type-submit`}>
                        <button
                          disabled={
                            !documentRef?.current?.value ||
                            !selfieRef?.current?.value
                          }
                          type="submit"
                          className={
                            width > 480
                              ? !documentRef?.current?.value ||
                                !selfieRef?.current?.value
                                ? "verification-type-submit gray_background"
                                : "verification-type-submit"
                              : !documentRef?.current?.value ||
                                !selfieRef?.current?.value
                              ? "mobile-verified-btn gray_background"
                              : "mobile-verified-btn"
                          }
                        >
                          {loading ? (
                            <span className="spin-loader-button"></span>
                          ) : (
                            "VERIFY"
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                  {width > 450 ? (
                    <p
                      style={{
                        textAlign: "center",
                        textDecorationLine: "underline",
                      }}
                    >
                      Maybe Later
                    </p>
                  ) : null}
                </Form>
              );
            }}
          </Formik>
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
