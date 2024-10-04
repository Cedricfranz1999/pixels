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
import { useCallback, useEffect, useState } from "react";
import { api } from "~/trpc/react";
import dayjs from "dayjs";
import { Button } from "~/components/ui/button";
import { Dot, ListFilter } from "lucide-react";
import { debounce } from "lodash";

interface DataTable {
  id: number;
  name: string[];
  price: number[];
  quantity: number[];
  totalAmount: number;
  proofOfPayment: string | null;
  deliveryDate: Date;
  status: any;
}

const Checkouts = () => {
  const [searchKey, setSearchKey] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [data, setData] = useState<DataTable[] | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(false);

  const {
    data: orderData,
    isLoading: isOrderDataLoading,
    refetch: refetchNotArchive,
  } = api.client_products.getAllOrderedProduct.useQuery({
    search: searchKey,
    status: statusFilter as any,
  });


  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedRefetch = useCallback(
    debounce(() => {
        void refetchNotArchive();
    }, 2000),
    [],
  );

  // search
  const onSearch = async (value: string) => {
    setSearchKey(value);
    debouncedRefetch();
  };

  // status filter
  const onStatusFilter = async (value: string) => {
    setStatusFilter(value);
    debouncedRefetch();
  };

  useEffect(() => {
    setSearchKey("");
    setIsLoading(isOrderDataLoading);
      setData(orderData);
  }, [
    isOrderDataLoading,
    orderData,
  ]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Orders</h1>
          <p className="text-sm leading-7 text-muted-foreground">
            List of all your orders.
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
            <div className="flex flex-row gap-2 ">
                <div className="ml-auto flex items-center gap-2">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="outline"
                          size="sm"
                          className="h-8 gap-1"
                        >
                          <ListFilter className="h-3.5 w-3.5" />
                          <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                            Filter status
                          </span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Filter by</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuCheckboxItem
                          onClick={() => onStatusFilter("")}
                          checked={statusFilter == ""}
                        >
                          ALL
                        </DropdownMenuCheckboxItem>
                        <DropdownMenuCheckboxItem
                          onClick={() => onStatusFilter("PENDING")}
                          checked={statusFilter == "PENDING"}
                        >
                          PENDING
                        </DropdownMenuCheckboxItem>
                        <DropdownMenuCheckboxItem
                          onClick={() => onStatusFilter("APPROVED")}
                          checked={statusFilter == "APPROVED"}
                        >
                          APPROVED
                        </DropdownMenuCheckboxItem>
                        <DropdownMenuCheckboxItem
                          onClick={() => onStatusFilter("DELIVERY")}
                          checked={statusFilter == "DELIVERY"}
                        >
                          ON DELIVERY
                        </DropdownMenuCheckboxItem>
                        <DropdownMenuCheckboxItem
                          onClick={() => onStatusFilter("DONE")}
                          checked={statusFilter == "DONE"}
                        >
                          DONE
                        </DropdownMenuCheckboxItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                </div>
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
                  <TableHead>Product name</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Quantity</TableHead>
                  <TableHead>Total amount</TableHead>
                  <TableHead>Proof of payment</TableHead>
                  <TableHead>Delivery date</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data?.length ? (
                  data?.map((checkout, index: number) => (
                    <TableRow key={index}>
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
