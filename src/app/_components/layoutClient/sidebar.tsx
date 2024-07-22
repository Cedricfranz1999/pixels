"use client";

import React from "react";
import {
  BarChart2Icon,
  FolderClosedIcon,
  Handshake,
  Home,
  Notebook,
  Shirt,
} from "lucide-react";
import Link from "next/link";
import { cn } from "~/lib/utils";
import { usePathname } from "next/navigation";
import { Label } from "~/components/ui/label";
import { Card } from "~/components/ui/card";
const links = [
  {
    icon: BarChart2Icon,
    title: "Dashboard",
    to: "/client",
  },
  {
    icon: BarChart2Icon,
    title: "Products",
    to: "/client",
  },

  {
    icon: Shirt,
    title: "Mydesign",
    to: "/client/myDesign",
  },
  {
    icon: Handshake,
    title: "Editor",
    to: "/admin/offers",
  },
  {
    icon: Handshake,
    title: "Re",
    to: "/admin/offers",
  },
];

const SidebarBarClients = () => {
  const pathname = usePathname();
  return (
    <div className="top-0 hidden h-full  bg-white lg:fixed lg:block lg:w-[280px]">
      <div className="flex h-full max-h-screen flex-col ">
        <div className="flex h-14 items-center  bg-orange-500 px-4 lg:h-[60px]  lg:px-6">
          <Link href={"/"} className="flex items-center gap-2  font-semibold">
            <img src="/logo.png " width={100} height={100} />
            <Label className=" whitespace-nowrap pr-5 text-xs  font-bold  text-white ">
              City Print Enterprises
            </Label>
          </Link>
        </div>
        <Card className="b flex-1  pt-10 shadow-md drop-shadow-md ">
          <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
            {links.map(({ icon: Icon, title, to }) => {
              return (
                <Link
                  key={to}
                  href={to}
                  className={cn(
                    "flex  items-center justify-between gap-3 rounded-lg px-3 py-2 transition-all hover:bg-orange-500 hover:text-primary",
                    pathname === to && "bg-muted text-primary",
                  )}
                >
                  <div className="flex items-center gap-2">
                    <Icon className="h-4 w-4" />
                    {title}
                  </div>
                </Link>
              );
            })}
          </nav>
        </Card>
      </div>
    </div>
  );
};

export default SidebarBarClients;
