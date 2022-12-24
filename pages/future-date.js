import React, { useState } from 'react'
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import withAuth from "../core/withAuth";
import LeSlogoWhite from '../assets/LeS logoWhite.png';
import FutureDates from '@/core/FutureDates';
import HomePageMiddleNav from "@/core/HomePageMiddleNav";
import FutureDateMain from '@/core/FutureDateMain';
import HomeFooter from "@/core/HomeFooter"


const futureDatesContent = {
  futureDatesContent1: {
    title: "The Future of Dating",
    datingContent: "Le Society is the fastest way to secure your dream date. By creating features that enhance the dating experience, security, and transparency, our team is committed to providing a service that benefits all parties.  See how we are raising the bar."
  },
  futureDatesContent2: {
    title: "OUR MISSION",
    datingContent: "It’s time to uberize the dating industry and bridge the gap between beautiful women and regular men that can sometimes be overlooked. A service that empowers women, allowing them to benefit from financial incentives in exchange for their time providing companionship for any occasion or even the opportunity for a long-term relationship. Thus, creating a dating service that not only benefits and incentivizes both parties, but allows men to secure their dream dates faster than any other platform."
  }

};

function FutureDate() {
  return (
    <>
      <div className="inner-part-page auth-section">
        <nav class="navbar navbar-dark bg-black">
          <div className="LeSociety-Icon-White d-flex" style={{ padding: "0px 75px" }}>
            <div className="ls-logo">
              <Image src={LeSlogoWhite} alt="ls-logo" sizes={10} />
            </div>
          </div>
        </nav>
        <FutureDates title={futureDatesContent.futureDatesContent1.title}
          contentaboutDating={futureDatesContent.futureDatesContent1.datingContent} />
        <FutureDateMain />
        <HomePageMiddleNav />
        <FutureDateMain />
        <FutureDates title={futureDatesContent.futureDatesContent2.title}
          contentaboutDating={futureDatesContent.futureDatesContent2.datingContent} />
        <HomeFooter logo={LeSlogoWhite} height={50} />
      </div>
    </>
  )
}

export default (FutureDate);