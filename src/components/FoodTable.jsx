"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { fetchMealType } from "@/utils/fetchMealType";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function FoodTable({ mealType, date }) {
  const [mealTypeData, setMealTypeData] = useState({});

  useEffect(() => {
    const handleGetmeal = async () => {
      const data = await fetchMealType(mealType, date);
      setMealTypeData(data);
    };

    handleGetmeal();
  }, [date]);

  const handleLocalStorage = () => {
    localStorage.setItem("selectedMeal", mealType);
    localStorage.setItem("selectedDate", date);
  };

  return (
    <div className=" flex flex-col w-auto lg:w-2/3">
      <div
        onClick={handleLocalStorage}
        className=" flex items-center justify-center text-lg bg-white py-2 px-4 rounded-lg hover:text-blue-700"
      >
        <Link href="/dashboard/search">Add Food</Link>
      </div>

      <div className="relative shadow-md sm:rounded-lg w-full mt-4 bg-gray-200 ">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Food</TableHead>
              <TableHead className="text-right">Calories</TableHead>
              <TableHead className="text-right">Protein</TableHead>
              <TableHead className="text-right">Carbs</TableHead>
              <TableHead className="text-right">Fats</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mealTypeData &&
              Array.isArray(mealTypeData.mealTypes) &&
              mealTypeData.mealTypes.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="font-medium">{item.name}</TableCell>
                  <TableCell className="font-medium">{item.calories}</TableCell>
                  <TableCell className="font-medium">
                    {item.protein || 0}
                  </TableCell>
                  <TableCell className="font-medium">
                    {item.carbs || 0}
                  </TableCell>
                  <TableCell className="font-medium">{item.fat || 0}</TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
