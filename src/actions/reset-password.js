"use server";

import { ResetSchema } from "@/lib/schema";
import getUserFromDb from "@/utils/getUser";
import { sendPasswordResetEmail } from "@/lib/mail";
import { generatePasswordResetToken } from "@/lib/tokens";

export const resetPassword = async (values) => {
  const validatedFields = ResetSchema.safeParse(values);

  if (!validatedFields.success) {
    return;
  }

  const { email } = validatedFields.data;

  try {
    await getUserFromDb(email);
  } catch (error) {
    console.error(error);
  }

  const passwordResetToken = await generatePasswordResetToken(email);

  await sendPasswordResetEmail(
    passwordResetToken.email,
    passwordResetToken.token
  );

  return {
    success: "An email will be sent to your account if the email is valid",
  };
};
