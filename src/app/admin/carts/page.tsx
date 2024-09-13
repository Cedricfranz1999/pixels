"use client";

import { Card, CardContent, CardHeader } from "~/components/ui/card";
import { Input } from "~/components/ui/input";
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
import { debounce } from "lodash";

const Carts = () => {
  const [searchKey, setSearchKey] = useState("");

  const { data, isLoading, refetch } = api.carts.getAllOrderedItems.useQuery({
    search: searchKey,
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

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Orders</h1>
          <p className="text-sm leading-7 text-muted-foreground">
            List of all todays order.
          </p>
        </div>
      </div>
      <Card>
        <CardHeader>
          <div className="w-full lg:w-[30%]">
            <Input
              value={searchKey}
              onChange={(e) => onSearch(e.target.value)}
              type="text"
              placeholder="Search..."
            />
          </div>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div>Loading...</div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Customer</TableHead>
                  <TableHead>Product name</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Quantity</TableHead>
                  <TableHead>Total amount</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data?.length ? (
                  data?.map((cart, index: number) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">
                        {cart.customer}
                      </TableCell>
                      <TableCell className="font-medium">{cart.name}</TableCell>
                      <TableCell className="font-medium">
                        {cart.price}
                      </TableCell>
                      <TableCell className="font-medium">
                        {cart.quantity}
                      </TableCell>
                      <TableCell className="font-medium">
                        {cart.totalAmount}
                      </TableCell>
                      <TableCell className="font-medium">
                        {cart.status}
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={6} className="py-10 text-center">
                      No orders found
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

export default Carts;
