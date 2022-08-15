import React, { useState } from "react";
import { reduxForm, reset } from "redux-form";
import { useSelector, useDispatch } from "react-redux";
import validate from "modules/auth/forms/validate/validate";
import useWindowSize from "utils/useWindowSize";
import { IoIosClose } from "react-icons/io";
import Link from "next/link";
import { useRouter } from "next/router";
import UserCardDetail from "@/core/UserCardDetail";
import ConfirmDate from "./../../modules/date/confirmDate";
import { apiRequest } from "utils/Utilities";

const DatePreview = (props) => {
  const { handleSubmit, previousPage, invalid, pristine, submitting, onClose } =
    props;
  const { width } = useWindowSize();
  const dispatch = useDispatch();
  const router = useRouter();
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
  const [confirmPopup, setConfirmPopup] = useState(false);
  const [loader, setLoader] = useState(false);

  const toggle = () => setConfirmPopup(!confirmPopup);

  const postDate = async () => {
    setLoader(true);
    const data = {
      date_status: true,
    };
    try {
      const res = await apiRequest({
        method: "POST",
        url: `/date/update-draft-status`,
        data: data,
      });
      setLoader(false);
      router.push(
        {
          pathname: "/user/user-list",
          query: {
            city: cityState?.enter_city?.name,
            country: cityState.enter_country?.value,
            province: cityState?.enter_city?.province[0]?.short_code?.split(
              "-"
            )[1]
              ? cityState?.enter_city?.province[0]?.short_code?.split("-")[1]
              : cityState?.enter_city?.province[0]?.short_code,
          },
        },
        "/user/user-list"
      );
      dispatch(reset("ChooseCity"));
      dispatch(reset("CreateStepOne"));
      dispatch(reset("CreateStepTwo"));
      dispatch(reset("CreateStepThree"));
      dispatch(reset("CreateStepFour"));
    } catch (e) {
      setLoader(false);
    }
  };

  return (
    <>
      <div className="inner_container">
        <div className="d-flex d-md-none justify-content-between align-items-center login-text mb-0">
          <a onClick={previousPage}>
            {/* <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-chevron-left"><polyline points="15 18 9 12 15 6"></polyline></svg> */}
          </a>
          <h6 className="m-0 text-white-50">CREATE A NEW DATE</h6>
          <IoIosClose className="" size={32} onClick={toggle} />
        </div>
      </div>
      <div
        className={`${
          width > 767 ? "date-Preview-text" : "date-suggetion-text mt-4"
        } `}
      >
        <div className="inner_container">
          <div className="d-flex justify-content-center">
            <h6>Date Preview</h6>
            {width > 767 && (
              <IoIosClose
                className="desk-close-icon-new"
                size={32}
                onClick={toggle}
              />
            )}
          </div>
          <p>
            Please check all the details of your date before posting. You will
            have a chance to edit it in the future
          </p>
        </div>
      </div>
      <form
        onSubmit={handleSubmit}
        className="date-class-section choose-gender date-preview-card"
      >
        <div className="inner_container inner_container_Date_Preview_width">
          <UserCardDetail
            user={user}
            cityState={cityState}
            dateSuggestion={dateSuggestion}
            timeState={timeState}
            priceState={priceState}
            dateDescription={dateDescription}
          />
          {!confirmPopup && (
            <div className="bottom-mobile register-bottom">
              <div className="secret-input type-submit next-prev">
                <button type="button" className="edit next">
                  <Link href="/create-date/choose-city?edit=true">
                    <a>Edit</a>
                  </Link>
                </button>
                <button type="button" className="next" onClick={postDate}>
                  {loader ? (
                    <span className="spin-loader-button"></span>
                  ) : (
                    <>
                      <a className="forgot-passwrd">Post Date</a>
                    </>
                  )}
                </button>
              </div>
            </div>
          )}
        </div>
      </form>
      <ConfirmDate isOpen={confirmPopup} toggle={toggle} />
    </>
  );
};
export default reduxForm({
  form: "DatePreview",
  validate,
})(DatePreview);
