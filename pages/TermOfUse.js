import React from "react";
import LeSlogoWhite from "../assets/LeS logoWhite.png";
import HomeFooter from "@/core/HomeFooter";
import FooterHeader from "components/footerSection/FooterHeader";
import TermOfUseContent from "components/footerSection/TermOfUseContent";

const styleBackground = {
  backgroundColor: "#000000",
};

function TermOfUse() {
  return (
    <div className="footer__content">
      <FooterHeader />
      <TermOfUseContent />
      <HomeFooter logo={LeSlogoWhite} styleBackground={styleBackground} />
    </div>
  );
}

export default TermOfUse;
