"use client";

import HeaderClient from "~/app/_components/layout/header-client";
import { Card, CardContent } from "~/components/ui/card";
import { Label } from "~/components/ui/label";
import { api } from "~/trpc/react";

const Orders = () => {
  const { data, refetch } = api.client_checkouts.getAllCheckoutItems.useQuery();

  return (
    <div>
      <div className="m-5">
        <div className="flex flex-col gap-2">
          <Label className=" text-xl font-bold">Ordered Items</Label>
          <Label className=" italic">List of all ordered items</Label>
        </div>
        <div className="my-5 grid grid-cols-2 gap-5 lg:grid-cols-3">
          {data?.map((item, index) => {
            return (
              <Card key={index}>
                <CardContent>
                  {item.order.map((order, ctr) => {
                    return (
                      <div key={ctr} className="flex gap-1">
                        <img
                          src={
                            order.product.image
                              ? order.product.image
                              : "/tshit1.png"
                          }
                          className=" w-full rounded-lg"
                          alt="Item"
                        />
                        <div className="flex flex-col gap-1">
                          <Label className=" text-base font-semibold italic">
                            {order.product.name}
                          </Label>
                          <div className=" grid text-sm italic md:grid-cols-2">
                            <p>Price: Php {order.product.price}</p>
                            <p>Size: {order.product.size}</p>
                            <p>Brand: {order.product.brand}</p>
                            <p>Color: {order.product.color}</p>
                            <p>Quantity: {order.quantity}</p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Orders;
