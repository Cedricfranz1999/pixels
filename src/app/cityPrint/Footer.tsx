import { Facebook, LucideTwitter, Phone, Smartphone, Mail } from "lucide-react";
import React from "react";
import { Label } from "~/components/ui/label";

const Footer = () => {
  return (
    <div className=" flex w-full justify-between bg-blue-400 px-20 py-4">
      <div className=" flex flex-col items-start gap-4 ">
        <Label className=" ml-4 text-xl font-extrabold text-white">
          Contact us
        </Label>
        <div className=" flex gap-3">
          <div className=" flex items-center gap-2">
            <Phone className=" font-bold  text-white" />
            <Label className=" font-bold  text-white">09392223882</Label>
          </div>
          <div className=" flex items-center gap-2">
            <Smartphone className=" font-bold  text-white" />
            <Label className=" font-bold  text-white">09392223882</Label>
          </div>
        </div>
      </div>
      <div className=" flex flex-col items-center gap-4 ">
        <Label className=" text-xl font-extrabold text-white">Address</Label>

        <div className=" flex flex-col items-center gap-2">
          <Label className=" font-bold  text-white">
            Rueda st. corner Cajurao st
          </Label>
          <Label className=" font-bold  text-white">Calbayog City Samar</Label>
        </div>
      </div>
      <div className=" flex flex-col items-center gap-4 ">
        <Label className=" text-xl font-extrabold text-white">
          Social Media
        </Label>
        <div className=" flex items-center gap-2">
          <Facebook className=" font-bold  text-white" />
          <LucideTwitter className=" font-bold  text-white" />
          <Mail className=" font-bold  text-white" />
        </div>
      </div>
    </div>
  );
};

export default Footer;
