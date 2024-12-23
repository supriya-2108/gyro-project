import React from "react";
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
      <div className="absolute top-[14rem] md:top-1/2 left-1/2 align-middle justify-center flex flex-col gap-5 md:text-xl text-white">
        <button
          className="bg-[#c8a97e] md:w-[6rem] py-1 md:py-2 rounded-md -ml-7"
          onClick={() => {
            navigate("/menu");
            localStorage.setItem("mode", "pickup");
          }}
        >
          Pickup
        </button>
        <button
          className="bg-[#c8a97e] md:px-10 px-5 py-1 md:py-2 rounded-md -ml-10 md:-ml-14"
          onClick={() => {
            navigate("/menu");
            localStorage.setItem("mode", "dinein");
          }}
        >
          Dining In
        </button>
      </div>
      <Footer />
    </div>
  );
};

export default OrderOnline;
