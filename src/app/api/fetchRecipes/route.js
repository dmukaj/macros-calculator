import db from "@/db";
import { auth } from "@/auth";
import { NextResponse } from "next/server";

export const GET = auth(async function GET(request) {
  if (request.auth) {
    try {
      const userId = request?.auth?.user?._id;

      if (!userId) {
        return NextResponse.json(
          { error: "User ID is required" },
          { status: 400 }
        );
      }

      const response = await db.recipe.findMany({
        where: {
          userId,
        },
      });
      return NextResponse.json({ response });
    } catch (error) {
      console.error("Error fetching meal types:", error);
      return NextResponse.json({ error: "Error fetching meal types" });
    }
  }
});
