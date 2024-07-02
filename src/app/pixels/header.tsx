import React from "react";
import { Button } from "~/components/ui/button";
import { Label } from "~/components/ui/label";
import { ShoppingCart } from "lucide-react";

const Header = () => {
  return (
    <div className=" bg-[#C2EFD4] px-24  pt-6 ">
      {/* header */}
      <div className="     flex h-10 w-full items-center justify-between  ">
        <Label className=" font-bolder text-4xl text-[#224F34] ">
          City Print
        </Label>
        <div className=" flex items-center justify-center gap-20  text-[#224F34] ">
          <Label className="  text-base font-bold">HOME</Label>
          <Label className="text-base font-bold">SHOP</Label>
          <Label className="text-base font-bold">FEATURES</Label>
          <Label className="text-base font-bold">CONTACT</Label>
        </div>
        <div className=" flex items-center justify-center gap-8  text-[#224F34] ">
          <div className=" flex     w-40 cursor-pointer gap-6 rounded-md   border border-solid border-[#224F34]  p-1">
            <ShoppingCart />
            Carts
          </div>
          <Button className="     h-8     w-40 border   border-solid border-[#224F34]  bg-transparent text-[#224F34]">
            Login
          </Button>{" "}
        </div>
      </div>
    </div>
  );
};

export default Header;
