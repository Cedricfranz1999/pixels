import React from "react";
import SlideShowProduct from "./(components)/SlideShow";
import { Label } from "~/components/ui/label";

const SampleDesign = () => {
  return (
    <div className=" 0 mt-32  flex flex-col gap-10" id="sampleDesign">
      <div className=" flex w-full items-center  justify-center">
        <Label id="1" className="  text-4xl font-semibold   tracking-widest ">
          Finished Design for Our Valued Clients{" "}
        </Label>
      </div>
      <SlideShowProduct />
    </div>
  );
};

export default SampleDesign;
