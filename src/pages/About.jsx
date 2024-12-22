import React from "react";
import Footer from "../components/Footer";
import ChefIntro from "../components/ChefIntro";
import HeroSection from "../components/HeroSection";
import Detail from "../components/About/Detail";
import "aos/dist/aos.css";
import AOS from "aos";
const About = () => {
  return (
    <div>
      {" "}
      <HeroSection
        height={"45vh"}
        heading={"About Us"}
        innerHeight="60vh"
        innerImages={true}
      />{" "}
      <ChefIntro />
      <Detail />
      <Footer />
    </div>
  );
};

export default About;
