"use client";

import React from "react";
import { Label } from "~/components/ui/label";
import { ShoppingCart, ListOrdered, Bell } from "lucide-react";
import { SignedIn, useUser, UserButton } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import EmailProvider from "../email/EmailProvider";
import { api } from "~/trpc/react";
import Messenger from "../message/Messenger";
import MessengerCustomer from "../message/MessengerCustomer";

type HeaderProps = {
  cartItemsLength?: number;
  orderedItemsLength?: number;
};

const HeaderClient = () => {
  const { data: checkoutItems, refetch: refetchCheckout } =
    api.client_checkouts.getAllCheckoutItems.useQuery();
  const { data: cartedItems, refetch: refetchCart } =
    api.client_carts.getAllCartedItems.useQuery();
  const { user } = useUser();
  const router = useRouter();

  const handleRouteToCart = () => {
    router.push("/client/cart");
  };

  const handleRouteToCheckouts = () => {
    router.push("/client/order");
  };

  return (
    <div className=" mb-4 w-full">
      {/* header */}
      <div className="     flex  h-[60px]  items-center   justify-between  bg-orange-500   px-5">
        <div className=" flex items-center justify-start gap-1"></div>

        <div className=" flex items-center justify-center gap-8  ">
          <div className=" flex items-center justify-center gap-6  text-white">
            <div
              className=" flex cursor-pointer items-center justify-center  gap-1 "
              onClick={handleRouteToCheckouts}
            >
              <ListOrdered />
              <Label className=" cursor-pointer font-bold">Order</Label>
              <Label className="   text-white-300  cursor-pointer bg-red-400  px-2 py-1">
                {checkoutItems?.length}
              </Label>
            </div>{" "}
            <div
              className=" flex cursor-pointer items-center justify-center gap-1 "
              onClick={handleRouteToCart}
            >
              <ShoppingCart />
              <Label className=" cursor-pointer font-bold ">Cart</Label>{" "}
              <Label className="   text-white-300  cursor-pointer bg-red-400  px-2 py-1">
                {cartedItems?.length}
              </Label>
            </div>{" "}
            {/* <div className=" flex cursor-pointer items-center justify-center gap-1 ">
              <Bell />
              <Label className=" cursor-pointer font-bold ">Notification</Label>
              <Label className="   text-white-300  cursor-pointer bg-red-400  px-2 py-1">
                5
              </Label>
            </div>{" "} */}
            <div className="  mx-1011 flex items-center gap-3">
              <MessengerCustomer />

              <EmailProvider />
            </div>
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
