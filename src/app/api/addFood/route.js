import db from "@/db";
import { NextResponse } from "next/server";

export async function POST(request) {
  const data = await request.json();

  try {
    const food = await db.meal.create({
      data: {
        name: data.name,
        userId: data.user,
        calories: data.calories,
        carbs: data.carbs,
        protein: data.protein,
        fat: data.fat,
      },
    });
    console.log("food", food);
    return NextResponse.json({ message: "Food added successfully!" });
  } catch (error) {
    console.error("Error adding food to meal:", error);
    return NextResponse.json(error);
  }
}
