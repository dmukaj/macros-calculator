export async function fetchHistory(session) {
  try {
    const response = await fetch(`/api/getFood`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: session?.data?.user?._id, // Make sure session contains user ID
      }),
    });

    if (!response.ok) {
      throw new Error(`Error fetching food history: ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.log("Error fetching food history", error);
    return <p>Error fetching food history</p>;
  }
}
