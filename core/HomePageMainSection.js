import { element } from 'prop-types';
import React, { useState } from 'react'
import useWindowSize from "utils/useWindowSize";



function HomePageMainSection(props) {
  console.log(props)
  const { title, maincardImage, mainBackgroundImage, children} = props;
  console.log(mainBackgroundImage)
  const { width } = useWindowSize();
  return (
    <>
      <div 
        class="row align-items-center home-main-section" 
        style={{backgroundImage: `url('${mainBackgroundImage}')`}}
      >
        {/* <img src={ForthBlob.src} className="mainCardbackground" alt="ghghh"/> */}
     {width >500 &&   <div class="col-md-4">
          <div className='main-title'>
            <h5>{title}</h5>
          </div>
        </div>}
        <div class="col-md-4 main-card-side-wraper">
          <div className='main-card'>
            <div className='main-card-side-wraper-1'>
              {<img src={maincardImage.src} alt="main-img" />}
            </div>
          </div>
        </div>
        {width <500 &&   <div class="col-md-4 mt-5">
          <div className='main-title'>
            <h5>{title}</h5>
          </div>
        </div>}
        <div class="col-md-4">
          {children}
        </div>
      </div>
    </>
  )
}

export default HomePageMainSection