import NavBar from "@/components/NavBar";
import SideBar from "@/components/SideBar";
import React from "react";

export default function RootLayout({ children }) {
  return (
    <div className="grid  w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      <SideBar />
      <div className="flex h-full max-h-screen flex-col gap-2">
        <NavBar />
        {children}
      </div>
    </div>
  );
}
