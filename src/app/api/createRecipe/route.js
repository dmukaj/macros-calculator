import { auth } from "@/auth";
import db from "@/db";
import { NextResponse } from "next/server";

export const POST = auth(async function POST(request) {
  if (request.auth) {
    const data = await request.json();

    let { recipeName, ingredients, calories, carbohydrate, protein, fat } =
      data.body;
    calories = parseInt(calories);
    carbohydrate = parseInt(carbohydrate);
    protein = parseInt(protein);
    fat = parseInt(fat);

    try {
      await db.recipe.create({
        data: {
          userId: request.auth.user._id,
          name: recipeName,
          ingredients,
          calories,
          carbohydrate,
          protein,
          fat,
        },
      });

      return NextResponse.json({ message: "Recipe added successfully!" });
    } catch (error) {
      console.error("Error adding recipe:", error);
      return NextResponse.json({ error: "error" });
    }
  }
  return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
});
