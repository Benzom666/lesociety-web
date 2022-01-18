import Head from 'next/head'
import { connect } from "react-redux";
import  Registration   from 'modules/auth/forms/registration';
import Header from 'core/header'
import Footer from 'core/footer'
import Link from 'next/link'
import useWindowSize from "../../utils/useWindowSize";
 
function RegistrationPage ({dispatch} ) {
  const { width } = useWindowSize();
	return (
    <div className="inner-page">
      <Header />
        <div className="inner-part-page auth-section">
          <div className="container">
            <div className="auth-section auth-section-register">
              <Registration />
             </div>
           </div>
        </div>
      <Footer />
    </div>
  )
}

export default RegistrationPage ;