import Link from "next/link";
import { Calculator, CalendarCheck, Home } from "lucide-react";

const SideBar = () => {
  return (
    <div className="hidden border-r bg-muted/40 md:block">
      <div className="flex h-full max-h-screen flex-col gap-2">
        <div className="flex h-14 items-center border-b px-4 py-6 lg:h-[77px] lg:px-6">
          <Link
            href="/dashboard"
            className="flex items-center gap-2 font-semibold"
          >
            <img src="/images/logo.png" className="w-20 h-20" />
            <span className="">My Daily Macros</span>
          </Link>
        </div>
        <div className="flex-1">
          <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
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
        </div>
      </div>
    </div>
  );
};

export default SideBar;
