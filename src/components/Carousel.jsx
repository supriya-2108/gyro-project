"use client";

import React, { useState, useEffect } from "react";
import { Images } from "../constants/Images";

export default function Carousel({ currentIndex, setCurrentIndex, height }) {
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % Images.length);
    }, 3000); // Change slide every 5 seconds

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative w-full">
      {/* Image Carousel */}
      <div className={`relative h-[${height}] w-full overflow-hidden`}>
        {Images.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              index === currentIndex ? "opacity-100" : "opacity-0"
            }`}
          >
            <img
              src={image.src}
              alt={image.alt}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-transparent to-transparent h-1/3" />
          </div>
        ))}
      </div>

      {/* Dots Above Carousel */}

      {/* Dots Below Carousel */}
    </div>
  );
}
