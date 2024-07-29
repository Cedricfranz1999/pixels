import React from "react";
import { Label } from "~/components/ui/label";

const Feedback = () => {
  return (
    <div className=" flex w-full  flex-col items-center justify-center  px-72 ">
      <Label className=" pb-20 pt-36  text-4xl font-semibold tracking-widest text-[#224F34]">
        Feedback Corner
      </Label>
      <div className="flex items-center justify-between text-[#224F34]">
        <div className="bg-red-100p-6 flex flex-1 flex-col ">
          <Label className=" text-4xl">“</Label>
          <Label className=" text-2x  py-1 pb-1 text-xl">Emily Wilson</Label>
          <Label className="  font-light text-black">
            The customer experience was exceptional from start to finish. The
            website is user-friendly, the checkout process was smooth, and the
            clothes I ordered fit perfectly. I'm beyond satisfied!
          </Label>
        </div>
        <div className="bg-blue-00 flex flex-1 flex-col  p-6">
          <Label className=" text-4xl">“</Label>
          <Label className=" text-2x  py-1 pb-1 text-xl">Emily Wilson</Label>
          <Label className="  font-light text-black">
            The customer experience was exceptional from start to finish. The
            website is user-friendly, the checkout process was smooth, and the
            clothes I ordered fit perfectly. I'm beyond satisfied!
          </Label>
        </div>
        <div className="flex flex-1 flex-col  p-6 ">
          <Label className=" text-4xl">“</Label>
          <Label className=" text-2x  py-1 pb-1 text-xl">Emily Wilson</Label>
          <Label className="  font-light text-black">
            The customer experience was exceptional from start to finish. The
            website is user-friendly, the checkout process was smooth, and the
            clothes I ordered fit perfectly. I'm beyond satisfied!
          </Label>
        </div>
      </div>
    </div>
  );
};

export default Feedback;
