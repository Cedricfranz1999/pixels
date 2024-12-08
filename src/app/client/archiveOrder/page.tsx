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
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "~/components/ui/alert-dialog";
import { useCallback, useEffect, useState } from "react";
import { api } from "~/trpc/react";
import dayjs from "dayjs";
import { Button } from "~/components/ui/button";
import { Dot, Minus, Plus } from "lucide-react";
import { debounce } from "lodash";
import html2canvas from "html2canvas";
import { useUser } from "@clerk/nextjs";
import Image from "next/image";
import { useToast } from "~/components/ui/use-toast";
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
  productImage: string;
  productId: number; // Added productId to DataTable interface
}

const Checkouts = () => {
  const [searchKey, setSearchKey] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [data, setData] = useState<DataTable[] | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const [productIdd, setProductIdd] = useState(0);
  const user = useUser();
  const { toast } = useToast();

  const router = useRouter();

  const { mutateAsync }: any = api.client_checkouts.orderAgain.useMutation({
    onSuccess: () => {
      toast({
        title: "SUCCESS",
        description: "Ordered successfully",
      });
      router.push("/client/my-orders");
    },
  });

  const {
    data: orderData,
    isLoading: isOrderDataLoading,
    refetch: refetchNotArchive,
  } = api.client_products.getArchiveOrder.useQuery({
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
    setData(orderData as any);
  }, [isOrderDataLoading, orderData]);

  // Removed useEffect hook that set quantity and totalCost

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
                    <td>₱${
                      (checkout.price?.[index] ?? 0) *
                      (checkout.quantity?.[index] ?? 0)
                    }</td>
                  </tr>`,
                )
                .join("")}
            </tbody>
          </table>
          <h3>Order INFORMATION</h3>
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

    printWindow.document.write(SlipContent);
    printWindow.document.close();
    printWindow.print();
  };

  const handleOrderAgain = async (
    productId: number | number[],
    quantity: number,
    totalCost: number,
  ) => {
    const extractedProductId = Array.isArray(productId)
      ? productId[0]
      : productId;

    console.log(
      `Ordering again product with ID: ${extractedProductId}, quantity: ${quantity}, total cost: ${totalCost}`,
    );

    await mutateAsync({
      productId: extractedProductId,
      quantity: quantity,
      totalPrice: totalCost,
    });
  };

  const OrderAgainDialog = ({ checkout }: { checkout: DataTable }) => {
    const [quantity, setQuantity] = useState(
      checkout.quantity.reduce((a, b) => a + b, 0),
    );

    const [totalCost, setTotalCost] = useState(checkout.totalAmount);
    const unitPrice =
      checkout.totalAmount / checkout.quantity.reduce((a, b) => a + b, 0);

    const updateQuantityAndCost = (newQuantity: number) => {
      setQuantity(newQuantity);
      setTotalCost(newQuantity * unitPrice);
    };

    return (
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button>Order again</Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirm Order</AlertDialogTitle>
            <AlertDialogDescription>
              Adjust the quantity and confirm your order.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <div className="flex items-center space-x-4">
            <img src={checkout.productImage} width={100} height={100} />
            <div>
              <p className="font-semibold">{checkout.name[0]}</p>
              <div className="mt-2 flex items-center space-x-2">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() =>
                    updateQuantityAndCost(Math.max(1, quantity - 1))
                  }
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="w-8 text-center">{quantity}</span>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => updateQuantityAndCost(quantity + 1)}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              <p className="mt-2">Total Cost: ₱{totalCost.toFixed(2)}</p>
            </div>
          </div>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() =>
                handleOrderAgain(checkout.productId, quantity, totalCost)
              }
            >
              Confirm Order
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Orders</h1>
          <p className="text-sm leading-7 text-muted-foreground">
            Archive Order
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
                {/* <Button onClick={() => onStatusFilter("DONE")}>
                  Archive Order
                </Button> */}
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
                  <TableHead>Product ID</TableHead>{" "}
                  {/* Added Product ID TableHead */}
                  <TableHead>Product name</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Quantity</TableHead>
                  <TableHead>Total amount</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data?.length ? (
                  data.map((checkout, index: number) => {
                    console.log("Checkout Data:", checkout);

                    return (
                      <TableRow key={index}>
                        <TableCell>{checkout.productId}</TableCell>{" "}
                        <TableCell>
                          <img
                            src={checkout.productImage}
                            width={100}
                            height={100}
                          />
                        </TableCell>
                        <TableCell className="font-medium">
                          <div className="flex flex-col gap-3">
                            {checkout.name?.map((name, i) => (
                              <div
                                key={i}
                                className="flex items-center gap-0.5"
                              >
                                <Dot className="h-4 w-4 text-primary" />
                                <span>{name}</span>
                              </div>
                            ))}
                          </div>
                        </TableCell>
                        <TableCell>
                          {checkout.price?.map((price, i) => (
                            <span key={i}>₱{price}</span>
                          ))}
                        </TableCell>
                        <TableCell>
                          {checkout.quantity?.map((quantity, i) => (
                            <span key={i}>{quantity}</span>
                          ))}
                        </TableCell>
                        <TableCell>
                          <span>₱{checkout.totalAmount}</span>
                        </TableCell>
                        <TableCell>
                          <OrderAgainDialog checkout={checkout} />
                        </TableCell>
                      </TableRow>
                    );
                  })
                ) : (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center">
                      {" "}
                      {/* Increased colSpan to 7 */}
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
