import db from "@/db";
import { auth } from "@/auth";
import { NextResponse } from "next/server";

export const GET = auth(async function GET(request) {
  if (request.auth) {
    try {
      const foods = await db.meal.findMany({
        where: {
          userId: request.auth.user._id,
        },
        orderBy: {
          updatedAt: "desc",
        },
        take: 15,
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
});
