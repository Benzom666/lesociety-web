import React, { useState } from "react";
import H5 from "core/H5";
import SubHeading from "core/SubHeading";
import ClassSelection from "core/ClassSelection";
import { Field, reduxForm } from "redux-form";
import validate from "modules/auth/forms/validate/validate";
import { FiArrowRight } from "react-icons/fi";
import { CustomIcon } from "core/icon";
import { IoIosClose } from "react-icons/io";
import useWindowSize from "utils/useWindowSize";
import { useSelector } from "react-redux";
import ConfirmDate from "./../../modules/date/confirmDate";

const CreateStepOne = (props) => {
  const {
    handleSubmit,
    previousPage,
    invalid,
    pristine,
    reset,
    submitting,
    onClose,
  } = props;
  const state = useSelector((state) => state.form.CreateStepOne);
  const { width } = useWindowSize();
  const [confirmPopup, setConfirmPopup] = useState(false);

  const toggle = () => setConfirmPopup(!confirmPopup);

  return (
    <>
      <div className="inner_container">
        <div className="d-flex d-md-none justify-content-between align-items-center login-text mb-0">
          <a onClick={previousPage}>
            {/* <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-chevron-left"><polyline points="15 18 9 12 15 6"></polyline></svg> */}
          </a>
          <h6 className="m-0 text-white-50">Create a New Date</h6>
          <IoIosClose className="mouse-point" size={32} onClick={toggle} />
        </div>
        {width > 767 && (
          <div className="d-flex justify-content-center">
            <h3 className="text-center">Create a New Date</h3>
            <IoIosClose
              className="desk-close-icon mouse-point"
              size={32}
              onClick={toggle}
            />
          </div>
        )}
        <div className="step-wraps">
          <ul>
            <li className="active">
              <span></span>
            </li>
            <li className="">
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
    {!confirmPopup ? <>  <div className="date-suggetion-text">
        <div
          className="inner_container"
          style={{ paddingRight: "35px", paddingLeft: "35px" }}
        >
          <h6>Date Suggestions</h6>
          <p>
            Create a simple date or try your luck with something more upscale.
            Please select 2 options and keep in mind these are only suggestions{" "}
          </p>
        </div>
      </div>
      <div className="date-class-section choose-gender">
        <form
          onSubmit={handleSubmit}
          style={{
            paddingRight: "10px",
            paddingLeft: "10px",
            paddingTop: "0px",
          }}
        >
          <div className="inner_container">
            <div className="mb-5">
              <div className=" d-flex align-items-center justify-content-between">
                <H5>Standard Class Dates</H5>
                <span className="price-tag">$</span>
              </div>
              <div style={{ color: "#AFABAB", fontFamily: "Helvetica" }}>
                Higher response rate
              </div>
              <Field
                name="search_type"
                textColor={"#4F4E54"}
                checkedColor={"white"}
                options={[
                  {
                    label: "Morning Date",
                    id: "MorningBeverage",
                    iconName: "CustomIcon.Sun",
                    icon: <CustomIcon.Sun color={"#4F4E54"} size={30} />,
                    category: "standard_class_date",
                  },
                  {
                    label: "Evening Date",
                    id: "EveningDate",
                    icon: <CustomIcon.Moon color={"#4F4E54"} size={30} />,
                    iconName: "CustomIcon.Moon",
                    category: "standard_class_date",
                  },
                  {
                    label: "Outdoor Adventure",
                    id: "OutdoorAdventure",
                    icon: (
                      <CustomIcon.OutdoorAdventure
                        color={"#4F4E54"}
                        size={30}
                      />
                    ),
                    iconName: "CustomIcon.OutdoorAdventure",
                    category: "standard_class_date",
                  },
                ]}
                component={ClassSelection}
              />
            </div>
            <div className="mb-5">
              <div className=" d-flex align-items-center justify-content-between">
                <H5>Middle Class Dates</H5>
                <span className="price-tag">$$</span>
              </div>
              <div style={{ color: "#AFABAB", fontFamily: "Helvetica" }}>
                Average response rate
              </div>
              <Field
                name="search_type"
                textColor={"#4F4E54"}
                checkedColor={"white"}
                options={[
                  {
                    label: "Take A Class",
                    id: "TakeClass",
                    icon: <CustomIcon.TakeClass color={"#4F4E54"} size={30} />,
                    iconName: "CustomIcon.TakeClass",
                    category: "middle_class_dates",
                  },
                  {
                    label: "Entertainment & sports ",
                    id: "Entertainmentsports",
                    icon: (
                      <CustomIcon.EntertainmentSports
                        color={"#4F4E54"}
                        size={30}
                      />
                    ),
                    iconName: "CustomIcon.EntertainmentSports",
                    category: "middle_class_dates",
                  },
                  {
                    label: "Wine & Dine ",
                    id: "WineDine",
                    icon: <CustomIcon.WineDine color={"#4F4E54"} size={30} />,
                    iconName: "CustomIcon.WineDine",
                    category: "middle_class_dates",
                  },
                ]}
                component={ClassSelection}
              />
            </div>
            <div className="mb-5">
              <div className=" d-flex align-items-center justify-content-between">
                <H5>Executive Class Dates</H5>
                <span className="price-tag">$$$</span>
              </div>
              <div style={{ color: "#AFABAB", fontFamily: "Helvetica" }}>
                Lower response rate
              </div>
              <Field
                name="search_type"
                textColor={"#4F4E54"}
                checkedColor={"white"}
                options={[
                  {
                    label: "Casino & Drinks",
                    id: "CasinoDrinks",
                    icon: (
                      <CustomIcon.CasinoDrinks color={"#4F4E54"} size={30} />
                    ),
                    iconName: "CustomIcon.CasinoDrinks",
                    category: "executive_class_dates",
                  },
                  {
                    label: "Champaign & Caviar",
                    id: "ChampaignCaviar",
                    icon: (
                      <CustomIcon.ChampaignCaviar color={"#4F4E54"} size={30} />
                    ),
                    iconName: "CustomIcon.ChampaignCaviar",
                    category: "executive_class_dates",
                  },
                  {
                    label: "Bottles & Dance",
                    id: "BottlesDance",
                    icon: (
                      <CustomIcon.BottlesDance color={"#4F4E54"} size={30} />
                    ),
                    iconName: "CustomIcon.BottlesDance",
                    category: "executive_class_dates",
                  },
                ]}
                component={ClassSelection}
              />
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
                    disabled={!state.values?.search_type || invalid}
                  >
                    Next <FiArrowRight />
                  </button>
                )}
              </div>
            </div>
          </div>
        </form>
      </div>
      </> : null}
      <ConfirmDate isOpen={confirmPopup} toggle={toggle} />
    </>
  );
};
export default reduxForm({
  form: "CreateStepOne",
  destroyOnUnmount: false,
  validate,
  enableReinitialize: true,
})(CreateStepOne);
