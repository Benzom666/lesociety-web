import React from 'react';
import { Field, reduxForm } from 'redux-form'
import { useSelector } from 'react-redux';
import validate from 'modules/auth/forms/validate/validate'
import { Inputs } from 'core';
import { FiArrowRight } from "react-icons/fi";
import { IoIosClose } from 'react-icons/io';
import PriceSelection from 'core/priceSelection'
import useWindowSize from "utils/useWindowSize";

const education = [
    {
        id: '1',
        name: 'The date is short and sweet',
        suptag:'$',
        price:'80'
    },
    {
        id: '2',
        name: 'Ok, lets make some money!',
        suptag:'$',
        price:'100'
    },
    {
        id: '3',
        name: 'I’m as beatiful as they come, he’ll be lucky to date me',
        suptag:'$',
        price:'125'
    },
    {
        id: '4',
        name: 'I will not go on date for anything less',
        suptag:'$',
        price:'150'
    },
    {
        id: '5',
        name: 'I’m drop dead gergeous. Period',
        suptag:'$',
        price:'175'
    },
    {
        id: '6',
        name: 'Crème de la crème',
        suptag:'$',
        price:'200'
    },
    {
        id: '7',
        name: 'Crème de la crème',
        suptag:'$',
        price:'250'
    },
    {
        id: '8',
        name: 'Crème de la crème',
        suptag:'$',
        price:'300'
    }
];
  
const CreateStepTwo = props => {
    const { handleSubmit, previousPage, invalid, pristine, reset, submitting, onClose } = props
    const state = useSelector(state => state.form.CreateStepTwo)
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
                        <li className="active">
                            <span></span>
                        </li>
                        <li>
                            <span></span>
                        </li>
                        <li>
                            <span></span>
                        </li>
                    </ul>
                </div>  
            </div>    
            <div className="date-suggetion-text">
                <div className="inner_container" style={{paddingRight: '20px', paddingLeft: '20px'}}>
                    <h6>What’s Your Price?</h6>
                    <p>Determine how expensive you are and please consider he’s paying for the <br/> outing as well</p>   
                </div>
            </div>
            <div className="date-class-section choose-gender">
                <form onSubmit={handleSubmit} className="inner_container" style={{paddingRight: '30px', paddingLeft: '30px', paddingTop: '0px'}}>
                    <div className="mb-5">
                        <div className="auth-radio inner-radio">
                            <Field
                                // label="Level of education"
                                name="education"
                                options={education}
                                value={education}
                                component={PriceSelection}
                                onlyLabel={true}
                            />
                        </div>
                    </div>
                    <div className="bottom-mobile register-bottom"  style={{ paddingTop: '0px' }}>
                        <div className="secret-input type-submit next-prev">
                            <button type="submit" className="next" disabled={!state.values?.education || invalid}>  
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
    form: 'CreateStepTwo',
    destroyOnUnmount: false,
    validate
  })(CreateStepTwo);
