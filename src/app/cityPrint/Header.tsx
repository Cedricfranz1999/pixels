import React from "react";
import { Label } from "~/components/ui/label";

const Header = () => {
  return (
    <div className="  mt-5 flex  w-full   items-center justify-between">
      <div className=" gap- flex items-center">
        <img className="  " src="/logo.png " width={50} height={50} />
        <Label className=" font-bold">City Print</Label>
      </div>
      <div className="flex items-center gap-7">
        <Label className=" cursor-pointer font-bold tracking-widest">
          Home
        </Label>
        <Label className=" cursor-pointer font-bold tracking-widest">
          Service
        </Label>
        <Label className=" cursor-pointer font-bold tracking-widest">
          About
        </Label>
        <Label className=" cursor-pointer font-bold tracking-widest">
          Courses
        </Label>
        <Label className=" cursor-pointer font-bold tracking-widest">
          LOGIN
        </Label>
      </div>
    </div>
  );
};

export default Header;
