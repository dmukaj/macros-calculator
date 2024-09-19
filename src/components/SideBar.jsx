import Link from "next/link";
import { Calculator, Home, Book } from "lucide-react";

const SideBar = () => {
  return (
    <div className="hidden border-r bg-secondary/20 md:block">
      <div className="flex h-full max-h-full flex-col gap-2">
        <div className="flex h-14 items-center border-b px-4 py-10 lg:px-6">
          <Link
            href="/dashboard"
            className="flex items-center gap-2 font-semibold"
          >
            <img src="/images/logo.png" className="w-16 h-16" />
            <span className="">My Daily Macros</span>
          </Link>
        </div>
        <div className="flex-1 text-muted-foreground">
          <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
            <Link
              href="/dashboard"
              className="flex items-center gap-3 rounded-lg px-3 py-2  transition-all hover:text-primary hover:bg-secondary/70"
            >
              <Home className="h-4 w-4" />
              Dashboard
            </Link>
            <Link
              href="/dashboard/calculator"
              className="flex items-center gap-3 rounded-lg px-3 py-2  transition-all hover:text-primary hover:bg-secondary/70"
            >
              <Calculator className="h-4 w-4" />
              Calculate Macros
            </Link>
            <Link
              href="/dashboard/info"
              className="flex items-center gap-3 rounded-lg px-3 py-2  transition-all hover:text-primary hover:bg-secondary/70"
            >
              <Book className="h-4 w-4" />
              Read about Macros
            </Link>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default SideBar;
