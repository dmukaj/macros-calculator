import { NextResponse } from "next/server";
import { getTokenExpiry } from "@/utils/foodSecretApi";
import axios from "axios";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  const accessToken = await getTokenExpiry();

  try {
    const response = await axios.get(process.env.BASE_URL, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        accept: "application/json",
      },
      params: {
        format: "json",
        method: "food.get.v4",
        food_id: id,
      },
    });

    return NextResponse.json(response.data.food);
  } catch (error) {
    console.log("Error fetching food details", error);
    return NextResponse.json("Something went wrong");
  }
}
