"use client";

import TableDemo from "@/components/TableDemo";

import PieChartComponent from "@/components/PieChartComponent";
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

export default function HomePage() {
  const [foodData, setFoodData] = useState([]);

  const date = new Date().toISOString();

  useEffect(() => {
    localStorage.removeItem("selectsedDate");
    const handleCalculateTotalMacros = async () => {
      const macros = await calculateTotalMacros(date);
      if (macros) {
        setFoodData(macros);
      }
    };
    handleCalculateTotalMacros();
  }, []);

  return (
    <div className="m-10 space-y-16">
      <Card className="flex flex-col p-6">
        <CardHeader className="items-center pb-0">
          <CardTitle>Today&apos;s Date</CardTitle>
          <CardDescription>{format(date, "LLL dd, y")}</CardDescription>
        </CardHeader>
        <CardContent className="flex-1 pb-0">
          {foodData && (
            <PieChartComponent
              width={200}
              height={200}
              totalCalories={foodData.totalCalories}
              carbohydrate={foodData.totalCarbs}
              protein={foodData.totalProtein}
              fats={foodData.totalFats}
            />
          )}
        </CardContent>
      </Card>
      <TableDemo date={date} />
    </div>
  );
}
