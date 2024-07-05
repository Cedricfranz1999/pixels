"use client";

import React from "react";
import {
  BarChart2Icon,
  FolderClosedIcon,
  Handshake,
  Home,
  Notebook,
} from "lucide-react";
import Link from "next/link";
import { cn } from "~/lib/utils";
import { usePathname } from "next/navigation";
const links = [
  {
    icon: Home,
    title: "Dashboard",
    to: "/admin/dashboard",
  },
  {
    icon: BarChart2Icon,
    title: "Products",
    to: "/admin/products",
  },
  {
    icon: Handshake,
    title: "Offers",
    to: "/admin/offers",
  },
  {
    icon: Notebook,
    title: "Orders",
    to: "/admin/orders",
  },
  {
    icon: FolderClosedIcon,
    title: "Projects",
    to: "/admin/projects",
  },
];

const Sidebar = () => {
  const pathname = usePathname();
  return (
    <div className="top-0 hidden h-full border-r bg-white lg:fixed lg:block lg:w-[280px]">
      <div className="flex h-full max-h-screen flex-col gap-2">
        <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
          <Link href={"/"} className="flex items-center gap-2 font-semibold">
            <img alt="logo" className="h-7" />
          </Link>
        </div>
        <div className="flex-1">
          <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
            {links.map(({ icon: Icon, title, to }) => {
              return (
                <Link
                  key={to}
                  href={to}
                  className={cn(
                    "flex items-center justify-between gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary",
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
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
