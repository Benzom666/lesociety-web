import Head from "next/head";
import Link from "next/link";
import React, { useState } from 'react';
import Image from "next/image";
import withAuth from "../core/withAuth";
import LeSlogoWhite from '../assets/LeS logoWhite.png';
import Group556 from '../assets/img/Group 556.png';
import Group557 from '../assets/img/Group 557.png';
import Group558 from '../assets/img/Group 558.png';
import Group567 from '../assets/img/Group 567.png';
import Group579 from '../assets/img/Group 579.png';
import MaskGroup1 from '../assets/svg/Mask Group 1.svg';
import MaskGroup7 from '../assets/svg/Mask Group 7.svg';
import MaskGroup11 from '../assets/svg/Mask Group 11.svg';
import MaskGroup14 from '../assets/svg/Mask Group 14.svg';
import HomePageMainSection from "@/core/HomePageMainSection";
import HomePageCardSection from "@/core/HomePageCardSection";
import HomeFooter from "@/core/HomeFooter"
import { content } from '@/core/HomePageContent'
import HomePageMiddleNav from "@/core/HomePageMiddleNav";

function Home({ items }) {
  return (
    <>
      <div className="inner-part-page auth-section">
        <nav class="navbar navbar-dark bg-black">
          <div className="LeSociety-Icon-White d-flex" style={{padding:" 0px 75px"}}>
            <div className="ls-logo">
              <Image src={LeSlogoWhite} alt="ls-logo" sizes={10} />
            </div>
            <div className="ls-text mt-4 ">
              <p style={{ letterSpacing: "2.2px" }}> L E   S O C I E T Y </p>
              <p style={{ fontSize: "13px" }}>Date outside Your League</p>
            </div>
          </div>
        </nav>
        <HomePageMainSection title="GENTLE MAN" maincardImage={MaskGroup1}>
        <p className="aboutCardContent">{content.aboutCardContent}</p>
      </HomePageMainSection>
      <HomePageMiddleNav/>
      <HomePageMainSection title="LADIES" maincardImage={MaskGroup7}>
        <div className='main-content'>
          <p className="aboutCardContent">{content.aboutCardContent1}</p>
          <p className="aboutCardContent">{content.aboutCardContent4}</p>
          <p style={{ textAlign: "center", fontSize: "16px", color: "#a2a2a2" }}>{content.aboutCardContent5}</p>
          <div className='main-content-icon'>
            <div class="row align-items-center justify-content-evenly mt-3">
              <div class="col"  style={{maxWidth:"120px",textAlign:"center"}}>
                <img src={Group567.src} alt="icon-img" height={35} width={35} />
                <p style={{ fontSize: "16px" }}>Brunch <br /> Date</p>
              </div>
              <div class="col" style={{maxWidth:"120px" ,textAlign:"center"}}>
                <img src={Group557.src} alt="icon-img" height={35} width={35} />
                <p style={{ fontSize: "16px" }}>Entertainment <br />
                  & Sports</p>
              </div>
              <div class="col"  style={{maxWidth:"120px" ,textAlign:"center"}}>
                <img src={Group556.src} alt="icon-img" height={35} width={35} />
                <p style={{ fontSize: "16px" }}>Take A <br />Class</p>
              </div>
            </div>
            <div class="row align-items-center justify-content-center mt-3">
              <div class="col"  style={{maxWidth:"120px",textAlign:"center"}}>
                <img src={Group579.src} alt="icon-img" height={35} width={35} />
                <p style={{ fontSize: "16px" }}>Bottles <br />
                  & Dance</p>
              </div>
              <div class="col"  style={{maxWidth:"120px",textAlign:"center"}}>
                <img src={Group558.src} alt="icon-img" height={35} width={35} />
                <p style={{ fontSize: "16px",textAlign:"center" }}>Wine <br />
                  & Dine</p>
              </div>
            </div>
          </div>
        </div>
      </HomePageMainSection>
      <HomePageMainSection title="THE GOAL" maincardImage={MaskGroup14}>
        <p className="aboutCardContent">{content.aboutCardContent2}</p>
      </HomePageMainSection>
      <HomePageMainSection title="A Gentlemen’s Choice" maincardImage={MaskGroup11}>
        <p className="aboutCardContent">{content.aboutCardContent3}</p>
      </HomePageMainSection>
      <HomePageCardSection />
      <HomeFooter logo={LeSlogoWhite} height={50} />
      </div>
     </>
  );
}
export default withAuth(Home);
