import { zodResolver } from "@hookform/resolvers/zod";
import { type Dispatch, type SetStateAction, useEffect, useState } from "react";
import { useFieldArray, useForm, useWatch } from "react-hook-form";
import { z } from "zod";
import { toast } from "~/components/ui/use-toast";
import { api } from "~/trpc/react";

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "~/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";
import { type Cart } from "~/types/cart";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { Label } from "~/components/ui/label";

type CartProps = {
  open: boolean;
  setOpen: (open: boolean) => void;
  refetch: () => void;
  items: Cart[] | null;
  setItem: Dispatch<SetStateAction<Cart[]>>;
};

const formSchema = z.object({
  id: z.number(),
  image: z.string({ required_error: "Image is required" }),
  product: z.string({ required_error: "Product is required" }),
  brand: z.string({ required_error: "Brand is required" }),
  color: z.string({ required_error: "Color is required" }),
  size: z.string({ required_error: "Size is required" }),
  price: z.string({ required_error: "Price is required" }),
  quantity: z.string({ required_error: "Quantity is required" }).min(1),
  totalPrice: z.string({ required_error: "Total price is required" }),
});

const cartedItemsSchema = z.object({
  fields: z.array(formSchema),
});

const CheckoutItem = ({
  open,
  items,
  setOpen,
  refetch,
  setItem,
}: CartProps) => {
  const [totalPrice, setTotalPrice] = useState<number>(0);

  const { refetch: refetchOrderedItems } =
    api.client_checkouts.getAllCheckoutItems.useQuery();

  const checkoutItem = api.client_checkouts.addToCheckout.useMutation({
    onSuccess: async () => {
      toast({
        title: "Order successfull",
        description: "Please wait for update",
      });
      refetch();
      await refetchOrderedItems();
      setItem([]);
      setOpen(false);
      form.reset();
    },
    onError: async () => {
      refetch();
      await refetchOrderedItems();
      setOpen(false);
      setItem([]);
      form.reset();
      toast({
        title: "ERROR",
        description: "Server Error",
        variant: "destructive",
      });
    },
  });

  const form = useForm<z.infer<typeof cartedItemsSchema>>({
    resolver: zodResolver(cartedItemsSchema),
  });

  const { fields } = useFieldArray({
    control: form.control,
    name: "fields",
  });

  const formData = useWatch({
    control: form.control,
    name: "fields",
  });

  useEffect(() => {
    if (items) {
      const formattedFields = items.map((data) => {
        return {
          id: data.id,
          image: data.product.image ? data.product.image : "",
          product: data.product.name,
          brand: data.product.brand ? data.product.brand : "",
          color: data.product.color ? data.product.color : "",
          size: data.product.size,
          price: data.product.price.toString(),
          quantity: data.quantity.toString(),
          totalPrice: (data.quantity * data.product.price).toString(),
        };
      });
      form.setValue("fields", formattedFields);
      setTotalPrice(
        items
          ?.map((order) => order.product.price * order.quantity)
          .reduce((acc, curr) => acc + curr, 0),
      );
    }
  }, [items, form]);

  useEffect(() => {
    if (formData) {
      const totalPrice = formData
        .map((order) => parseFloat(order.price) * parseFloat(order.quantity))
        .reduce((acc, curr) => acc + curr, 0);

      if (!isNaN(totalPrice)) {
        setTotalPrice(totalPrice);
      } else setTotalPrice(0);
    }
  }, [formData, setTotalPrice]);

  const onSubmit = async (values: z.infer<typeof cartedItemsSchema>) => {
    let hasErrors = false;

    values.fields.forEach((order, index) => {
      if (parseInt(order.quantity) === 0) {
        form.setError(`fields.${index}.quantity`, {
          type: "manual",
          message: "Quantity cannot be zero",
        });
        hasErrors = true;
      }
    });

    const orderDetails = values.fields.map((order) => ({
      id: order.id,
      quantity: parseInt(order.quantity),
    }));

    if (!hasErrors) {
      await checkoutItem.mutateAsync({
        orderDetails,
        totalPrice: totalPrice,
      });
    }
  };

  const handleOpenChange = () => {
    setOpen(false);
    form.reset();
  };

  return (
    <Dialog open={open} onOpenChange={() => handleOpenChange()}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Details</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit as any)}
            className="grid gap-4 py-4"
          >
            {fields.map((items, index) => {
              return (
                <>
                  <div className="flex gap-5">
                    <FormField
                      control={form.control}
                      name={`fields.${index}.image`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-right">Image:</FormLabel>
                          <FormControl>
                            <Avatar className="flex h-24 w-24 items-center justify-center overflow-hidden rounded-md border">
                              <AvatarImage {...field} src={items.image} />
                              <AvatarFallback>Item</AvatarFallback>
                            </Avatar>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name={`fields.${index}.product`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-right">Product:</FormLabel>
                          <FormControl>
                            <Input {...field} disabled />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    <FormField
                      control={form.control}
                      name={`fields.${index}.brand`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-right">Brand:</FormLabel>
                          <FormControl>
                            <Input {...field} disabled />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name={`fields.${index}.color`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-right">Color:</FormLabel>
                          <FormControl>
                            <Input {...field} disabled />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name={`fields.${index}.size`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-right">Size:</FormLabel>
                          <FormControl>
                            <Input {...field} disabled />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    <FormField
                      control={form.control}
                      name={`fields.${index}.price`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-right">
                            Price per 1pc:
                          </FormLabel>
                          <FormControl>
                            <Input placeholder="Quantity" {...field} disabled />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name={`fields.${index}.quantity`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-right">
                            Quantity:
                          </FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              defaultValue={1}
                              placeholder="Quantity"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name={`fields.${index}.totalPrice`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-right">Total:</FormLabel>
                          <FormControl>
                            <Input placeholder="Quantity" {...field} disabled />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </>
              );
            })}
            <Label>Total Price: Php {totalPrice}</Label>
            <DialogFooter className="mt-4">
              <Button
                onClick={() => handleOpenChange()}
                type="button"
                variant="outline"
              >
                Cancel
              </Button>
              <Button type="submit">Place Order</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default CheckoutItem;
