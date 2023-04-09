import React, { useState } from "react";
import Modal from "react-modal";
import { IoIosClose } from "react-icons/io";
import { apiRequest } from "utils/Utilities";
import { logout } from "../auth/authActions";
import { useRouter } from "next/dist/client/router";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { AUTHENTICATE_UPDATE } from "../auth/actionConstants";
const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    borderRadius: "30px",
    background:
      "linear-gradient(231.4deg, rgba(46, 49, 58, 0.80844) 18.16%, rgba(25, 25, 25, 0.831845) 95.56%)",
  },
  overlay: {
    backdropFilter: "blur(5px)",
  },
};

const CreatedatesWarningPopUp = ({ setHideModal, hideModal }) => {
  const user = useSelector((state) => state.authReducer.user);
  const [modalIsOpen, setIsOpen] = useState(!hideModal);
  const [checked, setChecked] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch();

  const checkHandler = () => {
    setChecked(!checked);
  };
  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  useEffect(() => {
    if (user?.date_warning_popup) {
      setHideModal(true);
    }
  }, [user]);

  const handleSubmit = async (values) => {
    if (!checked) {
      setHideModal(true);
      return;
    }
    try {
      const data = {
        date_warning_popup: checked,
      };
      const res = await apiRequest({
        data: data,
        method: "POST",
        url: `user/update-date-warning-status`,
      });

      dispatch({
        type: AUTHENTICATE_UPDATE,
        payload: { date_warning_popup: true },
      });
      setHideModal(true);
    } catch (err) {
      if (
        err?.response?.status === 401 &&
        err?.response?.data?.message === "Failed to authenticate token!"
      ) {
        setTimeout(() => {
          logout(router, dispatch);
        }, 100);
      }
      return err;
    }
    return;
  };

  const getUpdatedUserDetails = async () => {
    try {
      const res = await apiRequest({
        method: "GET",
        url: `user/user-by-name?user_name=${user?.user_name}`,
      });
    } catch (err) {
      if (
        err?.response?.status === 401 &&
        err?.response?.data?.message === "Failed to authenticate token!"
      ) {
        setTimeout(() => {
          logout(router, dispatch);
        }, 100);
      }
      return err;
    }
  };

  const fetchDraftedDate = async () => {
    setDraftDateLoading(true);
    try {
      //debugger
      const res = await apiRequest({
        url: "date",
        params: {
          user_name: user?.user_name,
          current_page: 1,
          per_page: 10000,
        },
      });

      if (res?.data?.data?.length === 0) {
        setDraftDateLoading(false);
        // dispatch(initialize("ChooseCity", ""));
        dispatch(initialize("CreateStepOne", ""));
        dispatch(initialize("CreateStepTwo", ""));
        dispatch(initialize("CreateStepThree", ""));
        dispatch(initialize("CreateStepFour", ""));
      }

      if (res.data.data?.dates) {
        const draftedDate = res.data.data?.dates.find(
          (item) => item?.date_status === false
        );
        if (!draftedDate) {
          setDraftDateLoading(false);
          // dispatch(initialize("ChooseCity", ""));
          dispatch(initialize("CreateStepOne", ""));
          dispatch(initialize("CreateStepTwo", ""));
          dispatch(initialize("CreateStepThree", ""));
          dispatch(initialize("CreateStepFour", ""));
        }
        if (draftedDate) {
          const category = dateCategory.find(
            (item) =>
              item?.label === draftedDate?.standard_class_date ||
              item?.label === draftedDate?.middle_class_dates ||
              item?.label === draftedDate?.executive_class_dates
          );
          const country = Object.keys(countriesCode).find(
            (key) =>
              countriesCode[key]?.toLowerCase() ===
              draftedDate.country_code?.toLowerCase()
          );

          dispatch(
            initialize("ChooseCity", {
              enter_country: {
                label: country,
                value: draftedDate.country_code,
              },
              enter_city: {
                name: draftedDate?.location,
                country: [
                  {
                    short_code: draftedDate.country_code,
                    text: country,
                  },
                ],
                label: draftedDate?.location + ", " + draftedDate?.province,
                province: [
                  { short_code: draftedDate?.province?.toUpperCase() },
                ],
              },
            })
          );
          dispatch(initialize("CreateStepOne", { search_type: category }));
          dispatch(
            initialize("CreateStepTwo", { education: draftedDate?.price })
          );
          dispatch(
            initialize("CreateStepThree", {
              education: draftedDate?.date_length,
            })
          );
          dispatch(
            initialize("CreateStepFour", {
              date_description: draftedDate?.date_details,
            })
          );
          setDraftDateLoading(false);
          router.push("/create-date/date-event?drafted=true");
        }
      }
    } catch (err) {
      console.log(err);
      setDraftDateLoading(false);
      // dispatch(initialize("ChooseCity", ""));
      dispatch(initialize("CreateStepOne", ""));
      dispatch(initialize("CreateStepTwo", ""));
      dispatch(initialize("CreateStepThree", ""));
      dispatch(initialize("CreateStepFour", ""));
      if (
        err?.response?.status === 401 &&
        err?.response?.data?.message === "Failed to authenticate token!"
      ) {
        setTimeout(() => {
          logout(router, dispatch);
        }, 100);
      }
      return err;
    }
  };

  return (
    <div>
      {/* <button onClick={openModal}>Open Modal</button> */}
      <Modal
        isOpen={modalIsOpen}
        //onRequestClose={closeModal}
        //style={customStyles}
        contentLabel="Example Modal"
        className="Warning_Popup"
      >
        <div className="warning_modal_main">
          <div className="w-15 text-end pe-1">
            <IoIosClose
              className="mouse-point"
              size={33}
              onClick={() => setHideModal(true)}
            />
          </div>
          <div className="WarnigPopUp_Heading">
            <h2>Any content that contains the </h2>
            <h2>following will be removed</h2>
          </div>
          <div className="list-of-warning">
            <ul>
              <li>Escorting/Prostitution</li>
              <li>Personal Contact Info</li>
              <li>Commercial Activity</li>
              <li>Criminal Activity</li>
              <li>Scamming</li>
            </ul>
            <div className="dont-show">
              <div className="dont-show-checkBox">
                <input type="checkbox" checked={checked} />
                <span
                  className="checkmark"
                  aria-role="checkbox"
                  onClick={checkHandler}
                  aria-hidden={true}
                ></span>
              </div>
              <p className="dont-show-text">Don’t show this again.</p>
            </div>
          </div>
          <div className="warning_modal_footer">
            <button type="button" onClick={() => handleSubmit()}>
              Agree and Continue
            </button>
            <p className="footer-text-war">No Refunds will be Issued</p>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default CreatedatesWarningPopUp;
