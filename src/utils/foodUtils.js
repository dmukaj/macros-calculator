import axios from "axios";

export const addFood = async (item, session, mealType, name, date) => {
  const { calories, carbohydrate, protein, fat, createdAt } = item;
  const newDate = new Date(date);
  try {
    await axios.post(`/api/addFood`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: {
        name: name,
        userId: session?.data?.user?._id,
        calories,
        carbohydrate,
        protein,
        fat,
        mealType: mealType,
        date: newDate || createdAt,
      },
    });
  } catch (error) {
    console.error("Error adding food to meal:", error);
  }
};

export const deleteFood = async (foodId) => {
  try {
    await axios.post(`/api/deleteFood`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: {
        foodId: foodId,
      },
    });
  } catch (error) {
    console.error("Error deleting food from meal:", error);
  }
};
