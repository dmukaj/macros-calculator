export async function SearchFood(query) {
  try {
    const response = await fetch(
      `/api/food?query=${encodeURIComponent(query)}`
    );

    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }
    const data = await response.json();
    const foodItem = data.foods_search.results.food;

    const searchResults = Array.isArray(foodItem) ? foodItem : [];
    return searchResults;
  } catch (error) {
    console.log("Error fetching data :(", error);
    return <p>Error fetching data</p>;
  }
}
