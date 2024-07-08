import React from "react";
import { Label } from "~/components/ui/label";
import { Star, MoveRight } from "lucide-react";

const BestSelling = () => {
  return (
    <div className=" mb-10 mt-96 flex  w-full flex-col items-center justify-center  bg-blue-100 px-72    py-10">
      <Label
        className="      mb-14     bg-[#ff8b6b]  px-4 font-medium  tracking-wide text-blue-500 underline "
        style={{ fontSize: "70px" }}
      >
        Best selling
      </Label>{" "}
      <Label className="  text-[20px] tracking-widest text-blue-500 ">
        Get in on the trend with our curated selection of best-selling styles.
      </Label>
      <div className="  mt-20 flex w-full justify-center gap-10   ">
        <div className=" flex flex-col items-center gap-5  ">
          <img src="/tshit4.png" width={600} />
          <div className=" flex flex-col gap-3">
            <Label className=" bg-blue-100    px-6 text-xl font-semibold tracking-widest ">
              {" "}
              Regular Fit Long Sleeve Top
            </Label>
            <div className=" flex items-center   justify-between  gap-5    px-16">
              <Label> ₱38.99 </Label>
              <Label> | </Label>
              <Label> 200 sold </Label>{" "}
            </div>
          </div>
        </div>

        <div className=" flex flex-col items-center gap-5  ">
          <img src="/tshit2.png" width={600} className="rounded-lg" />
          <div className=" flex flex-col gap-3">
            <Label className=" text-xl    font-semibold tracking-widest">
              {" "}
              Regular Fit Long Sleeve Top
            </Label>
            <div className=" flex items-center   justify-between  gap-5    px-16">
              <Label> ₱38.99 </Label>
              <Label> | </Label>
              <Label> 200 sold </Label>{" "}
            </div>
          </div>
        </div>

        <div className=" flex flex-col items-center gap-5  ">
          <img src="/tshit3.png" width={600} className="rounded-lg" />
          <div className=" flex flex-col gap-3">
            <Label className=" text-xl    font-semibold tracking-widest">
              {" "}
              Regular Fit Long Sleeve Top
            </Label>
            <div className=" flex items-center   justify-between  gap-5    rounded-lg  px-16">
              <Label> ₱38.99 </Label>
              <Label> | </Label>
              <Label> 200 sold </Label>{" "}
            </div>
          </div>
        </div>
      </div>
      <div className=" border-3 my-10 flex items-center justify-center gap-3  rounded-sm     border-2 bg-blue-400 px-10 py-4 text-white">
        <Label>See all</Label>
        <MoveRight />
      </div>
    </div>
  );
};

export default BestSelling;
