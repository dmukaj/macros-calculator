import { auth } from "@/auth";
import db from "@/db";
import { NextResponse } from "next/server";

export const DELETE = async function DELETE() {
  const session = await auth();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const today = new Date();
    const oneMonthAgo = new Date(
      today.getFullYear(),
      today.getMonth() - 1,
      today.getDate()
    );

    const deleteResult = await db.meal.deleteMany({
      where: {
        userId: session.user._id,
        createdAt: {
          lt: oneMonthAgo,
        },
      },
    });

    return NextResponse.json({
      message: `Successfully deleted ${deleteResult.count} old meal entries`,
      deletedCount: deleteResult.count,
      cutoffDate: oneMonthAgo.toISOString(),
    });
  } catch (error) {
    console.error("Error deleting old meals:", error);
    return NextResponse.json(
      { error: "Failed to delete old meals" },
      { status: 500 }
    );
  }
};
