import React from "react";
import { Button } from "~/components/ui/button";
import { Label } from "~/components/ui/label";
import { ShoppingCart } from "lucide-react";

const Intro = () => {
  return (
    <div className=" bg-[#C2EFD4] px-24  pt-6 ">
      {/* header */}

      <div className="   mt-48  flex  w-full  ">
        <div className="  mt-20  w-full ">
          <Label
            className="    pb-24  font-medium  leading-[120px]  tracking-widest  text-[#224F34]"
            style={{ fontSize: "100px" }}
          >
            Discover and Find Your Own Fashion!
          </Label>
          <div className="  mt-10  flex flex-col   gap-5 ">
            <Label className=" text-3xl   font-thin  tracking-wider text-[#224F34]">
              Explore our curated collection of stylish
            </Label>
            <Label className=" text-3xl   font-thin  tracking-wider text-[#224F34]">
              clothing and accessories tailored to your
            </Label>
            <Label className=" text-3xl   font-thin tracking-wider text-[#224F34]">
              unique taste.
            </Label>
          </div>

          <Button className=" mt-16  h-16    w-80 bg-[#224F34]">
            Explore Now
          </Button>
        </div>
        <div className=" flex  h-[900px]   w-full justify-center ">
          <img src="/general.png" width={600} />
        </div>
      </div>
    </div>
  );
};

export default Intro;
