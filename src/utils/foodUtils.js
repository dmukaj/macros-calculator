import axios from "axios";

export const addFood = async (item, session, mealType) => {
  const { calories, carbohydrate, protein, fat } = item;

  console.log("Food added to meal successfully!", session);
  try {
    await axios.post(`/api/addFood`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: {
        name: item.food_name,
        userId: session?.data?.user?._id,
        calories,
        carbs: carbohydrate,
        protein,
        fat,
        mealType: mealType,
      },
    });
  } catch (error) {
    console.error("Error adding food to meal:", error);
  }
};
