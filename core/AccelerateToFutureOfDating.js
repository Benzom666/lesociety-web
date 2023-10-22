import React from "react";
import { CustomIcon } from "./icon";
import Iphone15 from "../assets/homePage/iPhone 15.png";
import { router, useRouter } from "next/router";

function AccelerateToFutureOfDating() {
  const router = useRouter();

  return (
    <>
      <div className="accelerate__wrapper">
        <h1>
          Accelerate to the Future of{" "}
          <CustomIcon.AccelerateFutureOfDatingIcon color={"white"} size={150} />
        </h1>
        <div className="accelerate__container">
          <div className="level2">
            <h6>Level 2: </h6>
            <div className="super__interested__icon">
              <div className="super">
                <CustomIcon.RequestSuperText color={"white"} size={150} />
              </div>
              <CustomIcon.IntrestedText color={"white"} size={150} />
            </div>
            <p className="inerested__text">
              Beyond the date experience, you're also keen on supporting her
              aspirations, which accelerates the path to a memorable first date.
              This supercharges presence, making you stand out even more
            </p>
            <div className="line__progress">
              <CustomIcon.AccelerateFutureOfDatingProgressBarIcon
                color={"white"}
                size={150}
              />
            </div>
            <p className="progress__text">
              Your Chance of Securing a Date Compared to Traditional Dating
              Sites.
            </p>
            <div className="image__progress1">
              <CustomIcon.AccelerateFutureOfDatingImageProgressBarIcon1
                color={"white"}
                size={150}
              />
            </div>
          </div>
          <img
            src={Iphone15.src}
            alt="logo"
            className="accelerate-iphone-image"
          />
          <div className="level1">
            <h6>Level 1: </h6>
            <div className="only__interested__icon">
              <CustomIcon.IntrestedText color={"white"} size={150} />
            </div>
            <p className="inerested__text">
              You are interested in her and her aspirations, and you would like
              to treat her to the date experience she's handpicked, laying the
              foundation for a genuine connection.
            </p>
            <div className="line__progress">
              {" "}
              <CustomIcon.AccelerateFutureOfDatingProgressBarIcon
                color={"white"}
                size={150}
              />
            </div>
            <p className="progress__text">
              Your Chance of Securing a Date Compared to Traditional Dating
              Sites.
            </p>
            <div className="image__progress2">
              <div className="diagonal-line"></div>
              <div className="progress__circle"></div>
            </div>
          </div>
        </div>

        {/* <a
          href="/howItWork"
          className="learn__more__wrapper"
          id="howitworkbtn"
          // onClick={() => router.push("/howItWork")}
        >
          <div className="learn__more">Learn More</div>
        </a> */}
        <a
          href="/howItWork"
          style={{ textDecoration: "none", color: "white" }}
          className="learn__more__wrapper"
        >
          <button type="btn" className="learn__more" style={{ color: "white" }}>
            Learn More
          </button>
        </a>
      </div>
    </>
  );
}

export default AccelerateToFutureOfDating;
