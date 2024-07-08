import React from "react";
import { Label } from "~/components/ui/label";
import { Star, MoveRight } from "lucide-react";

const DesignSample = () => {
  const products = new Array(3).fill(null);

  return (
    <div className="   flex w-full flex-col items-center justify-center  bg-blue-100   px-72  pb-28">
      <Label
        className="      mb-14  mt-28  font-medium  tracking-wide text-blue-400 "
        style={{ fontSize: "70px" }}
      >
        Designer Clothes For You
      </Label>{" "}
      <Label className="  text-[20px] tracking-widest  text-orange-400 ">
        Immerse yourself in the world of luxury fashion with our meticulously
        crafted designer clothes!{" "}
      </Label>
      <div className="  mt-20 flex w-full justify-center gap-10  ">
        {/* dummy data only change to the real data */}
        {products.map((_, index) => (
          <div className=" flex flex-col items-center gap-5  ">
            <img src="/tshit4.png" width={600} />
            <div className=" flex flex-col items-center justify-center gap-3 ">
              <Label className=" text-3xl     font-semibold tracking-widest">
                {" "}
                Accessories
              </Label>

              <Label className=" font-serif         text-lg leading-6 tracking-widest">
                Complete your ensemble with designer accessories such as
                handbags, scarves, belts, and hats.
              </Label>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DesignSample;
