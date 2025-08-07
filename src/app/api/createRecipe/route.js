import { auth } from "@/auth";
import db from "@/db";
import { NextResponse } from "next/server";

export const POST = auth(async function POST(request) {
  if (request.auth) {
    const data = await request.json();

    let { recipeName, ingredients, calories, carbohydrate, protein, fat } =
      data;
    calories = parseInt(calories);
    carbohydrate = parseInt(carbohydrate);
    protein = parseInt(protein);
    fat = parseInt(fat);

    try {
      let cleanIngredients = [];

      if (Array.isArray(ingredients)) {
        const flatIngredients = ingredients.flat(2);

        // Remove duplicates based on id
        const seenIds = new Set();
        cleanIngredients = flatIngredients.filter((ingredient) => {
          if (ingredient && ingredient.id && !seenIds.has(ingredient.id)) {
            seenIds.add(ingredient.id);
            return true;
          }
          return false;
        });

        cleanIngredients = cleanIngredients.map((ingredient) => ({
          id: ingredient.id,
          foodName: ingredient.foodName,
          calories: ingredient.calories,
          carbohydrate: ingredient.carbohydrate,
          protein: ingredient.protein,
          fats: ingredient.fats,
          serving_amount: ingredient.serving_amount,
          metric_serving_unit: ingredient.metric_serving_unit,
          serving_description: ingredient.serving_description,
        }));
      }

      await db.recipe.create({
        data: {
          userId: request.auth.user._id,
          name: recipeName,
          ingredients: cleanIngredients,
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
