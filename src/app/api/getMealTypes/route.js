import db from "@/db";
import { NextResponse } from "next/server";

export async function GET(request) {
  const data = await request.json();
  console.log("data", data);

  try {
    const mealTypes = await db.meal.findMany({
      where: {
        mealType: mealType,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    if (mealTypes.length === 0) {
      return NextResponse.json({ error: "Meal type not found" });
    }

    return NextResponse.json({ mealTypes });
  } catch (error) {
    console.error("Error fetching meal types:", error);
    return NextResponse.json({ error: "Error fetching meal types" });
  }
}
