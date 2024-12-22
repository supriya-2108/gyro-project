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
      <div className="absolute top-1/2 left-1/2 align-middle justify-center flex flex-col gap-5 text-xl text-white">
        <button
          className="bg-[#c8a97e] w-[6rem] py-2 rounded-md -ml-7"
          onClick={() => {
            navigate("/menu");
            localStorage.setItem("mode", "pickup");
          }}
        >
          Pickup
        </button>
        <button
          className="bg-[#c8a97e] px-10 py-2 rounded-md -ml-14"
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
