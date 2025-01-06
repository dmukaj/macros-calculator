export const fetchFoodDetails = async (id) => {
  if (!id) {
    throw new Error("No food ID provided");
  }

  try {
    const response = await fetch(`/api/food/details?id=${id}`);
    if (!response.ok) {
      throw new Error("Failed to fetch food details");
    }
    const data = await response.json();

    return data;
  } catch (error) {
    console.log("Error fetching food details", error);
    throw error;
  }
};
