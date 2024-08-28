import { auth } from "@/auth";
import NavBar from "@/components/NavBar";
import SideBar from "@/components/SideBar";
import { redirect } from "next/navigation";

export default async function RootLayout({ children }) {
  const session = await auth();

  if (!session?.user) {
    redirect("/welcome");
  }

  return (
    <div className="grid  w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      <SideBar />
      <div className="flex h-full max-h-screen flex-col">
        <NavBar session={session} />
        {children}
      </div>
    </div>
  );
}
