import db from "@/db";
import { auth } from "@/auth";
import { NextResponse } from "next/server";

export const POST = auth(async function POST(request) {
  if (request.auth) {
    const data = await request.json();

    const targetDate = new Date(data.date);
    const startOfDay = new Date(targetDate.setHours(0, 0, 0, 0));
    const endOfDay = new Date(targetDate.setHours(23, 59, 59, 999));

    try {
      const response = await db.meal.findMany({
        where: {
          userId: request.auth.user._id,
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
});
