import db from "@/db";
import { NextResponse } from "next/server";

export async function POST(request) {
  const data = await request.json();
  const { foodId } = data.body;
  console.log("foodId", foodId);

  try {
    const deletedFood = await db.meal.delete({
      where: {
        id: foodId,
      },
    });

    if (!deletedFood) {
      return NextResponse.json({ message: "Food not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Food deleted successfully!" });
  } catch (error) {
    console.error("Error deleting food from meal:", error);
    return NextResponse.json({ error: "Failed to delete food" });
  }
}
