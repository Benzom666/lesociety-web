import React from 'react'

function FutureDates(props) {
  const {title,contentaboutDating} =props
  return (
    <div className='d-flex justify-content-center align-items-center mt-3'>
         <nav class="navbar navbar-dark bg-black w-lg-50 d-flex justify-content-center futuredate-header">
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