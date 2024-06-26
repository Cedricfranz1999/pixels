import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "~/components/ui/button";
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
import { Textarea } from "~/components/ui/textarea";
import { toast } from "~/components/ui/use-toast";
import { api } from "~/trpc/react";
import { type Offers } from "~/types/offers";

type OffersProps = {
  open: boolean;
  setOpen: (open: boolean) => void;
  offers: Offers | null;
  refetch: () => void;
};

const formSchema = z.object({
  name: z.string({ required_error: "Product name is required" }).min(2).max(50),
  price: z.string({ required_error: "Price is required" }),
  description: z.string().nullable(),
});

const OffersForm = ({ open, setOpen, offers, refetch }: OffersProps) => {
  const form = useForm({
    resolver: zodResolver(formSchema),
  });

  const createOffer = api.offers.createOffer.useMutation({
    onSuccess: () => {
      toast({
        title: "SUCCESS",
        description: "Product successfully created",
      });
      refetch();
      setOpen(false);
      form.reset();
    },
    onError: () => {
      refetch();
      setOpen(false);
      form.reset();
      toast({
        title: "ERROR",
        description: "Server Error",
        variant: "destructive",
      });
    },
  });

  const updateOffer = api.offers.updateOffer.useMutation({
    onSuccess: () => {
      toast({
        title: "SUCCESS",
        description: "Product successfully updated",
      });
      refetch();
      setOpen(false);
      form.reset();
    },
    onError: () => {
      refetch();
      setOpen(false);
      form.reset();
      toast({
        title: "ERROR",
        description: "Server Error",
        variant: "destructive",
      });
    },
  });

  useEffect(() => {
    if (offers) {
      form.setValue("name", offers.name);
      form.setValue("price", offers.price?.toString());
      form.setValue("description", offers.description);
    }
  }, [offers, form]);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    if (offers) {
      await updateOffer.mutateAsync({
        ...values,
        id: offers.id,
        price: parseFloat(values.price),
      });
    } else {
      await createOffer.mutateAsync({
        ...values,
        price: parseFloat(values.price),
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
          <DialogTitle>
            {offers ? <span>Edit Offer</span> : <span>Add Offer</span>}
          </DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit as any)}
            className="grid gap-4 py-4"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-right">Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Name" {...field} />
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
              <Button type="submit">
                {offers ? <span>Save</span> : <span>Create</span>}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default OffersForm;
