import React from "react";
import { Avatar, AvatarImage } from "~/components/ui/avatar";
import { Button } from "~/components/ui/button";
import { Label } from "~/components/ui/label";
import { ShoppingCart } from "lucide-react";

const Website = () => {
  return (
    <div className="   h-screen w-full   ">
      {/* 1st content */}

      <div className=" bg-[#C2EFD4] px-24  pt-6 ">
        {/* header */}
        <div className="     mb-20 flex h-10 w-full items-center justify-between  ">
          <Label className=" font-bolder text-4xl text-[#224F34] ">
            City Print
          </Label>
          <div className=" flex items-center justify-center gap-20  text-[#224F34] ">
            <Label className="  text-base font-bold">HOME</Label>
            <Label className="text-base font-bold">SHOP</Label>
            <Label className="text-base font-bold">FEATURES</Label>
            <Label className="text-base font-bold">CONTACT</Label>
          </div>
          <div className=" flex items-center justify-center gap-8  text-[#224F34] ">
            <div className=" flex     w-40 cursor-pointer gap-6 rounded-md   border border-solid border-[#224F34]  p-1">
              <ShoppingCart />
              Carts
            </div>
            <Button className="     h-8     w-40 border   border-solid border-[#224F34]  bg-transparent text-[#224F34]">
              Login
            </Button>{" "}
          </div>
        </div>

        {/* general */}
        <div className="   mt-48  flex  w-full  ">
          <div className="  mt-20  w-full ">
            <Label
              className="    font-medium  leading-[140px]  tracking-wide text-[#224F34] "
              style={{ fontSize: "120px" }}
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
      {/* 2nd content */}
      <div className=" mb-10  flex w-full flex-col items-center ">
        <Label
          className="      mb-14  mt-28  font-medium  tracking-wide text-[#224F34] "
          style={{ fontSize: "70px" }}
        >
          Best selling
        </Label>{" "}
        <Label className="  text-[20px] tracking-widest text-[#224F34] ">
          Get in on the trend with our curated selection of best-selling styles.
        </Label>
        <div className="  mt-20 flex w-full justify-center gap-10  ">
          <div>
            <img src="/bestSelling1.png" width={600} />
            Spread Collar Shirt
          </div>
          <div>
            <img src="/bestSelling2.png" width={600} />
            P10:00
          </div>
          <div>
            <img src="/bestSelling3.png" width={600} />
            P10:00
          </div>
        </div>
      </div>
    </div>
  );
};

export default Website;
