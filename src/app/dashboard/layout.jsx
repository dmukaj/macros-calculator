import { auth } from "@/auth";
import NavBar from "@/components/NavBar";
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
    redirect("/");
  }

  return (
    <div className="flex flex-col min-h-screen">
      <header className="top-0 left-0 right-0 z-50  bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 shadow-sm">
        <NavBar session={session} />
      </header>

      <main className=" overflow-y-auto">
        <div>{children}</div>
      </main>

      <footer className="bottom-0 right-0 w-full bg-white dark:bg-gray-900  border-gray-200 dark:border-gray-700">
        <Footer />
      </footer>
    </div>
  );
}
