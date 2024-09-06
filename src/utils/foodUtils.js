import axios from "axios";

export const addFood = async (item, session, mealType, name, date) => {
  console.log("date", date);
  const { calories, carbohydrate, protein, fat } = item;
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
        carbs: carbohydrate,
        protein,
        fat,
        mealType: mealType,
        date,
      },
    });
  } catch (error) {
    console.error("Error adding food to meal:", error);
  }
};
