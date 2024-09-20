"use client";
import { useRouter } from "next/navigation";
import HeaderClient from "../_components/layout/header-client";
import SidebarBarClients from "../_components/layoutClient/sidebar";
import { api } from "~/trpc/react";

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const { data: user } = api.user.getUserLogin.useQuery();

  if (!user) {
    router.push("/sign-in");
  } else if (user.userType === "ADMIN") {
    router.push("/admin/dashboard");
  }

  return (
    <div className="relative grid min-h-screen min-w-full bg-muted/40 lg:grid-cols-[280px_1fr]">
      <SidebarBarClients />
      <div className="hidden lg:block"></div>
      <div>
        <div className="fixed left-0 right-0 top-0 z-50 flex w-auto items-center justify-between lg:left-[280px]">
          <HeaderClient />
        </div>
        <main className="my-20 w-full p-6 sm:px-6 sm:py-0 lg:my-16 lg:p-10">
          {children}
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
