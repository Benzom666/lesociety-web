import React from 'react'
import MapImage from '../assets/img/map-image.png'
import ManImage from '../assets/img/man-img.jpeg'
function Modal(props) {
  if (!props.show) {
    return null
  }
  return (
    <div className='modal'>
      <div className='modal_content'>
        <div className='modal_header'>
          <h2 className='modal-title'>Do you want to use your current location to find local dates ?
          </h2>
        </div>
        <div className='modal-body'>
          <div className='modal-body-text'>
          <p>We will never share this information with outside parties, it is solely used to enhance your experience,
          </p>
          </div>
          <div className='Modal-body-image' >
            <img src={ManImage.src} alt="man-img" 
            height={100} width={100} 
            style={{borderRadius:"7px",border:"2px solid white",
            position:"absolute",top: "-4%",
            left: "40%"}}/>
            <img style={{borderRadius:"50%",textAlign:"center"}} 
            src={MapImage.src} height={250} width={250}  alt='map-img'/>
          </div>
        </div>
        <div className='modal_footer'>
            <p onClick={props.onClose} className='modal-footer-text'>Skip this step</p>
            <button className='footer-btn'>Search nearby</button>
        </div>
      </div>
    </div>

  )
}

export default Modal