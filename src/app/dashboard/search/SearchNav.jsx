"use client";

import Link from "next/link";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { ArrowLeft, Soup } from "lucide-react";
import { format } from "date-fns";
import SelectMeal from "@/components/SelectMeal";

const SearchNav = () => {
  const date = localStorage.getItem("selectedDate");
  return (
    <div className="flex flex-row text-lg  justify-between items-center font-semibold">
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Link href="/dashboard">
              <ArrowLeft />
            </Link>
          </TooltipTrigger>
          <TooltipContent>
            <p>Go to Dashboard</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <div className="flex items-center gap-4">
        <p className="text-sm">{format(date, "LLL dd, y")}</p>
        <SelectMeal />
      </div>

      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Link href="/dashboard/createMeal">
              <Soup />
            </Link>
          </TooltipTrigger>
          <TooltipContent>
            <p>Create Meal</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
};

export default SearchNav;
