import React, { useState } from "react";
import { Field, reduxForm } from "redux-form";
import { Inputs } from "core";
import { FiArrowRight } from "react-icons/fi";
import { useSelector } from "react-redux";
import validate from "modules/auth/forms/validate/validate";
import { CustomIcon } from "core/icon";
import { useRouter } from "next/router";
import useWindowSize from "utils/useWindowSize";
import { IoIosClose } from "react-icons/io";
import { apiRequest } from "utils/Utilities";
import ConfirmDate from "./../../modules/date/confirmDate";

const CreateStepFour = (props) => {
  const {
    handleSubmit,
    previousPage,
    invalid,
    pristine,
    reset,
    submitting,
    onClose,
  } = props;
  const state = useSelector((state) => state?.form?.CreateStepFour);
  const router = useRouter();
  const [loader, setLoader] = useState(false);
  const user = useSelector((state) => state?.authReducer.user);
  const cityState = useSelector((state) => state?.form?.ChooseCity?.values);
  const dateSuggestion = useSelector(
    (state) => state?.form?.CreateStepOne?.values
  );
  const priceState = useSelector((state) => state?.form?.CreateStepTwo?.values);
  const timeState = useSelector(
    (state) => state?.form?.CreateStepThree?.values
  );
  const dateDescription = useSelector(
    (state) => state?.form?.CreateStepFour?.values
  );

  const postDate = async () => {
    setLoader(true);
    const data = {
      location: cityState?.enter_city?.name,
      country_code: cityState?.enter_country?.value,
      country: cityState?.enter_country?.label,
      province: cityState?.enter_city?.province[0]?.short_code?.split("-")[1]
        ? cityState?.enter_city?.province[0]?.short_code?.split("-")[1]
        : cityState?.enter_city?.province[0]?.short_code,
      [dateSuggestion?.search_type?.category]:
        dateSuggestion?.search_type?.label,
      date_length: timeState?.education,
      price: priceState?.education,
      date_details: dateDescription?.date_description,
      user_name: user?.user_name,
      date_status: false,
      isUpdate: router?.query?.edit ? Boolean(router?.query.edit) : undefined,
    };

    try {
      const res = await apiRequest({
        method: "POST",
        url: `/date`,
        data: data,
      });
      setLoader(false);
    } catch (e) {
      setLoader(false);
    }
  };

  const { width } = useWindowSize();
  const [confirmPopup, setConfirmPopup] = useState(false);

  const toggle = () => {
    setConfirmPopup(!confirmPopup);
  };
  return (
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
          <h6 className="m-0 text-white-50">Create a New Date</h6>
          <IoIosClose className="mouse-point" size={32} onClick={toggle} />
        </div>
        {width > 767 && (
          <div className="d-flex justify-content-center" style={{marginLeft:"28px"}}>
            <h3 className="text-center text-uppercase">Create a New Date</h3>
            <IoIosClose
              className="desk-close-icon mouse-point"
              size={32}
              onClick={toggle}
            />
          </div>
        )}
        <div
          className="step-wraps"
          // style={{ marginLeft: "10px" }}
        >
          <ul>
            <li className="complete active">
              <span></span>
            </li>
            <li className="complete active">
              <span></span>
            </li>
            <li className="complete active">
              <span></span>
            </li>
            <li className="complete active">
              <span></span>
            </li>
          </ul>
        </div>
      </div>
    {!confirmPopup ? <>  <div className="date-suggetion-text">
        <div
          className="inner_container"
          style={{ paddingRight: "35px", paddingLeft: "35px" }}
        >
          <h6>Describe Date Details</h6>
          <p>
            Write about your date suggestions in more detail and why someone
            should select you as their date
          </p>
        </div>
      </div> 
      <form
        onSubmit={handleSubmit}
        className="date-class-section choose-gender"
        style={{ paddingRight: "10px", paddingLeft: "10px" }}
      >
        <div className="inner_container">
          <div className="mb-5 date-description">
            <Field
              name="date_description"
              type="text"
              validationLength={500}
              component={Inputs.textarea}
              label="Describe_Date_Details"
              placeholder="Write details here (expectations, itinerary, rules, etc.)"
            />
          </div>
        </div>
        {/* {width > 767 && (
                    <div className="date-suggetion-text mb-5">
                        <div className="inner_container">
                            <h6>Want To Offer <br /> A Free Date To Mr. Right?</h6>
                            <p>How much money does he need to be making per year for you to offer a free date?</p>   
                        </div>
                    </div>
                 )}    */}
        <div className="inner_container">
          {width > 767 && (
            <>
              {/* <div className="mb-4">
                                <div className="secret-input type-text select-wrap-icon">
                                    <select className="form-control">
                                        <option>Minimum yearly income</option>
                                        <option>Minimum yearly income</option>
                                        <option>Minimum yearly income</option>
                                        <option>Minimum yearly income</option>
                                    </select>
                                </div>    
                            </div> */}
              {/* <div className="mb-5">
                                <Field
                                    name="education"
                                    options={education_plan}
                                    value={education_plan}
                                    component={Inputs.checkboxField}
                                />
                            </div> */}
              <div className="mb-2 text-center">
                <CustomIcon.Diamond color={"#fff"} size={120} />
              </div>
            </>
          )}
          <div className="mb-8 bottom-content text-center">
            <p>
              Thank you for being one of our early adopters! To show you our
              appreciation, we will keep your posts active until you delete it.
              This allows you to earn multiple times for each post. Goodluck!
            </p>
          </div>
          <div className="bottom-mobile register-bottom">
            <div className="secret-input type-submit next-prev">
              {!confirmPopup && (
                <button
                  type="submit"
                  className="next"
                  onClick={postDate}
                  disabled={!state?.values?.date_description || invalid}
                >
                  {loader ? (
                    <span className="spin-loader-button"></span>
                  ) : (
                    <>
                      Next <FiArrowRight />
                    </>
                  )}
                </button>
              )}
            </div>
          </div>
        </div>
      </form>
      </> : null}
      <ConfirmDate isOpen={confirmPopup} toggle={toggle} />
    </>
  );
};
export default reduxForm({
  form: "CreateStepFour",
  destroyOnUnmount: false,
  validate,
})(CreateStepFour);
