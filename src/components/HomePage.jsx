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
import { useEffect } from "react";

export default function HomePage() {
  const date = new Date();

  useEffect(() => {
    localStorage.removeItem("selectedDate");
  }, []);

  return (
    <>
      <Card className="flex flex-col m-10">
        <CardHeader className="items-center pb-0">
          <CardTitle>Today&apos;s Date</CardTitle>
          <CardDescription>{format(date, "LLL dd, y")}</CardDescription>
        </CardHeader>
        <CardContent className="flex-1 pb-0">
          <PieChartComponent
            width={200}
            height={200}
            totalCalories={2000}
            carbs={200}
            protein={150}
            fats={70}
          />
        </CardContent>
      </Card>
      <TableDemo date={date} />
    </>
  );
}
