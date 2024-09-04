import db from "@/db";
import { NextResponse } from "next/server";

export async function POST(request) {
  const data = await request.json();
  console.log("data", data);

  try {
    const foods = await db.meal.findMany({
      where: {},
      orderBy: {
        createdAt: "desc",
      },
      take: 5,
    });

    if (foods.length === 0) {
      return NextResponse.json({ error: "Food not found" });
    }

    return NextResponse.json({ foods });
  } catch (error) {
    console.error("Error fetching food:", error);
    return NextResponse.json({ error: "Error fetching food" });
  }
}
