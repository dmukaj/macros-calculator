"use client";

import { CalendarIcon } from "@radix-ui/react-icons";
import { format } from "date-fns";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import TableDemo from "@/components/TableDemo";
import { ProgressDemo } from "@/components/ProgressDemo";
import { calculateTotalMacros, calculateMacros } from "@/utils/calculateMacros";
import { getUsersData } from "@/utils/usersData";
import { Skeleton } from "@/components/ui/skeleton";

export default function FoodCalendar() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [foodData, setFoodData] = useState({});
  const [macros, setMacros] = useState({});
  const [loading, setLoading] = useState(true);
  localStorage.setItem("selectedDate", selectedDate);

  const handleBMR = async () => {
    const data = await getUsersData();
    const macros = calculateMacros(data.user.bmr);
    setMacros(macros);
  };

  useEffect(() => {
    const handleCalculateTotalMacros = async () => {
      const macros = await calculateTotalMacros(selectedDate);
      if (macros) {
        setFoodData(macros);
      }
    };

    handleCalculateTotalMacros();
    handleBMR();
    setLoading(false);
  }, [selectedDate]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center space-y-16 m-10">
        <Skeleton className="h-[528px] w-[614px] rounded-xl " />
        <div className="space-y-10">
          <Skeleton className="h-[393.5px] w-[614px] rounded-xl" />{" "}
          <Skeleton className="h-[393.5px] w-[614px] rounded-xl" />{" "}
          <Skeleton className="h-[393.5px] w-[614px] rounded-xl" />
        </div>
      </div>
    );
  }
  return (
    <div className="flex flex-col items-center justify-center mt-10 space-y-10">
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant={"outline"}
            className={cn(
              "w-[240px] justify-start text-left font-normal",
              !selectedDate && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {selectedDate ? (
              format(selectedDate, "PPP")
            ) : (
              <span>Pick a date</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="single"
            selected={selectedDate}
            onSelect={setSelectedDate}
            initialFocus
          />
        </PopoverContent>
      </Popover>
      <div className="flex flex-col items-center justify-center mt-10 space-y-10">
        <ProgressDemo
          label="Calories"
          value={foodData?.totalCalories || 0}
          max={macros?.calories || 0}
        />
        <ProgressDemo
          label="Protein"
          value={foodData?.totalProtein || 0}
          max={macros?.protein || 0}
        />
        <ProgressDemo
          label="Carbs"
          value={foodData?.totalCarbs || 0}
          max={macros?.carbohydrate || 0}
        />
        <ProgressDemo
          label="Fats"
          value={foodData?.totalFats || 0}
          max={macros?.fats || 0}
        />
      </div>
      <TableDemo date={selectedDate} />
    </div>
  );
}
