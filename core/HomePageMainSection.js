import { element } from 'prop-types';
import React, { useState } from 'react'
import useWindowSize from "utils/useWindowSize";



function HomePageMainSection(props) {
  const { title, maincardImage, children,styles} = props;
  const { width } = useWindowSize();
  return (
    <>
    <div className='container'>
      {/* <div className={`row align-items-center mx-0 home-main-section ${styles}`}>
      {width >769 &&   <div className="col-lg-3 col-sm-12">
          <div className='main-title'>
            <h5>{title}</h5>
          </div>
        </div>}
        <div className="col-lg-5 col-sm-12 main-card-side-wraper">
          <div className='main-card'>
            <div className='main-card-side-wraper-1'>
              {<img src={maincardImage.src}  alt="main-img" style={{height:"47rem"}}/>}
            </div>
          </div>
        </div>
        {width <769 &&   <div className="col-lg-3 col-sm-12 mt-5">
          <div className='main-title'>
            <h5>{title}</h5>
          </div>
        </div>}
        <div className="col-lg-4 col-sm-12">
          {children}
        </div>
      </div> */}
    </div>
     <div className='main-container'>
    { width > 769 && <h2 className='heading-text'>{title}</h2>}
      <img src={maincardImage.src} alt="logo" className='main-image' width="100%"/>
      { width < 769 && <h2 className='heading-text'>{title}</h2>}
      <p className='info-text'>{children}</p>
    </div>
    </>
  )
}

export default HomePageMainSection