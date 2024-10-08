import db from "@/db";
import { auth } from "@/auth";
import { NextResponse } from "next/server";
import { formatISO } from "date-fns";

export const POST = auth(async function POST(request) {
  if (request.auth) {
    const data = await request.json();

    const targetDate = new Date(data.date);
    const utcDate = new Date(
      Date.UTC(
        targetDate.getFullYear(),
        targetDate.getMonth(),
        targetDate.getDate(),
        targetDate.getHours(),
        targetDate.getMinutes(),
        targetDate.getSeconds(),
        targetDate.getMilliseconds()
      )
    );
    const startOfDay = formatISO(new Date(utcDate.setHours(0, 0, 0)));
    const endOfDay = formatISO(new Date(utcDate.setHours(23, 59, 59)));

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
