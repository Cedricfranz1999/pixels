import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { api } from "~/trpc/server";

interface User {
  id: string;
  clerkUserId: string;
  firstname: string;
  lastname: string;
  email: string;
  contactNumber: string | null;
  address: string | null;
  profileImage: string | null;
  userType: string | null;
  createdAt: Date;
  updatedAt: Date;
}
export default async function Home() {
  auth().protect();
  const { userId } = auth();
  let user: User | null = null;

  if (userId) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    user = await api.user.getCurrentUser({ userId });

    if (user?.userType === "ADMIN") {
      redirect("/admin/dashboard");
    } else redirect("/client/cart");
  } else redirect("/sign-in");
}
