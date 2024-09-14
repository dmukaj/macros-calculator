export async function fetchHistory(session) {
  try {
    const response = await fetch(`/api/getFood`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: session?.data?.user?._id,
      }),
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
