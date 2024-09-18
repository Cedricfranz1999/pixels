"use client";
import { useRouter } from "next/navigation";
import React from "react";
import { Label } from "~/components/ui/label";

const Header = () => {
  const router = useRouter();
  return (
    <div className="  mt-5 flex  w-full   items-center justify-between">
      <div className=" flex items-center ">
        <img className="  " src="/logo.png " width={200} height={200} />
        <Label className=" text-5xl font-bold">
          {" "}
          <span className=" text-blue-600">City</span>
          <span className=" text-orange-600">Print</span>
        </Label>
      </div>
      <div className="flex items-center gap-7">
        <Label className="    cursor-pointer rounded-md p-4 font-bold tracking-widest hover:bg-blue-600 hover:text-white">
          Home
        </Label>
        <Label className="    cursor-pointer rounded-md p-4 font-bold tracking-widest hover:bg-blue-600 hover:text-white">
          Design
        </Label>
        <Label className="    cursor-pointer rounded-md p-4 font-bold tracking-widest hover:bg-blue-600 hover:text-white">
          Product
        </Label>
        <Label className="    cursor-pointer rounded-md p-4 font-bold tracking-widest hover:bg-blue-600 hover:text-white">
          Feedback
        </Label>
        <Label className="    cursor-pointer rounded-md p-4 font-bold tracking-widest hover:bg-blue-600 hover:text-white">
          Contact
        </Label>
        <button
          onClick={() => router.push("/sign-in")}
          className="rounded-b-lg bg-blue-600 px-2  py-1  font-bold  text-white hover:animate-bounce hover:brightness-125"
        >
          SignIn
        </button>
      </div>
    </div>
  );
};

export default Header;
