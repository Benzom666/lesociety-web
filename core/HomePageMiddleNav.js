import React, { useState } from "react";
import useWindowSize from "utils/useWindowSize";
import { IoIosClose } from "react-icons/io";

function HomePageMiddleNav(props) {
  //console.log(props)
  const [openNav, setOpenNav] = useState(false);
  const [animate, setAnimate] = useState(false);
  const { width } = useWindowSize();
  const openNavBar = () => {
    setOpenNav(true);
    setAnimate(!animate)
  };
  const closeNavBar = () => {
    setOpenNav(false);
    setAnimate(!animate)
  };
console.log(animate);
  return (
    <>
      <nav className="navbar fixed-bottom bg-dark mt-4 navbarfixedmain"
        style={props.style}>
        <div className={`container-fluid d-flex justify-content-end containernavbarfooter ${animate ? 'animate-1' : ""}`}>
          <div className="navbarfooter-text">
            {width > 769 && (
              <div className="navfooter-text-1">
                <span style={props.styleText}>
                  Start a new adventure.{" "}
                  <span
                    style={{
                      color: " #f24462",
                      //paddingRight: "10px",
                      fontSize: "16px",
                    }}
                  >
                    Already a Member? Login
                  </span>
                </span>
              </div>
            )}
            {width < 769 && (
              <div className="navfooter-text-1">
                <span style={{ fontSize: "18px",color:"#fff"}}>
                  Start a new adventure.
                  <br />
                  <p
                    style={{
                      color: " #f24462",
                      paddingTop: "5px",
                      // padding:"3px 0px",
                      fontSize: "16px",
                    }}
                  >
                    Already a Member? Login
                  </p>
                </span>
              </div>
            )}
            {width < 769 && (
              <div>
                {!openNav ? (
                  <button id="signupbtn" type="button" onClick={openNavBar}>
                    Sign Up
                  </button>
                ) : null}
              </div>
            )}
            {openNav && (
              <div className="closefooterbtn">
                {width < 769 && (
                  <IoIosClose
                    className="mouse-point"
                    size={55}
                    style={{
                      color: "#fff",
                      //marginBottom: "5px",
                      //marginLeft: "30px",
                    }}
                    onClick={closeNavBar}
                  />
                )}
              </div>
            )}
          </div>
          <div className="navbarfooter-btn">
            {openNav ? (
              <div id="sidebarhome" className="sidebarhome">
                <button type="button" className="signUpLadybtn">
                  Sign Up as Lady
                </button>
                <button type="button" className="signUpLadybtn">
                  Sign Up as Gentlemen
                </button>
                {width > 769 && (
                  <IoIosClose
                    className="mouse-point"
                    size={42}
                    style={{ color: "#fff" }}
                    onClick={closeNavBar}
                  />
                )}
              </div>
            ) : null}
            {width > 769 && (
              <div>
                {!openNav ? (
                  <button id="signupbtn"type="button" onClick={openNavBar}>
                    Sign Up
                  </button>
                ) : null}
              </div>
            )}
          </div>
        </div>
      </nav>
    </>
  );
}

export default HomePageMiddleNav;
