import React from "react";
import Image from "next/image";

function Loader() {
  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{ height: "100vh" }}
    >
      {/* <Image src={require("../../assets/svg/Blocks-1s-200px.svg")} /> */}
      Loading...
    </div>
  );
}

export default Loader;
