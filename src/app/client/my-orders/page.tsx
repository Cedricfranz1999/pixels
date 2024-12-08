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
import { useCallback, useEffect, useState, useRef } from "react";
import { api } from "~/trpc/react";
import dayjs from "dayjs";
import { Button } from "~/components/ui/button";
import { Dot, ListFilter } from "lucide-react";
import { debounce } from "lodash";
import html2canvas from "html2canvas"; // Make sure to install this library
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

interface DataTable {
  id: number;
  name: string[];
  price: number[];
  quantity: number[];
  totalAmount: number;
  proofOfPayment: string | null;
  deliveryDate: Date;
  status: any;
  productImage: any;
}

const Checkouts = () => {
  const router = useRouter();
  const [searchKey, setSearchKey] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [data, setData] = useState<DataTable[] | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const user = useUser();
  console.log("USERDATA ", user);

  const {
    data: orderData,
    isLoading: isOrderDataLoading,
    refetch: refetchNotArchive,
  } = api.client_products.getAllOrderedProduct.useQuery({
    search: searchKey,
    status: statusFilter as any,
  });

  const debouncedRefetch = useCallback(
    debounce(() => {
      void refetchNotArchive();
    }, 2000),
    [],
  );

  const onSearch = async (value: string) => {
    setSearchKey(value);
    debouncedRefetch();
  };

  const onStatusFilter = async (value: string) => {
    setStatusFilter(value);
    debouncedRefetch();
  };

  useEffect(() => {
    setSearchKey("");
    setIsLoading(isOrderDataLoading);
    setData(orderData);
  }, [isOrderDataLoading, orderData]);

  const handleGenerateSlipImage = (checkout: DataTable) => {
    const SlipElement = document.createElement("div");
    SlipElement.innerHTML = `
    <div style="font-family: Arial, sans-serif; padding: 20px; border: 1px solid #000;">

      <span>
        <img src="/logo.png" alt="CityPrint Logo" style="width: 100px; height: 100px;"/>
      </span>
    
      <h2 style="text-align: center; font-weight: 800;">CITYPRINT</h2>
      <h2 style="text-align: center; font-weight: 800;">OFFICIAL Slip</h2>

      <div style="display: flex; justify-content: space-between;">
        <span>ID NO: ${checkout.id}</span>
        <span>DATE: ${dayjs().format("MMMM D, YYYY")}</span>
          </div>
      <div style="display: flex; justify-content: space-between;">
        <span>FULLNAME: ${user.user?.firstName} ${user.user?.lastName}</span>
        <span>PHONE: ${user.user?.phoneNumbers}</span>
      </div>
      <div style="display: flex; justify-content: space-between;">
        <span>ADDRESS: Pajarito St.Brgy Central Calbayog City</span>
        <span>EMAIL: ${user.user?.emailAddresses}</span>
      </div>
    
      <h3 style="margin-top: 20px;">ITEMS</h3>
      <table style="width: 100%; border-collapse: collapse; margin-top: 20px ; margin-bottom: 20px">
          <thead>
            <tr>
              <th style="border: 1px solid #000; padding: 8px;">ITEM</th>
              <th style="border: 1px solid #000; padding: 8px;">QUANTITY</th>
              <th style="border: 1px solid #000; padding: 8px;">PRICE</th>
              <th style="border: 1px solid #000; padding: 8px;">TOTAL</th>
            </tr>
          </thead>
          <tbody>
            ${checkout.name
              .map(
                (name, index) => `
              <tr>
                <td style="border: 1px solid #000; padding: 8px;">${name}</td>
                <td style="border: 1px solid #000; padding: 8px;">${checkout.quantity[index]}</td>
                <td style="border: 1px solid #000; padding: 8px;">${checkout.price[index]}</td>
                <td style="border: 1px solid #000; padding: 8px;">${checkout.totalAmount}</td>
              </tr>
            `,
              )
              .join("")}
          </tbody>
        </table>
          <h3>Order INFORMATION</h3>
      <div style="display: flex; justify-content: space-between;">
        <span>DOWNPAYMENT:__________________________________</span>
        <span>AMOUNT PAID: __________________________________</span>
      </div>
      <div style="display: flex; justify-content: space-between;">
        <span>PAYMENT METHOD: __________________________________</span>
        <span>BALANCE DUE: __________________________________</span>
      </div>
      <div style="display: flex; justify-content: space-between;">
        <span>CUSTOMER SIGNATURE: __________________________________</span>
        <span>CITY PRINT REPRESENTATIVE: __________________________________</span>
      </div>
        
       <div style="margin-top: 40px; display: flex; justify-content: space-between;">
        <span>CUSTOMER SIGNATURE:PAJARITO BALUD , BRGY CENTRAL ,CALBYOG CITY</span>
        <span>CITYPRINT REPRESENTATIVE:09959727750</span>
        <span>CITYPRINT REPRESENTATIVE:cityprint2022@gmail.com</span>

        
      </div>
    </div>
  `;

    document.body.appendChild(SlipElement);

    html2canvas(SlipElement).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const link = document.createElement("a");
      link.href = imgData;
      link.download = `Slip_${checkout.id}.png`;
      link.click();
      document.body.removeChild(SlipElement);
    });
  };

  const handlePrintSlip = (checkout: DataTable) => {
    const printWindow = window.open("", "_blank") as Window;

    const SlipContent = `
    <html>
      <head>
        <title>Slip</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            padding: 20px;
          }
          .header,
          .footer {
            text-align: center;
            font-weight: 800;
          }
          table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 20px;
            margin-bottom: 20px;
          }
          th, td {
            border: 1px solid #000;
            padding: 8px;
          }
          .info {
            display: flex;
            justify-content: space-between;
            margin-top: 10px;
          }
        </style>
      </head>
      <body>
        <div class="header">
          <img src="/logo.png" alt="CityPrint Logo" style="width: 100px; height: 100px;"/>
          <h2>CITYPRINT</h2>
          <h3>OFFICIAL Slip</h3>
        </div>
        <div class="info">
          <span>ID NO: ${checkout.id}</span>
          <span>DATE: ${dayjs().format("MMMM D, YYYY")}</span>
        </div>
        <div class="info">
          <span>FULLNAME: ${user.user?.firstName} ${user.user?.lastName}</span>
          <span>PHONE: ${user.user?.phoneNumbers}</span>
        </div>
        <div class="info">
          <span>ADDRESS: Pajarito St. Brgy Central Calbayog City</span>
          <span>EMAIL: ${user.user?.emailAddresses}</span>
        </div>
        <h3>ITEMS</h3>
        <table>
          <thead>
            <tr>
              <th>ITEM</th>
              <th>QUANTITY</th>
              <th>PRICE</th>
              <th>TOTAL</th>
            </tr>
          </thead>
          <tbody>
            ${checkout.name
              .map(
                (name, index) => `
                <tr>
                  <td>${name}</td>
                  <td>${checkout.quantity[index]}</td>
                  <td>₱${checkout.price[index]}</td>
                <td>₱${(checkout.price?.[index] ?? 0) * (checkout.quantity?.[index] ?? 0)}</td>
                </tr>`,
              )
              .join("")}
          </tbody>
        </table>
        <h3>Order
         INFORMATION</h3>
        <div class="info">
          <span>DOWNPAYMENT: _____________</span>
          <span>AMOUNT PAID: _____________</span>
        </div>
        <div class="info">
          <span>PAYMENT METHOD: _____________</span>
          <span>BALANCE DUE: _____________</span>
        </div>
        <div class="info">
          <span>CUSTOMER SIGNATURE: _____________</span>
          <span>CITY PRINT REPRESENTATIVE: _____________</span>
        </div>
        <div class="footer">
          <p>Pajarito St. Brgy Central, Calbayog City | 09959727750 | cityprint2022@gmail.com</p>
        </div>
      </body>
    </html>
  `;

    // Write content to the new window and print
    printWindow.document.write(SlipContent);
    printWindow.document.close();
    printWindow.print();
  };
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
                    <Button variant="outline" size="sm" className="h-8 gap-1">
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
                      checked={statusFilter === ""}
                    >
                      ALL
                    </DropdownMenuCheckboxItem>
                    <DropdownMenuCheckboxItem
                      onClick={() => onStatusFilter("PENDING")}
                      checked={statusFilter === "PENDING"}
                    >
                      PENDING
                    </DropdownMenuCheckboxItem>
                    <DropdownMenuCheckboxItem
                      onClick={() => onStatusFilter("PROCESS")}
                      checked={statusFilter == "PROCESS"}
                    >
                      PROCESS
                    </DropdownMenuCheckboxItem>
                    <DropdownMenuCheckboxItem
                      onClick={() => onStatusFilter("PICKUP")}
                      checked={statusFilter == "PICKUP"}
                    >
                      PICKUP
                    </DropdownMenuCheckboxItem>
                    <DropdownMenuCheckboxItem
                      onClick={() => onStatusFilter("APPROVED")}
                      checked={statusFilter === "APPROVED"}
                    >
                      APPROVED
                    </DropdownMenuCheckboxItem>
                    <DropdownMenuCheckboxItem
                      onClick={() => onStatusFilter("DELIVERY")}
                      checked={statusFilter === "DELIVERY"}
                    >
                      ON DELIVERY
                    </DropdownMenuCheckboxItem>
                    {/* <DropdownMenuCheckboxItem
                      onClick={() => onStatusFilter("DONE")}
                      checked={statusFilter === "DONE"}
                    >
                      DONE
                    </DropdownMenuCheckboxItem> */}
                  </DropdownMenuContent>
                </DropdownMenu>
                <Button onClick={() => router.push("/client/archiveOrder")}>
                  Archive Order
                </Button>
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
                  <TableHead>Product Image</TableHead>
                  <TableHead>Product name</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Quantity</TableHead>
                  <TableHead>Total amount</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Order slip</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data?.length ? (
                  data.map((checkout, index: number) => (
                    <TableRow key={index}>
                      <TableCell>
                        {" "}
                        <img
                          src={checkout.productImage}
                          width={100}
                          height={100}
                        />
                      </TableCell>
                      <TableCell className="font-medium">
                        <div className="flex flex-col gap-3">
                          {checkout.name.map((name, i) => (
                            <div key={i} className="flex items-center gap-0.5">
                              <Dot className="h-4 w-4 text-primary" />
                              <span>{name}</span>
                            </div>
                          ))}
                        </div>
                      </TableCell>
                      <TableCell>
                        {checkout.price.map((price, i) => (
                          <span key={i}>₱{price}</span>
                        ))}
                      </TableCell>
                      <TableCell>
                        {checkout.quantity.map((quantity, i) => (
                          <span key={i}>{quantity}</span>
                        ))}
                      </TableCell>
                      <TableCell>
                        <span>₱{checkout.totalAmount}</span>
                      </TableCell>

                      <TableCell>
                        {statusFilter === "DONE"}
                        <span
                          className=" cursor-pointer font-bold text-blue-500 underline"
                          onClick={() =>
                            router.push(`/client/my-orders/${checkout.id}`)
                          }
                        >
                          Order Status
                        </span>
                      </TableCell>
                      <TableCell>
                        <div className=" flex  items-start justify-start gap-3">
                          <Button
                            onClick={() => handleGenerateSlipImage(checkout)}
                          >
                            Generate Order Slip
                          </Button>
                          <Button onClick={() => handlePrintSlip(checkout)}>
                            Print Order Slip
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center">
                      No data found.
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
