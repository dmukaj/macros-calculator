"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Calculator,
  Settings,
  Home,
  Menu,
  Book,
  CookingPot,
  BookOpenText,
} from "lucide-react";
import { Button } from "@/components/ui/button";

import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetDescription,
} from "@/components/ui/sheet";
import { ModeToggle } from "./ThemeToggle";

function NavBar() {
  const pathname = usePathname();

  const navigationItems = [
    {
      href: "/dashboard",
      label: "Dashboard",
      icon: Home,
    },
    {
      href: "/dashboard/calculator",
      label: "Calculate Macros",
      icon: Calculator,
    },
    {
      href: "/dashboard/createMeal",
      label: "Create Meal",
      icon: CookingPot,
    },
    {
      href: "/dashboard/myRecipes",
      label: "My Recipes",
      icon: BookOpenText,
    },
    {
      href: "/dashboard/info",
      label: "Read about Macros",
      icon: Book,
    },
    {
      href: "/dashboard/settings",
      label: "Settings",
      icon: Settings,
    },
  ];

  const isActive = (href) => {
    if (href === "/dashboard") {
      return pathname === "/dashboard";
    }
    return pathname.startsWith(href);
  };

  return (
    <header className="w-full h-24 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 px-4 lg:px-6">
      <div className="flex items-center justify-between h-full max-w-full">
        <div className="flex items-center gap-3">
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="shrink-0 md:hidden"
              >
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="flex flex-col">
              <nav className="grid gap-2 text-lg font-medium">
                <Link
                  href="/dashboard"
                  className="flex items-center gap-2 font-semibold mb-4"
                >
                  <img src="/images/logo.png" className="w-16 h-16" />
                  <span>My Daily Macros</span>
                </Link>

                {navigationItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all ${
                        isActive(item.href)
                          ? "text-primary bg-secondary/20"
                          : "text-muted-foreground hover:text-primary hover:bg-secondary/20"
                      }`}
                    >
                      <Icon className="h-4 w-4" />
                      {item.label}
                    </Link>
                  );
                })}
              </nav>
            </SheetContent>
            <SheetDescription />
          </Sheet>

          <Link
            href="/dashboard"
            className="flex items-center gap-2 font-semibold "
          >
            <img src="/images/logo.png" className="w-16 h-16 hidden sm:block" />
            <span className="text-lg font-bold text-gray-900 dark:text-white hidden sm:block">
              My Daily Macros
            </span>
          </Link>
        </div>

        <nav className="hidden md:flex items-center space-x-1">
          {navigationItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                  isActive(item.href)
                    ? "text-primary bg-secondary/20"
                    : "text-muted-foreground hover:text-primary hover:bg-secondary/20"
                }`}
              >
                <Icon className="h-4 w-4" />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-3">
          <ModeToggle />
        </div>
      </div>
    </header>
  );
}

export default NavBar;
