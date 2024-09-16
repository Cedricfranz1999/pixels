import { zodResolver } from "@hookform/resolvers/zod";
import { Pencil } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
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
import { toast } from "~/components/ui/use-toast";
import { api } from "~/trpc/react";
import { type Product } from "~/types/product";
import { type Category } from "~/types/category";
import UploadFile from "../uploader/upload";

type ProductProps = {
  open: boolean;
  setOpen: (open: boolean) => void;
  product: Product | null;
  categories: Category[]
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

const formSchema = z.object({
  name: z.string({ required_error: "Product name is required" }).min(2).max(50),
  image: z.string().nullable(),
  size: z.any({ required_error: "Size is required" }),
  brand: z.string().nullable(),
  color: z.string().nullable(),
  stocks: z.string({ required_error: "Stocks is required" }),
  price: z.string({ required_error: "Price is required" }),
  categoryId: z.string({ required_error: "Category is required" }),
});

const ProductForm = ({ open, setOpen, product, categories, refetch }: ProductProps) => {
  const [productImage, setProductImage] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState<boolean>(false);

  const form = useForm({
    resolver: zodResolver(formSchema),
  });

  const upsertProduct = api.product.upsertProduct.useMutation({
    onSuccess: () => {
      toast({
        title: "SUCCESS",
        description: `Product successfully ${product ? 'updated' : 'created'}`,
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
    if (product) {
      form.setValue("name", product.name);
      form.setValue("brand", product.brand);
      form.setValue("size", product.size);
      form.setValue("color", product.color);
      form.setValue("stocks", product.stocks);
      form.setValue("price", product.price.toString());
      form.setValue("categoryId", product.category.id);

      setProductImage(product.image);
    }
  }, [product, form]);

  useEffect(() => {
    form.setValue("image", productImage);
  }, [isEditing, form, productImage]);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    await upsertProduct.mutateAsync({
        ...values,
        id: product?.id,
        size: values.size,
        price: parseFloat(values.price),
        categoryId: parseInt(values.categoryId),
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
            <div className="flex gap-3 w-full">
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem className="w-1/2">
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
                        <FormItem className="w-1/2">
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
            </div>

            <div className="flex gap-3 w-full">
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
            </div>
            
            <div className="flex gap-3 w-full">
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
            </div>
            
            <FormField
              control={form.control}
              name="categoryId"
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
                      {categories?.map((category, index) => (
                        <SelectItem key={index} value={String(category.id)}>
                          {category.name}
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
