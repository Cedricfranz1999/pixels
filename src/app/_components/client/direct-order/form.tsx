import { zodResolver } from "@hookform/resolvers/zod";
import { type Dispatch, type SetStateAction, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { type Product } from "~/types/product";
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
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";
import { api } from "~/trpc/react";
import { toast } from "~/components/ui/use-toast";

type DirectOrderProps = {
  open: boolean;
  setOpen: (open: boolean) => void;
  refetch: () => void;
  item: Product | null;
  setItem: Dispatch<SetStateAction<Product | null>>;
  refetchOrderedItems?: () => void;
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
  totalPrice: z.number(),
});

const DirectOrder = ({
  open,
  item,
  setOpen,
  refetch,
  setItem,
  refetchOrderedItems,
}: DirectOrderProps) => {
  const [totalPrice, setTotalPrice] = useState<number>(0);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const { mutateAsync }: any = api.client_checkouts.directOrder.useMutation({
    onSuccess: () => {
      toast({
        title: "SUCCESS",
        description: "Ordered successfully",
      });
      refetch();
      refetchOrderedItems && refetchOrderedItems();
      setItem(null);
      setOpen(false);
      form.reset();
    },
    onError: () => {
      refetch();
      refetchOrderedItems && refetchOrderedItems();
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

  useEffect(() => {
    if (item) {
      form.setValue("id", item.id);
      form.setValue("image", item.image ? item.image : "");
      form.setValue("product", item.name);
      form.setValue("brand", item.brand ? item.brand : "");
      form.setValue("color", item.color ? item.color : "");
      form.setValue("size", item.size);
      form.setValue("price", item.price.toString());
    }
  }, [item, form]);

  const quantity = isNaN(Number(parseFloat(form.watch("quantity"))))
    ? 0
    : parseFloat(form.watch("quantity"));

  useEffect(() => {
    setTotalPrice(quantity * parseFloat(form.getValues("price")));
    form.setValue("totalPrice", isNaN(totalPrice) ? 0 : totalPrice);
  }, [quantity, form, totalPrice]);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    let hasErrors = false;

    if (parseInt(values.quantity) === 0) {
      form.setError("quantity", {
        type: "manual",
        message: "Quantity cannot be zero",
      });
      hasErrors = true;
    }

    if (!hasErrors) {
      await mutateAsync({
        productId: item?.id as number,
        quantity: parseInt(values.quantity),
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
            <div className="flex gap-5">
              <FormField
                control={form.control}
                name="image"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-right">Image:</FormLabel>
                    <FormControl>
                      <Avatar className="flex h-24 w-24 items-center justify-center overflow-hidden rounded-md border">
                        <AvatarImage
                          {...field}
                          src={item?.image ? item.image : undefined}
                        />
                        <AvatarFallback>Item</AvatarFallback>
                      </Avatar>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="product"
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
                name="brand"
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
                name="color"
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
                name="size"
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
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-right">Price per 1pc:</FormLabel>
                    <FormControl>
                      <Input placeholder="Quantity" {...field} disabled />
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
                    <FormLabel className="text-right">Quantity:</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Quantity"
                        {...field}
                        type="number"
                        defaultValue={1}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="totalPrice"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-right">Total Price:</FormLabel>
                    <FormControl>
                      <Input {...field} disabled />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

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

export default DirectOrder;
