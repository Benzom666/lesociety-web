import React, { useState, useEffect } from "react";
import withAuth from "../core/withAuth";
import Image from "next/image";
import useWindowSize from "utils/useWindowSize";
import LeSlogoBlack from "../assets/LeS logo Black.png";
import LeSlogoWhite from "../assets/LeS logoWhite.png";
import HomePageMiddleNav from "@/core/HomePageMiddleNav";
import HomeFooter from "@/core/HomeFooter";
import { HowItWorkMain, contentObject } from "@/core/HowItWorkComponent";
import { HowitWorkCardComponent } from "@/core/HowitWorkCardComponent";

const style2 = {
  color: "#fff",
  fontSize: "18px",
};

const style3 = {
  backgroundColor: "#030303",
};
function HowItWork() {
  const { width } = useWindowSize();

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.document.body.style.backgroundColor = "#f2f5f7";
      window.document.body.style.color = "black";
    }
  }, []);
  return (
    <>
      <div className="inner-part-page auth-section how-it-works">
        <nav class="navbar navbar-light bg-#f2f5f7 mb-2">
          <div className="LeSociety-Icon-White d-flex">
            <div className="ls-logo">
              <Image src={LeSlogoBlack} alt="ls-logo" sizes={10} />
            </div>
            <div className="ls-text mt-4 ">
              <p> How it Works</p>
            </div>
          </div>
        </nav>
        <HowitWorkCardComponent />
        {width > 500 ? <HomePageMiddleNav styleText={style2} /> : null}
        <div className="container-2 mb-5">
          <div className=" col-xl-12 col-lg-12 col-md-12 container-2-title">
            <h3 className="heading">Date Experiences you can enjoy</h3>
            <p className="sub-heading">
              Ladies, you can choose a date category while the men can select
              their preferred specifics of the date experience, with both
              parties agreeing on something fun and exciting to do within the
              man’s budget.
            </p>
          </div>
          <div className="row">
            {contentObject.map((e, index) => {
              return (
                <HowItWorkMain
                  title={e.heading}
                  image={e.imgUrl.src}
                  content={e.content}
                />
              );
            })}
            <div className="col mt-5 mx-1 myCard-3">
              <h3 className="The-future-of-Le-Society">
                The future of Le Society
              </h3>
              <button type="button" className="btn btn-danger Rectangle-1">
                Sneak Peak
              </button>
              <p className="In-App-Payment-GPS-Tracking-and-more">
                In App Payment <br />
                GPS Tracking
                <br />
                …and more
              </p>
            </div>
          </div>
        </div>
      {/* <HowitWorkCardComponent/> */}
       {/* <HomePageMiddleNav styleText={style2} /> */}
      {/* <div className='container-2 mb-5 mt-5'>
        <div className='container-2-title'>
          <h3 className='heading'>Date Experiences</h3>
          <h3 className='heading'>you can enjoy</h3>
          <p className='sub-heading'>Ladies, you can choose a date category while the men can select their preferred specifics of the date experience, with both parties agreeing on something fun and exciting to do within the man’s budget.</p>
        </div>
      <div className='row container howitwork-main-card-image-section'>
      {
        contentObject.map((e,index)=>{
          return (
            <HowItWorkMain title={e.heading}image={e.imgUrl.src} content ={e.content}/>
          )
        })
      }
      <div className='col mt-5 mx-1 myCard-3'>
       <h3 className="The-future-of-Le-Society">The future of Le Society</h3>
       <button type="button" className="btn btn-danger Rectangle-1" >Sneak Peak</button>
       <p className="In-App-Payment-GPS-Tracking-and-more">In App Payment <br/>GPS Tracking<br/>…and more</p>
      </div>
     </div>
     </div> */}
     <a href='/home' style={{textDecoration:"none"}}>
     <button type='btn' className='backtoHomepage-btn'>Go back to homepage</button>
     </a>
     <HomeFooter styleBackground ={style3}/>
    </div>
    </>
  );
}

export default HowItWork;
