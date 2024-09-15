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
import { calculateTotalMacros } from "@/utils/calculateMacros";
import { getUsersData } from "@/utils/usersData";

export default function FoodCalendar() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [foodData, setFoodData] = useState({});
  const [calories, setCalories] = useState(null);
  localStorage.setItem("selectedDate", selectedDate);

  const handleBMR = async () => {
    const data = await getUsersData();
    setCalories(data.user.bmr);
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
        <ProgressDemo
          label="Protein"
          value={parseInt(foodData.totalProtein)}
          max={parseInt((calories * 0.35) / 4)}
        />
        <ProgressDemo
          label="Carbs"
          value={parseInt(foodData.totalCarbs)}
          max={parseInt((calories * 0.3) / 4)}
        />
        <ProgressDemo
          label="Fats"
          value={parseInt(foodData.totalFats)}
          max={parseInt((calories * 0.3) / 9)}
        />
      </div>
      <TableDemo date={selectedDate} />
    </div>
  );
}
