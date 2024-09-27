import { auth } from "@/auth";

import HomePage from "@/components/HomePage";
import { redirect } from "next/navigation";

export default async function page() {
  const session = await auth();

  if (!session?.user) {
    redirect("/welcome");
  }
  return (
    <>
      <HomePage />
    </>
  );
}
