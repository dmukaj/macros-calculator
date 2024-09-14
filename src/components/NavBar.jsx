"use client";
import Link from "next/link";
import {
  Calculator,
  CalendarCheck,
  CircleUser,
  Home,
  Menu,
} from "lucide-react";
import { Button } from "@/components/ui/button";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetDescription,
} from "@/components/ui/sheet";
import { logout } from "@/actions/auth";
import { ModeToggle } from "./ThemeToggle";

function NavBar({ session }) {
  const handleSignOut = async () => {
    await logout();
  };

  return (
    <header className="flex h-14 justify-between items-center border-b bg-muted/40 px-4 lg:h-[77px] lg:px-6  py-6 ">
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="shrink-0 md:hidden">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="flex flex-col">
          <nav className="grid gap-2 text-lg font-medium">
            <Link
              href="/dashboard"
              className="flex items-center gap-2 font-semibold"
            >
              <img src="/images/logo.png" className="w-20 h-20" />
              <span className="">My Daily Macros</span>
            </Link>
            <Link
              href="/dashboard"
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary hover:bg-gray-100"
            >
              <Home className="h-4 w-4" />
              Dashboard
            </Link>

            <Link
              href="/dashboard/calendar"
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary hover:bg-gray-100"
            >
              <CalendarCheck className="h-4 w-4" />
              Calendar
            </Link>
            <Link
              href="/dashboard/calculator"
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary hover:bg-gray-100"
            >
              <Calculator className="h-4 w-4" />
              Calculate Macros
            </Link>
          </nav>
        </SheetContent>
        <SheetDescription />
      </Sheet>

      <div className="flex items-center gap-2">
        <ModeToggle />
        <p>Hello {session?.user.name}</p>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="secondary" size="icon" className="rounded-full">
              <CircleUser className="h-5 w-5" />
              <span className="sr-only">Toggle user menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />

            <Button variant="ghost" onClick={handleSignOut}>
              Sign Out
            </Button>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}

export default NavBar;
