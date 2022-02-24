import React from 'react';
import { Field, reduxForm } from 'redux-form'
import { Inputs } from 'core';
import { FiArrowRight } from "react-icons/fi";
import { useSelector } from 'react-redux';
import validate from 'modules/auth/forms/validate/validate'
import { CustomIcon } from 'core/icon';
import useWindowSize from "utils/useWindowSize";  
import { IoIosClose } from 'react-icons/io';

const CreateStepFour = props => {
    const { handleSubmit, previousPage, invalid, pristine, reset, submitting, onClose } = props
    const state = useSelector(state => state?.form?.CreateStepFour)
    const { width } = useWindowSize();
    return (
        <>
            <div className="inner_container">
                <div className="d-flex d-md-none justify-content-between align-items-center login-text mb-0">
                    <a onClick={previousPage}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-chevron-left"><polyline points="15 18 9 12 15 6"></polyline></svg>
                    </a>
                    <h6 className="m-0 text-white-50">Create a New Date</h6>
                    <IoIosClose size={32} onClick={onClose}/>
                </div>
                {width > 767 && (
                    <h3 className="text-center">Create a New Date</h3>
                )}
                <div className="step-wraps">
                    <ul>
                    <li className="complete active">
                            <span></span>
                        </li>
                        <li className="complete active">
                            <span></span>
                        </li>
                        <li className="complete active">
                            <span></span>
                        </li>
                        <li className="complete active">
                            <span></span>
                        </li>
                    </ul>
                </div>  
            </div>    
            <div className="date-suggetion-text">
                <div className="inner_container">
                    <h6>Describe Date Details</h6>
                    <p>Write about your date suggestions in more detail and why someone should select you as their date</p>   
                </div>
            </div>
            <form onSubmit={handleSubmit} className="date-class-section choose-gender">
                <div className="inner_container">
                    <div className="mb-5">
                        <Field
                            name="date_description"
                            type="text"
                            component={Inputs.textarea}
                            placeholder="Write details here (expectations, itinerary, rules, etc.)"
                        />
                    </div>
                </div>
                {/* {width > 767 && (
                    <div className="date-suggetion-text mb-5">
                        <div className="inner_container">
                            <h6>Want To Offer <br /> A Free Date To Mr. Right?</h6>
                            <p>How much money does he need to be making per year for you to offer a free date?</p>   
                        </div>
                    </div>
                 )}    */}
                <div className="inner_container">
                    {width > 767 && (
                        <>
                            {/* <div className="mb-4">
                                <div className="secret-input type-text select-wrap-icon">
                                    <select className="form-control">
                                        <option>Minimum yearly income</option>
                                        <option>Minimum yearly income</option>
                                        <option>Minimum yearly income</option>
                                        <option>Minimum yearly income</option>
                                    </select>
                                </div>    
                            </div> */}
                            {/* <div className="mb-5">
                                <Field
                                    name="education"
                                    options={education_plan}
                                    value={education_plan}
                                    component={Inputs.checkboxField}
                                />
                            </div> */}
                            <div className="mb-2 text-center">
                                <CustomIcon.Diamond color={'#fff'} size={120}/>
                            </div>
                        </>    
                    )}
                    <div className="mb-8 bottom-content text-center">
                        <p>Thank you for being one of our early adopters! To show you our appreciation, we will keep your posts active until you delete it. This allows you to earn multiple times for each post. Goodluck!</p>
                    </div>
                    <div className="bottom-mobile register-bottom">
                        <div className="secret-input type-submit next-prev">
                            <button type="submit" className="next" disabled={!state?.values?.date_description || invalid}>  
                                Next <FiArrowRight />
                            </button>    
                        </div>
                    </div>
                </div>
            </form>
        </>
    )
}
export default reduxForm({
    form: 'CreateStepFour',
    destroyOnUnmount: false,
    validate
  })(CreateStepFour);
