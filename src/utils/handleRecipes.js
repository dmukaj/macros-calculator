import axios from "axios";

export async function fetchRecipes() {
  try {
    const response = await axios.get(`/api/fetchRecipes`, {});

    if (response.status === 200) return response.data;
  } catch (error) {
    console.error("Error fetching recipes:", error);
  }
}
export const getRecipe = async (recipeId) => {
  try {
    const response = await axios.get(`/api/recipes/${recipeId}`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.status === 200) return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
export const deleteRecipe = async (recipeId) => {
  try {
    await axios.post(`/api/deleteRecipe`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: {
        recipeId: recipeId,
      },
    });
  } catch (error) {
    console.error("Error deleting recipe:", error);
  }
};

export const updateRecipe = async (
  recipeId,
  recipeName,
  ingredients,
  calories,
  carbohydrate,
  protein,
  fat
) => {
  try {
    if (!recipeId) {
      throw new Error("Recipe ID is required");
    }

    const response = await axios.put(
      `/api/editRecipe/${recipeId}`,
      {
        recipeName,
        ingredients,
        calories,
        carbohydrate,
        protein,
        fat,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Error updating recipe:", error);

    if (error.response) {
      throw new Error(
        error.response.data?.error ||
          `HTTP error! status: ${error.response.status}`
      );
    } else {
      throw new Error(error.message || "Failed to update recipe");
    }
  }
};
