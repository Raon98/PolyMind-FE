import { authOptions } from "@/utils/auth/authOptions";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function RootPage() {
  const session = await getServerSession(authOptions);
  if (session) {
    console.log("session", session);
    redirect("/chat");
  }
  redirect("/login");
}
