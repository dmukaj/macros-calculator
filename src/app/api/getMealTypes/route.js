import db from "@/db";
import { NextResponse } from "next/server";

export async function POST(request) {
  const data = await request.json();

  const targetDate = new Date(data.date);
  const startOfDay = new Date(targetDate.setHours(0, 0, 0, 0));
  const endOfDay = new Date(targetDate.setHours(23, 59, 59, 999));

  try {
    const mealTypes = await db.meal.findMany({
      where: {
        mealType: data.mealType,
        createdAt: {
          gte: startOfDay,
          lte: endOfDay,
        },
      },

      orderBy: {
        createdAt: "desc",
      },
    });

    if (mealTypes.length === 0) {
      return NextResponse.json({ error: "No meals found from this date" });
    }

    return NextResponse.json({ mealTypes });
  } catch (error) {
    console.error("Error fetching meal types:", error);
    return NextResponse.json({ error: "Error fetching meal types" });
  }
}
