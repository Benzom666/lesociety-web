import Head from "next/head";
import { connect } from "react-redux";
import Profile from "modules/auth/forms/profile";
import Header from "core/header";
import Footer from "core/footer";
import LoggedInHeader from "core/loggedInHeader";
import Link from "next/link";
import useWindowSize from "../../utils/useWindowSize";
import { useSelector, useDispatch } from "react-redux";
import _ from "lodash";
import router, { useRouter } from "next/router";

function RegisterPage({ dispatch }) {
  const user = useSelector((state) => state.authReducer.user);
  const { width } = useWindowSize();
  const router = useRouter()
  console.log("qqq ",router.query)
  return (
    <div className="inner-page">
      <Header />
      {/* {_.isEmpty(user) ? <Header /> : <LoggedInHeader/>} */}
      <Profile />
      <Footer />
    </div>
  );
}

export default RegisterPage;
