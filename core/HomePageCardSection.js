import React from 'react'
import FifthBlob from '../assets/svg/Fifth Blob.svg'
import SixthBlob from '../assets/svg/Sixth Blob.svg'
function HomePageCardSection() {
  return (
    <div className='bottom-box-container'>
  <div class="bottom-box-card-1" style={{maxWidth:"325px",margin:"20px"}}>
    <div class="card  mb-2 card_1">
      <div class="card-body">
        <h5 class="card-title" className="card-title">Need More Information?</h5>
        <a href="/howItWork" class="btn btn-danger" id ="howitworkbtn">How it Works</a>
      </div>
    </div>
  </div>
  <div class="" style={{maxWidth:"325px",margin:"20px"}}>
    <div class="card  card_2">
      <div class="card-body">
        <h5 class="card-title" className="card-title">The future of Le Society</h5>
        <a href="/future-date" className="btn btn-danger" id="sneakPeakbtn">Sneak Peak</a>
        <p className="card-app-pay">In App Payment GPS Tracking …and more</p>
      </div>
    </div>
  </div>
</div>
  )
}

export default HomePageCardSection