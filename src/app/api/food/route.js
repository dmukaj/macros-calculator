import axios from "axios";
import { NextResponse } from "next/server";
import { getTokenExpiry } from "@/utils/foodSecretApi";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("query") || "";
  searchParams.get("pageSize") || 2;

  const accessToken = await getTokenExpiry();
  try {
    const response = await axios.get(process.env.BASE_URL, {
      params: {
        method: "foods.search.v3",
        search_expression: query,
        max_results: 20,
        format: "json",
      },
      headers: {
        Authorization: `Bearer ${accessToken}`,
        accept: "application/json",
      },
    });

    return NextResponse.json(response.data);
  } catch (error) {
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 },
    );
  }
}
