import {
  RESTORE_AUTH_STATE,
  AUTHENTICATE,
  DEAUTHENTICATE,
  AUTHENTICATE_UPDATE,
  DELETE_FORM_DATA,
} from "./actionConstants";
import { getCookie, setCookie, removeCookie } from "../../utils/cookie";
import {
  loadFromLocalStorage,
  removeSessionStorage,
  saveToLocalStorage,
} from "utils/sessionStorage";

import { reducer as formReducer } from "redux-form";

let initialState;
if (typeof localStorage !== "undefined") {
  // const authCookie = getCookie("auth");

  // const authCookie = getSessionStorage("auth");
  const authCookie = loadFromLocalStorage();

  console.log("authCookie", authCookie);
  if (authCookie) {
    initialState = authCookie;
    // initialState = JSON.parse(decodeURIComponent(authCookie));
  } else {
    initialState = {
      isLoggedIn: false,
      user: {},
    };
  }
} else {
  initialState = {
    isLoggedIn: false,
    user: {},
  };
}

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case DEAUTHENTICATE:
      // removeCookie("auth");
      removeSessionStorage("auth");
      removeSessionStorage("form");

      return {
        isLoggedIn: false,
        user: {},
      };

    case AUTHENTICATE:
      const authObj = {
        isLoggedIn: true,
        user: action.payload,
      };
      // setCookie("auth", JSON.stringify(authObj));
      // setSessionStorage("auth", JSON.stringify(authObj));
      saveToLocalStorage(authObj);
      return authObj;

    case AUTHENTICATE_UPDATE:
      const updateAuth = {
        isLoggedIn: true,
        user: { ...state.user, ...action.payload },
      };
      // setCookie("auth", JSON.stringify(updateAuth));
      // setSessionStorage("auth", JSON.stringify(updateAuth));
      saveToLocalStorage(updateAuth);
      return {
        ...state,
        ...updateAuth,
      };

    case RESTORE_AUTH_STATE:
      return {
        isLoggedIn: true,
        user: action.payload.user,
      };
    default:
      return { ...state };
  }
};

export default authReducer;
