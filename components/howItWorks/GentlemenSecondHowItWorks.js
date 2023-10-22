import React from "react";
import secondGentlemenIphone13pro from "../../assets/howItWorks/secondGentlemenIphone13pro.png";
import secondGentlemenIphone13proDown from "../../assets/howItWorks/secondGentlemenIphone13proDown.png";
import { CustomIcon } from "@/core/icon";

function GentlemenSecondHowItWorks() {
  return (
    <div className="ladies__first__page">
      <div className="text__content text__content__gentlemen">
        <div className="text__content__heading">
          <span className="ladies__text">Gentlemen, </span>
          <span className="commitment__text">STAND OUT</span>
          <span> From The crowd</span>
        </div>
        <div className="commitment__level">Level 1 Commitment:</div>
        <div className="shared__interested__text">
          <CustomIcon.IntrestedBlackText color={"black"} />
          <span className="shared__interested__equalTo">
            {" "}
            = Amplify Your Presence
          </span>
        </div>
        <p className="text__content__ptext">
          Now you have the opportunity to stand out in a world of dating where
          many may not be serious. By demonstrating your commitment and respect,
          you can offer a refreshing approach that aligns with the aspirations
          of quality women. This includes ensuring the date experience she
          hand-selected matches your interests, and being willing to cover the
          expenses of the first date.
        </p>

        <div className="Advantages">Advantages:</div>

        <p className="text__content__ptext gentlemen__content__sun__icon">
          <span className="text__content__p__spantext">
            Reduced Competition:{" "}
          </span>
          In a landscape where many may not be as serious, embodying the
          qualities of a true gentleman can make you a more attractive choice
          for quality women.
        </p>

        <div className="commitment__level">Level 2 Commitment:</div>

        <div className="shared__interested__text">
          <div className="super__interested__icon">
            <CustomIcon.RequestSuperText color={"white"} />

            <CustomIcon.IntrestedBlackText color={"white"} />
          </div>
          <span className="shared__interested__equalTo">
            = Supercharge Your Presence
          </span>
        </div>
        <p className="text__content__ptext">
          Time is valuable; sometimes, we want to move swiftly towards a first
          date, including all aspects of the initial commitment you're willing
          to take it a step further by accepting her suggested gift, where 100%
          of the proceeds directly support her personal aspirations.
        </p>
        <div className="Advantages">Advantages:</div>
        <p className="text__content__ptext">
          <span className="text__content__p__spantext">
            More Irresistible:{" "}
          </span>
          By covering the initial expenses, agreeing to support her aspirations,
          and accepting her suggested gift, you demonstrate the ultimate
          commitment, making it very difficult for her to say no.
        </p>
      </div>
      <div className="ladies__iphone__group__img gentlemen__image__wrapper">
        <img
          src={secondGentlemenIphone13pro.src}
          alt="logo"
          className="ladies-iphone-image"
        />
        <img
          src={secondGentlemenIphone13proDown.src}
          alt="logo"
          className="gentlemen-down-iphone-image"
        />
      </div>
    </div>
  );
}

export default GentlemenSecondHowItWorks;
