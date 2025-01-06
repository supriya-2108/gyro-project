import { Link } from "react-router-dom";
import { InnerImages } from "../constants/Images";
import Carousel from "./Carousel";
import Header from "./Header";

import React, { useState, useEffect } from "react";
import { OrderingOptions } from "./OrdeingOptions";
export default function HeroSection({
  Images,
  height,
  heading,
  innerHeight,
  innerImages,
}) {

  const [currentIndex, setCurrentIndex] = useState(0);
  return (
    <>
      <Header />
      <div
        className={`relative h-[35vh] sm:h-[100vh] sm:!w-[100vw] !overflow-hidden bg-black/40 backdrop-blur-sm`}
      >
        <Carousel
          currentIndex={currentIndex}
          setCurrentIndex={setCurrentIndex}
          height={"100vh"}
        />
        <div className="absolute top-0 bg-black opacity-70 h-full !w-full backdrop-blur-xl"></div>
        {heading && (
          <p
            className={`absolute top-[4rem] sm:!top-[10rem] !text-center ${
              heading !== "Login" ? "left-[8rem]" : "left-[11rem]"
            } sm:left-[38rem] font-semibold text-2xl sm:text-5xl text-[#009dc4]`}
          >
            {heading}
          </p>
        )}
        <div className="absolute max-md:top-8 top-2  left-1/2 sm:top-[10rem] max-md:w-[80%] w-[60%] sm:left-1/2 transform -translate-x-1/2 text-center z-50">
          {Images && (
            <h1
              key="hero-heading"
              className="font-mono text-2xl mb-2 md:text-4xl xl:text-5xl  font-semibold  text-[#009dc4]"
            >
              {Images[currentIndex]?.heading}
            </h1>
          )}
          {Images && (
            <div className="flex z-50 gap-3 sm:mt-[2rem] w-full mx-auto justify-center">
              {Images?.map((_, index) => (
                <div
                  key={index}
                  className={`h-3 w-3 cursor-pointer rounded-full ${
                    index === currentIndex ? "bg-white" : "bg-gray-600"
                  }`}
                  onClick={() => setCurrentIndex(index)}
                ></div>
              ))}
            </div>
          )}
        </div>

        {heading !== "Please Login to continue" && <OrderingOptions />}
      </div>
    </>
  );
}
