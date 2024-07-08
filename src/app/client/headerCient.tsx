"use client";

import React from "react";
import { Button } from "~/components/ui/button";
import { Label } from "~/components/ui/label";
import {
  ShoppingCart,
  ListOrdered,
  Bell,
  ShoppingCartIcon,
} from "lucide-react";
import { SignedIn, useUser, UserButton } from "@clerk/nextjs";
const HeaderClient = () => {
  const { user } = useUser();

  return (
    <div className=" mb-4">
      {/* header */}
      <div className="     flex h-16  items-center   justify-between  bg-blue-500   px-5">
        <div className=" flex items-center justify-start gap-1">
          <img src="/logo.png " width={100} height={100} />
          <Label className=" text-xl font-bold text-orange-400 ">
            City Print Enterprises
          </Label>
        </div>

        <div className=" flex items-center justify-center gap-8  ">
          <div className=" flex items-center justify-center gap-6  text-white">
            <div className=" flex cursor-pointer items-center justify-center  gap-1 ">
              <ListOrdered />
              <Label className=" cursor-pointer font-bold">Order</Label>
              <Label className="   text-white-300  cursor-pointer bg-red-400  px-2 py-1">
                5
              </Label>
            </div>{" "}
            <div className=" flex cursor-pointer items-center justify-center gap-1 ">
              <ShoppingCart />
              <Label className=" cursor-pointer font-bold ">Cart</Label>{" "}
              <Label className="   text-white-300  cursor-pointer bg-red-400  px-2 py-1">
                4
              </Label>
            </div>{" "}
            <div className=" flex cursor-pointer items-center justify-center gap-1 ">
              <Bell />
              <Label className=" cursor-pointer font-bold ">Notification</Label>
              <Label className="   text-white-300  cursor-pointer bg-red-400  px-2 py-1">
                5
              </Label>
            </div>{" "}
            <SignedIn>
              <div>
                <div className="flex w-full flex-shrink-0 items-center justify-between gap-2 p-2">
                  <div className="ml-2 flex items-center justify-center space-x-2">
                    <div>
                      <UserButton afterSignOutUrl="/sign-in" />
                    </div>
                    <div className="flex flex-col items-start justify-start">
                      <Label className="text-center ">
                        {user?.firstName} <br /> {user?.lastName}
                      </Label>
                    </div>
                  </div>
                </div>
              </div>
            </SignedIn>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeaderClient;
