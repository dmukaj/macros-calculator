import { auth } from "@/auth";
import db from "@/db";
import { NextResponse } from "next/server";

export const GET = auth(async function GET(request, { params }) {
  if (!request.auth) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { id } = params;

    const recipe = await db.recipe.findUnique({
      where: {
        id: id,
        userId: request.auth.user._id,
      },
    });

    if (!recipe) {
      return NextResponse.json({ error: "Recipe not found" }, { status: 404 });
    }

    return NextResponse.json({ recipe });
  } catch (error) {
    console.error("Error fetching recipe:", error);
    return NextResponse.json(
      { error: "Failed to fetch recipe" },
      { status: 500 }
    );
  }
});
