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
import { toast } from "~/components/ui/use-toast";
import dayjs from "dayjs";
import { Button } from "~/components/ui/button";
import { Dot, ListFilter, MoreHorizontal } from "lucide-react";
import { debounce } from "lodash";
import * as XLSX from "xlsx";
import { useUser } from "@clerk/nextjs";
import html2canvas from "html2canvas";

interface DataTable {
  id: number;
  name: string[];
  price: number[];
  quantity: number[];
  totalAmount: number;
  proofOfPayment: string | null;
  deliveryDate: Date;
  status: any;
  customer: string;
  email?: string;
}

const Checkouts = () => {
  const [searchKey, setSearchKey] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [isArchive, setIsArchive] = useState(false);
  const [data, setData] = useState<DataTable[] | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const user = useUser();

  const {
    data: notArchiveData,
    isLoading: isNotArchiveLoading,
    refetch: refetchNotArchive,
  } = api.orders.getAllOrders.useQuery({
    search: searchKey,
    status: statusFilter as any,
  });

  const {
    data: archiveData,
    isLoading: isArchiveLoading,
    refetch: refetchArchive,
  } = api.orders.getAllArchives.useQuery(
    {
      search: searchKey,
    },
    { enabled: isArchive },
  );

  const changeStatus = api.orders.changeStatus.useMutation({
    onSuccess: async () => {
      toast({
        title: "SUCCESS",
        description: "Status successfully changed",
      });
      await refetchNotArchive();
    },
  });

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedRefetch = useCallback(
    debounce(() => {
      if (!isArchive) {
        void refetchNotArchive();
      } else void refetchArchive();
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

  const onStatusChange = async (value: string, id: number) => {
    await changeStatus.mutateAsync({
      id: id,
      status: value as any,
    });
  };
  const exportToExcel = () => {
    if (!notArchiveData || notArchiveData.length === 0) {
      toast({
        title: "Error",
        description: "No data available to export",
      });
      return;
    }

    // Prepare the data for export
    const exportData = notArchiveData.map((item) => ({
      Customer: item.customer,
      ProductNames: item.name.join(", "),
      Prices: item.price.join(", "),
      Quantities: item.quantity.join(", "),
      TotalAmount: item.totalAmount,
      DeliveryDate: dayjs(item.deliveryDate).format("YYYY-MM-DD"),
      Status: item.status,
    }));

    // Create a worksheet
    const worksheet = XLSX.utils.json_to_sheet(exportData);

    // Create a new workbook
    const workbook = XLSX.utils.book_new();

    // Append the worksheet to the workbook
    XLSX.utils.book_append_sheet(workbook, worksheet, "Orders");

    // Export the workbook to an Excel file
    XLSX.writeFile(workbook, `Orders_${dayjs().format("YYYY-MM-DD")}.xlsx`);
  };

  useEffect(() => {
    setSearchKey("");
    if (!isArchive) {
      setIsLoading(isNotArchiveLoading);
      setData(notArchiveData);
    } else {
      setIsLoading(isArchiveLoading);
      setData(archiveData);
    }
  }, [
    archiveData,
    isArchive,
    isArchiveLoading,
    isNotArchiveLoading,
    notArchiveData,
  ]);
  console.log("DATA", notArchiveData);
  const handleGenerateReceiptImage = (checkout: DataTable) => {
    const receiptElement = document.createElement("div");
    receiptElement.innerHTML = `
    <div style="font-family: Arial, sans-serif; padding: 20px; border: 1px solid #000;">
      
    

    <div style="font-family: Arial, sans-serif; text-align: center;">
      <span>
        <img src="/logo.png" alt="CityPrint Logo" style="width: 100px; height: 100px;"/>
      </span>
      <h2 style="font-weight: 800;">CITYPRINT</h2>
      </div>
      <h2 style="text-align: center; font-weight: 800;">OFFICIAL RECEIPT</h2>

      <div style="display: flex; justify-content: space-between;">
        <span>ID NO: ${checkout.id}</span>
        <span>DATE: ${dayjs().format("MMMM D, YYYY")}</span>
          </div>
      <div style="display: flex; justify-content: space-between;">
        <span>FULLNAME: ${checkout.customer}</span>
        <span>PHONE: ${user.user?.phoneNumbers}</span>
      </div>
      <div style="display: flex; justify-content: space-between;">
        <span>ADDRESS: Pajarito St.Brgy Central Calbayog City</span>
        <span>EMAIL: ${checkout.email}</span>
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
          <h3>ORDER INFORMATION</h3>
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

    document.body.appendChild(receiptElement);

    html2canvas(receiptElement).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const link = document.createElement("a");
      link.href = imgData;
      link.download = `receipt_${checkout.id}.png`;
      link.click();
      document.body.removeChild(receiptElement);
    });
  };
  const handlePrintSlip = (checkout: DataTable) => {
    const printContent = `
    <div style="font-family: Arial, sans-serif; padding: 20px; border: 1px solid #000;">
      <div style="text-align: center;">
        <img src="/logo.png" alt="CityPrint Logo" style="width: 100px; height: 100px;"/>
        <h2 style="font-weight: 800;">CITYPRINT</h2>
        <h2 style="text-align: center; font-weight: 800;">OFFICIAL RECEIPT</h2>
      </div>
      <div style="display: flex; justify-content: space-between;">
        <span>ID NO: ${checkout.id}</span>
        <span>DATE: ${dayjs().format("MMMM D, YYYY")}</span>
      </div>
      <div style="display: flex; justify-content: space-between;">
        <span>FULLNAME: ${checkout.customer}</span>
        <span>PHONE: ${user.user?.phoneNumbers}</span>
      </div>
      <div style="display: flex; justify-content: space-between;">
        <span>ADDRESS: Pajarito St.Brgy Central Calbayog City</span>
        <span>EMAIL: ${checkout.email}</span>
      </div>
      <h3 style="margin-top: 20px;">ITEMS</h3>
      <table style="width: 100%; border-collapse: collapse; margin-top: 20px; margin-bottom: 20px;">
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
            </tr>`,
            )
            .join("")}
        </tbody>
      </table>
      <h3>ORDER INFORMATION</h3>
      <div style="display: flex; justify-content: space-between;">
        <span>DOWNPAYMENT:__________________________________</span>
        <span>AMOUNT PAID: __________________________________</span>
      </div>
      <div style="display: flex; justify-content: space-between;">
        <span>ORDER METHOD: __________________________________</span>
        <span>BALANCE DUE: __________________________________</span>
      </div>
      <div style="display: flex; justify-content: space-between;">
        <span>CUSTOMER SIGNATURE: __________________________________</span>
        <span>CITY PRINT REPRESENTATIVE: __________________________________</span>
      </div>
    </div>
  `;

    const printWindow = window.open("", "_blank");
    if (printWindow) {
      printWindow.document.open();
      printWindow.document.write(`
      <html>
        <head>
          <title>Print Receipt</title>
          <style>
            /* Add any additional styles here */
            body { font-family: Arial, sans-serif; }
          </style>
        </head>
        <body onload="window.print(); window.close();">
          ${printContent}
        </body>
      </html>
    `);
      printWindow.document.close();
    }
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
          <div className="flex items-center justify-between gap-x-4">
            <div className="w-full lg:w-[30%]">
              <Input
                value={searchKey}
                onChange={(e) => onSearch(e.target.value)}
                type="text"
                placeholder="Search..."
              />
            </div>
            <div className="flex flex-row items-center justify-center  gap-2 ">
              {!isArchive ? (
                <>
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
                          checked={statusFilter == "APPROVED"}
                        >
                          APPROVED
                        </DropdownMenuCheckboxItem>
                        <DropdownMenuCheckboxItem
                          onClick={() => onStatusFilter("DECLINED")}
                          checked={statusFilter == "DELIVERY"}
                        >
                          ON DELIVERY
                        </DropdownMenuCheckboxItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                  <Button className="h-8" onClick={() => setIsArchive(true)}>
                    Archive
                  </Button>
                </>
              ) : (
                <Button className="h-8" onClick={() => setIsArchive(false)}>
                  Go back
                </Button>
              )}
              <Button onClick={() => exportToExcel()} size={"sm"}>
                Export Order Reports
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
                  <TableHead>Customer</TableHead>
                  <TableHead>Product name</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Quantity</TableHead>
                  <TableHead>Total amount</TableHead>
                  {/* <TableHead>Proof of payment</TableHead> */}
                  <TableHead>Delivery date</TableHead>
                  <TableHead>Status</TableHead>
                  {!isArchive && <TableHead>Actions</TableHead>}
                </TableRow>
                <TableHead>Order slipt</TableHead>
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
                      {/* <TableCell className="font-medium">
                        {checkout.proofOfPayment}
                      </TableCell> */}
                      <TableCell className="font-medium">
                        {dayjs(checkout.deliveryDate).format(" YYYY-MM-DDT")}
                      </TableCell>
                      <TableCell className="font-medium">
                        {checkout.status}
                      </TableCell>
                      {!isArchive && (
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
                      )}
                      <TableCell>
                        <div className=" flex items-center gap-3">
                          <Button
                            onClick={() => handleGenerateReceiptImage(checkout)}
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
