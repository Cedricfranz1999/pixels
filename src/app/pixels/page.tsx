import React from "react";

import {} from "lucide-react";
import Header from "./header";
import Intro from "./intro";
import BestSelling from "./bestSelling";
import OurProducts from "./ourProducts";
import Offer from "./offer";

const Website = () => {
  return (
    <div className="   h-screen w-full   ">
      <Header />
      <Intro />
      <BestSelling />
      <OurProducts />
      <Offer />
    </div>
  );
};

export default Website;
