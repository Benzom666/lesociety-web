import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Field, reduxForm } from "redux-form";
import validate from "../validate/validate";
import { Inputs } from "core";
import { FiArrowRight } from "react-icons/fi";
import { FiChevronLeft } from "react-icons/fi";
import { IoSync } from "react-icons/io5";
import useWindowSize from "../../../../utils/useWindowSize";
import Slider from "react-rangeslider";
import { deAuthenticateAction, signupStep3 } from "../../authActions";
import { useDispatch, useSelector } from "react-redux";
import _ from "lodash";
import { useRouter } from "next/router";

const education = [
  {
    id: "High school",
    name: "High school",
  },
  {
    id: "College degree",
    name: "College degree",
  },
  {
    id: "Graduate degree",
    name: "Graduate degree",
  },
  {
    id: "Master degree",
    name: "Master degree",
  },
  {
    id: "In college",
    name: "In college",
  },
  {
    id: "In university",
    name: "In university",
  },
  {
    id: "Undergraduate",
    name: "Undergraduate",
  },
];

const smoker = [
  {
    id: "Yes",
    name: "Yes",
  },
  {
    id: "No",
    name: "No",
  },
];

let occupation = [
  {
    id: "Entrepreneur",
    name: "Entrepreneur",
  },
  {
    id: "Public Figure",
    name: "Public Figure",
  },
  {
    id: "Influencer",
    name: "Influencer",
  },
  {
    id: "Model",
    name: "Model",
  },
  {
    id: "Artist",
    name: "Artist",
  },
  {
    id: "Student",
    name: "Student",
  },
  {
    id: "Medical",
    name: "Medical",
  },
];

const loadMoreOptions = [
  {
    id: "Business",
    name: "Business",
  },
  {
    id: "Sales",
    name: "Sales",
  },
  {
    id: "Finance",
    name: "Finance",
  },
  {
    id: "Designer",
    name: "Designer",
  },
  {
    id: "Medical",
    name: "Medical",
  },
  {
    id: "Legal",
    name: "Legal",
  },
  {
    id: "Teacher",
    name: "Teacher",
  },
  {
    id: "Professor",
    name: "Professor",
  },
  {
    id: "Marketing",
    name: "Marketing",
  },
  {
    id: "Dental",
    name: "Dental",
  },
  {
    id: "Engineer",
    name: "Engineer",
  },
  {
    id: "Political",
    name: "Political",
  },
  {
    id: "Government",
    name: "Government",
  },
  {
    id: "Social Worker",
    name: "Social Worker",
  },
  {
    id: "Freelancer",
    name: "Freelancer",
  },
  {
    id: "Administrator",
    name: "Administrator",
  },
  {
    id: "Secretary",
    name: "Secretary",
  },
  {
    id: "Labor",
    name: "Labor",
  },
  {
    id: "Contractor",
    name: "Contractor",
  },
  {
    id: "Transport",
    name: "Transport",
  },
  {
    id: "Science",
    name: "Science",
  },
  {
    id: "Service",
    name: "Service",
  },
];

const ThirdStep = (props) => {
  const [tallValue, setTallValue] = useState(100);
  const { width } = useWindowSize();
  const [tallValueUnit, setTallValueUnit] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loadMore, setLoadMore] = useState(false);
  const dispatch = useDispatch();
  const router = useRouter();
  const user = useSelector((state) => state.authReducer.user);

  const handleTallValueUnit = () => {
    setTallValueUnit(!tallValueUnit);
  };

  const handleLoadMore = () => {
    occupation = occupation.concat(loadMoreOptions);
    setLoadMore(true);
  };

  const convertToFeet = (cmValue) => (cmValue * 0.0328084).toPrecision(2);

  const toFeet = (n) => {
    var realFeet = (n * 0.3937) / 12;
    var feet = Math.floor(realFeet);
    var inches = Math.round((realFeet - feet) * 12);
    return feet + "'" + inches;
  };

  useEffect(() => {
    if (user?.height) {
      const data = {
        height: user?.height,
        max_education: user?.max_education,
        is_smoker: user?.is_smoker,
        occupation: user?.occupation,
      };
      setTallValue(user?.height);
      props.initialize(data);
    }
  }, [user]);

  const onSubmit = (values) => {
    values.height = tallValue;
    values.email = user.email;
    values.step_completed = 3;
    dispatch(
      signupStep3({ ...values, isUpdate: router?.query?.edit }, setLoading)
    );
  };

  const {
    handleSubmit,
    invalid,
    previousPage,
    pristine,
    reset,
    submitting,
    touched,
  } = props;

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="almost-done-page">
      <div className="d-block d-md-none login-text mb-0">
        <a
          onClick={() => {
            previousPage();
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
      {width < 767 && (
        <div className="top-head">
          <p>More About</p>
          <h2 style={{ textTransform: "capitalize" }}>
            {user?.user_name || ""}
          </h2>
          <img src="/images/line.png" alt="line" />
        </div>
      )}
      <div className="div-wrapper">
        <h2>You’re almost done!</h2>
        <p className="auth-register-p-text">
          Please answer the final questions
        </p>
      </div>
      <div className="slider">
        <label className="slider-label">
          <span>How tall are you?</span>
          <a
            onClick={handleTallValueUnit}
            className={tallValueUnit ? "active" : ""}
          >
            <IoSync /> {tallValueUnit ? "feet" : "cm"}
          </a>
        </label>
        <Slider
          value={tallValue}
          tooltip={true}
          handleLabel={tallValueUnit ? toFeet(tallValue) : tallValue}
          min={100}
          max={250}
          onChange={(val) => setTallValue(val)}
        />

        <div className="auth-radio inner-radio">
          <Field
            label="Level of education"
            name="max_education"
            options={education}
            value={education}
            component={Inputs.radioField}
          />
        </div>
        <div className="auth-radio inner-radio small-labels-radio">
          <Field
            label="Are you a smoker?"
            name="is_smoker"
            options={smoker}
            value={smoker}
            component={Inputs.radioField}
          />
        </div>
        <div className="auth-radio inner-radio occupation-radio">
          <Field
            label="Your occupation"
            name="occupation"
            options={occupation}
            value={occupation}
            component={Inputs.radioField}
          />
          {!loadMore && (
            <a className="load-more" onClick={handleLoadMore}>
              Load more
            </a>
          )}
        </div>
      </div>
      <div className="bottom-mobile register-bottom">
        <div className="secret-input type-submit next-prev">
          <a onClick={previousPage} className="prev">
            <FiChevronLeft />
          </a>
          <button type="submit" className="next" disabled={invalid}>
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
};

export default reduxForm({
  form: "signupStep3", // <------ same form name
  destroyOnUnmount: false, // <------ preserve form data
  forceUnregisterOnUnmount: true, // <------ unregister fields on unmount
  validate,
  enableReinitialize: true,
  keepDirtyOnReinitialize: true,
})(ThirdStep);
