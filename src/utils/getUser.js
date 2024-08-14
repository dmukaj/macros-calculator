"use server";
import { compare } from "bcryptjs";
import db from "../db";

async function getUserFromDb(email) {
  // Retrieve the user by email from the database
  const user = await db.user.findUnique({
    where: { email },
  });

  if (!user) {
    throw new Error("User not found.");
  }

  return user;
}

export default getUserFromDb;
