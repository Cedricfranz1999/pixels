"use client";
import { useRouter } from "next/navigation";
import React from "react";
import { Label } from "~/components/ui/label";

const Header = () => {
  const router = useRouter();

  const menuItems = [
    { label: "Home", route: "/cityPrint" }, //
    { label: "Design", route: "#sampleDesign" },
    { label: "Product", route: "#otherProducts" },
    { label: "Service", route: "#services" },
    { label: "Feedback", route: "#feedback" },
    { label: "Contact", route: "#contact" },
  ];

  const handleNavigation = (route: string) => {
    if (route.startsWith("#")) {
      // Smooth scroll for internal sections
      const element = document.querySelector(route);
      if (element) {
        window.scrollTo({
          top: element.getBoundingClientRect().top + window.pageYOffset,
          behavior: "smooth",
        });
      }
    } else {
      // Use router.push for external routes
      router.push(route);
    }
  };

  return (
    <div className="mt-5 flex w-full items-center justify-between">
      <div className="flex items-center">
        <img className="" src="/logo.png" width={200} height={200} />
        <Label className="text-5xl font-bold">
          <span className="text-blue-600">City</span>
          <span className="text-orange-600">Print</span>
        </Label>
      </div>
      <div className="flex items-center gap-7">
        {menuItems.map((item) => (
          <Label
            key={item.label}
            className="cursor-pointer rounded-md p-4 font-bold tracking-widest hover:bg-blue-600 hover:text-white"
            onClick={() => handleNavigation(item.route)} // Handle smooth scroll or external navigation
          >
            {item.label}
          </Label>
        ))}
        <button
          onClick={() => router.push("/sign-in")}
          className="rounded-b-lg bg-blue-600 px-2 py-1 font-bold text-white hover:animate-bounce hover:brightness-125"
        >
          SignIn
        </button>
      </div>
    </div>
  );
};

export default Header;
