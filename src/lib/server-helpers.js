import db from "../db";

export const connectToDb = async () => {
  try {
    await db.$connect();
  } catch (error) {
    console.log("Unable to conect to database!", error);
  }
};
