import React, { useState } from 'react';
import HeaderLoggedIn from 'core/loggedInHeader'
import { useSelector, useDispatch } from 'react-redux';
import { BiChevronLeft, BiTrashAlt, BiEditAlt } from "react-icons/bi";
import Image from 'next/image'
import { HiBadgeCheck } from 'react-icons/hi';
import { Field, reduxForm, initialize } from 'redux-form'
import { Inputs } from 'core';
import validate from 'modules/auth/forms/validate/validate'
import H5 from 'core/H5';
import SubHeading from 'core/SubHeading';
import useWindowSize from "utils/useWindowSize";
import { CustomIcon } from 'core/icon';
import Modal from 'react-modal';
import Link from 'next/link'
import moment from 'moment';
import { signupStep4 } from '../authActions';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { apiRequest, dateCategory, countriesCode } from 'utils/Utilities';

function UserProfile({ preview, editHandle }) {
    const [selectedImage, setSelectedImage] = useState(null);
    const { width } = useWindowSize();
    const [modalIsOpen, setIsOpen] = React.useState(false);
    const [loading, setLoading] = React.useState(false);
    const [dateModalOpen, dateSetIsOpen] = React.useState(false);
    const [userDetail, setUserDetail] = React.useState('');
    const [userDates, setUserDates] = React.useState([]);
    const [selectedDate, setSelectedDate] = React.useState('');
    const user = useSelector(state => state.authReducer.user)
    const dispatch = useDispatch();
    const router = useRouter();
    const selectedDateCategory = dateCategory.find(item => item?.label === selectedDate?.standard_class_date || item?.label === selectedDate?.middle_class_dates || item?.label === selectedDate?.executive_class_dates)

    const convertToFeet = cmValue => (cmValue * 0.0328084).toPrecision(2);

    function openModal() {
        setIsOpen(true);
    }
    function closeModal() {
        setIsOpen(false);
    }
    function dateModalIsOpen() {
        dateSetIsOpen(true);
    }
    function dateCloseModal() {
        dateSetIsOpen(false);
        setSelectedDate('')
    }

    const fetchDates = async userName => {
        try {
            const res = await apiRequest({
                url: "date",
                params: {
                    user_name: userName
                }
            })
            setUserDates(res?.data?.data?.dates)
        } catch (err) {
            setUserDates([])
        }
    }

    const fetchUserDetails = async userName => {
        try {
            const res = await apiRequest({
                url: `user/user-by-name?user_name=${userName}`,
            })
            if (res?.data?.data?.user) {
                setUserDetail(res?.data?.data?.user)
            }
        } catch (e) {
            console.log(e)
        }
    }

    useEffect(() => {
        if (router?.query?.userName) {
            fetchUserDetails(router?.query?.userName);
            fetchDates(router?.query?.userName)
        }
        return () => {
            setUserDetail('');
            setUserDates([])
        }
    }, [router?.query])

    useEffect(() => {
        if (user?.gender === 'female' && user?.user_name && !router?.query?.userName) {
            fetchDates(user?.user_name)
        }
        return () => {
            setUserDetail('');
            setUserDates([])
        }
    }, [])

    const onSubmit = () => {
        dispatch(signupStep4({ email: user?.email, step_completed: 4 }, setLoading))
    }

    const editDate = () => {
        const country = Object.keys(countriesCode).find(key => countriesCode[key]?.toLowerCase() === selectedDate.country_code?.toLowerCase())
        dispatch(initialize('ChooseCity', {
            enter_country: { label: country, value: selectedDate.country_code },
            enter_city: {
                name: selectedDate?.location,
                country: [{
                    short_code: selectedDate.country_code,
                    text: country
                }],
                label: selectedDate?.location
            }
        }));
        dispatch(initialize('CreateStepOne', { 'search_type': selectedDateCategory }));
        dispatch(initialize('CreateStepTwo', { education: selectedDate?.price }))
        dispatch(initialize('CreateStepThree', { education: selectedDate?.date_length }))
        dispatch(initialize('CreateStepFour', { date_description: selectedDate?.date_details }))
        router.push('/create-date/choose-city?edit=true')
    }

    const deleteDate = async () => {
        try {
            const res = await apiRequest({
                method: 'DELETE',
                url: "date",
            })
            if (res?.data?.data) {
                fetchDates(user?.user_name);
                dateCloseModal();
            }
        } catch (e) {
            console.log(e)
        }
    }


    return (
        <div className="inner-page">
            {!preview && <HeaderLoggedIn />}
            <div className="inner-part-page">
                <div className={`top-spase pb-0 pt-5-lg-4 pb-5-lg-4 ${preview ? "space-top" : ""}`}>
                    <div className="container user_profile_page">
                        <div className="row">
                            <div className="col-md-2"></div>
                            <div className="col-md-8">
                                <div className="row pt-2 pt-md-5">
                                    <div className="col-xl-4 col-lg-5 col-md-12 col-12">
                                        {width > 991 && (
                                            <figure className="user_img_profile">
                                                <div className="big-image">
                                                    <label>
                                                        <div className="pos-relative">
                                                            <Image
                                                                src={userDetail?.images ? userDetail?.images[0] : user.images && user.images[0]}
                                                                alt="user image"
                                                                width={240}
                                                                height={300}
                                                            />
                                                            <span className="verified_check_tag">
                                                                <HiBadgeCheck color={'white'} size={20} />
                                                                Verified
                                                            </span>
                                                        </div>
                                                    </label>
                                                    {router?.query?.userName && <div className="d-flex align-items-center mb-0 mt-4 header_btn_wrap">
                                                        <button type="button" className="edit-photo-btn">Edit Photos</button>
                                                    </div>}
                                                </div>
                                            </figure>
                                        )}
                                    </div>
                                    <div className="col-xl-8 col-lg-7 col-md-12 col-12 padd0-responsive">
                                        <div className="userdetails resposnive-data-profile">
                                            <h4>{userDetail?.user_name || user.user_name}, <span>{userDetail?.age || user.age}</span></h4>
                                            {/* {width > 991 && (
                                                <p>{userDetail?.tagline || user?.tagline}</p>
                                            )} */}
                                            {width < 991 && (
                                                <div className="text-center">
                                                    <svg className="left-space" width="60" height="2" viewBox="0 0 95 2" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M0.110596 1.36728H94.3167" stroke="url(#paint0_linear)"></path><defs><linearGradient id="paint0_linear" x1="105.948" y1="-1.61543" x2="8.2769" y2="-1.61543" gradientUnits="userSpaceOnUse"><stop stop-color="#FA789B" stop-opacity="0.01"></stop><stop offset="0.489981" stop-color="#F02D4E"></stop><stop offset="1" stop-color="#F24362" stop-opacity="0.01"></stop></linearGradient></defs></svg>
                                                </div>
                                            )}
                                            <div className="selct-wrap-sort mx-3">
                                                <span className="city-txt">{userDetail?.location || user?.location}, </span>
                                                <span className="state-txt">{userDetail?.province || user?.province}</span>
                                            </div>
                                            <div className="user-images-wrap mt-3 mt-lg-4 user_img_profile">
                                                <figure className="user_img_profile show-responsive_div pt-2 pt-lg-3">
                                                    <div className="big-image">
                                                        <label>
                                                            <>
                                                                <div className="pos-relative">
                                                                    <img
                                                                        src={userDetail?.images ? userDetail?.images[0] : user.images && user.images[0]}
                                                                        alt="user image"
                                                                        width="350"
                                                                        height="350"
                                                                    />
                                                                    <span className="verified_check_tag">
                                                                        <HiBadgeCheck color={'white'} size={20} />
                                                                        Verified
                                                                    </span>
                                                                </div>
                                                            </>
                                                        </label>
                                                    </div>
                                                </figure>
                                                <SubHeading title="Photos" />
                                                <div className="image_wrap_slider pt-3 pb-4">
                                                    <figure>
                                                        <Image
                                                            src={userDetail?.images ? userDetail?.images[1] : user.images && user.images[1]}
                                                            alt="user image"
                                                            width={160}
                                                            height={150}
                                                        />
                                                    </figure>
                                                    <figure>
                                                        <Image
                                                            src={userDetail?.images ? userDetail?.images[2] : user.images && user.images[2]}
                                                            alt="user image"
                                                            width={160}
                                                            height={150}
                                                        />
                                                    </figure>
                                                    <figure>
                                                        <Image
                                                            src={userDetail?.images ? userDetail?.images[3] : user.images && user.images[3]}
                                                            alt="user image"
                                                            width={160}
                                                            height={150}
                                                        />
                                                    </figure>
                                                </div>
                                                <>
                                                    <h4 className="mb-5 mt-4 text-center tagline-font">"{userDetail?.tagline || user?.tagline}"</h4>

                                                    {!preview && user?.gender === 'female' &&
                                                        <>
                                                            <SubHeading title="Available dates" />
                                                            <div className="verification_card_header text-center mb-5 mt-4">
                                                                {/* <div className='d-flex available-dates-box'> */}
                                                                {userDates.length > 0 ? userDates.map(date => {
                                                                    const category = dateCategory.find(item => item?.label === date?.standard_class_date || item?.label === date?.middle_class_dates || item?.label === date?.executive_class_dates)
                                                                    return (
                                                                        <div className="availabe_card_inner mr-3" onClick={() => {
                                                                            if (!router?.query?.userName) {
                                                                                setSelectedDate(date);
                                                                                dateModalIsOpen()
                                                                            }
                                                                        }}>
                                                                            <ul className="date_list">
                                                                                <li>
                                                                                    <span className="icon_wrap">
                                                                                        {category?.icon}
                                                                                    </span>
                                                                                    <p>{category?.label}</p>
                                                                                </li>
                                                                                <span className="top-card_tag">
                                                                                    <span className="top-badge"></span>
                                                                                    <div className='price-card-name'>
                                                                                        <span>${date?.price}</span>
                                                                                        <span className="hour">
                                                                                            <span>{date?.date_length.replace('H', '')}H</span>
                                                                                        </span>
                                                                                    </div>
                                                                                </span>

                                                                            </ul>
                                                                        </div>)
                                                                }) : null}
                                                                {/* </div> */}

                                                                <div className="d-flex align-items-center mb-0 mt-4 header_btn_wrap">
                                                                    <button type="button" onClick={() => router.push('/create-date/choose-city')} className="create-date">Create New Date</button>
                                                                </div>
                                                                <Modal
                                                                    isOpen={dateModalOpen}
                                                                    onRequestClose={dateCloseModal}
                                                                    // style={customStyles}
                                                                    className="date-selected-modal"
                                                                >
                                                                    <div className="model_content verification_card_header mb-3">
                                                                        <SubHeading title="Available dates" />
                                                                        <div className="availabe_card_inner">
                                                                            <ul className="date_list">
                                                                                {selectedDate ?
                                                                                    <>
                                                                                        <li>
                                                                                            <span className="icon_wrap">
                                                                                                {selectedDateCategory?.icon}
                                                                                            </span>
                                                                                            <p>{selectedDateCategory?.label}</p>
                                                                                        </li>
                                                                                        <span className="top-card_tag"><span className="top-badge"></span> ${selectedDate?.price}</span>
                                                                                        <span className="bottom_price_tag">
                                                                                            <h2><sup>H</sup> {selectedDate?.date_length.replace('H', '')}</h2>
                                                                                        </span>
                                                                                    </>
                                                                                    : null}
                                                                            </ul>
                                                                        </div>
                                                                    </div>
                                                                    <div className="model_content verification_card_header">
                                                                        <div className="availabe_card_inner px-4">
                                                                            <ul className="date_action_model">
                                                                                <li onClick={dateCloseModal}>
                                                                                    <BiChevronLeft size={25} color={'white'} />
                                                                                    <span>Go back</span>
                                                                                </li>
                                                                                <li onClick={editDate}>
                                                                                    <BiEditAlt size={20} color={'white'} />
                                                                                    <span>Edit</span>
                                                                                </li>
                                                                                <li onClick={deleteDate}>
                                                                                    <BiTrashAlt size={20} color={'white'} />
                                                                                    <span>Delete</span>
                                                                                </li>
                                                                            </ul>
                                                                        </div>
                                                                    </div>
                                                                </Modal>
                                                            </div>
                                                        </>}
                                                </>
                                                <SubHeading title="About me" />
                                                <div className="image_wrap_slider about_me_card mb-3">
                                                    <div className="about_me_card_inner">
                                                        <div className="inner-box-me">
                                                            <H5>{userDetail?.body_type || user?.body_type}</H5>
                                                            <p>Body Type</p>
                                                        </div>
                                                    </div>
                                                    <div className="about_me_card_inner">
                                                        <div className="inner-box-me">
                                                            <H5>{userDetail?.max_education || user.max_education}</H5>
                                                            <p>Education Completed </p>
                                                        </div>
                                                    </div>
                                                    <div className="about_me_card_inner">
                                                        <div className="inner-box-me">
                                                            <H5>{convertToFeet(userDetail?.height || user?.height).replace('.', "'")}</H5>
                                                            <p>Height</p>
                                                        </div>
                                                    </div>
                                                    <div className="about_me_card_inner">
                                                        <div className="inner-box-me">
                                                            <H5>{userDetail?.is_smoker || user.is_smoker}</H5>
                                                            <p>Smoker</p>
                                                        </div>
                                                    </div>
                                                    <div className="about_me_card_inner">
                                                        <div className="inner-box-me">
                                                            <H5>{userDetail?.ethnicity || user.ethnicity}</H5>
                                                            <p>Ethnicity</p>
                                                        </div>
                                                    </div>
                                                    <div className="about_me_card_inner">
                                                        <div className="inner-box-me">
                                                            <H5>{userDetail?.occupation || user.occupation}</H5>
                                                            <p>Occupation </p>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="more_content pt-3">
                                                    <div className="text-left-more">
                                                        <h6 className="mb-3 text-left-more mt-3 more-about">More about <span>{userDetail?.user_name || user.user_name}</span></h6>
                                                        <svg className="d-none" width="60" height="2" viewBox="0 0 95 2" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M0.110596 1.36728H94.3167" stroke="url(#paint0_linear)"></path><defs><linearGradient id="paint0_linear" x1="105.948" y1="-1.61543" x2="8.2769" y2="-1.61543" gradientUnits="userSpaceOnUse"><stop stop-color="#FA789B" stop-opacity="0.01"></stop><stop offset="0.489981" stop-color="#F02D4E"></stop><stop offset="1" stop-color="#F24362" stop-opacity="0.01"></stop></linearGradient></defs></svg>
                                                        <p>{user.description}</p>
                                                        {preview && <div className="button-wrapper">
                                                            <button type="button" className="edit" onClick={editHandle}>
                                                                <a>Edit</a>
                                                            </button>
                                                            <button className="next" onClick={onSubmit}>
                                                                {loading ? <span className="spin-loader-button"></span> :
                                                                    'Finish'
                                                                }
                                                            </button>
                                                        </div>}
                                                        <div className="member-since">
                                                            <p>Member since {moment(userDetail?.created_at || user?.created_at).format('MMM YYYY')}</p>
                                                        </div>
                                                    </div>
                                                </div>

                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-2"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default reduxForm({
    form: 'UserProfile', // <------ same form name
    destroyOnUnmount: false, // <------ preserve form data
    forceUnregisterOnUnmount: true, // <------ unregister fields on unmount
    validate
})(UserProfile)