import React from "react";
import { Label } from "~/components/ui/label";
import { Star } from "lucide-react";

const OurProducts = () => {
  const products = new Array(8).fill(null);

  return (
    <div className="    flex flex-col items-center justify-center bg-blue-200 py-10">
      <Label
        className="      mb-14    px-4 font-medium  tracking-wide text-blue-500 underline "
        style={{ fontSize: "50px" }}
      >
        Our Products
      </Label>{" "}
      <div className=" my-10  flex cursor-pointer  gap-16">
        <Label className="  cursor-pointer underline">SALE</Label>
        <Label className="  cursor-pointer ">HOT</Label>
        <Label className="  cursor-pointer ">NEW ARRIVALS</Label>
        <Label className="  cursor-pointer ">ACCESSORIES</Label>
      </div>
      <div className="grid grid-cols-4 gap-10">
        {/* dummay data ony change this on real data mapped */}
        {products.map((_, index) => (
          <div className="">
            {" "}
            <div className=" flex flex-col items-center gap-5  ">
              <img src="/tshit1.png" className=" rounded-lg" width={300} />
              <div className=" flex flex-col gap-3">
                <Label className=" semi-bold  text-lg tracking-widest">
                  {" "}
                  Regular Fit Long Sleeve Top
                </Label>
                <div className=" flex items-center justify-between   gap-5  px-16    font-medium">
                  <Label> ₱38.99 </Label>
                  <Label> | 300 sold </Label>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OurProducts;
