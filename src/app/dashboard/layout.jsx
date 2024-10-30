import { auth } from "@/auth";
import NavBar from "@/components/NavBar";
import SideBar from "@/components/SideBar";
import Footer from "@/components/Footer";
import { redirect } from "next/navigation";

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default async function RootLayout({ children }) {
  const session = await auth();

  if (!session?.user) {
    redirect("/welcome");
  }

  return (
    <>
      <div className="absolute grid w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr] ">
        <SideBar />
        <div className="flex flex-col">
          <NavBar session={session} />
          {children}
          <div className="relative -bottom-20">
            <Footer />
          </div>
        </div>
      </div>
    </>
  );
}
