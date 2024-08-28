import SignIn from "./SignIn";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

const page = async () => {
  const session = await auth();
  if (session?.user) {
    redirect("/dashboard");
  }
  return <SignIn />;
};

export default page;
