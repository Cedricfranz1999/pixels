import React from "react";
import Header from "./Header";
import Intro from "./Intro";
import Offer from "./Offer";
import Service from "./Service";
import SampleDesign from "./SampleDesign";
import OurProducts from "./OurProducts";
import FeedbackGrid from "./clientFeedback";
import UpdateCard from "./EmailUs";
import Footer from "./Footer";

const page = () => {
  return (
    <div>
      <div className="   bg-cover px-20">
        <Header />
        <Intro />
        <Offer />
        <Service />
        <SampleDesign />
        <OurProducts />
        <FeedbackGrid />
        <UpdateCard />
      </div>
      <Footer />
    </div>
  );
};

export default page;
