import axios from "axios";
import { NextResponse } from "next/server";

const BASE_URL = "https://platform.fatsecret.com/rest/server.api";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("query");
  const pageSize = searchParams.get("pageSize") || 2;
  try {
    const response = await axios.get(BASE_URL, {
      params: {
        method: "foods.search",
        search_expression: query,
        page_number: 1,
        max_results: 10,
        format: "json",
      },
      headers: {
        Authorization: `Bearer ${process.env.X_API_KEY}`,
        accept: "application/json",
      },
    });
    // console.log("babo", response);
    return NextResponse.json(response.data);
  } catch (error) {
    console.log("Oiiii error!!!", error);
  }
}
