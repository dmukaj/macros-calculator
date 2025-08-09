"use client";

import TableDemo from "@/components/TableDemo";
import PieChartComponent from "@/components/PieChartComponent";
import { ProgressDemo } from "@/components/ProgressDemo";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { CalendarIcon } from "@radix-ui/react-icons";
import { format, formatISO } from "date-fns";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { deleteOldMeals } from "../utils/deleteOldMeal";
import { calculateMacros, calculateTotalMacros } from "@/utils/calculateMacros";
import { getUsersData } from "@/utils/usersData";
import { LoaderCircle } from "lucide-react";

export default function HomePage() {
  const [foodData, setFoodData] = useState(null);
  const [macros, setMacros] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState(formatISO(new Date()));

  const handleBMR = async () => {
    const data = await getUsersData();

    let bmr = 2000;
    if (data.user) {
      bmr = data.user.bmr;
    }

    const macros = calculateMacros(bmr);
    setMacros(macros);
  };

  const handleCalculateTotalMacros = async () => {
    setLoading(true);

    const macros = await calculateTotalMacros(
      formatISO(new Date(selectedDate))
    );

    if (macros) {
      setFoodData(macros);
    } else {
      setFoodData(null);
    }

    setLoading(false);
  };

  const remainingCalories = macros?.calories - (foodData?.totalCalories || 0);

  useEffect(() => {
    const handleMealCleanUp = async () => {
      await deleteOldMeals();
    };
    handleMealCleanUp();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      localStorage.setItem("selectedDate", selectedDate);
      await handleCalculateTotalMacros();
      await handleBMR();
    };
    fetchData();
  }, [selectedDate]);

  if (loading || !foodData || !macros) {
    return (
      <div className="flex flex-col h-screen items-center justify-center space-y-16  text-xl lg:text-2xl bg-card/20">
        <h1>Loading your data...</h1>
        <LoaderCircle className="h-20 w-20 lg:h-36 lg:w-36 animate-spin" />
      </div>
    );
  }

  const handleDateSelect = (selectedDate) => {
    const dateWithCurrentTime = new Date(selectedDate);
    const now = new Date();
    dateWithCurrentTime.setHours(
      now.getHours(),
      now.getMinutes(),
      now.getSeconds()
    );

    setSelectedDate(formatISO(dateWithCurrentTime));
  };
  return (
    <div className="space-y-16 m-10 ">
      <Card className="flex flex-col p-6 bg-card/90 w-auto">
        <CardHeader className="items-center pb-0 mb-4">
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
                onSelect={handleDateSelect}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </CardHeader>

        <CardContent className="flex-1 pb-0">
          <PieChartComponent
            width={200}
            height={200}
            totalCalories={foodData?.totalCalories || 0}
            remainingCalories={remainingCalories || macros?.calories}
            protein={0}
            carbohydrate={0}
            fats={0}
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
        </CardContent>
      </Card>
      <TableDemo date={selectedDate} foodData={foodData} />
    </div>
  );
}
