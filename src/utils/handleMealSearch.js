import _ from "lodash";

export const handleMealSearch = _.debounce(
  async (
    e,
    setResult,
    setLoading,
    setError,
    setShowAllResults,
    setShowMoreClicked
  ) => {
    const query = e.target.value.trim();
    if (query.length < 2) return;

    setLoading(true);
    setError(null);
    setShowAllResults(false);
    setShowMoreClicked(false);

    try {
      const response = await fetch(
        `/api/food?query=${encodeURIComponent(query)}`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }

      const data = await response.json();
      const foodItem = data?.foods_search?.results?.food || [];

      const searchResults = Array.isArray(foodItem) ? foodItem : [];
      setResult(searchResults);
    } catch (error) {
      console.error("Error fetching data:", error);
      setError("Error fetching data :(");
    } finally {
      setLoading(false);
    }
  },
  300 // Debounce delay in milliseconds
);
