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
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { useState } from "react";
import { api } from "~/trpc/react";
import { toast } from "~/components/ui/use-toast";
import dayjs from "dayjs";
import { Button } from "~/components/ui/button";
import { Dot, MoreHorizontal } from "lucide-react";

const Checkouts = () => {
  const [searchKey, setSearchKey] = useState("");

  const { data, isLoading, refetch } = api.orders.getAllOrders.useQuery({
    search: searchKey,
  });

  const changeStatus = api.orders.changeStatus.useMutation({
    onSuccess: async () => {
      toast({
        title: "SUCCESS",
        description: "Status successfully changed",
      });
      await refetch();
    },
  });

  // search
  const onSearch = async (value: string) => {
    setSearchKey(value);
    await refetch();
  };

  const onStatusChange = async (value: string, id: number) => {
    await changeStatus.mutateAsync({
      id: id,
      status: value as any,
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Orders</h1>
          <p className="text-sm leading-7 text-muted-foreground">
            List of all orders.
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
                  <TableHead>Proof of payment</TableHead>
                  <TableHead>Delivery date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data?.length ? (
                  data?.map((checkout, index: number) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">
                        {checkout.customer}
                      </TableCell>
                      <TableCell className="font-medium">
                        <div className="flex flex-col gap-3">
                          {checkout.name.map((name, index) => {
                            return (
                              <div key={index} className="flex gap-0.5">
                                <Dot />
                                <p>{name}</p>
                              </div>
                            );
                          })}
                        </div>
                      </TableCell>
                      <TableCell className="font-medium">
                        <div className="flex flex-col gap-3">
                          {checkout.price.map((price, index) => {
                            return (
                              <div key={index} className="flex gap-0.5">
                                <Dot />
                                <p>Php: {price}</p>
                              </div>
                            );
                          })}
                        </div>
                      </TableCell>
                      <TableCell className="font-medium">
                        <div className="flex flex-col gap-3">
                          {checkout.quantity.map((quantity, index) => {
                            return <p key={index}>{quantity} pcs</p>;
                          })}
                        </div>
                      </TableCell>
                      <TableCell className="font-medium">
                        {checkout.totalAmount}
                      </TableCell>
                      <TableCell className="font-medium">
                        {checkout.proofOfPayment}
                      </TableCell>
                      <TableCell className="font-medium">
                        {dayjs(checkout.deliveryDate).format(" YYYY-MM-DDT")}
                      </TableCell>
                      <TableCell className="font-medium">
                        {checkout.status}
                      </TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <MoreHorizontal />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent>
                            <DropdownMenuLabel>
                              Change status to
                            </DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuCheckboxItem
                              checked={checkout.status === "PENDING"}
                              onClick={() =>
                                onStatusChange("PENDING", checkout.id)
                              }
                            >
                              Pending
                            </DropdownMenuCheckboxItem>
                            <DropdownMenuCheckboxItem
                              checked={checkout.status === "APPROVED"}
                              onClick={() =>
                                onStatusChange("APPROVED", checkout.id)
                              }
                            >
                              Approve
                            </DropdownMenuCheckboxItem>
                            <DropdownMenuCheckboxItem
                              checked={checkout.status === "DELIVERY"}
                              onClick={() =>
                                onStatusChange("DELIVERY", checkout.id)
                              }
                            >
                              On Delivery
                            </DropdownMenuCheckboxItem>
                            <DropdownMenuCheckboxItem
                              checked={checkout.status === "DONE"}
                              onClick={() =>
                                onStatusChange("DONE", checkout.id)
                              }
                            >
                              Done
                            </DropdownMenuCheckboxItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={8} className="py-10 text-center">
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

export default Checkouts;
