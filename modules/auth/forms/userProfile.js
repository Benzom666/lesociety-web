import React, { useState } from 'react';
import HeaderLoggedIn from 'core/loggedInHeader'
import { useSelector, useDispatch } from 'react-redux';
import { BiChevronLeft, BiTrashAlt, BiEditAlt } from "react-icons/bi";
import Image from 'next/image'
import { HiBadgeCheck } from 'react-icons/hi';
import { Field, reduxForm } from 'redux-form'
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

function UserProfile({ preview, editHandle }) {
    const [selectedImage, setSelectedImage] = useState(null);
    const { width } = useWindowSize();
    const [modalIsOpen, setIsOpen] = React.useState(false);
    const [loading, setLoading] = React.useState(false);
    const [dateModalOpen, dateSetIsOpen] = React.useState(false);
    const user = useSelector(state => state.authReducer.user)
    const dispatch = useDispatch();

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
    }

    const onSubmit = () => {
        dispatch(signupStep4({email: user?.email, step_completed: 4}, setLoading))
    }

    const customStyles = {
        content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
        },
    };
    return (
        <div className="inner-page">
            {!preview && <HeaderLoggedIn />}
            <div className="inner-part-page">
                <div className="pt-2 pb-0 pt-5-lg-4 pb-5-lg-4">
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
                                                                src={user.images[0]}
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
                                                </div>
                                            </figure>
                                        )}
                                    </div>
                                    <div className="col-xl-8 col-lg-7 col-md-12 col-12 padd0-responsive">
                                        <div className="userdetails resposnive-data-profile">
                                            <h4>{user.user_name}, <span className="user_age">{user.age}</span></h4>
                                            {width > 991 && (
                                                <p>{user?.tagline}</p>
                                            )}
                                            {width < 991 && (
                                                <div className="text-center">
                                                    <svg width="60" height="2" viewBox="0 0 95 2" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M0.110596 1.36728H94.3167" stroke="url(#paint0_linear)"></path><defs><linearGradient id="paint0_linear" x1="105.948" y1="-1.61543" x2="8.2769" y2="-1.61543" gradientUnits="userSpaceOnUse"><stop stop-color="#FA789B" stop-opacity="0.01"></stop><stop offset="0.489981" stop-color="#F02D4E"></stop><stop offset="1" stop-color="#F24362" stop-opacity="0.01"></stop></linearGradient></defs></svg>
                                                </div>
                                            )}
                                            <div className="selct-wrap-sort mx-3">
                                                <span>{user?.location}</span>
                                            </div>
                                            <div className="user-images-wrap mt-1 mt-lg-4 user_img_profile">
                                                <figure className="user_img_profile show-responsive_div pt-2 pt-lg-3">
                                                    <div className="big-image">
                                                        <label>
                                                            <>
                                                                <div className="pos-relative">
                                                                    <Image
                                                                        src={user.images[0]}
                                                                        alt="user image"
                                                                        width={240}
                                                                        height={300}
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
                                                <div className="image_wrap_slider pt-3 pb-4">
                                                    <figure>
                                                        <Image
                                                            src={user.images[1]}
                                                            alt="user image"
                                                            width={160}
                                                            height={150}
                                                        />
                                                    </figure>
                                                    <figure>
                                                        <Image
                                                            src={user.images[2]}
                                                            alt="user image"
                                                            width={160}
                                                            height={150}
                                                        />
                                                    </figure>
                                                    <figure>
                                                        <Image
                                                            src={user.images[3]}
                                                            alt="user image"
                                                            width={160}
                                                            height={150}
                                                        />
                                                    </figure>
                                                </div>
                                                <>
                                                    <h4 className="mb-5 mt-4">{user?.tagline}</h4>
                                                   
                                                    {!preview && 
                                                    <>
                                                     <SubHeading title="Available dates" />
                                                    <div className="verification_card_header text-center mb-5 mt-4">
                                                        <div className="availabe_card_inner">
                                                            <ul className="date_list">
                                                                <li>
                                                                    <span className="icon_wrap">
                                                                        <CustomIcon.OutdoorAdventure color={'#fff'} size={30} />
                                                                    </span>
                                                                    <p>Adventure</p>
                                                                </li>
                                                                <li>
                                                                    <span className="icon_wrap">
                                                                        <CustomIcon.Sporty color={'#fff'} size={30} />
                                                                    </span>
                                                                    <p>Get Sporty</p>
                                                                </li>
                                                            </ul>
                                                            <span className="top-card_tag"><span className="top-badge"></span> $80</span>
                                                            <span className="bottom_price_tag">
                                                                <h2><sup>HR</sup> 2</h2>
                                                            </span>
                                                        </div>
                                                        <div className="d-flex align-items-center mb-0 mt-4 header_btn_wrap">
                                                            <button type="button" onClick={dateModalIsOpen} className="create-date">Create New Date</button>
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
                                                                        <li>
                                                                            <span className="icon_wrap">
                                                                                <CustomIcon.OutdoorAdventure color={'#fff'} size={30} />
                                                                            </span>
                                                                            <p>Adventure</p>
                                                                        </li>
                                                                        <li>
                                                                            <span className="icon_wrap">
                                                                                <CustomIcon.Sporty color={'#fff'} size={30} />
                                                                            </span>
                                                                            <p>Get Sporty</p>
                                                                        </li>
                                                                    </ul>
                                                                    <span className="top-card_tag"><span className="top-badge"></span> $80</span>
                                                                    <span className="bottom_price_tag">
                                                                        <h2><sup>HR</sup> 2</h2>
                                                                    </span>
                                                                </div>
                                                            </div>
                                                            <div className="model_content verification_card_header">
                                                                <div className="availabe_card_inner px-4">
                                                                    <ul className="date_action_model">
                                                                        <li onClick={dateCloseModal}>
                                                                            <BiChevronLeft size={25} color={'white'} />
                                                                            <span>Go back</span>
                                                                        </li>
                                                                        <li>
                                                                            <BiEditAlt size={20} color={'white'} />
                                                                            <span>Edit</span>
                                                                        </li>
                                                                        <li>
                                                                            <BiTrashAlt size={20} color={'white'} />
                                                                            <span>Delete</span>
                                                                        </li>
                                                                    </ul>
                                                                </div>
                                                            </div>
                                                        </Modal>
                                                    </div> 
                                                    </> }
                                                </>
                                                <SubHeading title="About me" />
                                                <div className="image_wrap_slider about_me_card mb-3">
                                                    <div className="about_me_card_inner">
                                                        <div className="inner-box-me">
                                                            <H5>{user?.body_type}</H5>
                                                            <p>Body Type</p>
                                                        </div>
                                                    </div>
                                                    <div className="about_me_card_inner">
                                                        <div className="inner-box-me">
                                                            <H5>{user.max_education}</H5>
                                                            <p>Education Completed </p>
                                                        </div>
                                                    </div>
                                                    <div className="about_me_card_inner">
                                                        <div className="inner-box-me">
                                                            <H5>{convertToFeet(user?.height).replace('.', "'")}</H5>
                                                            <p>Height</p>
                                                        </div>
                                                    </div>
                                                    <div className="about_me_card_inner">
                                                        <div className="inner-box-me">
                                                            <H5>{user.is_smoker}</H5>
                                                            <p>Smoker</p>
                                                        </div>
                                                    </div>
                                                    <div className="about_me_card_inner">
                                                        <div className="inner-box-me">
                                                            <H5>{user.ethnicity}</H5>
                                                            <p>Ethnicity</p>
                                                        </div>
                                                    </div>
                                                    <div className="about_me_card_inner">
                                                        <div className="inner-box-me">
                                                            <H5>{user.occupation}</H5>
                                                            <p>Occupation </p>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="more_content pt-3">
                                                    <div className="text-center">
                                                        <h6 className="mb-0">More about {user.user_name}</h6>
                                                        <svg width="60" height="2" viewBox="0 0 95 2" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M0.110596 1.36728H94.3167" stroke="url(#paint0_linear)"></path><defs><linearGradient id="paint0_linear" x1="105.948" y1="-1.61543" x2="8.2769" y2="-1.61543" gradientUnits="userSpaceOnUse"><stop stop-color="#FA789B" stop-opacity="0.01"></stop><stop offset="0.489981" stop-color="#F02D4E"></stop><stop offset="1" stop-color="#F24362" stop-opacity="0.01"></stop></linearGradient></defs></svg>
                                                        <p>{user.description}</p>
                                                        <div className="button-wrapper">
                                                        <button type="button" className="edit" onClick={editHandle}>
                                                            <a>Edit</a>
                                                        </button>
                                                        <button className="next" onClick={onSubmit}>
                                                        {loading ? <span className="spin-loader-button"></span> : 
                                                            'Next'
                                                        }
                                                        </button>
                                                        </div>
                                                        <div className="member-since">
                                                            <p>Member since {moment(user?.created_at).format('MMM YYYY')}</p>
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