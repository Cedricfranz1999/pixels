"use client";

import { OctagonAlert } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import CheckoutItem from "~/app/_components/client/checkout/form";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardHeader } from "~/components/ui/card";
import { Checkbox } from "~/components/ui/checkbox";
import { Label } from "~/components/ui/label";
import { toast } from "~/components/ui/use-toast";
import { api } from "~/trpc/react";
import { type Cart } from "~/types/cart";

const Carts = () => {
  const [checkedItems, setCheckedItems] = useState<Cart[]>([]);
  const [checkoutModalOpen, setCheckoutModalOpen] = useState<boolean>(false);

  const router = useRouter()

  const { data, refetch } = api.client_carts.getAllCartedItems.useQuery();

  const deleteCart = api.client_carts.deleteCartedItems.useMutation({
    onSuccess: async () => {
      toast({
        title: "Success",
        description: "Order successfully deleted",
      });
      await refetch();
    },
    onError: async () => {
      await refetch();
      toast({
        title: "ERROR",
        description: "Server Error",
        variant: "destructive",
      });
    },
  });

  const cancelCart = api.client_carts.cancelCartedItems.useMutation({
    onSuccess: async () => {
      toast({
        title: "Success",
        description: "Order successfully canceled",
      });
      await refetch();
    },
    onError: async () => {
      await refetch();
      toast({
        title: "ERROR",
        description: "Server Error",
        variant: "destructive",
      });
    },
  });

  const handleCheckboxChange = (cart: any) => {
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

  const handleDeleteCart = async (id: number) => {

    await deleteCart.mutateAsync({
      id,
    });
  };

  const handleCancelCart = async (id: number) => {

    await cancelCart.mutateAsync({
        id,
    });
  };

  return (
    <div>
      <div className="m-5">
        <div className="flex justify-between">
          <div className="flex flex-col gap-2">
            <Label className=" text-xl font-bold">Carted Items</Label>
            <Label className=" italic">List of all carted items</Label>
            <p className="text-red-500 font-semibold">Items beyond 30 minutes after carted cannot be canceled or delete.</p>
          </div>
          <div className="flex justify-end">
            {checkedItems.length > 0 && (
              <div className="flex gap-3">
                <Button onClick={handleCheckoutItem}>Checkout</Button>
              </div>
            )}
          </div>
        </div>
        {data && data?.length < 1 && 
            <div className="pt-10 flex mx-auto items-center justify-center">
                <Card className="w-1/3 h-1/3">
                    <CardContent className="items-center justify-center flex flex-col pt-5 space-y-3">
                        <OctagonAlert size={100} className="text-red-600"/>
                        <p className="text-sm">Nothing to see here.</p>
                        <p className="text-sm italic font-bold">Order items in our store.</p>
                        <Button onClick={() => router.push('/client')}>Order now!</Button>
                    </CardContent>
                </Card>
            </div>
        }
        <div className="my-5 grid grid-cols-2 gap-5 lg:grid-cols-4">
          {data?.map((cart, index: number) => {
            const isChecked = checkedItems.some((item) => item.id === cart.id);
            const createdAt = new Date(cart.createdAt);
            const now = new Date();
        
            const minutesDifference = (now.getTime() - createdAt.getTime()) / 60000; 
            const isDisabled = minutesDifference > 30;
            return (
              <Card key={index}>
                <CardHeader>
                    <Checkbox
                        checked={isChecked}
                        onCheckedChange={() => handleCheckboxChange(cart)}
                    />
                </CardHeader>
                <CardContent>
                    <div className="relative flex flex-col gap-1">
                        <img
                            alt="image"
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
                            <div className="w-full flex justify-end gap-3">
                                <Button className="h-9" disabled={isDisabled} onClick={() => handleCancelCart(cart.id)}>Cancel</Button>
                                <Button onClick={() => handleDeleteCart(cart.id)} variant={"destructive"} disabled={isDisabled}>
                                    Delete
                                </Button>
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
