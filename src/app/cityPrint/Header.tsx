'use client'
import { useRouter } from "next/navigation";
import React from "react";
import { Label } from "~/components/ui/label";

const Header = () => {

  const router = useRouter()
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
          Design
        </Label>
        <Label className=" cursor-pointer font-bold tracking-widest">
          Product
        </Label>
        <Label className=" cursor-pointer font-bold tracking-widest">
          Feedback
        </Label>
        <Label className=" cursor-pointer font-bold tracking-widest">
          Contact
        </Label>
        <button  onClick={()=> router.push('/sign-in')} className=" rounded-b-lg bg-blue-600  px-2  py-1  hover:brightness-125 font-bold text-white">
          SignIn
        </button>
      </div>
    </div>
  );
};

export default Header;
