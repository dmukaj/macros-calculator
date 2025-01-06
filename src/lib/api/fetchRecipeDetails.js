import axios from "axios";

export const fetchRecipeDetails = async (id) => {
  if (!id) {
    throw new Error("No recipe ID provided");
  }

  try {
    const response = await axios.get(`/api/fetchRecipes/${id}`, {
      params: {
        recipeId: id,
      },
    });

    return response.data.message;
  } catch (error) {
    console.log("Error fetching recipe details", error);
  }
};
