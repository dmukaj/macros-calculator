import db from "@/db";
import { NextResponse } from "next/server";

export async function POST(request) {
  const data = await request.json();

  let { name, userId, calories, carbohydrate, protein, fat, mealType, date } =
    data.body;
  calories = parseInt(calories);
  carbohydrate = parseInt(carbohydrate);
  protein = parseInt(protein);
  fat = parseInt(fat);
  try {
    const food = await db.meal.create({
      data: {
        name,
        calories,
        carbohydrate,
        protein,
        fat,
        userId,
        mealType,
        createdAt: date,
      },
    });

  
    return NextResponse.json({ message: "Food added successfully!" });
  } catch (error) {
    console.error("Error adding food to meal:", error);
    return NextResponse.json({ error: "error" });
  }
}
