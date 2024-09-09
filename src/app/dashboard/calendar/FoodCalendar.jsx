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
import PieChartComponent from "@/components/PieChartComponent";
import calculateMacros from "@/utils/calculateMarcos";

export default function FoodCalendar() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [foodData, setFoodData] = useState({});
  localStorage.setItem("selectedDate", selectedDate);

  useEffect(() => {
    const handleCalculateMacros = async () => {
      const macros = await calculateMacros(selectedDate);
      if (macros) {
        setFoodData(macros);
      }
    };
    handleCalculateMacros();
  }, [selectedDate]);
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
        <h1 className="text-2xl font-semibold">Total Macros</h1>
        <PieChartComponent
          width={200}
          height={200}
          totalCalories={foodData.totalCalories}
          carbs={foodData.totalCarbs}
          protein={foodData.totalProtein}
          fats={foodData.totalFats}
        />
      </div>
      <TableDemo date={selectedDate} />
    </div>
  );
}
