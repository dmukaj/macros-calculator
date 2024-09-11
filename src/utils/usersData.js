import axios from "axios";

export const postUsersData = async (data) => {
  try {
    const response = await axios.post("/api/usersData", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: data,
    });

    return response.status;
  } catch (error) {
    console.log("Error posting users data", error);
    return error.response.data;
  }
};

export const getUsersData = async () => {
  try {
    const response = await axios.get("/api/usersData", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    return response.data;
  } catch (error) {
    console.log("Error fetching users data", error);
    return error.response.data;
  }
};
