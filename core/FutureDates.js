import React from 'react'

function FutureDates(props) {
  const {title,contentaboutDating} =props
  return (
    <div className='d-flex justify-content-center align-items-center mt-5'>
         <nav class="navbar navbar-dark bg-black w-50 d-flex justify-content-center">
            <div className='heading-title'>
            <h5 dangerouslySetInnerHTML={{__html:title}}></h5>
            </div>
            <div className='futureDatingContent'>
            <p>{contentaboutDating}</p>
            </div>
        </nav>
    </div>
  )
}

export default FutureDates