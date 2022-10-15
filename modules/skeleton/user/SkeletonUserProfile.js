import React from "react";
import HeaderLoggedIn from "core/loggedInHeader";
import { useSelector } from "react-redux";

import { reduxForm } from "redux-form";
import validate from "modules/auth/forms/validate/validate";
import useWindowSize from "utils/useWindowSize";

import { useEffect } from "react";
import { useRouter } from "next/router";
import { apiRequest } from "utils/Utilities";
import SkeletonElement from "../SkeletonElement";
import Shimmer from "../Shimmer";

function SkeletonUserProfile({ preview, editHandle, theme }) {
  const { width } = useWindowSize();
  const [userDetail, setUserDetail] = React.useState("");
  const [userDates, setUserDates] = React.useState([]);
  const user = useSelector((state) => state.authReducer.user);
  const router = useRouter();
  const themeClass = theme || "dark";

  const fetchDates = async (userName) => {
    try {
      const res = await apiRequest({
        url: "date",
        params: {
          user_name: userName,
        },
      });
      setUserDates(res?.data?.data?.dates);
    } catch (err) {
      setUserDates([]);
    }
  };

  const fetchUserDetails = async (userName) => {
    try {
      const res = await apiRequest({
        url: `user/user-by-name?user_name=${userName}`,
      });
      if (res?.data?.data?.user) {
        setUserDetail(res?.data?.data?.user);
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    if (router?.query?.userName) {
      fetchUserDetails(router?.query?.userName);
      fetchDates(router?.query?.userName);
    }
    return () => {
      setUserDetail("");
      setUserDates([]);
    };
  }, [router?.query]);

  useEffect(() => {
    if (
      user?.gender === "female" &&
      user?.user_name &&
      !router?.query?.userName
    ) {
      fetchDates(user?.user_name);
    }
    return () => {
      setUserDetail("");
      setUserDates([]);
    };
  }, []);

  return (
    <div className={`inner-page `}>
      {!preview && <HeaderLoggedIn />}
      <div className="inner-part-page">
        <div
          className={`top-spase pb-0 pt-5-lg-4 pb-5-lg-4 ${
            preview ? "space-top" : ""
          }`}
        >
          <div className="container user_profile_page skeleton-wrapper">
            <div className="row">
              <div className="col-md-2"></div>
              <div className="col-md-8">
                <div className="row pt-2 pt-md-5">
                  <div className="col-xl-4 col-lg-5 col-md-12 col-12">
                    {width > 991 && (
                      <figure className="user_img_profile">
                        <div className="big-image">
                          <label>
                            <div className="pos-relative">
                              {/* <Shimmer /> */}

                              <SkeletonElement type="image-300h-240w" />
                              {user?.documents_verified && (
                                <span className="verified_check_tag">
                                  <SkeletonElement type="verified-icon" />
                                </span>
                              )}
                            </div>
                          </label>
                        </div>
                      </figure>
                    )}
                  </div>
                  <div className="col-xl-8 col-lg-7 col-md-12 col-12 padd0-responsive">
                    <div className="userdetails resposnive-data-profile">
                      <h4
                        className={
                          width < 768 && "d-flex justify-content-center"
                        }
                      >
                        <SkeletonElement type="edit-profile-h4" />
                      </h4>

                      <div
                        className={
                          width < 768 && "d-flex justify-content-center"
                        }
                      >
                        <SkeletonElement type="edit-profile-h4" />
                      </div>
                      <div className="user-images-wrap mt-3 mt-lg-4 user_img_profile">
                        <figure className="user_img_profile show-responsive_div pt-2 pt-lg-3">
                          <div className="big-image">
                            <label>
                              <>
                                <div className="pos-relative">
                                  <SkeletonElement type="image-350h-350w" />
                                </div>
                              </>
                            </label>
                          </div>
                        </figure>
                        {width > 991 && (
                          <SkeletonElement type="edit-profile-h4" />
                        )}
                        <div className="image_wrap_slider pt-3 pb-4">
                          <figure>
                            <SkeletonElement type="image-160h-150w" />
                          </figure>
                          <figure>
                            <SkeletonElement type="image-160h-150w" />
                          </figure>
                          <figure>
                            <SkeletonElement type="image-160h-150w" />
                          </figure>
                        </div>
                        <>
                          <h4 className="mb-5 mt-4 text-center tagline-font  word-break: break-word">
                            <SkeletonElement type="edit-profile-tagline" />
                          </h4>

                          {!preview && user?.gender === "female" && (
                            <>
                              <SkeletonElement type="available-label" />

                              <div className="verification_card_header text-center mb-5 mt-4">
                                {/* {userDates.length > 0
                                  ? userDates.map((date) => {
                                      const category = dateCategory.find(
                                        (item) =>
                                          item?.label ===
                                            date?.standard_class_date ||
                                          item?.label ===
                                            date?.middle_class_dates ||
                                          item?.label ===
                                            date?.executive_class_dates
                                      );
                                      return (
                                        <div
                                          className="availabe_card_inner mr-3"
                                          onClick={() => {
                                            if (!router?.query?.userName) {
                                              setSelectedDate(date);
                                              dateModalIsOpen();
                                            }
                                          }}
                                        >
                                          <ul className="date_list">
                                            <li>
                                              <span className="icon_wrap">
                                                {category?.icon}
                                              </span>
                                              <p>{category?.label}</p>
                                            </li>
                                            <span className="top-card_tag">
                                              <span className="top-badge"></span>
                                              <div className="price-card-name">
                                                <span>${date?.price}</span>
                                                <span className="hour">
                                                  <span>
                                                    {date?.date_length.replace(
                                                      "H",
                                                      ""
                                                    )}
                                                    H
                                                  </span>
                                                </span>
                                              </div>
                                            </span>
                                          </ul>
                                        </div>
                                      );
                                    })
                                  : null} */}
                                {/* </div> */}

                                <div className="d-flex align-items-center mb-0 mt-4 header_btn_wrap">
                                  <SkeletonElement type="create-date-button" />
                                </div>
                              </div>
                            </>
                          )}
                        </>
                        <SkeletonElement type="available-label" />

                        <div className="image_wrap_slider about_me_card">
                          <div className="about_me_card_inner">
                            <SkeletonElement type="inner-box-me" />
                          </div>
                          <div className="about_me_card_inner">
                            <SkeletonElement type="inner-box-me" />
                          </div>
                          <div className="about_me_card_inner">
                            <SkeletonElement type="inner-box-me" />
                          </div>
                          <div className="about_me_card_inner">
                            <SkeletonElement type="inner-box-me" />
                          </div>
                          <div className="about_me_card_inner">
                            <SkeletonElement type="inner-box-me" />
                          </div>
                          <div className="about_me_card_inner">
                            <SkeletonElement type="inner-box-me" />
                          </div>
                        </div>
                        <div className="more_content pt-3">
                          <div className="text-left-more">
                            <SkeletonElement type="available-label" />

                            {/* <svg
                              className="d-none"
                              width="60"
                              height="2"
                              viewBox="0 0 95 2"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M0.110596 1.36728H94.3167"
                                stroke="url(#paint0_linear)"
                              ></path>
                              <defs>
                                <linearGradient
                                  id="paint0_linear"
                                  x1="105.948"
                                  y1="-1.61543"
                                  x2="8.2769"
                                  y2="-1.61543"
                                  gradientUnits="userSpaceOnUse"
                                >
                                  <stop
                                    stop-color="#FA789B"
                                    stop-opacity="0.01"
                                  ></stop>
                                  <stop
                                    offset="0.489981"
                                    stop-color="#F02D4E"
                                  ></stop>
                                  <stop
                                    offset="1"
                                    stop-color="#F24362"
                                    stop-opacity="0.01"
                                  ></stop>
                                </linearGradient>
                              </defs>
                            </svg> */}
                            <SkeletonElement type="view-profile-p" />

                            {preview && (
                              <div className="button-wrapper profile-btn">
                                <SkeletonElement type="profile-edit-button" />
                                <SkeletonElement type="profile-finish-button" />
                                {/* <button
                                  type="button"
                                  className="edit"
                                  onClick={editHandle}
                                >
                                  <a>Edit</a>
                                </button>
                                <button className="next" onClick={onSubmit}>
                                  {loading ? (
                                    <span className="spin-loader-button"></span>
                                  ) : (
                                    "Finish"
                                  )}
                                </button> */}
                              </div>
                            )}

                            <SkeletonElement type="create-date-button" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-2"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default reduxForm({
  form: "SkeletonUserProfile", // <------ same form name
  destroyOnUnmount: false, // <------ preserve form data
  forceUnregisterOnUnmount: true, // <------ unregister fields on unmount
  validate,
})(SkeletonUserProfile);
