import bcrypt from "bcryptjs";

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
