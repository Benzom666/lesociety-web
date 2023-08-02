import React from "react";
import LeSlogoBlack from "../../assets/Logo_Web.png";
import Image from "next/image";

function FooterHeader() {
  return (
    <div className="footer__header">
      <div className="LeSociety-Icon-Black d-flex">
        <div className="ls-logo">
          <Image src={LeSlogoBlack} alt="ls-logo" sizes={10} />
        </div>
      </div>

      <div>
        <button className="login__button">Log In</button>
        <button className="home__button">Home</button>
      </div>
    </div>
  );
}

export default FooterHeader;
