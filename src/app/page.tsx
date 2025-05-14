import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";

export default async function RootPage() {
  const session = await getServerSession();

  console.log(session);
  // if (session) {
  //   redirect("/chat");
  // } else {
  //   redirect("/login");
  // }
}
