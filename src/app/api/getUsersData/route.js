export default async function getUsersData(session) {
  try {
    const response = await fetch(`/api/usersData`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: session?.data?.user?._id,
      }),
    });

    if (!response.ok) {
      throw new Error(`Error fetching users data: ${response.statusText}`);
    }

    const data = await response.json();

    return data;
  } catch (error) {
    console.log("Error fetching users data", error);
  }
}
