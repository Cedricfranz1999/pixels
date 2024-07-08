"use client";
import React, { useState } from "react";
import { Button } from "~/components/ui/button";
import { Card } from "~/components/ui/card";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { RadioGroup, RadioGroupItem } from "~/components/ui/radio-group";
import { ShoppingCart } from "lucide-react";

const Product = () => {
  const products = new Array(8).fill(null);
  const [indexTag, setIndex] = useState<number | null>();

  const categories = [
    { id: 1, name: "ALL" },
    { id: 2, name: "JERSEY" },
    { id: 3, name: "V_NECK" },
    { id: 4, name: "POLO" },
    { id: 5, name: "TANK_TOP" },
    { id: 6, name: "ROUND_NECK" },
    { id: 7, name: "CREW_NECK" },
    { id: 8, name: "LONG_SLEEVE" },
    { id: 9, name: "RAGLAN" },
    { id: 10, name: "HENLEY" },
    { id: 11, name: "SLIM_FIT" },
    { id: 12, name: "OVERSIZED" },
    { id: 13, name: "BASKETBALL_SHORTS" },
    { id: 14, name: "RUNNING_SHORTS" },
    { id: 15, name: "CARGO_SHORTS" },
    { id: 16, name: "DENIM_SHORTS" },
    { id: 17, name: "BOARD_SHORTS" },
    { id: 18, name: "GYM_SHORTS" },
    { id: 19, name: "CHINO_SHORTS" },
    { id: 20, name: "SWEAT_SHORTS" },
    { id: 21, name: "SWIM_TRUNKS" },
    { id: 22, name: "SKATE_SHORTS" },
  ];

  console.log("22", indexTag);

  return (
    <div className="flex h-screen w-full gap-3    px-3 ">
      <Card className="   w-1/6   bg-blue-50 px-2">
        <Input
          placeholder="Search Products"
          className=" mb-10 mt-4 border  border-solid border-orange-500"
        />

        <RadioGroup defaultValue="comfortable">
          {categories.map((data) => {
            return (
              <div className="my-2 flex  flex-col items-start justify-center font-bold  text-blue-400">
                <div className=" flex items-center justify-center gap-2">
                  <RadioGroupItem value="default" id="r1" />
                  <Label htmlFor="r1">{data.name}</Label>
                </div>
              </div>
            );
          })}
        </RadioGroup>
      </Card>
      <Card className="   w-full bg-blue-50   py-20">
        <div className="grid grid-cols-4 gap-10">
          {/* dummay data ony change this on real data mapped */}
          {products.map((_, index) => (
            <div className="">
              {" "}
              <div
                className=" relative flex flex-col items-center  gap-5  "
                onMouseEnter={() => setIndex(index)}
                onMouseLeave={() => setIndex(null)}
              >
                <div
                  className={` absolute bottom-20 flex items-start justify-center gap-5  ${index === indexTag ? "" : "hidden"} `}
                >
                  <ShoppingCart />
                  <Button className=" bg-yellow-600">Add To Cart</Button>
                  <Button className=" bg-orange-600">Order Now</Button>
                </div>
                <img src="/tshit1.png" className=" rounded-lg" width={300} />
                <div className=" flex flex-col gap-3">
                  <Label className=" semi-bold  text-lg tracking-widest">
                    {" "}
                    Regular Fit Long Sleeve Top
                  </Label>
                  <div className=" flex items-center justify-between   gap-5  px-16    font-medium">
                    <Label> ₱38.99 </Label>
                    <Label> | 300 sold </Label>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};

export default Product;
