import React,{useState,useEffect} from "react";
import LocationModalPopUp from "@/core/locationModalPopUp";
function payment() {
  const [show,setShow]= useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.document.body.style.backgroundColor = "#f2f5f7";
      window.document.body.style.color = "black";
    }
  }, [])
  return <div>
    <button onClick={()=>setShow(true)}>show modal</button>
       <LocationModalPopUp onClose={()=>setShow(false)} show={show}/>
  </div>;
}

export default payment;
