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
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: {
        userId: session?.data?.user?._id,
        recipeName,
        ingredients,
        calories,
        carbohydrate,
        protein,
        fat,
      },
    });
  } catch (error) {
    console.error("Error adding food to recipe:", error);
  }
};
