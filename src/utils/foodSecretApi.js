import db from "@/db";
import axios from "axios";

export default async function getNewToken() {
  try {
    const response = await axios.post(
      process.env.TOKEN_URL,
      new URLSearchParams({
        grant_type: "client_credentials",
        scope: "premier",
      }),
      {
        auth: {
          username: process.env.CLIENT_ID,
          password: process.env.CLIENT_SECRET,
        },
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    const token = response.data.access_token;
    const tokenExpiry = Date.now() + response.data.expires_in * 1000 - 300000;

    const findToken = await db.apiToken.findUnique({
      where: {
        name: "FoodSecret",
      },
    });

    if (!findToken) {
      await db.apiToken.create({
        data: {
          token: token,
          expires: tokenExpiry,
          name: "FoodSecret",
        },
      });
    } else {
      await db.apiToken.update({
        where: {
          name: "FoodSecret",
        },
        data: {
          token: token,
          expires: tokenExpiry,
          name: "FoodSecret",
        },
      });
    }

    // console.log("tokenExpiry", result);
    return token;
  } catch (error) {
    console.log("Failed to get new token", error);
    throw new Error("Failed to get new token");
  }
}

export const getTokenExpiry = async () => {
  const tokenExpiry = await db.apiToken.findUnique({
    where: {
      name: "FoodSecret",
    },
  });

  if (tokenExpiry.expires < Date.now()) {
    console.log("true");
    return getNewToken();
  }
  return tokenExpiry.token;
};
