import React from "react";
import App, { Container } from "next/app";
import Head from "next/head";
import { Provider } from "react-redux";
import withRedux from "next-redux-wrapper";
import withReduxSaga from "next-redux-saga";
import createStore from "engine";
import "bootstrap/dist/css/bootstrap.css";
import "react-rangeslider/lib/index.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Router from "next/router";
import Loader from "@/modules/Loader/Loader";
import io from "socket.io-client";

import "styles/style.scss";
import { removeCookie } from "utils/cookie";

export const socket = io("https://staging-api.secrettime.com/", {
  autoConnect: true,
});

class MyApp extends App {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      history: [],
    };
  }

  componentDidMount() {
    const { asPath } = this.props.router;

    // lets add initial route to `history`
    this.setState((prevState) => ({ history: [...prevState.history, asPath] }));
    Router.events.on("routeChangeStart", (url) => {
      this.setState({ isLoading: true });
      // console.log("I am Loading...");
    });
    Router.events.on("routeChangeComplete", (url) => {
      setTimeout(() => {
        this.setState({ isLoading: false });
      }, 2000);
      // console.log("I am Loaded...");
    });
  }

  componentDidUpdate() {
    const { history } = this.state;
    const { asPath } = this.props.router;

    // if current route (`asPath`) does not equal
    // the latest item in the history,
    // it is changed so lets save it
    if (history[history.length - 1] !== asPath) {
      this.setState((prevState) => ({
        history: [...prevState.history, asPath],
      }));
    }
  }

  static async getInitialProps({ Component, ctx }) {
    let pageProps = {};

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps({ ctx });
    }
    return { pageProps };
  }

  render() {
    const { Component, pageProps, store } = this.props;
    const { asPath } = this.props.router;
    // prevent site from rotating in mobile put restriction

    const lsLoader =
      this.state.isLoading &&
      asPath !== "/user/user-profile" &&
      asPath !== "/auth/profile?edit=true" &&
      asPath !== "/auth/profile" &&
      asPath !== "/user/user-list" &&
      !asPath.includes("/user/user-profile/");

    // console.log("lsLoader", asPath, lsLoader);
    return (
      <Provider store={store}>
        <Head>
          <title>Secret Time</title>
          <link rel="icon" href="/favicon.svg" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1, maximum-scale=1"
          />
          <meta http-equiv="ScreenOrientation" content="autoRotate:disabled" />
        </Head>
        {lsLoader ? (
          <Loader />
        ) : (
          <Component
            {...pageProps}
            history={this.state.history}
            isLoading={this.state.isLoading}
          />
        )}

        <ToastContainer />
      </Provider>
    );
  }
}

export default withRedux(createStore)(withReduxSaga({ async: true })(MyApp));
