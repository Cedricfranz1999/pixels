import { zodResolver } from "@hookform/resolvers/zod";
import { Pencil } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import UploadFile from "~/app/example-uploader/page";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
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
import { Label } from "~/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { useToast } from "~/components/ui/use-toast";
// import { toast } from "~/components/ui/use-toast";
import { api } from "~/trpc/react";
import { type Product } from "~/types/product";

type ProductProps = {
  open: boolean;
  setOpen: (open: boolean) => void;
  product: Product | null;
  refetch: () => void;
};

const SIZE = [
  { value: "DOUBLE_EXTRA_SMALL", label: "Double Extra Small" },
  { value: "EXTRA_SMALL", label: "Extra Small" },
  { value: "SMALL", label: "Small" },
  { value: "MEDIUM", label: "Medium" },
  { value: "LARGE", label: "Large" },
  { value: "EXTRALARGE", label: "Extra Large" },
  { value: "DOUBLELARGE", label: "Double Large" },
  { value: "TRIPELARGE", label: "Triple Large" },
];

const CATEGORY = [
  { value: "JERSEY", label: "Jersey" },
  { value: "V_NECK", label: "V-Neck" },
  { value: "POLO", label: "Polo" },
  { value: "TANK_TOP", label: "Tank Top" },
  { value: "ROUND_NECK", label: "Round Neck" },
  { value: "CREW_NECK", label: "Crew Neck" },
  { value: "LONG_SLEEVE", label: "Long Sleeve" },
  { value: "RAGLAN", label: "Raglan" },
  { value: "HENLEY", label: "Henley" },
  { value: "SLIM_FIT", label: "Slim Fit" },
  { value: "OVERSIZED", label: "Oversized" },
  { value: "BASKETBALL_SHORTS", label: "Basketball Shorts" },
  { value: "RUNNING_SHORTS", label: "Running Shorts" },
  { value: "CARGO_SHORTS", label: "Cargo Shorts" },
  { value: "DENIM_SHORTS", label: "Denim Shorts" },
  { value: "BOARD_SHORTS", label: "Board Shorts" },
  { value: "GYM_SHORTS", label: "Gym Shorts" },
  { value: "CHINO_SHORTS", label: "Chino Shorts" },
  { value: "SWEAT_SHORTS", label: "Sweat Shorts" },
  { value: "SWIM_TRUNKS", label: "Swim Trunks" },
  { value: "SKATE_SHORTS", label: "Skate Shorts" },
];

const formSchema = z.object({
  name: z.string({ required_error: "Product name is required" }).min(2).max(50),
  image: z.string().nullable(),
  size: z.any({ required_error: "Size is required" }),
  brand: z.string().nullable(),
  color: z.string().nullable(),
  stocks: z.string({ required_error: "Stocks is required" }),
  price: z.string({ required_error: "Price is required" }),
  category: z.any({ required_error: "Category is required" }),
});

const ProductForm = ({ open, setOpen, product, refetch }: ProductProps) => {
  const [productImage, setProductImage] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const { toast } = useToast();

  const form = useForm({
    resolver: zodResolver(formSchema),
  });

  const createProduct = api.product.createProduct.useMutation({
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

  const updateProduct = api.product.updateProduct.useMutation({
    onSuccess: () => {
      refetch();
      setOpen(false);
      form.reset();
      toast({
        title: "SUCCESS",
        description: "Product successfully updated",
      });
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
    if (product) {
      form.setValue("name", product.name);
      form.setValue("brand", product.brand);
      form.setValue("size", product.size);
      form.setValue("color", product.color);
      form.setValue("stocks", product.stocks);
      form.setValue("price", product.price.toString());
      form.setValue("category", product.category);

      setProductImage(product.image);
    }
  }, [product, form]);

  useEffect(() => {
    form.setValue("image", productImage);
  }, [isEditing, form, productImage]);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    if (product) {
      await updateProduct.mutateAsync({
        ...values,
        id: product.id,
        size: values.size,
        price: parseFloat(values.price),
        category: values.category,
      });
    } else {
      await createProduct.mutateAsync({
        ...values,
        size: values.size,
        price: parseFloat(values.price),
        category: values.category,
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
            {product ? <span>Edit Product</span> : <span>Add Product</span>}
          </DialogTitle>
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
              name="size"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-right">Size</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Size" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {SIZE.map((size, index) => (
                        <SelectItem key={index} value={size.value}>
                          {size.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="brand"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-right">Brand</FormLabel>
                  <FormControl>
                    <Input placeholder="Brand" {...field} />
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
                  <FormLabel className="text-right">Color</FormLabel>
                  <FormControl>
                    <Input placeholder="Color" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="stocks"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-right">Stocks</FormLabel>
                  <FormControl>
                    <Input placeholder="Stocks" {...field} />
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
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-right">Category</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Category" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {CATEGORY.map((category, index) => (
                        <SelectItem key={index} value={category.value}>
                          {category.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
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
                {product ? <span>Save</span> : <span>Create</span>}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default ProductForm;
