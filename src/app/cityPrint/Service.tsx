import React from "react";
import { Card } from "~/components/ui/card";
import { LayoutDashboard, Radius, Shirt } from "lucide-react";
import { Label } from "~/components/ui/label";

const Service = () => {
  return (
    <div
      className="    mt-48 flex w-full items-center  gap-24 px-10
  "
      id="services"
    >
      <Card className="  flex w-full flex-col items-center justify-center gap-7 border-2 border-black bg-[#fdfcfc] p-4 px-7">
        <LayoutDashboard
          size={70}
          className="  rounded-sm bg-[#1F0F8B] px-6 py-4 text-white"
        />
        <Label className=" tezt-black text-2xl font-semibold  tracking-tighter">
          Design Your Custom T-Shirts
        </Label>
        <Label className=" text-xs leading-5 text-gray-600">
          We make it easy for you to design your own T-shirts with our intuitive
          tools and high-quality printing services. Customize your designs to
          reflect your style, message, or brand. Whether you need a single shirt
          or a bulk order, our flexible options and quick turnaround times
          ensure you get exactly what you want.
        </Label>
      </Card>
      <Card className=" flex w-full flex-col items-center justify-center gap-7 border-2 bg-[#1F0F8B] p-4 px-7">
        <Radius
          size={70}
          className=" rounded-sm bg-white px-6 py-4 text-[#1F0F8B]"
        />
        <Label className=" text-2xl font-semibold tracking-tighter  text-white">
          Perfect Fit for Every Size
        </Label>
        <Label className=" text-xs leading-5  text-white">
          At City Print, we offer a wide range of sizes to ensure the perfect
          fit for everyone. Customize your apparel to match your exact size
          requirements, from XS to 5XL and beyond. Our commitment to quality
          ensures that every piece fits comfortably and looks great, no matter
          the size.
        </Label>
      </Card>
      <Card className=" flex w-full flex-col items-center justify-center gap-7 border-2 border-black p-4 px-7">
        <Shirt
          size={70}
          className=" rounded-sm bg-[#1F0F8B] px-6 py-4 text-white"
        />
        <Label className=" text-2xl font-semibold tracking-tighter  text-black">
          Choose Your Preferred Fabric
        </Label>
        <Label className=" text-xs leading-5 text-gray-600">
          Select from a variety of fabric options to create your ideal custom
          clothing. Whether you prefer soft, breathable cotton, durable
          polyester, or a blend of materials, we have the perfect fabric for
          your needs. Our diverse selection ensures that your customized apparel
          is comfortable, stylish, and made to last.
        </Label>
      </Card>
    </div>
  );
};

export default Service;
