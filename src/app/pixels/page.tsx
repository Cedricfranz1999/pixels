import React from "react";

import {} from "lucide-react";
import Header from "./header";
import Intro from "./intro";
import BestSelling from "./bestSelling";
import OurProducts from "./ourProducts";
import Offer from "./offer";
import DesignSample from "./designSample";
import Feedback from "./feedback";
import Footer from "./footer";

const Website = () => {
  return (
    <div className=" z-50 h-screen w-full  flex-col ">
      <div className=" fixed h-24  w-full bg-blue-400 ">
        <Header />
      </div>
      {/* <img
        className=" w-full"
        src="https://scontent.fceb1-1.fna.fbcdn.net/v/t39.30808-6/338209580_909341910278570_7566373251541210403_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=cc71e4&_nc_eui2=AeFtq5TG2Sf7RuOtXrdWJwbGlPgnY7flKfmU-Cdjt-Up-YMeU4Iij7q9hF_cAWg-IuUCqZ5qhayJ4SSyXbLuuDR9&_nc_ohc=GBP6UfSyneQQ7kNvgFaq1Cs&_nc_ht=scontent.fceb1-1.fna&oh=00_AYDCoPGsUMxBExcqApfhd9r5cKiBIBwtvsy6fOMag8ewgg&oe=668D8366"
      /> */}
      <Intro />
      <BestSelling />
      <OurProducts />
      <Offer />
      <DesignSample />
      <Feedback />
      <Footer />
    </div>
  );
};

export default Website;
