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

// style files

import "styles/style.scss";

export const socket = io("https://staging-api.secrettime.com/", {
  autoConnect: true,
});

class MyApp extends App {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
    };
  }

  componentDidMount() {
    Router.events.on("routeChangeStart", (url) => {
      this.setState({ isLoading: true });
      // console.log("I am Loading...");
    });
    Router.events.on("routeChangeComplete", (url) => {
      this.setState({ isLoading: false });
      // console.log("I am Loaded...");
    });
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
    return (
      <Provider store={store}>
        <Head>
          <title>Secret Time</title>
          <link rel="icon" href="/favicon.svg" />
        </Head>
        {this.state.isLoading ? (
          <Loader />
        ) : (
          <Component {...pageProps} isLoading={this.state.isLoading} />
        )}

        <ToastContainer />
      </Provider>
    );
  }
}

export default withRedux(createStore)(withReduxSaga({ async: true })(MyApp));
