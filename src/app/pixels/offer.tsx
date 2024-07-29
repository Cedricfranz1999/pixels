"use client";
import React, { useEffect, useState } from "react";
import { Card } from "~/components/ui/card";
import { Label } from "~/components/ui/label";

const Offer = () => {
  const [hours, setHours] = useState(6);
  const [minutes, setMinutes] = useState(59);
  const [seconds, setSeconds] = useState(59);

  useEffect(() => {
    const timer = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1);
      } else {
        if (minutes > 0) {
          setMinutes(minutes - 1);
          setSeconds(59);
        } else {
          if (hours > 0) {
            setHours(hours - 1);
            setMinutes(59);
            setSeconds(59);
          } else {
            clearInterval(timer);
            // Optionally handle timer expiry here
          }
        }
      }
    }, 1000); // 1000 milliseconds = 1 second

    return () => clearInterval(timer);
  }, [hours, minutes, seconds]);
  return (
    <div className="my-40 w-full   rounded-lg px-72 ">
      <div className=" flex h-[550px] w-full rounded-lg  bg-[#38A298]">
        <div className="flex-1 rounded-lg pl-2   ">
          <img className=" h-full w-full" src="/tshit11.jpg" />
        </div>
        <div className=" flex h-full flex-1 flex-col items-center gap-10 px-10 py-16">
          <Label className="   text-3xl  font-bold tracking-widest  text-white ">
            Exclusive offer
          </Label>
          <Label className=" text-xl font-light   leading-8 tracking-widest">
            Unlock the ultimate style upgrade with our exclusive offer Enjoy
            savings of up to 40% off on our latest New Arrivals
          </Label>
          <div className=" flex gap-14  ">
            <Card className=" flex  w-28  flex-col items-center justify-center bg-white py-2   text-[#224F34] shadow-sm drop-shadow-sm">
              <p className=" font-extrabold">06</p>
              <p>Days</p>
            </Card>
            <Card className="flex w-28 flex-col items-center justify-center bg-white py-2 text-[#224F34] shadow-sm drop-shadow-sm">
              <p className="font-extrabold">
                {hours < 10 ? `0${hours}` : hours}
              </p>
              <p>hours</p>
            </Card>
            <Card className="flex w-28 flex-col items-center justify-center bg-white py-2 text-[#224F34] shadow-sm drop-shadow-sm">
              <p className="font-extrabold">
                {minutes < 10 ? `0${minutes}` : minutes}
              </p>
              <p>minutes</p>
            </Card>
            <Card className="flex w-28 flex-col items-center justify-center bg-white py-2 text-[#224F34] shadow-sm drop-shadow-sm">
              <p className="font-extrabold">
                {seconds < 10 ? `0${seconds}` : seconds}
              </p>
              <p>seconds</p>
            </Card>
          </div>
          <div className="  flex h-10  w-40 items-center  justify-center rounded-sm bg-white py-2 text-black">
            <Label className="  font-bold text-[#224F34] ">Inquire Now</Label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Offer;
