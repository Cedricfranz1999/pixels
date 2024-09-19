"use client";

import { Facebook, LucideTwitter, Phone, Smartphone, Mail } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";
import { Label } from "~/components/ui/label";
import EmailProvider from "../_components/email/EmailProvider";

const Footer = () => {
  const router = useRouter();

  return (
    <div
      className=" flex w-full justify-between bg-blue-400 px-20 py-4"
      id="contact"
    >
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
        <div className=" flex items-center gap-7">
          <Facebook
            className=" cursor-pointer  font-bold text-white "
            onClick={() =>
              router.push(
                "https://www.facebook.com/people/CityPrint-Sublimation-Sportswear/100084044829331/",
              )
            }
          />
          <LucideTwitter className=" cursor-pointer  font-bold text-white " />
          <EmailProvider />
        </div>
      </div>
    </div>
  );
};

export default Footer;
