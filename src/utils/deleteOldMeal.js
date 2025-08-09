import axios from "axios";

export const deleteOldMeals = async () => {
  try {
    const response = await axios.delete("/api/deleteOldMeal");
    return response.data;
  } catch (error) {
    console.error(
      "Error deleting old meals:",
      error.response?.data || error.message
    );
  }
};
