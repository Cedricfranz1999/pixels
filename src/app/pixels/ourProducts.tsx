import React from "react";
import { Label } from "~/components/ui/label";
import { Star } from "lucide-react";

const OurProducts = () => {
  const products = new Array(8).fill(null);

  return (
    <div className=" mt-20 flex flex-col items-center justify-center">
      <Label
        className="      mb-14 font-medium  tracking-wide text-[#224F34] "
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
              <img src="/ourProducts1.png" width={300} />
              <div className=" flex flex-col gap-3">
                <Label className=" semi-bold  text-lg tracking-widest">
                  {" "}
                  Regular Fit Long Sleeve Top
                </Label>
                <div className=" flex items-center justify-between   gap-5  px-16    font-medium">
                  <Label> ₱38.99 </Label>
                  <Label> | </Label>

                  <Star className=" m-0 bg-yellow-200" size={15} />
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
