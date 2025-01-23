import db from "@/db";
import { auth } from "@/auth";
import { NextResponse } from "next/server";

export const GET = auth(async function GET(request, response) {
  const recipeId = response.params.id;

  if (request.auth) {
    try {
      const recipeResponse = await db.recipe.findUnique({
        where: {
          id: recipeId,
        },
      });

      return NextResponse.json({ message: recipeResponse });
    } catch (error) {
      console.error("Error fetching meal types:", error);
      return NextResponse.json({ error: "Error fetching meal types" });
    }
  }
});
