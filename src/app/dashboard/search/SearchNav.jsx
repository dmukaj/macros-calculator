"use client";

import Link from "next/link";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { ArrowLeft } from "lucide-react";
import { format } from "date-fns";
import SelectMeal from "@/app/dashboard/search/SelectMeal";
import { useEffect, useState } from "react";

const SearchNav = () => {
  const [meal, setMeal] = useState("");
  const date = localStorage.getItem("selectedDate");

  useEffect(() => {
    const storedMeal = localStorage.getItem("selectedMeal");
    if (storedMeal) {
      setMeal(storedMeal);
    }
  }, [meal]);

  return (
    <div className="relative flex flex-row text-lg justify-center items-center font-semibold">
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Link href="/dashboard" className="absolute left-0">
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
        <SelectMeal mealType={meal} setMeal={setMeal} />
      </div>
    </div>
  );
};

export default SearchNav;
