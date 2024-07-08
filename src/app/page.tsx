import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
export default async function Home() {
  const user = await currentUser();

  if (user?.firstName === "admin" && user.lastName === "admin") {
    redirect("/admin/dashboard");
  } else redirect("client");
}
