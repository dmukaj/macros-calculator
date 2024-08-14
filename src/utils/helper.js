import bcrypt from "bcryptjs";
// import { PrismaClient } from "@prisma/client";

// const prisma = new PrismaClient();

// export default async function saltAndHashPassword(password) {
// const users = await prisma.user.findMany();

// for (let user of users) {
//   const isPasswordValid = await compare(password, user.password);

//   if (isPasswordValid) {
//     return true;
//   }
// }
// return false;
// }

export function saltAndHashPassword(password) {
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(password, salt);
  return hash;
}

export const verifyPassword = (password, hash) => {
  console.log("password", password);
  console.log("hash", hash);
  return bcrypt.compareSync(password, hash);
};
