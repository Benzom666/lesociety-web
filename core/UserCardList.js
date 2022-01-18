import React, { useState} from "react";
import UserImg from 'assets/img/profile.png';
import UserImg3 from 'assets/img/user-3.png';
import UserImg4 from 'assets/img/user-4.png';
import Image from 'next/image'
import { CustomIcon } from 'core/icon';
import Modal from 'react-modal';
import Link from 'next/link'
import H5 from "./H5";
import { IoIosClose } from "react-icons/io";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { HiLockOpen } from "react-icons/hi";


const UserCardList = (props) => {
const [modalIsOpen, setIsOpen] = React.useState(false);

 function openModal() {
    setIsOpen(true);
  }
  function closeModal() {
    setIsOpen(false);
  }
  const settings = {
    dots: false,
    arrows:false,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    centerMode: true,
    centerPadding:'0'

  };
  const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      width:'310px',
      background:'transparent',
      height:'100%'
    },
  };
    return (
            <>
                <div className="date_card_wrap" onClick={openModal}>
                    <figure className="user_img_date">
                        <Image
                            src={UserImg}
                            alt="user image"
                            width={500}
                            height={500}
                        />
                        <div className="user-details">
                            <h5>Anna, <span className="user_age">21</span></h5>
                            <div className="user_location">
                                <span className="d-flex align-items-start">
                                    <span className="address-wrap">
                                        <svg width="12" height="17" viewBox="0 0 12 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path fill-rule="evenodd" clip-rule="evenodd" d="M0.214355 5.46429C0.214355 6.36877 0.440493 7.26558 0.870389 8.06101L5.37983 16.2167C5.43986 16.3255 5.55425 16.3928 5.67864 16.3928C5.80303 16.3928 5.91743 16.3255 5.97746 16.2167L10.4886 8.05832C10.9168 7.26558 11.1429 6.36874 11.1429 5.46425C11.1429 2.45134 8.69159 0 5.67864 0C2.66569 0 0.214355 2.45134 0.214355 5.46429ZM2.94651 5.46429C2.94651 3.95781 4.17217 2.73216 5.67864 2.73216C7.18512 2.73216 8.41077 3.95781 8.41077 5.46429C8.41077 6.97076 7.18512 8.19641 5.67864 8.19641C4.17217 8.19641 2.94651 6.97076 2.94651 5.46429Z" fill="#F24462"/>
                                        </svg>
                                        <span className="address px-2">Toronto. ON</span>   
                                    </span>
                                    <span className="price_per_hour">
                                        $80 / <small>2hr</small>
                                    </span>
                                </span>
                            </div>
                            <div className="tag_wrap">
                                <ul>
                                    <li>
                                        <CustomIcon.Sporty color={'#fff'} size={20}/>
                                        <span>Get sporty</span>
                                    </li>
                                    <li>
                                        <CustomIcon.OutdoorAdventure color={'white'} size={20}/>
                                        <span>Adventure</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </figure>  
                </div>  
                <Modal
                    isOpen={modalIsOpen}
                    onRequestClose={closeModal}
                    style={customStyles}
                    className="intrested_model"
                >
                    <div className="model_content">
                        <IoIosClose size={25} className="close_btn" onClick={closeModal} color={'#A8A8A8'}/>
                        <H5>Clark Kent is</H5>
                        <CustomIcon.IntrestedText color={'white'} size={140}/> 
                        <Slider {...settings}>
                            <div>
                                <figure>
                                    <Image
                                        src={UserImg}
                                        alt="user image"
                                        width={500}
                                        height={600}
                                    /> 
                                    <span className="image_tagline">
                                        “I want to reveal my secret. I am Superman.”
                                    </span>    
                                </figure>  
                            </div>
                            <div>
                                <figure>
                                    <Image
                                        src={UserImg3}
                                        alt="user image"
                                        width={500}
                                        height={600}
                                    /> 
                                    <span className="image_tagline">
                                        “I want to reveal my secret. I am Superman.”
                                    </span>    
                                </figure>  
                            </div>
                            <div>
                                <figure>
                                    <Image
                                        src={UserImg4}
                                        alt="user image"
                                        width={500}
                                        height={600}
                                    /> 
                                    <span className="image_tagline">
                                        “I want to reveal my secret. I am Superman.”
                                    </span>    
                                </figure>  
                            </div>
                            <div>
                                <figure>
                                    <Image
                                        src={UserImg}
                                        alt="user image"
                                        width={500}
                                        height={600}
                                    /> 
                                    <span className="image_tagline">
                                        “I want to reveal my secret. I am Superman.”
                                    </span>    
                                </figure>  
                            </div>
                        </Slider>
                        <div className="d-flex align-items-center my-4 header_btn_wrap">
                            <Link href="/messages"><a className="create-date">REPLY BACK</a></Link>
                        </div>
                        <div className="my-4 bottom_content">
                            <Link href="/user/user-profile"><a className="view_profile"><HiLockOpen /> View Profile</a></Link>
                            <p>Clark Kent has granted you the access to his profile</p>
                        </div>
                    </div>
                </Modal>  
            </> 
    );
  }
  
  export default UserCardList
  
  
  
  