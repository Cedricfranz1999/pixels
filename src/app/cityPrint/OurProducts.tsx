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
import DirectOrder from "../_components/client/direct-order/form";
import AddToCartForm from "../_components/client/cart/form";

const CATEGORYIES = [
  { value: "", label: "ALL" },
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

type ProductProps = {
  refetchCartItems?: () => void;
  refetchOrderedItems?: () => void;
};

const OurProducts = ({
  refetchCartItems,
  refetchOrderedItems,
}: ProductProps) => {
  const [indexTag, setIndex] = useState<number | null>();
  const [searchKey, setSearchKey] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<any>();
  const [isAddToCartOpen, setIsAddToCartOpen] = useState<boolean>(false);
  const [isDirectOrderOpen, setIsDirectOrderOpen] = useState<boolean>(false);
  const [item, setItem] = useState<Product | null>(null);
  const [orderItem, setOrderItem] = useState<Product | null>(null);

  const { data, refetch } = api.client_products.getAllProducts.useQuery({
    category: categoryFilter === "ALL" ? "" : categoryFilter,
    search: searchKey,
  });

  // search
  const onSearch = async (value: string) => {
    setSearchKey(value);
    await refetch();
  };

  // category filter
  const onCategoryFilter = async (value: any) => {
    setCategoryFilter(value);
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
    <div className=" flex flex-col gap-10">
      <div className=" my-20 flex items-center justify-center">
        <Label id="1" className="  text-4xl font-semibold   tracking-widest ">
          Our Clothing Product{" "}
        </Label>
      </div>
      <div className="flex  w-full gap-3    px-3 ">
        <Card className="     max-h-[1000px]  min-h-[1000px]  overflow-scroll   px-2 shadow-md drop-shadow-md ">
          <Input
            placeholder="Search Products"
            className=" mb-10 mt-4 border  border-solid border-orange-500"
            value={searchKey}
            onChange={(e) => onSearch(e.target.value)}
            type="text"
          />

          <RadioGroup
            className=""
            defaultValue="ALL"
            onValueChange={onCategoryFilter}
          >
            {CATEGORYIES.map((data, index) => {
              return (
                <div
                  className="my-2 flex  flex-col items-start justify-center font-bold  text-blue-400"
                  key={index}
                >
                  <div className=" flex items-center justify-center gap-2">
                    <RadioGroupItem value={data.value} className="" />
                    <Label htmlFor={data.value}>{data.label}</Label>
                  </div>
                </div>
              );
            })}
          </RadioGroup>
        </Card>
        <Card className="   min-h-[1000px] w-full overflow-scroll py-20   shadow-md    drop-shadow-md">
          <div className="grid grid-cols-4 gap-10">
            {data?.map((product: Product, index) => {
              const totalOrders = product.orders
                .map((order: any) => order.quantity)
                .reduce((acc: any, curr: any) => acc + curr, 0);

              return (
                <div
                  key={index}
                  className=" relative flex flex-col items-center  gap-5  "
                  onMouseEnter={() => setIndex(index)}
                  onMouseLeave={() => setIndex(null)}
                >
                  <div
                    className={` absolute bottom-20 flex items-start justify-center gap-5  ${index === indexTag ? "" : "hidden"} `}
                  >
                    <Button
                      className=" bg-yellow-600"
                      onClick={() => handleAddToCart(product)}
                    >
                      <span className="flex gap-2">
                        <ShoppingCart />
                        Add To Cart
                      </span>
                    </Button>
                    <Button
                      className=" bg-orange-600"
                      onClick={() => handleDirectOrder(product)}
                    >
                      Order Now
                    </Button>
                  </div>
                  <img
                    src={product.image ? product.image : "/tshit1.png"}
                    className=" rounded-lg"
                    width={300}
                  />
                  <div className=" flex flex-col gap-3">
                    <Label className=" semi-bold  text-lg tracking-widest">
                      {product.name}
                    </Label>
                    <div className=" flex items-center justify-between   gap-3  px-16    font-medium">
                      <Label>Price: Php {product.price}</Label>
                      <Label>| {totalOrders} sold </Label>
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
    </div>
  );
};

export default OurProducts;
