import { auth } from "@/auth";
import { TableDemo } from "@/components/Table";
import { redirect } from "next/navigation";
import React from "react";

export default async function page() {
  const session = await auth();

  if (!session?.user) {
    redirect("/welcome");
  }
  return <TableDemo />;
}
