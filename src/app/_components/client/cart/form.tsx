import { zodResolver } from "@hookform/resolvers/zod";
import { type Dispatch, type SetStateAction, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
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
import { type Product } from "~/types/product";
import { Label } from "~/components/ui/label";

type CartProps = {
  open: boolean;
  setOpen: (open: boolean) => void;
  refetch: () => void;
  refetchCart?: () => void;
  item: Product | null;
  setItem: Dispatch<SetStateAction<Product | null>>;
};
const formSchema = z.object({
  product: z.string({ required_error: "Product is required" }),
  quantity: z.string({ required_error: "Quantity is required" }).min(1),
  price: z.string({ required_error: "Price is required" }).min(1),
});

const AddToCartForm = ({
  open,
  item,
  setOpen,
  refetch,
  refetchCart,
  setItem,
}: CartProps) => {
  const [totalPrice, setTotalPrice] = useState<number>(0);

  const addToCart = api.client_carts.addToCart.useMutation({
    onSuccess: () => {
      toast({
        title: "SUCCESS",
        description: "Added to cart successfully",
      });
      refetch();
      refetchCart && refetchCart();
      setItem(null);
      setOpen(false);
      form.reset();
    },
    onError: () => {
      refetch();
      refetchCart && refetchCart();
      setOpen(false);
      setItem(null);
      form.reset();
      toast({
        title: "ERROR",
        description: "Server Error",
        variant: "destructive",
      });
    },
  });

  const form = useForm({
    resolver: zodResolver(formSchema),
  });

  useEffect(() => {
    if (item) {
      form.setValue("product", item.name);
      form.setValue("price", item.price.toString());
    }
  }, [item, form]);

  const quantity = isNaN(Number(parseFloat(form.watch("quantity"))))
    ? 0
    : parseFloat(form.watch("quantity"));

  useEffect(() => {
    setTotalPrice(quantity * parseFloat(form.getValues("price")));
  }, [quantity, form]);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    await addToCart.mutateAsync({
      productId: item?.id as number,
      quantity: parseInt(values.quantity),
      totalPrice: totalPrice,
    });
  };

  const handleOpenChange = () => {
    setOpen(false);
    form.reset();
  };

  return (
    <Dialog open={open} onOpenChange={() => handleOpenChange()}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add to cart</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit as any)}
            className="grid gap-4 py-4"
          >
            <FormField
              control={form.control}
              name="product"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-right">Product</FormLabel>
                  <FormControl>
                    <Input {...field} disabled />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-right">Price</FormLabel>
                  <FormControl>
                    <Input {...field} disabled />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="quantity"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-right">Quantity</FormLabel>
                  <FormControl>
                    <Input placeholder="Quantity" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {totalPrice !== 0 && <Label>Total Price: {totalPrice}</Label>}

            <DialogFooter className="mt-4">
              <Button
                onClick={() => handleOpenChange()}
                type="button"
                variant="outline"
              >
                Cancel
              </Button>
              <Button type="submit">Add</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default AddToCartForm;
