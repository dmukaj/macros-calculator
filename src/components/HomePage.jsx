"use client";

import TableDemo from "@/components/TableDemo";

import PieChartComponent from "@/components/PieChartComponent";
import { ProgressDemo } from "@/components/ProgressDemo";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { format } from "date-fns";
import { useEffect, useState } from "react";
import { calculateTotalMacros } from "@/utils/calculateMacros";
import { getUsersData } from "@/utils/usersData";

export default function HomePage() {
  const [foodData, setFoodData] = useState([]);
  const [calories, setCalories] = useState(null);

  const date = new Date().toISOString();

  const handleCalories = async () => {
    const data = await getUsersData();
    setCalories(data.user.bmr);
  };

  const remainingCalories = calories - foodData.totalCalories;

  useEffect(() => {
    localStorage.removeItem("selectedDate");
    const handleCalculateTotalMacros = async () => {
      const macros = await calculateTotalMacros(date);
      if (macros) {
        setFoodData(macros);
      }
    };

    handleCalculateTotalMacros();
    handleCalories();
  }, []);

  return (
    <div className="m-10 space-y-16">
      <Card className="flex flex-col p-6 ">
        <CardHeader className="items-center pb-0 mb-4">
          <CardTitle>Today&apos;s Date</CardTitle>
          <CardDescription>{format(date, "LLL dd, y")}</CardDescription>
        </CardHeader>
        <CardContent className="flex-1 pb-0">
          {foodData && (
            <PieChartComponent
              width={200}
              height={200}
              totalCalories={foodData.totalCalories}
              remainingCalories={remainingCalories}
              // protein={0}
              // carbohydrate={0}
              // fats={0}
            />
          )}

          <ProgressDemo
            label="Protein"
            value={parseInt(foodData.totalProtein)}
            max={parseInt((calories * 0.27) / 4)}
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
        </CardContent>
      </Card>
      <TableDemo date={date} />
    </div>
  );
}
