import React from "react";
import { Card } from "~/components/ui/card";
import { Label } from "~/components/ui/label";

const Offer = () => {
  return (
    <div className="    mt-48 flex w-full items-center">
      <div className=" flex w-3/4 flex-col gap-5">
        <Label className=" text-4xl font-semibold   tracking-widest ">
          we cater to all skillsets
        </Label>
        <Label id="2" className="  pr-20 leading-6  text-gray-600">
          With a commitment to exceptional customer service, we make the process
          of creating your custom prints seamless and enjoyable. Our experienced
          team is here to assist you every step of the way, from design to
          delivery. We offer a variety of printing techniques to suit your
          specific needs, ensuring your designs are showcased at their best.
          Choose City Print for your printing needs and experience the perfect
          blend of quality, creativity, and reliability. Whether it's for
          personal use, business, or special events, City Print is your go-to
          destination for all your custom printing projects.
        </Label>
      </div>
      <div className="  w-1/4  ">
        <Card className=" relative  w-fit bg-orange-50 p-2  shadow-2xl drop-shadow-2xl  ">
          <img src="tshit11.jpg" width={250} className="  rounded-lg" />
        </Card>
      </div>
    </div>
  );
};

export default Offer;
