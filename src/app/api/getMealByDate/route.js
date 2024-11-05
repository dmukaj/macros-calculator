import db from "@/db";
import { auth } from "@/auth";
import { NextResponse } from "next/server";

export const POST = auth(async function POST(request) {
  if (request.auth) {
    const data = await request.json();

    const targetDate = new Date(data.date);

    const startOfDay = new Date(
      Date.UTC(
        targetDate.getUTCFullYear(),
        targetDate.getUTCMonth(),
        targetDate.getUTCDate(),
        0,
        0,
        0
      )
    ).toISOString();

    const endOfDay = new Date(
      Date.UTC(
        targetDate.getUTCFullYear(),
        targetDate.getUTCMonth(),
        targetDate.getUTCDate(),
        23,
        59,
        59
      )
    ).toISOString();

    console.log("START: ", startOfDay, "END: ", endOfDay);
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
          updatedAt: "desc",
        },
      });

      return NextResponse.json({ response });
    } catch (error) {
      console.error("Error fetching meal types:", error);
      return NextResponse.json({ error: "Error fetching meal types" });
    }
  }
});
