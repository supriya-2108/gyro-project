import React, { useEffect } from "react";
import HeroSection from "../components/HeroSection";
import { Images } from "../constants/Images";
import MenuHeader from "../components/Menu/MenuHeader";
import OurMenu from "../components/OurMenu";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";

const OrderOnline = () => {
  const navigate = useNavigate();

  return (
    <div>
      <HeroSection height={"16rem"} innerHeight="100vh" innerImages={true} />
      <div className="absolute top-[10rem] sm:top-[14rem] md:top-1/2 left-[5rem] sm:left-1/2 align-middle justify-center flex flex-col gap-5 md:text-xl text-white">
        <p className="max-sm:ml-10 -ml-28 max-sm:text-xl text-4xl">
          Select your preference
        </p>
      </div>
      <Footer />
    </div>
  );
};

export default OrderOnline;
