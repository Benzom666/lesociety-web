import React from 'react';
import { reduxForm, reset } from 'redux-form'
import { useSelector, useDispatch } from 'react-redux';
import validate from 'modules/auth/forms/validate/validate'
import useWindowSize from "utils/useWindowSize";  
import { IoIosClose } from 'react-icons/io';
import Link from 'next/link'
import { useRouter } from 'next/router';
import UserCardDetail from '@/core/UserCardDetail';

const DatePreview = props => {
    const { handleSubmit, previousPage, invalid, pristine, submitting, onClose } = props
    const { width } = useWindowSize();
    const dispatch = useDispatch();
    const router = useRouter();
    const user = useSelector(state => state?.authReducer.user);
    const cityState = useSelector(state => state?.form?.ChooseCity?.values);
    const dateSuggestion = useSelector(state => state?.form?.CreateStepOne?.values);
    const priceState = useSelector(state => state?.form?.CreateStepTwo?.values);
    const timeState = useSelector(state => state?.form?.CreateStepThree?.values);
    const dateDescription = useSelector(state => state?.form?.CreateStepFour?.values)

    const postDate = () => {
            router.push({pathname: '/user/user-list', query: { city:  cityState?.enter_city?.name, country: cityState.enter_country?.value}}, '/user/user-list');
            dispatch(reset('ChooseCity'))
            dispatch(reset('CreateStepOne'))
            dispatch(reset('CreateStepTwo'))
            dispatch(reset('CreateStepThree'))
            dispatch(reset('CreateStepFour'))
    }

    return (
        <>
            <div className="inner_container">
                <div className="d-flex d-md-none justify-content-between align-items-center login-text mb-0">
                    <a onClick={previousPage}>
                        {/* <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-chevron-left"><polyline points="15 18 9 12 15 6"></polyline></svg> */}
                    </a>
                </div>
            </div>    
            <div className="date-Preview-text ">
                <div className="inner_container">
                    <h6>Date Preview</h6>
                    <p>Please check all the details of your date before posting. You will have a chance to edit it in the future</p>   
                </div>
            </div>
            <form onSubmit={handleSubmit} className="date-class-section choose-gender date-preview-card">
               <div className="inner_container inner_container_Date_Preview_width">
                    <UserCardDetail 
                        user={user}
                        cityState={cityState}
                        dateSuggestion={dateSuggestion}
                        timeState={timeState}
                        priceState={priceState}
                        dateDescription={dateDescription}
                    />  
                    <div className="bottom-mobile register-bottom">
                        <div className="secret-input type-submit next-prev">
                            <button type="button" className="edit next">  
                                <Link href="/create-date/choose-city?edit=true"><a>Edit</a></Link>
                            </button>  
                            <button type="button" className="next" onClick={postDate}>  
                                <a className="forgot-passwrd">Post Date</a>
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
