export async function fetchHistory() {
  try {
    const response = await fetch(`/api/getHistory`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`Error fetching food history: ${response.statusText}`);
    }

    const data = await response.json();
    const uniqueFoods = [];
    const foodNames = new Set();
    for (const food of data.foods) {
      if (!foodNames.has(food.name)) {
        foodNames.add(food.name);
        uniqueFoods.push(food);
      }
    }

    return { foods: uniqueFoods };
  } catch (error) {
    console.log("Error fetching food history", error);
    return <p>Error fetching food history</p>;
  }
}
