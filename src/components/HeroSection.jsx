import { InnerImages } from "../constants/Images";
import Carousel from "./Carousel";
import Header from "./Header";

import React, { useState, useEffect } from "react";
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
      <div className={`relative h-[100vh] !w-[100vw] !overflow-hidden`}>
        <Carousel
          currentIndex={currentIndex}
          setCurrentIndex={setCurrentIndex}
          height={"100vh"}
        />
        <div className="absolute top-0 bg-black opacity-60 h-full !w-full"></div>
        {heading && (
          <p className="absolute top-[20rem] left-[38rem] !text-xl text-[#009dc4]">
            {heading}
          </p>
        )}
        <div className="absolute top-[12rem] w-[60%] left-1/2 transform -translate-x-1/2 text-center z-50">
          {Images && (
            <h1
              key="hero-heading"
              className="font-mono lg:text-4xl xl:text-6xl  font-semibold  text-[#009dc4]"
            >
              {Images[currentIndex]?.heading}
            </h1>
          )}
          {Images && (
            <div className="flex z-50 gap-3 mt-[2rem] w-full mx-auto justify-center">
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
        {Images && (
          <div className="absolute w-full top-[25rem] left-0 right-0 h-px bg-[#009dc4]/20" />
        )}
        {!innerImages
          ? InnerImages && (
              <div className="flex justify-evenly w-full absolute bottom-[8rem] px-10">
                {InnerImages?.map((item) => (
                  <div className="justify-center items-center flex flex-col text-white">
                    <img
                      src={item.src}
                      className="w-[5rem] lg:w-[7rem] object-cover h-[5rem] lg:h-[7rem] rounded-full"
                    />
                    <p className="text-md lg:text-xl font-medium">
                      {item.title}
                    </p>
                    <p className="max-md:hidden w-[70%] lg:text-lg text-center">
                      {item.ingredients}
                    </p>
                  </div>
                ))}
              </div>
            )
          : ""}
      </div>
    </>
  );
}
