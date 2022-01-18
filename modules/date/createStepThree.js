import React from 'react';
import { Field, reduxForm } from 'redux-form'
import { Inputs } from 'core';
import { FiArrowRight } from "react-icons/fi";
import validate from 'modules/auth/forms/validate/validate'
import { IoIosClose } from 'react-icons/io';
import useWindowSize from "utils/useWindowSize";

const education_plan = [
    {
        id: '1',
        name: 'Lets get straight to the point',
        suptag:'min',
        price:'30'
    },
    {
        id: '2',
        name: 'This should be fair enough',
        suptag:'HR',
        price:'1'
    },
    {
        id: '3',
        name: 'He will be spending a lot',
        suptag:'HR',
        price:'2'
    },
    {
        id: '4',
        name: 'He deserves the change',
        suptag:'HR',
        price:'2.5'
    },
    {
        id: '5',
        name: 'This is necessary for my date',
        suptag:'HR',
        price:'3+'
    }
];
  
const CreateStepThree = props => {
    const { handleSubmit, previousPage, invalid, pristine, reset, submitting } = props
    const { width } = useWindowSize();
    return (
        <>
            <div className="inner_container">
                <div className="d-flex d-md-none justify-content-between align-items-center login-text mb-0">
                    <a onClick={previousPage}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-chevron-left"><polyline points="15 18 9 12 15 6"></polyline></svg>
                    </a>
                    <h6 className="m-0 text-white-50">Create a New Date</h6>
                    <IoIosClose size={32} />
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
                        <li className="active">
                            <span></span>
                        </li>
                        <li>
                            <span></span>
                        </li>
                    </ul>
                </div>  
            </div>    
            <div className="date-suggetion-text">
                <div className="inner_container">
                    <h6>Approximate Length</h6>
                    <p>How long will your date last? The length should reflect your price</p>   
                </div>
            </div>
            <div className="date-class-section choose-gender">
                <form onSubmit={handleSubmit} className="inner_container">
                    <div className="mb-5">
                        <div className="auth-radio inner-radio">
                            <Field
                                // label="Level of education"
                                name="education"
                                options={education_plan}
                                value={education_plan}
                                component={Inputs.radioField}
                            />
                        </div>
                    </div>
                    <div className="bottom-mobile register-bottom">
                            <div className="secret-input type-submit next-prev">
                                <button type="submit" className="next" disabled={invalid}>  
                                    Next <FiArrowRight />
                                </button>    
                            </div>
                        </div>
                </form>
            </div>
        </>
    )
}
export default reduxForm({
    form: 'CreateStepThree',
    validate
  })(CreateStepThree);
