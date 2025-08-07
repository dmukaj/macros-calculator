import { auth } from "@/auth";
import db from "../../../../db";
import { NextResponse } from "next/server";

export const PUT = auth(async function PUT(request, { params }) {
  if (!request.auth) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { id } = params;
    const data = await request.json();

    const { recipeName, ingredients, calories, carbohydrate, protein, fat } =
      data;

    // Validate required fields
    if (!recipeName || !ingredients) {
      return NextResponse.json(
        { error: "Recipe name and ingredients are required" },
        { status: 400 }
      );
    }

    if (!Array.isArray(ingredients) || ingredients.length === 0) {
      return NextResponse.json(
        { error: "At least one ingredient is required" },
        { status: 400 }
      );
    }

    // Check if recipe exists and belongs to user
    const existingRecipe = await db.recipe.findUnique({
      where: {
        id: id,
        userId: request.auth.user._id,
      },
    });

    if (!existingRecipe) {
      return NextResponse.json(
        { error: "Recipe not found or you don't have permission to update it" },
        { status: 404 }
      );
    }

    // Clean and validate ingredients
    const cleanIngredients = ingredients.map((ingredient) => ({
      id: ingredient.id,
      foodName: ingredient.foodName,
      calories: ingredient.calories,
      carbohydrate: ingredient.carbohydrate,
      protein: ingredient.protein,
      fats: ingredient.fats,
      serving_amount: ingredient.serving_amount,
      metric_serving_unit: ingredient.metric_serving_unit || "g",
      serving_description: ingredient.serving_description,
    }));

    const updatedRecipe = await db.recipe.update({
      where: {
        id: id,
      },
      data: {
        name: recipeName,
        ingredients: cleanIngredients,
        calories: parseInt(calories) || 0,
        carbohydrate: parseInt(carbohydrate) || 0,
        protein: parseInt(protein) || 0,
        fat: parseInt(fat) || 0,
        updatedAt: new Date(),
      },
    });

    return NextResponse.json({
      message: "Recipe updated successfully!",
      recipe: updatedRecipe,
    });
  } catch (error) {
    console.error("Error updating recipe:", error);
    return NextResponse.json(
      { error: `Failed to update recipe: ${error.message}` },
      { status: 500 }
    );
  }
});
