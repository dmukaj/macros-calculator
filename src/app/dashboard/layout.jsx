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
    <div className="flex flex-col min-h-screen">
      {/* Main layout content */}
      <div className="grid flex-grow w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr] sm:flex-col">
        <SideBar />
        <div className="flex flex-col">
          <NavBar session={session} />
          <div className="flex-grow">{children}</div>
        </div>
      </div>

      {/* Footer at the bottom */}
      <Footer />
    </div>
  );
}
