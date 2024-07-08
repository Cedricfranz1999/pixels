import React from "react";
import { Button } from "~/components/ui/button";
import { Label } from "~/components/ui/label";
import { ShoppingCart } from "lucide-react";

const Intro = () => {
  return (
    <div className=" bg-blue-200  px-24 pt-6">
      {/* header */}

      <div className="   mt-48  flex  w-full  ">
        <div className="  mt-20  w-full ">
          <Label
            className="      pb-24  font-medium  leading-[120px]  tracking-widest  text-[#ff8b6b]"
            style={{ fontSize: "100px" }}
          >
            Discover and Find Your Own Fashion!
          </Label>
          <div className="  mt-10  flex flex-col   gap-5 ">
            <Label className=" text-3xl   font-thin  tracking-wider text-[#2b25cf76]">
              Explore our curated collection of stylish
            </Label>
            <Label className=" text-3xl   font-thin  tracking-wider text-[#2b25cf76]">
              clothing and accessories tailored to your
            </Label>
            <Label className=" text-3xl   font-thin tracking-wider text-[#2b25cf76]">
              unique taste.
            </Label>
          </div>

          <Button className=" mt-16  h-16    w-80 bg-[#2b25cfa5]">
            Explore Now
          </Button>
        </div>
        <div className=" ml-9  flex h-[900px]   w-full justify-center ">
          <img src="/intro.png" className="rounded-lg" width={900} />
        </div>
      </div>
    </div>
  );
};

export default Intro;
