import db from "@/db";
import { NextResponse } from "next/server";

export const POST = async function POST(request) {
  const data = await request.json();
  const { recipeId } = data.body;

  try {
    const deletedRecipe = await db.recipe.delete({
      where: {
        id: recipeId,
      },
    });

    if (!deletedRecipe) {
      return NextResponse.json(
        { message: "Recipe not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ message: "Recipe deleted successfully!" });
  } catch (error) {
    console.error("Error deleting recipe:", error);
    return NextResponse.json({ error: "Failed to delete recipe" });
  }
};
