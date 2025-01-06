import axios from "axios";

export async function fetchRecipes() {
  try {
    const response = await fetch(`/api/fetchRecipes`, {
      method: "GET",
    });

    if (!response.ok) {
      throw new Error("Failed to fetch recipes");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching recipes:", error);
  }
}

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
