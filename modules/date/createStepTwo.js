import React, { useState } from "react";
import { Field, reduxForm, change } from "redux-form";
import { useSelector } from "react-redux";
import validate from "modules/auth/forms/validate/validate";
import { Inputs } from "core";
import { FiArrowRight } from "react-icons/fi";
import { IoIosClose } from "react-icons/io";
import PriceSelection from "core/priceSelection";
import useWindowSize from "utils/useWindowSize";
import ConfirmDate from "./../../modules/date/confirmDate";
import { Select } from "antd";

const education = [
  {
    id: "1",
    name: "The date is short and sweet",
    suptag: "$",
    price: "80",
  },
  {
    id: "2",
    name: "Ok, lets make some money!",
    suptag: "$",
    price: "100",
  },
  {
    id: "3",
    name: "I’m as beatiful as they come, he’ll be lucky to date me",
    suptag: "$",
    price: "125",
  },
  {
    id: "4",
    name: "I will not go on date for anything less",
    suptag: "$",
    price: "150",
  },
  {
    id: "5",
    name: "I’m drop dead gergeous. Period",
    suptag: "$",
    price: "200",
  },
  {
    id: "6",
    name: "Crème de la crème",
    suptag: "$",
    price: "250",
  },
  {
    id: "7",
    name: "Crème de la crème",
    suptag: "$",
    price: "300",
  },
  {
    id: "8",
    name: "Crème de la crème",
    suptag: "$",
    price: "350",
  },
  {
    id: "9",
    name: "Crème de la crème",
    suptag: "$",
    price: "400",
  },
  {
    id: "10",
    name: "Crème de la crème",
    suptag: "$",
    price: "450",
  },
  {
    id: "11",
    name: "Crème de la crème",
    suptag: "$",
    price: "500",
  },
];

const CreateStepTwo = (props) => {
  const {
    handleSubmit,
    previousPage,
    invalid,
    pristine,
    reset,
    submitting,
    onClose,
    confirmPopup,
  } = props;
  const state = useSelector((state) => state.form.CreateStepTwo);
  const { width } = useWindowSize();

  const [category, setCategory] = useState([
    {
      label: "category1",
      value: "category1",
    },
    {
      label: "category2",
      value: "category2",
    },
    {
      label: "category3",
      value: "category3",
    },
    {
      label: "category4",
      value: "category4",
    },
    {
      label: "category5",
      value: "category5",
    },
    {
      label: "category6",
      value: "category6",
    },
    {
      label: "category7",
      value: "category7",
    },
    {
      label: "category8",
      value: "category8",
    },
    {
      label: "category9",
      value: "category9",
    },
    {
      label: "category10",
      value: "category10",
    },
    {
      label: "category11",
      value: "category11",
    },
    {
      label: "category12",
      value: "category12",
    },
  ]);
  const [aspiration, setAspiration] = useState([
    {
      label: "aspiration1",
      value: "aspiration1",
    },
    {
      label: "aspiration2",
      value: "aspiration2",
    },
    {
      label: "aspiration3",
      value: "aspiration3",
    },
  ]);

  const categoryChange = (value) => {
    console.log("value");
  };

  // const [confirmPopup, setConfirmPopup] = useState(false);

  // const toggle = () => {
  //   setConfirmPopup(!confirmPopup);
  // };
  return (
    <>
      {!confirmPopup ? (
        <>
          <div className="inner_container">
            <div className="d-flex d-md-none justify-content-between align-items-center login-text mb-0">
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
              <h6 className="m-0 text-white-50 text-uppercase">
                Create a New Date
              </h6>

              <div onClick={onClose} className="w-15 cursor-pointer">
                <IoIosClose
                  className="mouse-point"
                  size={33}
                  style={{ color: " rgba(255, 255, 255, 0.5)" }}
                  onClick={onClose}
                />
              </div>
            </div>
            {width > 767 && (
              <div
                className="d-flex justify-content-center"
                //style={{ marginLeft: "22px" }}
              >
                <h3 className="text-center text-uppercase">
                  Create a New Date
                </h3>
                {/* <div onClick={toggle} className="w-15 cursor-pointer">
              <IoIosClose
                className="desk-close-first mouse-point"
                size={33}
                onClick={toggle}
              />
            </div> */}
              </div>
            )}
            <div
              className="step-wraps"
              //  style={{ marginLeft: "9px" }}
            >
              <ul>
                <li className="complete active">
                  <span></span>
                </li>
                <li className=" complete active">
                  <span></span>
                </li>
                <li className="active">
                  <span></span>
                </li>
                <li>
                  <span></span>
                </li>
                <li>
                  <span></span>
                </li>
                <li>
                  <span></span>
                </li>
              </ul>
            </div>
          </div>
          <>
            {" "}
            <div className="date-suggetion-text">
              <div
                className="inner_container"
                // style={{ paddingRight: "20px", paddingLeft: "20px" }}
              >
                <h6 className="price-text">Make Every Date Count</h6>
                {/* <p>
                Determine how expensive you are and please consider he’s paying
                for the <br /> outing as well
              </p> */}
                <p>
                  When a man chooses to support your dreams, it signals his
                  commitment level. Specify your goals and the contribution
                  you’d like for a fast-tracked first date.
                </p>
              </div>
            </div>
            <div className="date-class-section choose-gender">
              <form
                onSubmit={handleSubmit}
                className="inner_container"
                style={{
                  paddingRight: "30px",
                  paddingLeft: "30px",
                  paddingTop: "0px",
                }}
              >
                <div className="mb-5">
                  <div className="aspiration__main__dropdown">
                    <label htmlFor="category" className="aspiration__label1">
                      What are your life aspirations?
                    </label>
                    <label htmlFor="category" className="aspiration__label2">
                      (This selection will be locked in for 30 days)
                    </label>

                    {/* <Field
                      name="enter__category"
                      options={category}
                      component={Select}
                      onChange={(value) => categoryChange()}
                      placeholder="Select A Category"
                      className="aspiration__antd__dropdown"
                      showSearch={true}
                    /> */}
                    <Field
                      name="enter__category"
                      component={({ input, meta }) => (
                        <>
                          <Select
                            placeholder="Select A Category"
                            className="aspiration__antd__dropdown"
                            showSearch={true}
                            value={input.value}
                            onChange={(value) => input.onChange(value)}
                            validate={validate}
                            onBlur={(e) => {
                              e.preventDefault();
                            }}
                            // options={category}
                          >
                            <Option value="">Select A Category</Option>
                            {category.map((item) => (
                              <Option value={item.value}>{item.label}</Option>
                            ))}
                          </Select>
                          {meta.error && meta.touched && (
                            <span>{meta.error}</span>
                          )}
                        </>
                      )}
                    />
                    <div className="aspiration__antd__dropdown2">
                      {/* <Field
                        name="enter__aspiration"
                        component={Select}
                        placeholder="Select Your Aspiration"
                        className="aspiration__antd__dropdown"
                        options={aspiration}
                        value="aspiration1"
                        // open={true}
                        showSearch={true}
                        onChange={(value) => change(value)}
                      /> */}
                      <Field
                        name="enter__aspiration"
                        component={({ input, meta }) => (
                          <>
                            <Select
                              placeholder="Select Your Aspiration"
                              className="aspiration__antd__dropdown"
                              showSearch={true}
                              value={input.value}
                              onChange={(value) => input.onChange(value)}
                              validate={validate}
                              onBlur={(e) => {
                                e.preventDefault();
                              }}
                              options={aspiration}
                            />
                            {meta.error && meta.touched && (
                              <span>{meta.error}</span>
                            )}
                          </>
                        )}
                      />
                    </div>
                  </div>
                  <label htmlFor="category" className="price__radio__label">
                    What is your suggested contribution for a speedy first date?
                  </label>
                  <div className="auth-radio inner-radio">
                    <Field
                      // label="Level of education"
                      name="education"
                      options={education}
                      value={education}
                      component={PriceSelection}
                      onlyLabel={true}
                    />
                  </div>
                </div>
                <div
                  className="bottom-mobile register-bottom"
                  style={{ paddingTop: "0px" }}
                >
                  <div className="secret-input type-submit next-prev">
                    {!confirmPopup && (
                      <button
                        type="submit"
                        className="next"
                        disabled={!state.values?.education || invalid}
                      >
                        Next <FiArrowRight />
                      </button>
                    )}
                  </div>
                </div>
              </form>
            </div>
          </>
        </>
      ) : null}
      {/* <ConfirmDate isOpen={confirmPopup} toggle={toggle} /> */}
    </>
  );
};
export default reduxForm({
  form: "CreateStepTwo",
  destroyOnUnmount: false,
  validate,
})(CreateStepTwo);
