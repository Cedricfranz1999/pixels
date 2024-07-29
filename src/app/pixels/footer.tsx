import React from "react";
import { Label } from "~/components/ui/label";
import { Separator } from "~/components/ui/separator";
import { Facebook, Twitter, Instagram } from "lucide-react";

const Footer = () => {
  return (
    <div className=" -center mt-20   flex  w-full cursor-pointer  flex-col   items-center justify-center  gap-10  bg-blue-600 pt-5 text-xs  font-extrabold  tracking-widest text-white">
      <div className=" flex w-full items-center justify-between  px-20   ">
        <div className=" flex cursor-pointer flex-col gap-6">
          <Label className="  cursor-pointer text-2xl  font-extrabold">
            Rivo
          </Label>
          <Label className=" cursor-pointer">Social Media</Label>
          <div className=" flex gap-5">
            <Facebook />
            <Twitter />
            <Instagram />
          </div>
        </div>

        <div className=" flex cursor-pointer   flex-col gap-5">
          <Label className=" cursor-pointer font-extrabold">Shop</Label>
          <Label className=" text-thin cursor-pointer text-xs ">Products</Label>
          <Label className=" text-thin cursor-pointer text-xs ">
            Overview{" "}
          </Label>
          <Label className=" text-thin cursor-pointer text-xs ">Pricing</Label>
        </div>

        <div className=" flex flex-col gap-5">
          <Label className=" cursor-pointer font-extrabold">Company</Label>
          <Label className=" text-thin cursor-pointer text-xs ">About us</Label>
          <Label className=" text-thin cursor-pointer text-xs ">News</Label>
          <Label className=" text-thin cursor-pointer  text-xs ">Support</Label>
        </div>

        <div className=" flex flex-col gap-5">
          <Label className=" font-extrabold">Stay up to date</Label>
          <div className=" flex border border-solid  border-green-200 bg-[#224F34] text-white outline-none ">
            <input
              placeholder="Enter Your Email"
              className=" border-green-00 border border-solid  bg-blue-700  p-2 text-white outline-none"
            />
            <button className="bg-blue-300  p-1 font-light  text-blue-700 ">
              Submit
            </button>
          </div>
        </div>
      </div>
      <div className=" flex w-full   items-center justify-center  gap-10  px-20 pb-10 ">
        <Separator className=" w-3/4 bg-[#c7ecd0] " />
        <Label>Terms</Label>
        <Label>Privacy</Label>
        <Label>Cookies</Label>
      </div>
    </div>
  );
};

export default Footer;
