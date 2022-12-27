import React from 'react'
import Image from 'next/image'



function FutureDateMain(props) {
  const {heading,mainHeadingContent,imgText,imgUrl} = props;
  console.log(props);
  return (
    <>
      <div class="container mt-5">
    <div class="row align-items-center future-main-content">
    <div class="col-md-4 main-content-heading">
      <div className='main-content-headig-1'>
        <h3 dangerouslySetInnerHTML={{__html: heading}}></h3>
        <p>{mainHeadingContent}</p>
      </div>
    </div>
    <div class="col-md-4 main-content-image-text">
      <div className='main-content-headig-2' style={{textAlign:"center"}}>
        <p style={{fontSize:"20px",fontWeight:"bold",letterSpacing:"3.1px",
        lineHeight:"normal",padding:"15px 0px"}} dangerouslySetInnerHTML={{__html: imgText}}></p>
         <div className='main-imagefuture'>
        <img src={imgUrl.src}  alt="mobileview" height={390} width={210}/>
        </div>
      </div>
    </div>
    </div>
    </div>
      
    </>
  )
}

export default FutureDateMain