"use client";

import React from "react";
import { Label } from "~/components/ui/label";
import { ShoppingCart, ListOrdered, Bell } from "lucide-react";
import { SignedIn, useUser, UserButton } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import EmailProvider from "../email/EmailProvider";

type HeaderProps = {
  cartItemsLength?: number;
  orderedItemsLength?: number;
};

const HeaderClient = ({ cartItemsLength, orderedItemsLength }: HeaderProps) => {
  const { user } = useUser();
  const router = useRouter();

  const handleRouteToCart = () => {
    router.push("/client/cart");
  };

  const handleRouteToCheckouts = () => {
    router.push("/client/order");
  };

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
            <div
              className=" flex cursor-pointer items-center justify-center  gap-1 "
              onClick={handleRouteToCheckouts}
            >
              <ListOrdered />
              <Label className=" cursor-pointer font-bold">Order</Label>
              <Label className="   text-white-300  cursor-pointer bg-red-400  px-2 py-1">
                {orderedItemsLength}
              </Label>
            </div>{" "}
            <div
              className=" flex cursor-pointer items-center justify-center gap-1 "
              onClick={handleRouteToCart}
            >
              <ShoppingCart />
              <Label className=" cursor-pointer font-bold ">Cart</Label>{" "}
              <Label className="   text-white-300  cursor-pointer bg-red-400  px-2 py-1">
                {cartItemsLength}
              </Label>
            </div>{" "}
            <div className=" flex cursor-pointer items-center justify-center gap-1 ">
              <Bell />
              <Label className=" cursor-pointer font-bold ">Notification</Label>
              <Label className="   text-white-300  cursor-pointer bg-red-400  px-2 py-1">
                5
              </Label>
            </div>{" "}
            <EmailProvider />
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
