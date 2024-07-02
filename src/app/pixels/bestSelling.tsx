import React from "react";
import { Label } from "~/components/ui/label";
import { Star, MoveRight } from "lucide-react";

const BestSelling = () => {
  return (
    <div className=" mb-10  flex w-full flex-col items-center  justify-center    px-72">
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
        <div className=" flex flex-col items-center gap-5  ">
          <img src="/bestSelling1.png" width={600} />
          <div className=" flex flex-col gap-3">
            <Label className=" text-xl    font-semibold tracking-widest">
              {" "}
              Regular Fit Long Sleeve Top
            </Label>
            <div className=" flex items-center   justify-between  gap-5    px-16">
              <Label> ₱38.99 </Label>
              <Label> | </Label>

              <Star className=" m-0 bg-yellow-200" size={15} />
            </div>
          </div>
        </div>

        <div className=" flex flex-col items-center gap-5  ">
          <img src="/bestSelling2.png" width={600} />
          <div className=" flex flex-col gap-3">
            <Label className=" text-xl    font-semibold tracking-widest">
              {" "}
              Regular Fit Long Sleeve Top
            </Label>
            <div className=" flex items-center   justify-between  gap-5    px-16">
              <Label> ₱38.99 </Label>
              <Label> | </Label>

              <Star className=" m-0 bg-yellow-200" size={15} />
            </div>
          </div>
        </div>

        <div className=" flex flex-col items-center gap-5  ">
          <img src="/bestSelling3.png" width={600} />
          <div className=" flex flex-col gap-3">
            <Label className=" text-xl    font-semibold tracking-widest">
              {" "}
              Regular Fit Long Sleeve Top
            </Label>
            <div className=" flex items-center   justify-between  gap-5    px-16">
              <Label> ₱38.99 </Label>
              <Label> | </Label>

              <Star className=" m-0 bg-yellow-200" size={15} />
            </div>
          </div>
        </div>
      </div>
      <div className=" border-3 my-10 flex items-center justify-center gap-3  border-2    border-[#224F34]  px-6 py-2  text-[#224F34]">
        <Label>See all</Label>
        <MoveRight />
      </div>
    </div>
  );
};

export default BestSelling;
