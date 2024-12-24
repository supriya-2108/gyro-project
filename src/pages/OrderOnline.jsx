import React, { useEffect } from "react";
import HeroSection from "../components/HeroSection";
import { Images } from "../constants/Images";
import MenuHeader from "../components/Menu/MenuHeader";
import OurMenu from "../components/OurMenu";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";

const OrderOnline = () => {
  const navigate = useNavigate();
  useEffect(() => {
    let userData = JSON.parse(localStorage.getItem("token"));
    if (!userData) {
      navigate("/login");
    }
  }, []);
  return (
    <div>
      <HeroSection height={"16rem"} innerHeight="100vh" innerImages={true} />
      <div className="absolute top-[10rem] sm:top-[14rem] md:top-1/2 left-[5rem] sm:left-1/2 align-middle justify-center flex flex-col gap-5 md:text-xl text-white">
        <p className="max-sm:ml-10 -ml-28 max-sm:text-xl text-4xl">
          Select your preference
        </p>
        <div className="flex sm:flex-col !gap-5">
          <button
            className=" bg-[#c8a97e] text-white w-[10rem] md:w-[12rem] py-2 sm:py-1 md:py-2 rounded-md -ml-7 max-sm:mr-5"
            onClick={() => {
              navigate("/menu");
              localStorage.setItem("mode", "pickup");
            }}
          >
            Pickup
          </button>
          <button
            className="bg-[#c8a97e] text-white w-[10rem] md:w-[12rem] py-2 sm:py-1 md:py-2 rounded-md -ml-7"
            onClick={() => {
              navigate("/menu");
              localStorage.setItem("mode", "dinein");
            }}
          >
            Dining In
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default OrderOnline;
