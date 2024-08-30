"use client";

import { TableDemo } from "@/components/Table";

import PieChartComponent from "@/components/PieChartComponent";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { useState } from "react";
import { format } from "date-fns";

export default async function HomePage() {
  const [date] = useState(new Date());

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
      <TableDemo />
    </>
  );
}
