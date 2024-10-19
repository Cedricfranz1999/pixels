"use client";

import HeaderClient from "~/app/_components/layout/header-client";
import { Card, CardContent } from "~/components/ui/card";
import { Label } from "~/components/ui/label";
import { api } from "~/trpc/react";

const Orders = () => {
  const { data, refetch } = api.client_checkouts.getAllCheckoutItems.useQuery();

  return (
    <div className="m-5">
      <div className="flex flex-col gap-2">
        <Label className="text-2xl font-bold">Ordered Items</Label>
        <Label className="italic text-gray-600">
          List of all ordered items
        </Label>
      </div>

      <div className="my-5 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {data?.map((item, index) => (
          <Card key={index} className="shadow-md">
            <CardContent className="p-4">
              {item.order.map((order, ctr) => (
                <div key={ctr} className="flex flex-col gap-4 md:flex-row">
                  <img
                    src={order.product.image || "/tshirt1.png"}
                    className="w-full rounded-lg object-cover md:w-32"
                    alt={order.product.name}
                  />
                  <div className="flex flex-col gap-2">
                    <Label className="text-lg font-semibold italic">
                      {order.product.name}
                    </Label>
                    <div className="grid gap-y-1 text-sm text-gray-600 md:grid-cols-2">
                      <p>Price: Php {order.product.price}</p>
                      <p>Size: {order.product.size}</p>
                      <p>Brand: {order.product.brand}</p>
                      <p>Color: {order.product.color}</p>
                      <p>Quantity: {order.quantity}</p>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Orders;
