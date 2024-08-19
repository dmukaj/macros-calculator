import axios from "axios";
const BASE_URL = "https://api.nal.usda.gov/fdc/v1/foods/search?";

export async function searchFood() {
  try {
    const response = await axios.get(`${BASE_URL}`);
    console.log(response.data);
  } catch (error) {
    console.log("Oiiii error!!!", error);
  }
}
