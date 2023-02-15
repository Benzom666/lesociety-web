import React from 'react'
import Image from 'next/image'
import useWindowSize from "utils/useWindowSize";


function FutureDateMain(props) {
  const { heading, mainHeadingContent, imgText, imgUrl } = props;
  const { width } = useWindowSize();
  console.log(props);
  return (
    <>
      <div class="container my-5">
        <div class="row future-main-content">
          <div class="col-lg-6 col-sm-12 main-content-heading">
            <div className='main-content-headig-1'>
              <h3 dangerouslySetInnerHTML={{ __html: heading }}></h3>
              <p>{mainHeadingContent}</p>
            </div>
          </div>
          <div class="col-lg-6 col-sm-12 main-content-image-text">
            <div className='main-content-headig-2' style={{ textAlign: "center" }}>
              <p className='futureDates-content-over-img' dangerouslySetInnerHTML={{ __html: imgText }}></p>
              <div className='main-imagefuture'>
                <img src={imgUrl.src} alt="mobileview" />
              </div>
            </div>
          </div>
        </div>
      </div>

    </>
  )
}

export default FutureDateMain