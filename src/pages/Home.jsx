import React, { useEffect } from "react";
import HeroSection from "../components/HeroSection";
import ChefIntro from "../components/ChefIntro";
import OurMenu from "../components/OurMenu";
import Footer from "../components/Footer";
import { Images } from "../constants/Images";
const Home = () => {
  return (
    <div className="w-full overflow-x-hidden">
      <HeroSection Images={Images} height={"100vh"} innerHeight="100vh" />{" "}
      <ChefIntro />
      <OurMenu />
      <Footer />
    </div>
  );
};

export default Home;
