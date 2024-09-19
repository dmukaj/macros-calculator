import db from "@/db";
import { auth } from "@/auth";
import { getUserById } from "@/utils/db/getUserById";
import { NextResponse } from "next/server";

export const POST = auth(async function POST(request) {
  if (request.auth) {
    try {
      const data = await request.json();
      const { age, height, weight, gender, activity, goal, bmr } = data.body;
      const user = await getUserById(request.auth.user._id);

      if (!user) {
        const response = await db.calculator.create({
          data: {
            age: parseInt(age),
            height: parseInt(height),
            weight: parseInt(weight),
            gender,
            activity,
            bmr,
            goal: goal,
            userId: request.auth.user._id,
          },
        });
        return NextResponse.json({ response }, { status: 201 });
      }

      const response = await db.calculator.update({
        where: {
          userId: request.auth.user._id,
        },
        data: {
          age: parseInt(age),
          height: parseInt(height),
          weight: parseInt(weight),
          gender,
          bmr,
          activity,
          goal: goal,
        },
      });
      return NextResponse.json({ response }, { status: 201 });
    } catch (error) {
      console.log("error", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
  }
  return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
});

export const GET = auth(async function GET(request) {
  if (request.auth) {
    try {
      const user = await getUserById(request.auth.user._id);

      return NextResponse.json({ user }, { status: 200 });
    } catch (error) {
      console.log("error", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
  }
  return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
});
