import Head from "next/head";
import Link from "next/link";
import React, { useState,useEffect } from 'react';
import Image from "next/image";
import withAuth from "../core/withAuth";
import useWindowSize from "utils/useWindowSize";
import LeSlogoWhite from '../assets/LeS logoWhite.png';
import LeSlogoText from '../assets/img/LeSocietylogotext.png'
import Group29 from '../assets/img/Group 29.png';
import Group30 from '../assets/img/Group 30.png';
import Group140 from '../assets/img/Group 140.png';
import Group96 from '../assets/img/Group 96.png';
import Group152 from '../assets/img/Group 152.png';
//import GentalMan from '../assets/img/GentalMan.png'
import Gentalman from '../assets/img/Gentalman (2).png'
import Ladies from '../assets/img/Ladies.png'
import Goal from '../assets/img/Goal.png'
import Choice from '../assets/img/Choice.png'
import HomePageMainSection from "@/core/HomePageMainSection";
import HomePageCardSection from "@/core/HomePageCardSection";
import HomeFooter from "@/core/HomeFooter"
import { content } from '@/core/HomePageContent'
import HomePageMiddleNav from "@/core/HomePageMiddleNav";
import HomePageCardSectionMobile from "@/core/HomePageCardSectionMobile";

const style1 ={
  opacity:"0.9",
}
const styleBackground = {
  backgroundColor : "#000000"
}
function Home({ items }) {
  const { width } = useWindowSize();
  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.document.body.style.backgroundColor = "#080808";
    }
  }, [])
  return (
    <>
      <div className="inner-part-page auth-section home_page_style">
        <div className="home-page-navbar">
        <nav class="navbar navbar-dark bg-#080808">
          <div className="LeSociety-Icon-White d-flex">
            <div className="ls-logo">
              <Image src={LeSlogoWhite} alt="ls-logo" sizes={10} />
            </div>
            <div className="ls-text">
              <Image className="leSocitey-heading" src={LeSlogoText} sizes={100} />
              <p className="leSocitey-subheading">Date outside Your League</p>
            </div>
          </div>
        </nav>
        </div>
        <HomePageMainSection title="GENTLEMEN" maincardImage={Gentalman}>
        <p className="aboutCardContent">{content.aboutCardContent}</p>
      </HomePageMainSection>
      <HomePageMiddleNav style={style1}/>
      <HomePageMainSection title="LADIES" maincardImage={Ladies}>
        <div className='main-content'>
          <p className="aboutCardContent" style={{padding:"30px 40px"}}>{content.aboutCardContent1}</p>
          <p className="aboutCardContent"  style={{padding:"10px 30px"}}>{content.aboutCardContent4}</p>
          <p className="aboutCardContent" style={{ textAlign: "center", fontSize: "16px", color: "#a2a2a2" }}>{content.aboutCardContent5}</p>
          <div className='main-content-icon'>
            <div class="row align-items-center justify-content-evenly mt-3">
              <div class="col-4"  style={{maxWidth:"120px",textAlign:"center"}}>
                <img src={Group96.src} alt="icon-img" height={25} width={25} />
                <p style={{fontFamily:"Montserrat", fontSize: "16px",}}>Brunch <br /> Date</p>
              </div>
              <div class="col-4" style={{maxWidth:"120px" ,textAlign:"center"}}>
                <img src={Group152.src} alt="icon-img" height={25} width={25} />
                <p style={{fontFamily:"Montserrat", fontSize: "16px" }}>Entertainment <br />
                  & Sports</p>
              </div>
              <div class="col-4"  style={{maxWidth:"120px" ,textAlign:"center"}}>
                <img src={Group140.src} alt="icon-img" height={25} width={25} />
                <p style={{fontFamily:"Montserrat", fontSize: "16px" }}>Take A <br />Class</p>
              </div>
            </div>
            <div class="row align-items-center justify-content-center mt-3">
              <div class="col-6"  style={{maxWidth:"120px",textAlign:"center"}}>
                <img src={Group29.src} alt="icon-img" height={25} width={25} />
                <p style={{fontFamily:"Montserrat", fontSize: "16px" }}>Bottles <br />
                  & Dance</p>
              </div>
              <div class="col-6"  style={{maxWidth:"120px",textAlign:"center"}}>
                <img src={Group30.src} alt="icon-img" height={25} width={25} />
                <p style={{fontFamily:"Montserrat", fontSize: "16px",textAlign:"center" }}>Wine <br />
                  & Dine</p>
              </div>
            </div>
          </div>
        </div>
      </HomePageMainSection>
      <HomePageMainSection title="THE GOAL" maincardImage={Goal}>
        <p className="aboutCardContent">{content.aboutCardContent2}</p>
      </HomePageMainSection>
      <HomePageMainSection title="A GENTLEMEN’S CHOICE" maincardImage={Choice}>
        <p className="aboutCardContent">{content.aboutCardContent3}</p>
      </HomePageMainSection>
     {/* { width >768 ? <HomePageCardSection /> :<HomePageCardSectionMobile/> } */}
      <HomePageCardSection/>
      <HomeFooter logo={LeSlogoWhite}  styleBackground ={styleBackground} />
      </div>
     </>
  );
}
export default withAuth(Home);
