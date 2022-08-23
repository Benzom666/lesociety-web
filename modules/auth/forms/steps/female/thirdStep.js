import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Field, reduxForm } from "redux-form";
import validate from "../../validate/validate";
import { Inputs } from "core";
import { FiArrowRight } from "react-icons/fi";
import { FiChevronLeft } from "react-icons/fi";
import { IoSync } from "react-icons/io5";
import useWindowSize from "utils/useWindowSize";
import Slider from "react-rangeslider";

const education = [
  {
    id: "1",
    name: "High school",
  },
  {
    id: "2",
    name: "College degree",
  },
  {
    id: "3",
    name: "Graduate degree",
  },
  {
    id: "4",
    name: "Master degree",
  },
  {
    id: "5",
    name: "In college",
  },
  {
    id: "6",
    name: "In university",
  },
  {
    id: "7",
    name: "Undergraduate degree",
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
    id: "1",
    name: "Administrat/Secretar",
  },
  {
    id: "2",
    name: "Student",
  },
  {
    id: "3",
    name: "Food services",
  },
  {
    id: "4",
    name: "Executive management",
  },
  {
    id: "5",
    name: "Medical/Dental",
  },
  {
    id: "6",
    name: "Teacher/Professor",
  },
  {
    id: "7",
    name: "Finance",
  },
];

const loadMoreOptions = [
  {
    id: "Legal",
    name: "Legal",
  },
  {
    id: "Labor/Contractor",
    name: "Labor/Contractor",
  },
  {
    id: "Transportation",
    name: "Transportation",
  },
  {
    id: "Political/Government",
    name: "Political/Government",
  },
  {
    id: "Retired",
    name: "Retired",
  },
  {
    id: "Sales & Marketing",
    name: "Sales & Marketing",
  },
  {
    id: "Self Employed",
    name: "Self Employed",
  },
  {
    id: "Science/Engineering",
    name: "Science/Engineering",
  },
];

const imageRequired = (value) => (!value ? "Image is required" : undefined);

const setValue = "";

const ThirdStep = (props) => {
  const [tallValue, setTallValue] = useState(10);
  const { width } = useWindowSize();
  const [tallValueUnit, setTallValueUnit] = useState(false);
  const [loadMore, setLoadMore] = useState(false);

  const handleTallValueUnit = () => {
    setTallValueUnit(!tallValueUnit);
  };

  const handleLoadMore = () => {
    occupation = occupation.concat(loadMoreOptions);
    setLoadMore(true);
  };

  const convertToFeet = (cmValue) => (cmValue * 0.0328084).toPrecision(3);

  const toFeet = (n) => {
    var realFeet = (n * 0.3937) / 12;
    var feet = Math.floor(realFeet);
    var inches = Math.round((realFeet - feet) * 12);
    return feet + "'" + inches;
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
    <form onSubmit={handleSubmit} className="almost-done-page">
      <div className="d-block d-md-none login-text mb-0">
        <a onClick={previousPage}>
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
          <h2>{user?.user_name || ""}</h2>
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
          min={0}
          handleLabel={tallValueUnit ? toFeet(tallValue) : tallValue}
          max={250}
          onChange={(val) => setTallValue(val)}
        />

        <div className="auth-radio inner-radio">
          <Field
            label="Level of education"
            name="education"
            options={education}
            value={education}
            component={Inputs.radioField}
          />
        </div>
        <div className="auth-radio inner-radio small-labels-radio">
          <Field
            label="Are you a smoker?"
            name="smoker"
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
            Next
            <FiArrowRight />
          </button>
        </div>
      </div>
    </form>
  );
};

export default reduxForm({
  form: "ThirdStep", // <------ same form name
  destroyOnUnmount: false, // <------ preserve form data
  forceUnregisterOnUnmount: true, // <------ unregister fields on unmount
  validate,
})(ThirdStep);
