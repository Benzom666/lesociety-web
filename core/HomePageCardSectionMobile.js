import React from 'react'
import Card_Mobile from '../assets/img/Card_Mobile.png';
import CardMob_1 from '../assets/img/CardMob_1.png';
import CardMob_2 from '../assets/img/CardMob_2.png';

function HomePageCardSectionMobile() {
    return (
        <div className='bottom-Card-mobile mt-5 mb-5'>
           {/* <img src={Card_Mobile.src} alt="main-card-img" width="100%" /> */}
           <div className='card-1'>
           <div className='card-title'>
                <h5 className="heading">Need More</h5>
                <h5 className="heading">Information?</h5>
                <a href="/howItWork" className="btn btn-danger" id="howitworkbtn">How it Works</a>
                </div>
                
           </div>

           <div className='card-2'>
            <div className='card-title-1'>
                <h5 className="heading-1">The future of</h5>
                <h5 className="heading-1"> Le Society</h5>
                <a href="/future-date" className="btn btn-danger" id="sneakPeakbtn">Sneak Peak</a>
                <p className="card-app-pay">In App Payment GPS Tracking …and more</p>
                </div>
                
            </div>
            {/* <div className='card-1'>
                <div className='card-title'>
                <h5 className="heading">Need More</h5>
                <h5 className="heading">Information?</h5>
                </div>
                <a href="/howItWork" className="btn btn-danger" id="howitworkbtn">How it Works</a>
            </div>
            <div className='card-2'>
            <div className='card-title'>
                <h5 className="heading">The future of</h5>
                <h5 className="heading"> Le Society</h5>
                </div>
                <a href="/future-date" className="btn btn-danger" id="sneakPeakbtn">Sneak Peak</a>
                <p className="card-app-pay">In App Payment GPS Tracking …and more</p>
            </div> */}

        </div>
    )
}

export default HomePageCardSectionMobile