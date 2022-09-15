import React from "react";
import Image from "next/image";

function Loader() {
  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{ height: "100vh" }}
    >
      {/* <Image src={require("../../assets/logo.mp4")} /> */}
      <Image src={require("../../assets/logo.gif")} alt="loading..." />
      {/* Loading... */}
    </div>
  );
}

export default Loader;
