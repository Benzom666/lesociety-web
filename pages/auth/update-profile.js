import React, { useEffect } from "react";

import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/router";
import { useState } from "react";
import Header from "core/header";
import Footer from "core/footer";
import withAuth from "../../core/withAuth";
import { apiRequest } from "utils/Utilities";
import { AUTHENTICATE_UPDATE } from "@/modules/auth/actionConstants";

const UpdatedProfile = (props) => {
  const user = useSelector((state) => state.authReducer.user);
  const [tokenValid, setTokenValid] = useState(true);
  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    setTimeout(() => {
      router.push({
        pathname: "/user/user-list",
      });
    }, 5000);
  }, [user]);

  return (
    <div className="inner-page">
      <Header />

      <div className="inner-part-page auth-section">
        <div className="container">
          <div className="auth-section auth-section-register">
            <div>
              <div className="upload-pics profile-completion">
                <span className="completion-sign">
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
                      <rect
                        width="49"
                        height="49"
                        rx="16"
                        fill="currentColor"
                      />
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
                <h2>Profile Updated</h2>
                <p className="pt-4">
                  <p className="mb-4">
                    Please wait up to 24 hours for your profile to be verified.
                  </p>
                  <p>
                    Le Society provide optimal experience by only allowing
                    serious members to join.
                  </p>
                  {/* <p className="mb-4">Thank you for your patience.</p>
                  <p>
                    {user?.gender === "female"
                      ? "You have now gained access to Le Society. Please create your first date."
                      : "You can now start enjoying your new dating experience."}
                  </p> */}
                </p>

                <div
                  className="secret-input type-submit"
                  style={{ marginTop: "75px" }}
                >
                  {/* <button
                    onClick={() =>
                      user?.gender === "male"
                        ? router.push("/user/user-list")
                        : router.push("/create-date/choose-city")
                    }
                    className={`next ${!user?.email_verified ? "disable" : ""}`}
                    disabled={!user?.email_verified}
                  >
                    {user?.gender === "male"
                      ? "FIND A DATE"
                      : "CREATE NEW DATE"}
                  </button> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default withAuth(UpdatedProfile);
