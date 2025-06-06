"use client";

import { Card, CardContent, CardHeader } from "~/components/ui/card";
import { Input } from "~/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { Button } from "~/components/ui/button";
import { ListFilter, PlusIcon } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";
import { useCallback, useState } from "react";
import { api } from "~/trpc/react";
import { type Product } from "~/types/product";
import ProductForm from "~/app/_components/product/dialog";
import { toast } from "~/components/ui/use-toast";
import { debounce } from "lodash";
import { type Category } from "~/types/category";

const size = [
  "ALL",
  "DOUBLE_EXTRA_SMALL",
  "EXTRA_SMALL",
  "SMALL",
  "MEDIUM",
  "LARGE",
  "EXTRALARGE",
  "DOUBLELARGE",
  "TRIPELARGE",
];

const Products = () => {
    const [searchKey, setSearchKey] = useState("");
    const [categoryFilter, setCategoryFilter] = useState<number>();
    const [sizeFilter, setSizeFilter] = useState<any>();
    const [product, setProduct] = useState<Product | null>(null);
    const [open, setOpen] = useState(false);

    const { data: categories } = api.category.getAllCategories.useQuery()

    const { data, isLoading, refetch } = api.product.getAllProducts.useQuery({
        category: categoryFilter,
        search: searchKey,
        size: sizeFilter === "ALL" ? "" : sizeFilter,
    });

    const deleteProduct = api.product.deleteProduct.useMutation({
        onSuccess: async () => {
        toast({
            title: "SUCCESS",
            description: "Product successfully deleted",
        });
        await refetch();
        },
    });

  // eslint-disable-next-line react-hooks/exhaustive-deps
    const debouncedRefetch = useCallback(
        debounce(() => {
        void refetch();
        }, 2000),
        [],
    );

  // search
  const onSearch = async (value: string) => {
    setSearchKey(value);
    debouncedRefetch();
  };

  // category filter
  const onCategoryFilter = async (value: any) => {
    setCategoryFilter(value);
    debouncedRefetch();
  };

  //size filter
  const onSizeFilter = async (value: any) => {
    setSizeFilter(value);
    debouncedRefetch();
  };

  const handleEditProduct = (product: Product) => {
    setOpen(true);
    setProduct(product);
  };

  const handleDeleteProduct = async (product: Product) => {
    await deleteProduct.mutateAsync({
      id: product.id,
    });
  };

  return (
    <div className="space-y-6">
      <ProductForm
        open={open}
        setOpen={setOpen}
        product={product}
        categories={categories as Category[]}
        refetch={refetch}
      />
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Products</h1>
          <p className="text-sm leading-7 text-muted-foreground">
            List of all products.
          </p>
        </div>
      </div>
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between gap-x-4">
            <div className="w-full lg:w-[30%]">
              <Input
                value={searchKey}
                onChange={(e) => onSearch(e.target.value)}
                type="text"
                placeholder="Search..."
              />
            </div>
            <div className="ml-auto flex items-center gap-2">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm" className="h-8 gap-1">
                    <ListFilter className="h-3.5 w-3.5" />
                    <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                      Filter size
                    </span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>Filter by</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  {size.map((size, index) => (
                    <DropdownMenuCheckboxItem
                      key={index}
                      onClick={() => onSizeFilter(size)}
                      checked={sizeFilter == size}
                    >
                      {size}
                    </DropdownMenuCheckboxItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm" className="h-8 gap-1">
                    <ListFilter className="h-3.5 w-3.5" />
                    <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                      Filter category
                    </span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>Filter by</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  {categories?.map((category, index) => (
                    <DropdownMenuCheckboxItem
                      key={index}
                      onClick={() => onCategoryFilter(category.id)}
                      checked={categoryFilter == category.id}
                    >
                      {category.key}
                    </DropdownMenuCheckboxItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
              <Button
                onClick={() => setOpen(true)}
                size="sm"
                className="h-8 gap-1"
              >
                <PlusIcon className="h-3.5 w-3.5" />
                <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                  Add product
                </span>
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div>Loading...</div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Image</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Brand</TableHead>
                  <TableHead>Size</TableHead>
                  <TableHead>Color</TableHead>
                  <TableHead>Stocks</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data?.length ? (
                  data?.map((product: Product, index: number) => (
                    <TableRow key={index}>
                      <TableCell className="hidden sm:table-cell">
                        <img
                          className="h-[65px] w-[65px] rounded-md"
                          src={
                            product.image
                              ? product.image
                              : "https://ui.shadcn.com/placeholder.svg"
                          }
                          alt=""
                        />
                      </TableCell>
                      <TableCell className="font-medium">
                        {product.name}
                      </TableCell>
                      <TableCell>{product.brand}</TableCell>
                      <TableCell>{product.size}</TableCell>
                      <TableCell>{product.color}</TableCell>
                      <TableCell>{product.stocks}</TableCell>
                      <TableCell>{product.price}</TableCell>
                      <TableCell>{product.category.name}</TableCell>
                      <TableCell className="w-20">
                        <div className="flex items-start justify-start gap-3">
                          <Button
                            variant={"secondary"}
                            onClick={() => handleEditProduct(product)}
                          >
                            Edit
                          </Button>
                          <Button
                            variant={"destructive"}
                            onClick={() => handleDeleteProduct(product)}
                          >
                            Delete
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={9} className="py-10 text-center">
                      No products found
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Products;
