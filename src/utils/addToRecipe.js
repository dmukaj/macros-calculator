import axios from "axios";

export const addToRecipe = async (
  session,
  recipeName,
  ingredients,
  calories,
  carbohydrate,
  protein,
  fat
) => {
  try {
    await axios.post(`/api/createRecipe`, {
      userId: session?.data?.user?._id,
      recipeName,
      ingredients,
      calories,
      carbohydrate,
      protein,
      fat,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error("Error adding food to recipe:", error);
    throw error;
  }
};
