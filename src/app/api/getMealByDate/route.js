import db from "@/db";
import { NextResponse } from "next/server";

export async function POST(request) {
  const data = await request.json();

  const targetDate = new Date(data.date);
  const startOfDay = new Date(targetDate.setHours(0, 0, 0, 0));
  const endOfDay = new Date(targetDate.setHours(23, 59, 59, 999));

  console.log("startOfDay", startOfDay);
  console.log("endOfDay", endOfDay);
  console.log("targetDate", targetDate);

  try {
    const response = await db.meal.findMany({
      where: {
        createdAt: {
          gte: startOfDay,
          lte: endOfDay,
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json({ response });
  } catch (error) {
    console.error("Error fetching meal types:", error);
    return NextResponse.json({ error: "Error fetching meal types" });
  }
}
