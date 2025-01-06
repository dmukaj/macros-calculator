"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { fetchMealTypeByDate } from "@/utils/fetchMealType";
import Link from "next/link";
import { useEffect, useState } from "react";
import DeleteFoodBtn from "./DeleteFoodBtn";

export default function FoodTable({ mealType, date }) {
  const [filteredMealData, setFilteredMealData] = useState([]);

  useEffect(() => {
    const handleGetmeal = async () => {
      const data = await fetchMealTypeByDate(date);
      const filteredData = data.filter((item) => item.mealType === mealType);

      setFilteredMealData(filteredData);
    };

    handleGetmeal();
  }, [date, mealType]);

  const handleLocalStorage = () => {
    localStorage.setItem("selectedMeal", mealType);
    localStorage.setItem("selectedDate", date);
  };

  return (
    <div className=" flex flex-col w-auto ">
      <Link
        href="/dashboard/search"
        onClick={handleLocalStorage}
        className=" flex items-center justify-center text-lg  py-2 px-4 rounded-lg bg-secondary/50 hover:bg-primary/60"
      >
        Add Food
      </Link>

      <div className="relative shadow-md sm:rounded-lg w-full mt-4 bg-secondary/50">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[200px]">Food</TableHead>
              <TableHead className="text-right">Calories</TableHead>
              <TableHead className="text-right">Protein</TableHead>
              <TableHead className="text-right">Carbs</TableHead>
              <TableHead className="text-right">Fats</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredMealData &&
              filteredMealData.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="font-medium">{item.name}</TableCell>
                  <TableCell className="font-medium">{item.calories}</TableCell>
                  <TableCell className="font-medium">
                    {item.protein || 0}
                  </TableCell>
                  <TableCell className="font-medium">
                    {item.carbohydrate || 0}
                  </TableCell>
                  <TableCell className="font-medium">{item.fat || 0}</TableCell>
                  <TableCell className="font-medium">
                    <DeleteFoodBtn
                      foodId={item.id}
                      setFilteredMealData={setFilteredMealData}
                    />
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
