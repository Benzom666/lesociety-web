import React, { useState, useEffect } from "react";
import { Field, reduxForm, change } from "redux-form";
import validate from "../validate/validate";
import { Inputs } from "core";
import { FiArrowRight } from "react-icons/fi";
import { FiPlus } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { deAuthenticateAction, signupStep2 } from "../../authActions";
import { imageUploader } from "../../../../utils/Utilities";
import { useRouter } from "next/router";
import FemaleSkeletonSecondStep from "../../../skeleton/Auth/FemaleSkeletonSecondStep";
import { reset } from "redux-form";

const SecondStep = (props) => {
  const [loading, setLoader] = useState(false);
  const [pageLoading, setPageLoading] = useState(true);
  const [isImageValid, setImageError] = useState(false);
  const [dimensionValid, setDimensionValid] = useState({ height: 0, width: 0 });
  const [isImageTouched, setImageTouched] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch();

  const user = useSelector((state) => state.authReducer.user);

  useEffect(() => {
    if (user?.tagline) {
      const data = {
        tagline: user?.tagline,
        description: user?.description,
        imageUpload: user?.images.length > 0 && user?.images[0],
        imageUpload2: user?.images.length > 0 && user?.images[1],
        imageUpload3: user?.images.length > 0 && user?.images[2],
        imageUpload4: user?.images.length > 0 && user?.images[3],
      };
      props.initialize(data);
    }
  }, [user]);

  const onSubmit = async (values) => {
    console.log("values", values);
    try {
      setLoader(true);
      const imageUploaded = await imageUploader([
        values.imageUpload?.length > 0 ? values?.imageUpload : user?.images[0],
        values.imageUpload2?.length > 0 ? values.imageUpload2 : user?.images[1],
        values.imageUpload3?.length > 0 ? values.imageUpload3 : user?.images[2],
        values.imageUpload4?.length > 0 ? values.imageUpload4 : user?.images[3],
      ]);
      if (imageUploaded) {
        // values.un_verified_images = imageUploaded.map((image) => image?.url);
        values.images = imageUploaded.map((image) => image?.url);
        values.email = user.email;
        // if(!router?.query?.edit) {
        values.step_completed = 2;
        // }
        const formData = new FormData();
        Object.keys(values).forEach((key) => {
          formData.append(key, values[key]);
        });

        dispatch(
          signupStep2({ ...values, isUpdate: router?.query?.edit }, setLoader)
        );
      }
    } catch (err) {
      setLoader(false);
    }
  };

  // const onSubmit = async (values) => {
  //   console.log("values", values);
  //   try {
  //     setLoader(true);
  //     // const imageUploaded = await imageUploader([
  //     //   values.imageUpload?.length > 0 ? values?.imageUpload : user?.images[0],
  //     //   values.imageUpload2?.length > 0 ? values.imageUpload2 : user?.images[1],
  //     //   values.imageUpload3?.length > 0 ? values.imageUpload3 : user?.images[2],
  //     //   values.imageUpload4?.length > 0 ? values.imageUpload4 : user?.images[3],
  //     // ]);

  //     const verifiedImageUploaded = await imageUploader([
  //       user?.images[0],
  //       user?.images[1],
  //       user?.images[2],
  //       user?.images[3],
  //     ]);

  //     const unverifiedImageUploaded = await imageUploader([
  //       values.imageUpload?.length > 0 ? values?.imageUpload : "",
  //       values.imageUpload2?.length > 0 ? values.imageUpload2 : "",
  //       values.imageUpload3?.length > 0 ? values.imageUpload3 : "",
  //       values.imageUpload4?.length > 0 ? values.imageUpload4 : "",
  //     ]);

  //     if (verifiedImageUploaded || unverifiedImageUploaded) {
  //       values.un_verified_images = unverifiedImageUploaded.map(
  //         (image) => image?.url
  //       );
  //       values.images = verifiedImageUploaded.map((image) => image?.url);
  //       // values.email = user.email;
  //       // values.step_completed = 2;

  //       // write compare function to compare the images ?

  //       let data;

  //       // if edit is true and values are not changed

  //       if (router.query.edit) {
  //         data = {
  //           tagline: user?.tagline,
  //           description: user?.description,
  //           images: user?.images,
  //           un_verified_images:
  //             (values.imageUpload?.length > 0 &&
  //               values?.imageUpload !== user?.images[0]) ||
  //             (values.imageUpload2?.length > 0 &&
  //               values.imageUpload2 !== user?.images[1]) ||
  //             (values.imageUpload3?.length > 0 &&
  //               values.imageUpload3 !== user?.images[2]) ||
  //             (values.imageUpload4?.length > 0 &&
  //               values.imageUpload4 !== user?.images[3])
  //               ? values.un_verified_images
  //               : [],
  //           un_verified_tagline:
  //             values.tagline !== user?.tagline ? values.tagline : "",
  //           un_verified_description:
  //             values.description !== user?.description
  //               ? values.description
  //               : "",
  //           email: user.email,
  //           step_completed: 2,
  //         };
  //       } else {
  //         data = {
  //           description: values?.description,
  //           tagline: values?.tagline,
  //           images: values.images,
  //           step_completed: 2,
  //           email: user?.email,
  //         };
  //       }

  //       const formData = new FormData();
  //       Object.keys(data).forEach((key) => {
  //         formData.append(key, data[key]);
  //       });

  //       console.log("data", data);

  //       dispatch(
  //         signupStep2({ ...data, isUpdate: router?.query?.edit }, setLoader)
  //       );
  //     }
  //   } catch (err) {
  //     setLoader(false);
  //   }
  // };

  const validateImageDimension = (event, ht, wd, key) => {
    const reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);
    reader.onload = function (e) {
      //Initiate the JavaScript Image object.
      const image = new Image();

      //Set the Base64 string return from FileReader as source.
      image.src = e.target.result;

      //Validate the File Height and Width.
      image.onload = function () {
        if (this.height >= ht && this.width >= wd) {
          setImageError(false);
          setImageTouched(true);
          setDimensionValid({ height: 0, width: 0 });
          if (event.target.files?.length > 0) {
            dispatch(change(key, event.target.files[0]));
          }
        } else {
          setTimeout(() => {
            props.change(key, "");
          }, 20);
          setImageError(true);
          setDimensionValid({ height: ht, width: wd });
          setImageTouched(true);
        }
      };
    };
  };

  useEffect(() => {
    setTimeout(() => {
      if (
        (router?.query?.edit && user?.images && user?.images[0]) ||
        props.fromRegistration
      ) {
        setPageLoading(false);
      }
    }, 4000);
  }, []);

  const { handleSubmit, invalid, previousPage } = props;

  const reduxValues = useSelector((state) => state.form.signupStep2.values);

  const imageValidation =
    reduxValues?.imageUpload?.length > 0 &&
    reduxValues?.imageUpload2?.length > 0 &&
    reduxValues?.imageUpload3?.length > 0 &&
    reduxValues?.imageUpload4?.length > 0;

  // console.log("imageValidation", imageValidation);

  if (pageLoading) {
    return <FemaleSkeletonSecondStep />;
  } else {
    return (
      <form
        className="upload-pics"
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit(onSubmit(reduxValues));
        }}
      >
        <div className="d-block d-md-none login-text mb-0">
          <a
            onClick={() => {
              if (router?.query?.edit) {
                return router.back();
              } else {
                dispatch(reset("signupStep2"));
                dispatch(reset("DatePreview"));
                dispatch(reset("RegisterFormMale"));
                dispatch(reset("signupStep3"));
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
                router.push("/auth/login");
                // window.location.reload();
              }
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="feather feather-chevron-left"
            >
              <polyline points="15 18 9 12 15 6"></polyline>
            </svg>
          </a>
          {/* <span>
            LADIES
            <img src="/images/line.png" alt="line" />
          </span> */}
        </div>
        <span className="completion-sign">
          {/* <svg
            viewBox="0 0 26 26"
            xmlns="http://www.w3.org/2000/svg"
            className="success_svg"
          >
            <g
              stroke="currentColor"
              stroke-width="2"
              fill="none"
              fill-rule="evenodd"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path
                class="circle"
                d="M13 1C6.372583 1 1 6.372583 1 13s5.372583 12 12 12 12-5.372583 12-12S19.627417 1 13 1z"
              />
              <path class="tick" d="M6.5 13.5L10 17 l8.808621-8.308621" />
            </g>
          </svg> */}

          {!router?.query?.edit && (
            <svg
              width="55"
              height="49"
              viewBox="0 0 55 49"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="success_svg"
            >
              <path
                d="M13 20C13 20 16.2474 22.9845 18 25C19.7526 27.0155 23 31.5 23 31.5C23 31.5 30.2048 20.8885 36 15.5C41.7952 10.1115 51.5 5 51.5 5"
                stroke="white"
                stroke-width="5.5"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="circle"
              />
              <rect width="49" height="49" rx="16" fill="currentColor" />
              <mask
                id="mask0_2_1437"
                style={{ maskType: "alpha" }}
                maskUnits="userSpaceOnUse"
                x="0"
                y="0"
                width="49"
                height="49"
              >
                <rect width="49" height="49" rx="16" fill="currentColor" />
              </mask>
              <g mask="url(#mask0_2_1437)">
                <path
                  d="M14 20C14 20 17.2474 22.9845 19 25C20.7526 27.0155 24 31.5 24 31.5C24 31.5 31.2048 20.8885 37 15.5C42.7952 10.1115 52.5 5 52.5 5"
                  stroke="white"
                  stroke-width="5.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  class="circle"
                />
              </g>
            </svg>
          )}
        </span>
        {!router?.query?.edit && (
          <>
            <p className="auth-register-p-text">Registration Completed</p>
            <h2 style={{ textTransform: "capitalize" }}>
              Welcome, {user?.user_name || ""}
            </h2>
          </>
        )}
        {router?.query?.edit && (
          <h2 style={{ textTransform: "capitalize" }}>
            Edit Profile, {user?.user_name || ""}
          </h2>
        )}
        <div className="text-center">
          <svg
            width="86"
            height="2"
            viewBox="0 0 86 2"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M0 1H86" stroke="url(#paint0_linear_340_3843)" />
            <defs>
              <linearGradient
                id="paint0_linear_340_3843"
                x1="86"
                y1="-2.65326"
                x2="-7.09342e-05"
                y2="-2.56604"
                gradientUnits="userSpaceOnUse"
              >
                <stop stop-color="#FA789B" stop-opacity="0.01" />
                <stop offset="0.489981" stop-color="#F02D4E" />
                <stop offset="1" stop-color="#F24362" stop-opacity="0.01" />
              </linearGradient>
            </defs>
          </svg>
        </div>
        <div className="text-label">
          Please continue with your profile <br />
          to maximize your opportunity
        </div>
        <div className="images-uploads">
          <div className="big-image">
            <label>
              <Field
                name="imageUpload"
                component={Inputs.uploadFileField}
                type="file"
                accept="image/*"
                onChange={(event) => {
                  if (
                    !event.target.files[0]?.name.match(/\.(jpg|jpeg|png|gif)$/)
                  ) {
                    setImageError(true);
                    event.preventDefault();
                  } else {
                    validateImageDimension(event, 350, 350, "imageUpload");
                  }
                }}
              />
              {reduxValues?.imageUpload?.length > 0 ||
              (user?.images && user?.images[0]) ? (
                <img
                  alt="not fount"
                  style={{ objectFit: "cover" }}
                  width={"250px"}
                  src={
                    typeof reduxValues?.imageUpload === "string"
                      ? reduxValues?.imageUpload
                      : reduxValues?.imageUpload?.length > 0
                      ? URL.createObjectURL(reduxValues?.imageUpload[0])
                      : user.images[0]
                  }
                />
              ) : (
                <>
                  <FiPlus />
                  <svg
                    className="dahsed-border"
                    width="424"
                    height="429"
                    viewBox="0 0 424 429"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <rect
                      x="1.75789"
                      y="2.5721"
                      width="420.485"
                      height="423.814"
                      rx="47.4566"
                      stroke="#DDDDDD"
                      strokeWidth="3.5153"
                      strokeDasharray="35.15"
                    />
                  </svg>
                </>
              )}
            </label>
          </div>
          <div className="small-images big-image">
            <div>
              <label>
                <Field
                  name="imageUpload2"
                  component={Inputs.uploadFileField}
                  type="file"
                  accept="image/*"
                  onChange={(event) => {
                    if (
                      !event.target.files[0]?.name.match(
                        /\.(jpg|jpeg|png|gif)$/
                      )
                    ) {
                      setImageError(true);
                      event.preventDefault();
                    } else {
                      validateImageDimension(event, 200, 200, "imageUpload2");
                    }
                  }}
                />
                {reduxValues?.imageUpload2?.length > 0 ||
                (user?.images && user?.images[1]) ? (
                  <img
                    alt="not fount"
                    style={{ objectFit: "cover" }}
                    width={"250px"}
                    src={
                      typeof reduxValues?.imageUpload2 === "string"
                        ? reduxValues?.imageUpload2
                        : reduxValues?.imageUpload2?.length > 0
                        ? URL.createObjectURL(reduxValues?.imageUpload2[0])
                        : user?.images[1]
                    }
                  />
                ) : (
                  <>
                    <FiPlus />
                    <svg
                      className="dahsed-border"
                      width="424"
                      height="429"
                      viewBox="0 0 424 429"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <rect
                        x="1.75789"
                        y="2.5721"
                        width="420.485"
                        height="423.814"
                        rx="47.4566"
                        stroke="#DDDDDD"
                        strokeWidth="3.5153"
                        strokeDasharray="35.15"
                      />
                    </svg>
                  </>
                )}
              </label>
            </div>
            <div>
              <label>
                <Field
                  name="imageUpload3"
                  component={Inputs.uploadFileField}
                  type="file"
                  accept="image/*"
                  onChange={(event) => {
                    if (
                      !event.target.files[0]?.name.match(
                        /\.(jpg|jpeg|png|gif)$/
                      )
                    ) {
                      setImageError(true);
                      event.preventDefault();
                    } else {
                      validateImageDimension(event, 200, 200, "imageUpload3");
                    }
                  }}
                />
                {reduxValues?.imageUpload3?.length > 0 ||
                (user?.images && user.images[2]) ? (
                  <img
                    alt="not fount"
                    style={{ objectFit: "cover" }}
                    width={"250px"}
                    src={
                      typeof reduxValues?.imageUpload3 === "string"
                        ? reduxValues?.imageUpload3
                        : reduxValues?.imageUpload3?.length > 0
                        ? URL.createObjectURL(reduxValues?.imageUpload3[0])
                        : user?.images[2]
                    }
                  />
                ) : (
                  <>
                    <FiPlus />
                    <svg
                      className="dahsed-border"
                      width="424"
                      height="429"
                      viewBox="0 0 424 429"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <rect
                        x="1.75789"
                        y="2.5721"
                        width="420.485"
                        height="423.814"
                        rx="47.4566"
                        stroke="#DDDDDD"
                        strokeWidth="3.5153"
                        strokeDasharray="35.15"
                      />
                    </svg>
                  </>
                )}
              </label>
            </div>
            <div>
              <label>
                <Field
                  name="imageUpload4"
                  component={Inputs.uploadFileField}
                  type="file"
                  accept="image/*"
                  onChange={(event) => {
                    if (
                      !event.target.files[0]?.name.match(
                        /\.(jpg|jpeg|png|gif)$/
                      )
                    ) {
                      setImageError(true);
                      event.preventDefault();
                    } else {
                      validateImageDimension(event, 200, 200, "imageUpload4");
                    }
                  }}
                />
                {reduxValues?.imageUpload4?.length > 0 ||
                (user?.images && user.images[3]) ? (
                  <img
                    alt="not fount"
                    style={{ objectFit: "cover" }}
                    width={"250px"}
                    src={
                      typeof reduxValues?.imageUpload4 === "string"
                        ? reduxValues?.imageUpload4
                        : reduxValues?.imageUpload4?.length > 0
                        ? URL.createObjectURL(reduxValues?.imageUpload4[0])
                        : user?.images[3]
                    }
                  />
                ) : (
                  <>
                    <FiPlus />
                    <svg
                      className="dahsed-border"
                      width="424"
                      height="429"
                      viewBox="0 0 424 429"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <rect
                        x="1.75789"
                        y="2.5721"
                        width="420.485"
                        height="423.814"
                        rx="47.4566"
                        stroke="#DDDDDD"
                        strokeWidth="3.5153"
                        strokeDasharray="35.15"
                      />
                    </svg>
                  </>
                )}
              </label>
            </div>
          </div>
          {isImageTouched &&
            (dimensionValid?.height ? (
              <span className="error">
                Image should be greater than {dimensionValid?.height}*
                {dimensionValid?.width}
              </span>
            ) : !reduxValues?.imageUpload?.length > 0 ||
              !reduxValues?.imageUpload2?.length > 0 ||
              !reduxValues?.imageUpload3?.length > 0 ||
              !reduxValues?.imageUpload4?.length > 0 ? (
              <span className="error">* Upload at least 4 photos</span>
            ) : isImageValid ? (
              "Please Select Image Only"
            ) : (
              ""
            ))}
          <Field
            name="tagline"
            component={Inputs.inputField}
            type="text"
            label="Your tagline"
            placeholder="Write a few words to tempt"
            validationLength={100}
          />
          <div className="offer-textarea">
            <Field
              name="description"
              component={Inputs.textarea}
              type="text"
              label="What do you offer?"
              placeholder="Describe yourself, and explain why someone should want to take you out as their date "
              validationLength={500}
            />
          </div>
        </div>
        <div className="bottom-mobile register-bottom">
          <div className="secret-input type-submit next-prev">
            {/* <a onClick={previousPage} className="prev">
                       <FiChevronLeft />
                     </a> */}
            <button
              type="submit"
              className="next"
              disabled={invalid || !imageValidation}
            >
              {loading ? (
                <span className="spin-loader-button"></span>
              ) : (
                <>
                  Next
                  <FiArrowRight />
                </>
              )}
            </button>
          </div>
        </div>
      </form>
    );
  }
};

export default reduxForm({
  form: "signupStep2", // <------ same form name
  destroyOnUnmount: false, // <------ preserve form data
  forceUnregisterOnUnmount: true, // <------ unregister fields on unmount
  enableReinitialize: true,
  keepDirtyOnReinitialize: true,
  validate,
})(SecondStep);
