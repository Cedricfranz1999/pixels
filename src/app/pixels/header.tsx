import React from "react";
import { Button } from "~/components/ui/button";
import { Label } from "~/components/ui/label";
import { ShoppingCart } from "lucide-react";

const Header = () => {
  return (
    <div className="  px-24  pt-6 ">
      {/* header */}
      <div className="     flex h-10 w-full items-center justify-between  ">
        <img src="/logo.png " width={150} height={150} />
        <div className=" under flex items-center justify-center   gap-20 text-[#ff8b6b] ">
          <Label className="  cursor-pointer   rounded-sm  bg-blue-700  px-3 py-1 text-base font-bold  tracking-widest text-white shadow-sm drop-shadow-sm ">
            HOME
          </Label>
          <Label className="  cursor-pointer   rounded-sm  bg-blue-700  px-3 py-1 text-base font-bold  tracking-widest text-white shadow-sm drop-shadow-sm ">
            SHOP
          </Label>
          <Label className="  cursor-pointer   rounded-sm  bg-blue-700  px-3 py-1 text-base font-bold  tracking-widest text-white shadow-sm drop-shadow-sm ">
            FEATURES
          </Label>
          <Label className="  cursor-pointer   rounded-sm  bg-blue-700  px-3 py-1 text-base font-bold  tracking-widest text-white shadow-sm drop-shadow-sm ">
            CONTACT
          </Label>
        </div>
        <div className=" flex items-center justify-center gap-8    text-[#ff8b6b]">
          <div className=" p4-2   flex   w-40 cursor-pointer items-center gap-3 rounded-md   border border-solid border-blue-700 bg-blue-600 py-1 text-white">
            <ShoppingCart className="ml-4" />
            Carts
          </div>
          <Button className="     h-8     w-40 border  border-solid  border-blue-600 bg-blue-700 ">
            Login
          </Button>{" "}
        </div>
      </div>
    </div>
  );
};

export default Header;
