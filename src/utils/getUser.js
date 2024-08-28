"use server";
import db from "../db";

async function getUserFromDb(email) {
  const user = await db.user.findUnique({
    where: { email },
  });

  if (!user) {
    throw new Error("User not found.");
  }

  return user;
}

export default getUserFromDb;
