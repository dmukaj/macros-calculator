// export async function fetchMealType(mealType, date) {
//   try {
//     const response = await fetch(`/api/getMealTypes`, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({
//         mealType,
//         date,
//       }),
//     });

//     if (!response.ok) {
//       throw new Error(`Error fetching meal type: ${response.statusText}`);
//     }

//     const data = await response.json();

//     return data;
//   } catch (error) {
//     console.log("Error fetching meal type", error);
//   }
// }

export async function fetchMealTypeByDate(date) {
  try {
    const response = await fetch(`/api/getMealByDate`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        date,
      }),
    });

    if (!response.ok) {
      throw new Error(`Error fetching meal type: ${response.statusText}`);
    }

    const data = await response.json();
    const convertedData = data.response.map((item) => ({
      ...item,
      updatedAt: new Date(item.updatedAt),
    }));

    console.log(data);
    console.log(convertedData);

    return convertedData;
  } catch (error) {
    console.log("Error fetching meal type", error);
  }
}
