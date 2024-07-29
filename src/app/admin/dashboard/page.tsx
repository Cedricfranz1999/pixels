"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";
import { Button } from "~/components/ui/button";
import { Calendar } from "~/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/ui/popover";
import { Card, CardContent } from "~/components/ui/card";
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "~/components/ui/chart";

import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";
import { useRouter } from "next/navigation";
import { api } from "~/trpc/react";
import { CalendarIcon, Dot } from "lucide-react";
import React, { useState } from "react";
import dayjs from "dayjs";
import { format } from "date-fns";
import { cn } from "~/lib/utils";

const Dashboard = () => {
  const [startDate, setStartDate] = useState<Date | undefined>(
    dayjs().toDate(),
  );
  const [endDate, setEndDate] = useState<Date | undefined>(
    dayjs().endOf("week").toDate(),
  );

  const router = useRouter();

  const { data: totalUsers } = api.dashboard.getAllUsers.useQuery();
  const { data: totalProducts } = api.dashboard.getAllProducts.useQuery();
  const { data: todaysOrders } = api.dashboard.getTodaysOrders.useQuery();
  const { data: monthlyIncome } = api.dashboard.getMonthlyIncome.useQuery();

  const {
    data: reportTable,
    isLoading,
    refetch,
  } = api.dashboard.reportTable.useQuery(
    {
      startDate: startDate ? startDate : dayjs().toDate(),
      endDate: endDate ? endDate : dayjs().toDate(),
    },
    // { enabled: !new Date() },
  );

  const generateDateArray = (start: Date, end: Date) => {
    const arr = [];
    let currentDate = dayjs(start);
    const endDate = dayjs(end);

    while (currentDate.isBefore(endDate) || currentDate.isSame(endDate)) {
      arr.push(currentDate.toDate());
      currentDate = currentDate.add(1, "day");
    }
    return arr;
  };

  const dateArray = generateDateArray(
    startDate ? startDate : dayjs().toDate(),
    endDate ? endDate : dayjs().toDate(),
  );

  const chartData = dateArray.map((date) => {
    const dataForDate = reportTable?.find((data) =>
      dayjs(data.orderDate).isSame(date, "day"),
    );
    return {
      date: format(date, "MMMM - dd"),
      totalOrder: dataForDate ? dataForDate.totalOrders : 0,
    };
  });

  const chartConfig = {
    totalOrder: {
      label: "Order",
      color: "#2563eb",
    },
  } satisfies ChartConfig;

  return (
    <div className="flex h-full flex-col space-y-10">
      <div>
        <p className="text-lg font-normal ">Dashboard</p>
      </div>
      <div className="grid grid-cols-4 gap-5">
        <div className="flex flex-col rounded-2xl bg-white">
          <p className="m-5 flex items-center justify-center text-2xl font-semibold">
            Total users:
          </p>
          <p className="mb-5 flex items-center justify-center text-2xl font-semibold">
            {totalUsers}
          </p>
        </div>
        <div className="flex flex-col rounded-2xl bg-white">
          <p className="m-5 flex items-center justify-center text-2xl font-semibold">
            Monthly income:
          </p>
          <p className="mb-5 flex items-center justify-center text-2xl font-semibold">
            {monthlyIncome}
          </p>
        </div>
        <div
          className="flex cursor-pointer flex-col rounded-2xl bg-white"
          onClick={() => router.push("/admin/products")}
        >
          <p className="m-5 flex items-center justify-center text-2xl font-semibold">
            Total products:
          </p>
          <p className="mb-5 flex items-center justify-center text-2xl font-semibold">
            {totalProducts}
          </p>
        </div>
        <div
          className="flex cursor-pointer flex-col rounded-2xl bg-white"
          onClick={() => router.push("/admin/carts")}
        >
          <p className="m-5 flex items-center justify-center text-2xl font-semibold">
            Todays orders:
          </p>
          <p className="mb-5 flex items-center justify-center text-2xl font-semibold">
            {todaysOrders}
          </p>
        </div>
      </div>
      <div className="flex h-auto w-full flex-col gap-5">
        <div className="flex gap-3">
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={"outline"}
                className={cn(
                  "w-[280px] justify-start text-left font-normal",
                  !startDate && "text-muted-foreground",
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {startDate ? (
                  format(startDate, "PPP")
                ) : (
                  <span>Pick start date</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={startDate}
                onSelect={setStartDate}
                initialFocus
              />
            </PopoverContent>
          </Popover>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={"outline"}
                className={cn(
                  "w-[280px] justify-start text-left font-normal",
                  !endDate && "text-muted-foreground",
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {endDate ? format(endDate, "PPP") : <span>Pick end date</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={endDate}
                onSelect={setEndDate}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>

        <div className="flex gap-2">
          <Card className="w-1/2">
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Customer</TableHead>
                    <TableHead>Product name</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead>Quantity</TableHead>
                    <TableHead>Total amount</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {reportTable?.length ? (
                    reportTable?.map((checkout, index: number) => (
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
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={5} className="py-10 text-center">
                        No orders found
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          <Card className="w-1/2">
            <CardContent>
              <ChartContainer
                config={chartConfig}
                className="min-h-[200px] w-full"
              >
                <BarChart accessibilityLayer data={chartData}>
                  <CartesianGrid vertical={false} />
                  <XAxis
                    dataKey="date"
                    tickLine={false}
                    tickMargin={5}
                    axisLine={false}
                    tickFormatter={(value) => value.slice(0, 3)}
                  />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar
                    dataKey="totalOrder"
                    fill="var(--color-totalOrder)"
                    radius={4}
                  />
                </BarChart>
              </ChartContainer>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
