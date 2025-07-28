"use server";
import db from "../db";
import getUserFromDb from "../utils/getUser";
import { getVerificationTokenByToken } from "../utils/verification-token";

export const verifyEmail = async (token) => {
  const existingToken = await getVerificationTokenByToken(token);

  if (!existingToken) {
    return { error: "Token does not exist!" };
  }

  const hasExpired = new Date(existingToken.expires) < new Date();

  if (hasExpired) {
    return { error: "Token has expired!" };
  }

  const existingUser = await getUserFromDb(existingToken.email);

  if (!existingUser) {
    return { error: "Email does not exist!" };
  }

  const confirmEmail = db.user.update({
    where: { id: existingUser.id },
    data: {
      emailVerified: new Date(),
      email: existingToken.email,
    },
  });

  const deleteToken =
    existingToken &&
    db.verificationToken.delete({
      where: { id: existingToken.id },
    });
  await db.$transaction([confirmEmail, deleteToken]);
  return { success: "Email verified!" };
};
