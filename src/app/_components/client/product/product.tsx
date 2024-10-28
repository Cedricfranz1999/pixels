"use client";
import React, { useState } from "react";
import { Button } from "~/components/ui/button";
import { Card } from "~/components/ui/card";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { RadioGroup, RadioGroupItem } from "~/components/ui/radio-group";
import { ShoppingCart } from "lucide-react";
import { api } from "~/trpc/react";
import { type Product } from "~/types/product";
import AddToCartForm from "../cart/form";
import DirectOrder from "../direct-order/form";

type ProductProps = {
  refetchCartItems?: () => void;
  refetchOrderedItems?: () => void;
};

const Product = ({ refetchCartItems, refetchOrderedItems }: ProductProps) => {
  const [indexTag, setIndex] = useState<number | null>();
  const [searchKey, setSearchKey] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<number>();
  const [isAddToCartOpen, setIsAddToCartOpen] = useState<boolean>(false);
  const [isDirectOrderOpen, setIsDirectOrderOpen] = useState<boolean>(false);
  const [item, setItem] = useState<Product | null>(null);
  const [orderItem, setOrderItem] = useState<Product | null>(null);

  const { data: categories } = api.category.getAllCategories.useQuery();

  const { data, refetch } = api.client_products.getAllProducts.useQuery({
    category: categoryFilter,
    search: searchKey,
  });

  // search
  const onSearch = async (value: string) => {
    setSearchKey(value);
    await refetch();
  };

  // category filter
  const onCategoryFilter = async (value: string) => {
    setCategoryFilter(parseInt(value));
    await refetch();
  };

  const handleAddToCart = (item: Product) => {
    setIsAddToCartOpen(true);
    setItem(item);
  };

  const handleDirectOrder = (item: Product) => {
    setIsDirectOrderOpen(true);
    setOrderItem(item);
  };

  return (
    <div className="flex flex-col gap-6 px-3 md:flex-row">
      <Card className="w-full overflow-scroll bg-blue-50 px-4 py-6 md:max-h-[800px] md:w-auto md:min-w-[250px] md:max-w-[300px]">
        <Input
          placeholder="Search Products"
          className="mb-6 border border-solid border-orange-500"
          value={searchKey}
          onChange={(e) => onSearch(e.target.value)}
          type="text"
        />
        <RadioGroup defaultValue="ALL" onValueChange={onCategoryFilter}>
          {categories?.map((data, index) => (
            <div
              className="my-2 flex flex-col items-start justify-center font-bold text-blue-400"
              key={index}
            >
              <div className="flex items-center justify-center gap-2">
                <RadioGroupItem value={String(data.id)} />
                <Label htmlFor={data.key}>{data.key}</Label>
              </div>
            </div>
          ))}
        </RadioGroup>
      </Card>

      <Card className="w-full overflow-scroll bg-blue-50 py-6">
        <div
          className={`grid gap-10 ${
            data?.length === 1
              ? "grid-cols-1"
              : data?.length === 2
                ? "grid-cols-1 sm:grid-cols-2"
                : "grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
          }`}
        >
          {data?.map((product: Product, index) => {
            const totalOrders = product.orders
              .map((order: any) => order.quantity)
              .reduce((acc: any, curr: any) => acc + curr, 0);

            return (
              <div
                key={index}
                className="relative flex flex-col items-center gap-5 rounded-lg border border-gray-200 p-4 shadow-sm transition-transform duration-200 hover:scale-105 hover:shadow-lg"
                onMouseEnter={() => setIndex(index)}
                onMouseLeave={() => setIndex(null)}
              >
                <div
                  className={`absolute bottom-16 flex items-start justify-center gap-3 ${
                    index === indexTag ? "block" : "hidden"
                  }`}
                >
                  <Button
                    className="bg-yellow-600 text-white"
                    onClick={() => handleAddToCart(product)}
                  >
                    <span className="flex gap-2">
                      <ShoppingCart />
                      Add To Cart
                    </span>
                  </Button>
                  <Button
                    className="bg-orange-600 text-white"
                    onClick={() => handleDirectOrder(product)}
                  >
                    Order Now
                  </Button>
                </div>
                <img
                  src={product.image ? product.image : "/tshit1.png"}
                  alt={product.name}
                  className="h-48 w-full max-w-xs rounded-lg object-contain"
                />

                <div className="flex flex-col gap-2 text-center">
                  <Label className="text-lg font-semibold tracking-wider">
                    {product.name}
                  </Label>
                  <div className="flex items-center justify-between gap-3 font-medium">
                    <Label>Price: Php {product.price}</Label>
                    <Label>| {totalOrders} sold</Label>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </Card>

      <AddToCartForm
        open={isAddToCartOpen}
        setOpen={setIsAddToCartOpen}
        item={item}
        setItem={setItem}
        refetch={refetch}
        refetchCart={refetchCartItems}
      />

      <DirectOrder
        open={isDirectOrderOpen}
        setOpen={setIsDirectOrderOpen}
        item={orderItem}
        refetch={refetch}
        setItem={setOrderItem}
        refetchOrderedItems={refetchOrderedItems}
      />
    </div>
  );
};

export default Product;
