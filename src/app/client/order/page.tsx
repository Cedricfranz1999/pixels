"use client";

import { OctagonAlert } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "~/components/ui/button";
import { Card, CardContent } from "~/components/ui/card";
import { Label } from "~/components/ui/label";
import { toast } from "~/components/ui/use-toast";
import { api } from "~/trpc/react";

const Orders = () => {
    const router = useRouter()

  const { data, refetch } = api.client_checkouts.getAllCheckoutItems.useQuery();

  const cancelCart = api.client_checkouts.cancelCheckout.useMutation({
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

  const backToCart = api.client_checkouts.backToCart.useMutation({
    onSuccess: async () => {
      toast({
        title: "Success",
        description: "Order successfully updated",
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

  const handleCancelCart = async (id: number) => {

    await cancelCart.mutateAsync({
        id,
    });
  };

  const handleBackToCart = async (id: number, orderId: number) => {

    await backToCart.mutateAsync({
        id,
        orderId
    });
  };
  return (
    <div>
      <div className="m-5">
        <div className="flex flex-col gap-2">
          <Label className=" text-xl font-bold">Ordered Items</Label>
          <Label className=" italic">List of all ordered items</Label>
          <p className="text-red-500 font-semibold">Items beyond 30 minutes after ordered cannot be canceled or set back to cart.</p>
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
          {data?.map((item, index) => {
            const createdAt = new Date(item.createdAt);
            const now = new Date();
        
            const minutesDifference = (now.getTime() - createdAt.getTime()) / 60000; 
            const isDisabled = minutesDifference > 30;
            return (
              <Card key={index}>
                <CardContent>
                  {item.order.map((order, ctr) => {
                    return (
                      <div key={ctr} className="flex flex-col gap-1 mt-3">
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
                          <div className="w-full flex justify-end gap-3">
                                <Button className="h-9" disabled={isDisabled} onClick={() => handleCancelCart(item.id)}>Cancel</Button>
                                <Button className="h-9 bg-orange-500" disabled={isDisabled} onClick={() => handleBackToCart(item.id, order.id)}>Back to Cart</Button>
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
