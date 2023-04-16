import React from "react";

function LanscapeDecline({ islandScapeInMobile }) {
  return (
    <div>
      <h2
        className={`blank ${islandScapeInMobile ? "landScape" : ""}`}
        style={{ color: "#fff", fontSize: "20px" }}
      >
        Please Open Only Portrait Mode
      </h2>
    </div>
  );
}

export default LanscapeDecline;
