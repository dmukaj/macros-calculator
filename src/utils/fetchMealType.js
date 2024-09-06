export async function fetchMealType(mealType, date) {
  try {
    const response = await fetch(`/api/getMealTypes`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        mealType,
        date,
      }),
    });

    if (!response.ok) {
      throw new Error(`Error fetching meal type: ${response.statusText}`);
    }

    const data = await response.json();

    return data;
  } catch (error) {
    console.log("Error fetching meal type", error);
    return <p>Error fetching meal type</p>;
  }
}
