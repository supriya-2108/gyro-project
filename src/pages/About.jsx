import React, { useEffect } from "react";
import Footer from "../components/Footer";
import ChefIntro from "../components/ChefIntro";
import HeroSection from "../components/HeroSection";
import Detail from "../components/About/Detail";
import "aos/dist/aos.css";
import AOS from "aos";
import { useNavigate } from "react-router-dom";
const About = () => {
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
