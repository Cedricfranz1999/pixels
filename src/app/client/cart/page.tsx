"use client";

import { useState } from "react";
import CheckoutItem from "~/app/_components/client/checkout/form";
import { Button } from "~/components/ui/button";
import { Card, CardContent } from "~/components/ui/card";
import { Checkbox } from "~/components/ui/checkbox";
import { Label } from "~/components/ui/label";
import { api } from "~/trpc/react";
import { type Cart } from "~/types/cart";

const Carts = () => {
  const [checkedItems, setCheckedItems] = useState<Cart[]>([]);
  const [checkoutModalOpen, setCheckoutModalOpen] = useState<boolean>(false);

  const { data, refetch } = api.client_carts.getAllCartedItems.useQuery();

  const handleCheckboxChange = (cart: Cart) => {
    setCheckedItems((prevItems) => {
      if (prevItems.some((item) => item.id === cart.id)) {
        return prevItems.filter((item) => item.id !== cart.id);
      } else {
        return [...prevItems, cart];
      }
    });
  };

  const handleCheckoutItem = () => {
    setCheckoutModalOpen(true);
  };

  return (
    <div>
      <div className="m-5">
        <div className="flex justify-between">
          <div className="flex flex-col gap-2">
            <Label className=" text-xl font-bold">Carted Items</Label>
            <Label className=" italic">List of all carted items</Label>
          </div>
          <div className="flex justify-end">
            {checkedItems.length > 0 && (
              <Button onClick={handleCheckoutItem}>Checkout</Button>
            )}
          </div>
        </div>
        <div className="my-5 grid grid-cols-2 gap-5 lg:grid-cols-6">
          {data?.map((cart, index: number) => {
            const isChecked = checkedItems.some((item) => item.id === cart.id);
            return (
              <Card key={index}>
                <CardContent>
                  <div className="relative flex flex-col gap-1">
                    <Checkbox
                      className="absolute top-3"
                      checked={isChecked}
                      onCheckedChange={() => handleCheckboxChange(cart)}
                    />
                    <img
                      src={
                        cart.product.image ? cart.product.image : "/tshit1.png"
                      }
                      className=" w-full rounded-lg"
                    />
                    <div className="flex flex-col gap-1">
                      <Label className=" text-base font-semibold italic">
                        {cart.product.name}
                      </Label>
                      <div className=" grid text-sm italic md:grid-cols-2">
                        <p>Price: Php {cart.product.price}</p>
                        <p>Size: {cart.product.size}</p>
                        <p>Brand: {cart.product.brand}</p>
                        <p>Color: {cart.product.color}</p>
                        <p>Quantity: {cart.quantity}</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
      <CheckoutItem
        open={checkoutModalOpen}
        setOpen={setCheckoutModalOpen}
        items={checkedItems}
        setItem={setCheckedItems}
        refetch={refetch}
      />
    </div>
  );
};

export default Carts;
