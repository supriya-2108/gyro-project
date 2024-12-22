import React from "react";
import HeroSection from "../components/HeroSection";
import { Images } from "../constants/Images";
import MenuHeader from "../components/Menu/MenuHeader";
import OurMenu from "../components/OurMenu";
import Footer from "../components/Footer";
const Menu = () => {
  return (
    <div>
      {" "}
      <HeroSection
        height={"16rem"}
        heading={"Our  Specialties"}
        innerHeight="60vh"
      />
      {/* <MenuHeader /> */}
      <OurMenu type="menu" />
      <Footer />
    </div>
  );
};

export default Menu;
