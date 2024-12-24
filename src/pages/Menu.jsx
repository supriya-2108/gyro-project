import React, { useEffect } from "react";
import HeroSection from "../components/HeroSection";
import { Images } from "../constants/Images";
import MenuHeader from "../components/Menu/MenuHeader";
import OurMenu from "../components/OurMenu";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";
const Menu = () => {
  const navigate = useNavigate();
  useEffect(() => {
    let userData = JSON.parse(localStorage.getItem("token"));
    if (!userData) {
      navigate("/login");
    }
  }, []);
  return (
    <div>
      {" "}
      <HeroSection
        height={"16rem"}
        heading={"Our  Specialties"}
        innerHeight="60vh"
      />
      <OurMenu type="menu" />
      <Footer />
    </div>
  );
};

export default Menu;
