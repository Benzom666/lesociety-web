import React, { useEffect } from "react";
import { apiRequest, showToast } from "../../../../utils/Utilities";
import { AUTHENTICATE } from "../../actionConstants";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/router";
import { useState } from "react";

const CompleteProfile = (props) => {
  const user = useSelector((state) => state.authReducer.user);
  const [tokenValid, setTokenValid] = useState(true);
  const dispatch = useDispatch();
  const router = useRouter();

  const handleResendMail = async () => {
    if (user?.email) {
      try {
        const res = await apiRequest({
          data: {
            email: user.email,
          },
          method: "POST",
          url: `user/verify-email`,
        });
        // showToast(res.data.message, 'success')
      } catch (err) {
        console.log("error", err);
      }
    }
  };

  useEffect(() => {
    const verifyEmail = async () => {
      if (router?.query?.token && router?.query?.email) {
        try {
          const res = await apiRequest({
            data: {
              email: router?.query?.email,
              token: router?.query?.token,
            },
            method: "POST",
            url: `user/email-verification`,
          });
          // debugger
          // dispatch({
          //     type: AUTHENTICATE_UPDATE,
          //     payload: {email_verified: true}
          // })
          dispatch({
            type: AUTHENTICATE,
            payload: res.data.data,
          });
          // showToast(res.data.message, 'success')
        } catch (err) {
          setTokenValid(false);
        }
      }
    };
    verifyEmail();
  }, [router?.query?.token]);

  // console.log("router", router);

  return (
    <div className="upload-pics profile-completion">
      <span className="completion-sign">
        {/* <svg viewBox="0 0 26 26" xmlns="http://www.w3.org/2000/svg" className='success_svg'>
                    <g stroke="currentColor" stroke-width="2" fill="none" fill-rule="evenodd" stroke-linecap="round" stroke-linejoin="round">
                        <path class="circle" d="M13 1C6.372583 1 1 6.372583 1 13s5.372583 12 12 12 12-5.372583 12-12S19.627417 1 13 1z" />
                        <path class="tick" d="M6.5 13.5L10 17 l8.808621-8.308621" />
                    </g>
                </svg> */}
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
      </span>
      <h2>
        {router?.query?.token || user?.email_verified
          ? user?.email_verified
            ? "Email Verified"
            : "Email Verification"
          : router?.query?.edit
          ? "Profile Updated"
          : "Profile Completed"}
      </h2>
      <p className="pt-4">
        {!user?.email_verified ? (
          !tokenValid ? (
            "Token is expired. Please verify your email address, by clicking on the resend mail button."
          ) : (
            "Please verify your email address, by clicking on the link in the email that was delivered to your inbox."
          )
        ) : (
          <>
            <p className="mb-4">
              Please wait up to 24 hours for your profile to be verified.
            </p>
            <p>
              Le Society provide optimal experience by only allowing serious
              members to join.
            </p>
          </>
        )}
      </p>
      {!user?.email_verified ? (
        <span
          className="resend-mail-text profile mt-5"
          onClick={handleResendMail}
        >
          Resend an email
        </span>
      ) : (
        ""
      )}
      {/* <label className="text-label">
                Don’t wait any longer, start earning <br />
                now by posting your first date!
            </label> */}
      {/* <div className="secret-input type-submit" style={{ marginTop: '75px' }}>
                <button onClick={() => user?.gender === "male" ? router.push('/user/user-list') : router.push("/create-date/choose-city")} className={`next ${!user?.email_verified ? 'disable' : ''}`} disabled={!user?.email_verified}>
                    {user?.gender === "male" ? 'GO TO GALLERY' : 'CREATE NEW DATE'}
                </button>
            </div> */}
    </div>
  );
};

export default CompleteProfile;
