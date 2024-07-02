import React from "react";
import { Card } from "~/components/ui/card";
import { Label } from "~/components/ui/label";

const Offer = () => {
  return (
    <div className="my-40 w-full   px-72 ">
      <div className=" flex h-[550px] w-full bg-[#C2EFD4] ">
        <div className="flex-1  pl-24 ">
          <img className=" h-full w-full" src="/offer1.png" />
        </div>
        <div className="flex- flex h-full flex-1 flex-col gap-10 py-16 pr-28">
          <Label className="   text-3xl  font-bold tracking-widest  text-[#224F34] ">
            Exclusive offer
          </Label>
          <Label className=" text-xl font-light   leading-8 tracking-widest">
            Unlock the ultimate style upgrade with our exclusive offer Enjoy
            savings of up to 40% off on our latest New Arrivals
          </Label>
          <div className=" flex gap-14  ">
            <Card className=" flex  w-28  flex-col items-center justify-center bg-white py-2   text-[#224F34] shadow-sm drop-shadow-sm">
              <p className=" font-extrabold">06</p>
              <p>Days</p>
            </Card>
            <Card className=" flex  w-28  flex-col items-center justify-center bg-white py-2   text-[#224F34] shadow-sm drop-shadow-sm">
              <p className=" font-extrabold">06</p>
              <p>Days</p>
            </Card>
            <Card className=" flex  w-28  flex-col items-center justify-center bg-white py-2   text-[#224F34] shadow-sm drop-shadow-sm">
              <p className=" font-extrabold">06</p>
              <p>Days</p>
            </Card>
          </div>
          <div className="  flex h-10  w-40  items-center justify-center bg-[#224F34] py-2">
            <Label className="  font-extralight text-white">Buy Now</Label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Offer;
