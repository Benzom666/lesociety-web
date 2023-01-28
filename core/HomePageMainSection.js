import { element } from 'prop-types';
import React, { useState } from 'react'
import useWindowSize from "utils/useWindowSize";



function HomePageMainSection(props) {
  console.log(props)
  const { title, maincardImage, mainBackgroundImage, children,styles} = props;
  console.log(mainBackgroundImage)
  const { width } = useWindowSize();
  return (
    <>
      <div 
        className={`row align-items-center home-main-section ${styles}`  }
        style={{backgroundImage: `url('${mainBackgroundImage}')`}}
      >
      {width >769 &&   <div class="col-lg-4 col-md-12">
          <div className='main-title'>
            <h5>{title}</h5>
          </div>
        </div>}
        <div class="col-lg-4 col-sm-12 main-card-side-wraper">
          <div className='main-card'>
            <div className='main-card-side-wraper-1'>
              {<img src={maincardImage.src}  alt="main-img" style={{height:"25rem"}}/>}
            </div>
          </div>
        </div>
        {width <769 &&   <div class="col-lg-4 col-md-12 mt-5">
          <div className='main-title'>
            <h5>{title}</h5>
          </div>
        </div>}
        <div class="col-lg-4 col-md-12">
          {children}
        </div>
      </div>
    </>
  )
}

export default HomePageMainSection