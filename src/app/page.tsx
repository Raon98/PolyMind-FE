import { redirect } from "next/navigation";

export default async function RootPage() {
  const auth = false;
  if (auth) {
    redirect("/chat");
  } else {
    redirect("/login");
  }
}
