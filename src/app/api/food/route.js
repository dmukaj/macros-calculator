import axios from "axios";
import { NextResponse } from "next/server";

const BASE_URL = "https://api.nal.usda.gov/fdc/v1/foods/search?";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("query");
  const pageSize = searchParams.get("pageSize") || 20;
  try {
    const response = await axios.get(BASE_URL, {
      params: {
        query: query,
        pageSize: pageSize,
      },
      headers: {
        "X-Api-Key": "fa5E252mQkGXqafgWlB2JYiRIk6ELnErDYDlTMs0",
        accept: "application/json",
        // "Access-Control-Allow-Origin": "*",
        // "Access-Control-Allow-Headers": "Content-Type",
      },
    });
    console.log(response.data);
    return NextResponse.json(response.data);
  } catch (error) {
    console.log("Oiiii error!!!", error);
  }
}
