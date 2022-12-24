import React from 'react'

function FutureDates(props) {
  return (
    <div>
         <nav class="navbar navbar-dark bg-black w-50 d-flex justify-content-center m-auto" style={{padding:"55px 65px"}}>
            <div className='heading-title'>
            <h5 >{props.title}</h5>
            </div>
            <div className='futureDatingContent'>
            <p>{props.contentaboutDating}</p>
            </div>
        </nav>
    </div>
  )
}

export default FutureDates