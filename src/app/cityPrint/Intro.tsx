"use client";

import { ArrowDown, Play, Video } from "lucide-react";
import React from "react";
import { Card } from "~/components/ui/card";
import { Label } from "~/components/ui/label";
import { useRouter } from "next/navigation";
import VideoPromotion from "./promotional-video/page";

const Intro = () => {
  const router = useRouter();

  const handleScrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };
  return (
    <>
      <div className=" mt-32 flex w-full items-center" id="intro">
        <div className=" w-1/2 ">
          <div className=" flex items-center">
            <Label className=" text-6xl  font-extrabold  tracking-wider">
              Design and create,
            </Label>
            <Card className=" bg-[#210C85] p-3">
              <Play className="   text-xl font-extrabold text-white" />
            </Card>
          </div>
          <div className=" mt-4 flex items-center  gap-3">
            <Label className=" text-6xl  font-extrabold  tracking-widest">
              your perfect
            </Label>
            <Label className=" text-6xl  font-extrabold tracking-widest  text-[#211967]">
              Clothing
            </Label>
          </div>
          <div className="mt-20 flex flex-col gap-3 text-gray-600">
            <Label className=" ">
              We bring your designs to life with high-quality printing on
              T-shirts, clothes, jerseys, and much more. Whether
            </Label>
            <Label>
              you're looking to create custom apparel for your team, promote
              your brand, or express your personal style,
            </Label>
            <Label>
              we've got you covered.Our state-of-the-art printing technology and
              attention to detail ensure vibrant
            </Label>
            <div className="  mt-8 flex w-full gap-8   ">
              <div
                className=" p  cursor-pointer rounded-md bg-[#1F0F8B]  px-20 py-2  shadow-sm drop-shadow-sm hover:brightness-50"
                onClick={() => handleScrollToSection("2")}
              >
                <Label className=" cursor-pointer  text-2xl font-light tracking-widest text-white ">
                  Start Learning
                </Label>
              </div>
              <div className="  items flex cursor-pointer gap-4 rounded-md border-2 border-black bg-white px-20 py-2 shadow-sm drop-shadow-sm hover:bg-blue-50">
                <Label className=" cursor-pointer text-2xl font-light tracking-widest text-black">
                  Watch video
                </Label>
                <ArrowDown
                  size={25}
                  className=" mt-1 animate-pulse rounded-md bg-blue-800 p-1 font-bold text-white"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="  px-24">
          <Card className=" bg-[#1F0F8B] p-4 ">
            <img src="/intro.png" width={500} height={500} />
          </Card>
        </div>
      </div>
      <VideoPromotion />
    </>
  );
};

export default Intro;
