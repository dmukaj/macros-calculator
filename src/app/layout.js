import { Inter } from "next/font/google";
import "./globals.css";
import { SessionProvider } from "next-auth/react";
import { auth } from "@/auth";
import { FoodProvider } from "@/context/FoodContext";
const inter = Inter({ subsets: ["latin"] });

import { Toaster } from "@/components/ui/toaster";

export const metadata = {
  title: "My Daily Macros",
  description: "Generated by create next app",
};

export default async function RootLayout({ children }) {
  const session = await auth();

  return (
    <SessionProvider session={session}>
      <FoodProvider>
        <html lang="en">
          <body className={inter.className}>
            {children}
            <Toaster />
          </body>
        </html>
      </FoodProvider>
    </SessionProvider>
  );
}
