import React from 'react';
import { reduxForm } from 'redux-form'
import validate from 'modules/auth/forms/validate/validate'
import useWindowSize from "utils/useWindowSize";  
import { IoIosClose } from 'react-icons/io';
import Link from 'next/link'

import UserCardDetail from '@/core/UserCardDetail';

const DatePreview = props => {
    const { handleSubmit, previousPage, invalid, pristine, reset, submitting } = props
    const { width } = useWindowSize();
    return (
        <>
            <div className="inner_container">
                <div className="d-flex d-md-none justify-content-between align-items-center login-text mb-0">
                    <a onClick={previousPage}>
                        {/* <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-chevron-left"><polyline points="15 18 9 12 15 6"></polyline></svg> */}
                    </a>
                    <h6 className="m-0 text-white-50">Create a New Date</h6>
                    <IoIosClose size={32} />
                </div>
                {width > 767 && (
                    <h3 className="text-center">Create a New Date</h3>
                )}
            </div>    
            <div className="date-suggetion-text mt-4">
                <div className="inner_container">
                    <h6>Date Preview</h6>
                    <p>Please check all the details of your date before posting. You will have a chance to edit it in the future</p>   
                </div>
            </div>
            <form onSubmit={handleSubmit} className="date-class-section choose-gender date-preview-card">
               <div className="inner_container">
                    <UserCardDetail />  
                    <div className="bottom-mobile register-bottom">
                        <div className="secret-input type-submit next-prev">
                            <button type="button" className="edit next">  
                                <Link href="/create-date/choose-city"><a>Edit</a></Link>
                            </button>  
                            <button type="submit" className="next">  
                                <Link href="/user/user-list"><a className="forgot-passwrd">Post Date</a></Link>
                            </button>    
                        </div>
                    </div>
               </div>
            </form>
        </>
    )
}
export default reduxForm({
    form: 'DatePreview',
    validate
  })(DatePreview);
