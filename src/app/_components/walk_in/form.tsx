import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
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
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { Label } from "~/components/ui/label";
import { Pencil } from "lucide-react";
import UploadFile from "../uploader/upload";
import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";
import { Textarea } from "~/components/ui/textarea";
import { type Walk_In } from "~/types/walkin";

type WalkinProps = {
  open: boolean;
  setOpen: (open: boolean) => void;
  refetch: () => void;
  walk_In: Walk_In | null;
};

const formSchema = z.object({
  customer: z
    .string({ required_error: "Product name is required" })
    .min(2)
    .max(50),
  image: z.string().nullable(),
  price: z.string({ required_error: "Price is required" }),
  quantity: z.string({ required_error: "Quantity is required" }).min(1),
  description: z.string().optional(),
});

const Walk_InForm = ({ open, walk_In, setOpen, refetch }: WalkinProps) => {
  const [productImage, setProductImage] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState<boolean>(false);

  const form = useForm({
    resolver: zodResolver(formSchema),
  });

  const create = api.walk_in.createWalk_In.useMutation({
    onSuccess: () => {
      toast({
        title: "SUCCESS",
        description: "Walk In data successfully created",
      });
      refetch();
      setProductImage(null);
      setOpen(false);
      form.reset();
    },
    onError: () => {
      refetch();
      setOpen(false);
      setProductImage(null);
      form.reset();
      toast({
        title: "ERROR",
        description: "Server Error",
        variant: "destructive",
      });
    },
  });

  const update = api.walk_in.editWalk_In.useMutation({
    onSuccess: () => {
      toast({
        title: "SUCCESS",
        description: "Walk In data successfully updated",
      });
      refetch();
      setProductImage(null);
      setOpen(false);
      form.reset();
    },
    onError: () => {
      refetch();
      setOpen(false);
      setProductImage(null);
      form.reset();
      toast({
        title: "ERROR",
        description: "Server Error",
        variant: "destructive",
      });
    },
  });

  useEffect(() => {
    if (walk_In) {
      form.setValue("customer", walk_In.customer);
      form.setValue("price", walk_In.price.toString());
      form.setValue("quantity", walk_In.quantity.toString());
      form.setValue("description", walk_In.description);

      setProductImage(walk_In.image);
    }
  }, [walk_In, form]);

  useEffect(() => {
    form.setValue("image", productImage);
  }, [isEditing, form, productImage]);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    if (walk_In) {
      await update.mutateAsync({
        ...values,
        id: walk_In.id,
        description: (values.description as string) || "",
        price: parseFloat(values.price),
        quantity: parseFloat(values.price),
      });
    } else {
      await create.mutateAsync({
        ...values,
        description: (values.description as string) || "",
        price: parseFloat(values.price),
        quantity: parseFloat(values.price),
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
          <DialogTitle>Add Walk In</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit as any)}
            className="grid gap-4 py-4"
          >
            <FormField
              control={form.control}
              name="image"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-right">Image</FormLabel>
                  <FormControl>
                    {!isEditing && productImage ? (
                      <div className=" flex gap-1">
                        <Avatar className="flex h-24 w-24 items-center justify-center overflow-hidden rounded-md border">
                          <AvatarImage
                            {...field}
                            src={productImage ? productImage : undefined}
                          />
                          <AvatarFallback>Avatar</AvatarFallback>
                        </Avatar>
                        <Label>
                          <Pencil
                            size={16}
                            className="cursor-pointer"
                            onClick={() => setIsEditing(true)}
                          />
                        </Label>
                      </div>
                    ) : (
                      <UploadFile
                        setImage={setProductImage}
                        setIsEditing={setIsEditing}
                      />
                    )}
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="customer"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-right">Customer name</FormLabel>
                  <FormControl>
                    <Input placeholder="Customer name" {...field} />
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
            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-right">Price</FormLabel>
                  <FormControl>
                    <Input placeholder="Price" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-right">Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Description about this offer"
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter className="mt-4">
              <Button
                onClick={() => handleOpenChange()}
                type="button"
                variant="outline"
              >
                Cancel
              </Button>
              <Button type="submit">Create</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default Walk_InForm;
