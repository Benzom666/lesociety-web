import { urlObjectKeys } from 'next/dist/shared/lib/utils'
import React from 'react'
import Card_1 from '../assets/img/card_1.png'
import Card_2 from '../assets/img/card_2.png'

function HomePageCardSection() {
  return (
    <div className='container-fluid bottom-box-container mt-5 mb-5'>
      <div class="bottom-box-card-1">
        <div class="mb-2 card_1">
          <h5 class="card-title" className="card-title">Need More</h5>
          <h5 class="card-title" className="card-title">Information?</h5>
          <a href="/howItWork" class="btn btn-danger" id="howitworkbtn">How it Works</a>
        </div>
      </div>
      <div class="bottom-box-card-2">
        <div class="card_2">
          <h5 class="card-title" className="card-title">The future of</h5>
          <h5 class="card-title" className="card-title"> Le Society</h5>
          <a href="/future-date" className="btn btn-danger" id="sneakPeakbtn">Sneak Peak</a>
          <p className="card-app-pay">In App Payment GPS Tracking …and more</p>
        </div>
      </div>
    </div>
  )
}

export default HomePageCardSection