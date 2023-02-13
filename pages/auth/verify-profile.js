import React, { useEffect } from "react";

import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/router";
import { useState } from "react";
import Header from "core/header";
import Footer from "core/footer";
import withAuth from "@/core/withAuth";
import { apiRequest } from "utils/Utilities";

const VerifyProfile = () => {
  const user = useSelector((state) => state.authReducer.user);
  const [tokenValid, setTokenValid] = useState(true);
  const dispatch = useDispatch();
  const router = useRouter();
  const [notifData, setNotifData] = useState(null);

  const fetchNotifications = async () => {
    try {
      const params = {
        user_email: user?.email,
        sort: "sent_time",
      };
      const { data } = await apiRequest({
        method: "GET",
        url: `notification`,
        params: params,
      });
      setNotifData(
        data?.data?.notification[data?.data?.notification?.length - 1]
      );
    } catch (err) {
      console.log("err", err);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  console.log("notif ", notifData);

  return (
    <div className="inner-page">
      <Header />

      <div className="inner-part-page auth-section">
        <div className="container">
          <div className="auth-section auth-section-register">
            <div>
              <div className="upload-pics profile-completion">
                <h2>Verification Unsuccessful</h2>
                <p className="pt-4">{notifData?.message}</p>
              </div>
            </div>
          </div>
          <div className="btn-container">
            <button
              className="edit-btn-verify"
              onClick={() => router.push("/auth/profile?edit=true")}
            >
              Edit now
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default withAuth(VerifyProfile);
