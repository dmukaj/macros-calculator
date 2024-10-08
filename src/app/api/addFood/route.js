import { auth } from "@/auth";
import db from "@/db";
import { NextResponse } from "next/server";

export const POST = auth(async function POST(request) {
  if (request.auth) {
    const data = await request.json();

    let { name, calories, carbohydrate, protein, fat, mealType, date } =
      data.body;
    calories = parseInt(calories);
    carbohydrate = parseInt(carbohydrate);
    protein = parseInt(protein);
    fat = parseInt(fat);

    try {
      await db.meal.create({
        data: {
          name,
          calories,
          carbohydrate,
          protein,
          fat,
          userId: request.auth.user._id,
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
  return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
});
