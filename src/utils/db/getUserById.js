import db from "@/db";

export async function getUserById(id) {
  try {
    const user = await db.calculator.findUnique({
      where: {
        userId: id,
      },
    });

    return user;
  } catch (error) {
    console.log("Error fetching user by id", error);
  }
}
