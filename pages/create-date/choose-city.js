import React from 'react';
import { Field, reduxForm } from 'redux-form'
import validate from 'modules/auth/forms/validate/validate'
import { FiArrowRight } from "react-icons/fi";
import Header from 'core/header'
import Footer from 'core/footer'
import { Inputs } from 'core';
import { IoIosClose,IoMdLocate } from 'react-icons/io';
import Link from 'next/link'


const ChooseCity = props => {
    const { handleSubmit, invalid, previousPage, pristine, reset, submitting, touched } = props
    return (
        <div className="inner-page">
            <Header />
                <div className="inner-part-page">
                    <div className="container">
                        <div className="auth-section choose-city">
                            <form onSubmit={handleSubmit} >
                                <div className="d-flex d-md-none justify-content-between align-items-center login-text mb-0">
                                    <a onClick={previousPage}>
                                        {/* <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-chevron-left"><polyline points="15 18 9 12 15 6"></polyline></svg> */}
                                    </a>
                                    <h6 className="m-0 text-white-50">REGISTRATION</h6>
                                    <IoIosClose size={32} />
                                </div>
                                <div className="top-head mt-5 mb-3 text-center">
                                    <p></p>
                                    <h2>Spark A New Adventure</h2>
                                    <h6 className="text-white pt-1">Select Your Territory</h6>
                                    <svg width="86" height="2" viewBox="0 0 86 2" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M0 1H86" stroke="url(#paint0_linear_1502:2374)" />
                                        <defs>
                                            <linearGradient id="paint0_linear_1502:2374" x1="96.6181" y1="-1.73994" x2="7.45495" y2="-1.73994" gradientUnits="userSpaceOnUse">
                                                <stop stop-color="#FA789B" stopOpacity="0.01" />
                                                <stop offset="0.489981" stopColor="#F02D4E" />
                                                <stop offset="1" stopColor="#F24362" stopOpacity="0.01" />
                                            </linearGradient>
                                        </defs>
                                    </svg>
                                </div>
                                <div className="content-section">
                                    <p>Please select the location where you would like to be showcased.</p>
                                    <p>Each post is showcased in one location of your choice. </p>
                                    <p>Hence if you wish to have presence in multiple location, you will need several posts.</p>
                                </div>
                                <div>
                                    <Field
                                        name="enter_city"
                                        type="text"
                                        component={Inputs.inputFieldWithIcon}
                                        placeholder="Enter City"
                                        icon={<IoMdLocate />}
                                    />
                                </div>
                                <div className="bottom-mobile register-bottom">
                                    <div className="secret-input type-submit next-prev">
                                        <Link href="/create-date/date-event" >
                                            <button className="next" disabled={invalid}>  
                                                Next <FiArrowRight />
                                            </button>    
                                        </Link>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            <Footer />
        </div>
    )
}
export default reduxForm({
    form: 'ChooseCity', // <------ same form name
    destroyOnUnmount: false, // <------ preserve form data
    forceUnregisterOnUnmount: true, // <------ unregister fields on unmount
    validate
})(ChooseCity)