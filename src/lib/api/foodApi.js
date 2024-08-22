import axios from "axios";
const BASE_URL =
  "https://api.nal.usda.gov/fdc/v1/foods/search?query=feta cheese&pageSize=5";

export async function searchFood() {
  try {
    const response = await axios.get(BASE_URL, {
      headers: {
        "X-Api-Key": "fa5E252mQkGXqafgWlB2JYiRIk6ELnErDYDlTMs0",
        accept: "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "Content-Type",
      },
    });
    console.log(response.data);
  } catch (error) {
    console.log("Oiiii error!!!", error);
  }
}
