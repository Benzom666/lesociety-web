import Head from "next/head";
import Link from "next/link";
import React, { useState } from 'react';
import Image from "next/image";
import withAuth from "../core/withAuth";
import LeSlogoWhite from '../assets/LeS logoWhite.png';
import Group29 from '../assets/img/Group 29.png';
import Group30 from '../assets/img/Group 30.png';
import Group140 from '../assets/img/Group 140.png';
import Group96 from '../assets/img/Group 96.png';
import Group152 from '../assets/img/Group 152.png';
import MaskGroup1 from '../assets/svg/Mask Group 1.svg';
import MaskGroup7 from '../assets/svg/Mask Group 7.svg';
import MaskGroup11 from '../assets/svg/Mask Group 11.svg';
import MaskGroup14 from '../assets/svg/Mask Group 14.svg';
import FirstBlob from '../assets/svg/First Blob.svg'
import SecondBlob from '../assets/svg/Second Blob.svg'
import ThirdBlob from '../assets/svg/Third Blob.svg'
import ForthBlob from '../assets/svg/Forth Blob.svg'
import HomePageMainSection from "@/core/HomePageMainSection";
import HomePageCardSection from "@/core/HomePageCardSection";
import HomeFooter from "@/core/HomeFooter"
import { content } from '@/core/HomePageContent'
import HomePageMiddleNav from "@/core/HomePageMiddleNav";

const style1 ={
  opacity:"0.9",
}

function Home({ items }) {
  return (
    <>
      <div className="inner-part-page auth-section home_page_style">
        <nav class="navbar navbar-dark bg-black">
          <div className="LeSociety-Icon-White d-flex" style={{padding:" 0px 75px"}}>
            <div className="ls-logo">
              <Image src={LeSlogoWhite} alt="ls-logo" sizes={10} />
            </div>
            <div className="ls-text mt-4 ">
              <p className="leSocitey-heading">LE SOCIETY</p>
              <p className="leSocitey-subheading">Date outside Your League</p>
            </div>
          </div>
        </nav>
        <HomePageMainSection title="GENTLEMEN" maincardImage={MaskGroup1} 
        mainBackgroundImage={FirstBlob.src} styles={"home-main-sec-1"}>
        <p className="aboutCardContent">{content.aboutCardContent}</p>
      </HomePageMainSection>
      {/* <HomePageMiddleNav style={style1}/> */}
      <HomePageMainSection title="LADIES" maincardImage={MaskGroup7}
      mainBackgroundImage={SecondBlob.src} styles={"home-main-sec-2"}
      >
        <div className='main-content'>
          <p className="aboutCardContent">{content.aboutCardContent1}</p>
          <p className="aboutCardContent">{content.aboutCardContent4}</p>
          <p style={{ textAlign: "center", fontSize: "16px", color: "#a2a2a2" }}>{content.aboutCardContent5}</p>
          <div className='main-content-icon'>
            <div class="row align-items-center justify-content-evenly mt-3">
              <div class="col"  style={{maxWidth:"120px",textAlign:"center"}}>
                <img src={Group96.src} alt="icon-img" height={35} width={35} />
                <p style={{ fontSize: "16px" }}>Brunch <br /> Date</p>
              </div>
              <div class="col" style={{maxWidth:"120px" ,textAlign:"center"}}>
                <img src={Group152.src} alt="icon-img" height={35} width={35} />
                <p style={{ fontSize: "16px" }}>Entertainment <br />
                  & Sports</p>
              </div>
              <div class="col"  style={{maxWidth:"120px" ,textAlign:"center"}}>
                <img src={Group140.src} alt="icon-img" height={35} width={35} />
                <p style={{ fontSize: "16px" }}>Take A <br />Class</p>
              </div>
            </div>
            <div class="row align-items-center justify-content-center mt-3">
              <div class="col"  style={{maxWidth:"120px",textAlign:"center"}}>
                <img src={Group29.src} alt="icon-img" height={35} width={35} />
                <p style={{ fontSize: "16px" }}>Bottles <br />
                  & Dance</p>
              </div>
              <div class="col"  style={{maxWidth:"120px",textAlign:"center"}}>
                <img src={Group30.src} alt="icon-img" height={35} width={35} />
                <p style={{ fontSize: "16px",textAlign:"center" }}>Wine <br />
                  & Dine</p>
              </div>
            </div>
          </div>
        </div>
      </HomePageMainSection>
      <HomePageMainSection title="THE GOAL" maincardImage={MaskGroup14}
       mainBackgroundImage={ThirdBlob.src} styles={"home-main-sec-3"}>
        <p className="aboutCardContent">{content.aboutCardContent2}</p>
      </HomePageMainSection>
      <HomePageMainSection title="A Gentlemen’s Choice" maincardImage={MaskGroup11}
      mainBackgroundImage={ForthBlob.src} styles={"home-main-sec-4"} >
        <p className="aboutCardContent">{content.aboutCardContent3}</p>
      </HomePageMainSection>
      <HomePageCardSection />
      <HomeFooter logo={LeSlogoWhite} height={50} />
      </div>
     </>
  );
}
export default withAuth(Home);
