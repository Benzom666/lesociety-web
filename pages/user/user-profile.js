import React, { useState } from 'react';
import HeaderLoggedIn from 'core/loggedInHeader'
import UserImg from 'assets/img/userimg.jpg';
import UserImg2 from 'assets/img/profile.png';
import UserImg3 from 'assets/img/user-3.png';
import UserImg4 from 'assets/img/user-4.png';
import { FiPlus } from "react-icons/fi";
import { BiChevronLeft ,BiTrashAlt, BiEditAlt } from "react-icons/bi";
import Image from 'next/image'
import { HiBadgeCheck } from 'react-icons/hi';
import { Field, reduxForm } from 'redux-form'
import { Inputs } from 'core';
import validate from 'modules/auth/forms/validate/validate'
import H5 from '@/core/H5';
import SubHeading from '@/core/SubHeading';
import useWindowSize from "utils/useWindowSize";
import { CustomIcon } from 'core/icon';
import Modal from 'react-modal';
import Link from 'next/link'
 
const imageRequired = value => (!value ? "asd.jpg" : 'asd');

function UserProfile ({dispatch} ) {
    const [selectedImage, setSelectedImage] = useState(null);
    const { width } = useWindowSize();
    const [modalIsOpen, setIsOpen] = React.useState(false);
    const [dateModalOpen, dateSetIsOpen] = React.useState(false);
    
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
      <HeaderLoggedIn />
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
                                                <Field
                                                name="imageUpload"
                                                component={Inputs.uploadFileField}
                                                type="file"
                                                validate={[imageRequired]}
                                                value = {selectedImage}
                                                onChange={(event) => {
                                                    console.log(event.target.files[0]);
                                                    setSelectedImage(event.target.files[0]);
                                                }}
                                                />
                                                {selectedImage ?
                                                <div className="pos-relative">
                                                    <img alt="not fount" width={"250px"} src={URL.createObjectURL(selectedImage)} />
                                                    <span className="verified_check_tag">
                                                        <HiBadgeCheck color={'white'} size={20} />
                                                        Verified
                                                    </span>
                                                </div>
                                                : <>
                                                    <div className="pos-relative">
                                                        <Image
                                                            src={UserImg}
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
                                                }
                                                <div className="d-flex align-items-center my-4 header_btn_wrap">
                                                    <button className="add_photo"><FiPlus size={15} /> Add photo</button>
                                                </div> 
                                            </label>
                                        </div>
                                    </figure> 
                                )}  
                                </div>
                                <div className="col-xl-8 col-lg-7 col-md-12 col-12 padd0-responsive">
                                    <div className="userdetails resposnive-data-profile">
                                        <h4>Anna Jonson, <span className="user_age">21</span></h4>
                                        {width > 991 && (
                                            <p>Money CAN buy happiness</p>
                                        )}
                                            {width < 991 && (
                                            <div className="text-center">        
                                                 <svg width="60" height="2" viewBox="0 0 95 2" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M0.110596 1.36728H94.3167" stroke="url(#paint0_linear)"></path><defs><linearGradient id="paint0_linear" x1="105.948" y1="-1.61543" x2="8.2769" y2="-1.61543" gradientUnits="userSpaceOnUse"><stop stop-color="#FA789B" stop-opacity="0.01"></stop><stop offset="0.489981" stop-color="#F02D4E"></stop><stop offset="1" stop-color="#F24362" stop-opacity="0.01"></stop></linearGradient></defs></svg>
                                            </div>       
                                        )} 
                                        <div className="selct-wrap-sort mx-3">
                                            <select  id="select-location">
                                                <option>Toronto</option>
                                                <option>Nexaty</option>
                                                <option>Zoronyo</option>
                                                <option>Toronto</option>
                                                <option>Yokyoro</option>
                                            </select>
                                        </div>
                                        <div className="user-images-wrap mt-1 mt-lg-4 user_img_profile">
                                            <figure className="user_img_profile show-responsive_div pt-2 pt-lg-3">
                                                <div className="big-image">
                                                    <label>
                                                        <Field
                                                        name="imageUpload"
                                                        component={Inputs.uploadFileField}
                                                        type="file"
                                                        validate={[imageRequired]}
                                                        value = {selectedImage}
                                                        onChange={(event) => {
                                                            console.log(event.target.files[0]);
                                                            setSelectedImage(event.target.files[0]);
                                                        }}
                                                        />
                                                        {selectedImage ?
                                                        <div className="pos-relative">
                                                            <img alt="not fount" width={"250px"} src={URL.createObjectURL(selectedImage)} />
                                                            <span className="verified_check_tag">
                                                                <HiBadgeCheck color={'white'} size={20} />
                                                                Verified
                                                            </span>
                                                        </div>
                                                        : <>
                                                            <div className="pos-relative">
                                                                <Image
                                                                    src={UserImg}
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
                                                        }
                                                        {width > 991 && (
                                                            <div className="d-flex align-items-center my-4 header_btn_wrap">
                                                                <button className="add_photo"><FiPlus size={15} /> Add photo</button>
                                                            </div> 
                                                        )}    
                                                    </label>
                                                </div>
                                            </figure>
                                            <div className="image_wrap_slider pt-3 pb-4">
                                                <figure>
                                                    <Image
                                                        src={UserImg3}
                                                        alt="user image"
                                                        width={160}
                                                        height={150}
                                                    />
                                                </figure>
                                                <figure>
                                                    <Image
                                                        src={UserImg2}
                                                        alt="user image"
                                                        width={160}
                                                        height={150}
                                                    />
                                                </figure>
                                                <figure>
                                                    <Image
                                                        src={UserImg4}
                                                        alt="user image"
                                                        width={160}
                                                        height={150}
                                                    />
                                                </figure>  
                                            </div>
                                            {width < 991 && (   
                                                <>
                                                    <h4 className="mb-5 mt-4">“Money CAN Buy Happiness”</h4>
                                                    <SubHeading title="Available dates" />
                                                    <div className="verification_card_header text-center mb-5 mt-4">
                                                        <div className="mb-2">
                                                            <CustomIcon.ChampaignCaviar color={'#AFABAB'} size={50} />
                                                        </div>
                                                        <SubHeading title="Your dates are stored here" />
                                                        <div className="d-flex align-items-center mb-0 mt-3 header_btn_wrap">
                                                            <button type="button" onClick={openModal} className="create-date">Create New Date</button>
                                                        </div>
                                                        <Modal
                                                            isOpen={modalIsOpen}
                                                            onRequestClose={closeModal}
                                                            style={customStyles}
                                                        >
                                                            <div className="model_content">
                                                                <div className="icon_wrap">
                                                                    <CustomIcon.Diamond color={'#fff'} size={70} />    
                                                                </div>
                                                                <H5>What are you waiting for?</H5>
                                                                <SubHeading title="Post your own date and start earning now" />
                                                                <div className="d-flex align-items-center my-4 header_btn_wrap">
                                                                    <Link href="/create-date/choose-city"><a className="create-date">Create New Date</a></Link>
                                                                </div>
                                                            </div>
                                                        </Modal>
                                                    </div> 
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
                                                </>   
                                            )}     
                                            <SubHeading title="About me" />
                                            <div className="image_wrap_slider about_me_card mb-3">
                                                <div className="about_me_card_inner">
                                                    <div className="inner-box-me">
                                                        <H5>Curvy</H5>
                                                        <p>Body Type</p>
                                                    </div>
                                                </div>
                                                <div className="about_me_card_inner">
                                                    <div className="inner-box-me">
                                                        <H5>University</H5>
                                                        <p>Education Completed </p>
                                                    </div>
                                                </div>
                                                <div className="about_me_card_inner">
                                                    <div className="inner-box-me">
                                                        <H5>5'7</H5>
                                                        <p>Height</p>
                                                    </div>
                                                </div>
                                                <div className="about_me_card_inner">
                                                    <div className="inner-box-me">
                                                        <H5>No</H5>
                                                        <p>Smoker</p>
                                                    </div>
                                                </div>
                                                <div className="about_me_card_inner">
                                                    <div className="inner-box-me">
                                                        <H5>Mixed</H5>
                                                        <p>Ethnicity</p>
                                                    </div>
                                                </div>
                                                <div className="about_me_card_inner">
                                                    <div className="inner-box-me">
                                                        <H5>Finance</H5>
                                                        <p>Occupation </p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="more_content pt-3">
                                                <div className="text-center">
                                                    <h6 className="mb-0">More about AnnaJonson</h6>
                                                    <svg width="60" height="2" viewBox="0 0 95 2" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M0.110596 1.36728H94.3167" stroke="url(#paint0_linear)"></path><defs><linearGradient id="paint0_linear" x1="105.948" y1="-1.61543" x2="8.2769" y2="-1.61543" gradientUnits="userSpaceOnUse"><stop stop-color="#FA789B" stop-opacity="0.01"></stop><stop offset="0.489981" stop-color="#F02D4E"></stop><stop offset="1" stop-color="#F24362" stop-opacity="0.01"></stop></linearGradient></defs></svg>
                                                    <p>Business owner and part-time student looking for someone to enjoy my free time with. Love to travel and I’m always down to try something new.</p>
                                                    <div className="member-since">
                                                        <p>Member since Jan 2021</p>
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