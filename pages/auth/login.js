import Head from 'next/head'
import Link from 'next/link'
import Login from 'modules/auth/forms/login';
import { connect } from "react-redux";
import Header from 'core/header'
import Footer from 'core/footer'
import useWindowSize from "../../utils/useWindowSize";
import { FaAngleLeft } from "react-icons/fa";

function LoginPage({ dispatch }) {
  const { width } = useWindowSize();

  return (
    <>
      <Header />
      <div className="inner-part-page auth-section">
        <div className="container">
          <div className="auth-section">
            <div className="d-block d-md-none login-text">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-chevron-left"><polyline points="15 18 9 12 15 6"></polyline></svg>
              <span>
                Login
                <img src="/images/line.png" alt="line" />
              </span>
            </div>
            <h2>
              Let's sign you in.
            </h2>
            <p>
              Welcome back. <span>You’ve been missed!</span>
            </p>
            <Login />
            {width > 767 && (
              <div className="dont-have">
                <p>Don't have an account? <Link href="/auth/registration">Register</Link></p>
                <Link href="/auth/forgot-password"><a className="forgot-passwrd">Forgot your password?</a></Link>
              </div>
            )}
          </div>
          {width > 767 && (
            <p className="terms-cond-text">By clicking login you agree to our <Link href="#">terms</Link> and <Link href="#">privacy policy</Link>.</p>
          )}
        </div>
      </div>
      <Footer />
    </>
  )
}

export default LoginPage;
