import React, { useState } from "react";
import Link from "next/link";
import { useSelector, useDispatch } from "react-redux";
import { deAuthenticateAction, logout } from "../modules/auth/authActions";
import { useRouter } from "next/router";
import _ from "lodash";
import { initialize, reset } from "redux-form";
import Logo_Web from "../assets/img/Logo_Web.png";

export default function Header(props) {
  const user = useSelector((state) => state.authReducer.user);
  const dispatch = useDispatch();
  const router = useRouter();
  return (
    <header className="py-4">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-md-4">
            <div className="logo" style={{ cursor: "pointer" }}>
              {router?.query?.edit ? (
                <img
                  src={Logo_Web.src}
                  width="232"
                  alt="Logo"
                  className="d-none d-md-block cursor-pointer"
                />
              ) : (
                <Link href="/auth/login">
                  {/* <img src="/images/logo.svg" width="159" alt="Logo" /> */}
                  <img
                    src={Logo_Web.src}
                    width="232"
                    alt="Logo"
                    className="d-none d-md-block cursor-pointer"
                  />
                </Link>
              )}
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
                          logout(router, dispatch);
                        }}
                      >
                        Sign Out
                      </a>
                    </Link>
                  </li>
                ) : (
                  <>
                    {!props.isSingUp ? (
                      <li>
                        <Link href="/auth/registration">Sign Up</Link>
                      </li>
                    ) : null}
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
