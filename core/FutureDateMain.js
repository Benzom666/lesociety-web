import React from 'react'
import MaskGroup22 from '../assets/img/Mask Group 22.png'


function FutureDateMain() {
  return (
    <>
    <div class="container">
    <div class="row align-items-center">
    <div class="col">
      <div>
        <h3>Full Transparency is the key to any great relationship.</h3>
        <p>No more ghosting. See where your date is and track how long until your agreed meeting time. You don’t need to process payment until your date has arrived. Use our simple swipe to pay feature to process payment once you have met and enjoy your date.</p>
      </div>
    </div>
    <div class="col">
      <div>
        <p>GPS tracking <br/>
         & in app payment</p>
        <img src={MaskGroup22.src}  alt="mobileview" height={390} width={210}/>
      </div>
    </div>
    </div>
    </div>
    </>
  )
}

export default FutureDateMain