import React from 'react'
import Image from 'next/image'
import useWindowSize from "utils/useWindowSize";


function FutureDateMain(props) {
  const { heading, mainHeadingContent, imgText, imgUrl } = props;
  const { width } = useWindowSize();
  console.log(props);
  return (
    <>
      <div class="container mt-3 mb-5">
        <div class="row future-main-content">
          <div class="col-md-6 col main-content-heading">
            <div className='main-content-headig-1'>
              <h3 dangerouslySetInnerHTML={{ __html: heading }}></h3>
              <p>{mainHeadingContent}</p>
            </div>
          </div>
          <div class="col-md-6 col main-content-image-text">
            <div className='main-content-headig-2' style={{ textAlign: "center" }}>
              <p style={{
                fontSize: "20px", fontWeight: "bold", letterSpacing: "3.1px",
                lineHeight: "normal", padding: "15px 0px"
              }} dangerouslySetInnerHTML={{ __html: imgText }}></p>
              <div className='main-imagefuture'>
                <img src={imgUrl.src} alt="mobileview" width={210} />
              </div>
            </div>
          </div>
        </div>
      </div>

    </>
  )
}

export default FutureDateMain