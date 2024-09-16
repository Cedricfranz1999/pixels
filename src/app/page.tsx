import { redirect } from "next/navigation";
import { api } from "~/trpc/server";
export default async function Home() {
  const user = await api.user.getCurrentUser();

  if (user?.userType === 'ADMIN') {
    redirect("/admin/dashboard");
  } else redirect("client");
}
