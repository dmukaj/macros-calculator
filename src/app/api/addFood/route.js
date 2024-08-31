import db from "@/db";
import { NextResponse } from "next/server";

export async function POST(request) {
  const data = await request.json();

  let { name, userId, calories, carbs, protein, fat, mealType } = data.body;
  calories = parseInt(calories);
  carbs = parseInt(carbs);
  protein = parseInt(protein);
  fat = parseInt(fat);

  try {
    const food = await db.meal.create({
      data: {
        name,
        calories,
        carbs,
        protein,
        fat,
        userId,
        mealType,
      },
    });

    console.log("Food added to meal:", food);

    return NextResponse.json({ message: "Food added successfully!" });
  } catch (error) {
    console.error("Error adding food to meal:", error);
    return NextResponse.json({ error: "error" });
  }
}
