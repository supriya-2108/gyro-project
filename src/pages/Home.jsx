import React, { useEffect } from "react";
import HeroSection from "../components/HeroSection";
import ChefIntro from "../components/ChefIntro";
import OurMenu from "../components/OurMenu";
import Footer from "../components/Footer";
import { Images } from "../constants/Images";
import { useNavigate } from "react-router-dom";
const Home = () => {
  const navigate = useNavigate();
  useEffect(() => {
    let userData = JSON.parse(localStorage.getItem("token"));
    if (!userData) {
      navigate("/login");
    }
  }, []);
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
