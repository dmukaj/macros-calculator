import SignIn from "./SignIn";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

const page = async () => {
  return <SignIn />;
};

export default page;
