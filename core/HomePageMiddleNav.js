import React,{useState} from 'react'
import useWindowSize from "utils/useWindowSize";
import { IoIosClose } from "react-icons/io";

function HomePageMiddleNav(props) {
  //console.log(props)
    const [openNav, setOpenNav] = useState(false);
  const { width } = useWindowSize();
  const openNavBar = () => {
    setOpenNav(true);

  }
  const closeNavBar = () => {
    setOpenNav(false);
  }
  return (
    <>
        <nav class="navbar fixed-bottom bg-dark mt-4 navbarfixedmain" style={props.style}>
        <div class="container-fluid d-flex justify-content-end containernavbarfooter">
          <div className="navbarfooter-text">
           {width  > 500 && <div className="navfooter-text-1">
              <span style={{ fontSize: "18px" }}>Start a new adventure.
                <span style={{ color: " #f24462", paddingRight: "10px", fontSize: "16px" }}>Already a Member? Login</span>
              </span>
            </div> }
            { width < 500 &&<div className="navfooter-text-1">
              <span style={{ fontSize: "18px" }}>Start a new adventure.<br/>
                <span style={{ color: " #f24462", paddingRight: "10px", fontSize: "16px" }}>Already a Member? Login</span>
              </span>
            </div>}
            { width < 500 &&  <div>
            {!openNav ? <button id="signupbtn" type="button" onClick={openNavBar}>Sign Up</button> : null}
            </div>}
            {openNav && <div className="closefooterbtn">
              {width < 500 && <IoIosClose className="mouse-point" size={50} style={{ color: "#fff",marginBottom:"5px",marginLeft:"30px" }}
                onClick={closeNavBar} />}
            </div>}
          </div>
          <div className="navbarfooter-btn">
            {openNav ? <div id="sidebarhome" className="sidebarhome ">
              <button type="button" className="signUpLadybtn">Sign Up as Lady</button>
              <button type="button" className="signUpLadybtn">Sign Up as Gentlemen</button>
              {width > 767 && <IoIosClose className="mouse-point" size={40} style={{ color: "#fff" }}
                onClick={closeNavBar} />}
            </div> : null}
          { width >500 &&  <div>
            {!openNav ? <button id="signupbtn" type="button" onClick={openNavBar}>Sign Up</button> : null}
            </div>}
          </div>
        </div>
      </nav>
    </>
  )
}

export default HomePageMiddleNav