import React, { useState } from "react";
import Link from "next/link";
import { useSelector, useDispatch } from "react-redux";
import { deAuthenticateAction, logout } from "../modules/auth/authActions";
import { useRouter } from "next/router";
import _ from "lodash";
import { reset } from "redux-form";

export default function Header() {
  const user = useSelector((state) => state.authReducer.user);
  const dispatch = useDispatch();
  const router = useRouter();
  return (
    <header className="py-4">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-md-4">
            <div className="logo">
              <Link href="/auth/login">
                <img src="/images/logo.svg" width="159" alt="Logo" />
              </Link>
            </div>
          </div>
          <div className="col-md-8 ">
            <nav>
              <ul className="d-flex justify-content-end mb-0">
                {!_.isEmpty(user) ? (
                  <li>
                    <Link href="#">
                      <a
                        onClick={() => {
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
                          // window.location.reload();
                          router.push("/auth/login");
                        }}
                      >
                        Sign Out
                      </a>
                    </Link>
                  </li>
                ) : (
                  <>
                    <li>
                      <Link href="/auth/registration">Sign Up</Link>
                    </li>
                    <li>
                      <Link href="/auth/login">Sign In</Link>
                    </li>
                  </>
                )}
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
}
