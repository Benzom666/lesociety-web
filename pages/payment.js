import React, { useState } from "react";
import withAuth from "@/core/withAuth";
import HomePagePopUp from "@/core/HomePagePopUp";
function payment() {
  const [show,setShow]= useState(false);

  const handleModal =()=>{
    setShow(!show);
  }

  return (
    //  <div>payment</div>
    <>
     <button onClick={handleModal}>show modal</button>
    { show && <HomePagePopUp onClose={handleModal} show={show}/>}
     </>
  );
}

export default withAuth(payment);
