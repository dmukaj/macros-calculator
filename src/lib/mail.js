"use server";

import { Resend } from "resend";

// eslint-disable-next-line no-undef
const domain = process.env.NEXT_PUBLIC_APP_URL;
// eslint-disable-next-line no-undef
const apiKey = process.env.RESEND_API_KEY;
// eslint-disable-next-line no-undef
const fromEmail = process.env.FROM_EMAIL;

export const sendPasswordResetEmail = async (email, token) => {
  const resend = new Resend(apiKey);

  const resetLink = `${domain}/new-password?token=${token}`;

  await resend.emails.send({
    from: fromEmail,
    to: email,
    subject: "Reset your password",
    html: `<p>Click <a href="${resetLink}">here</a> to reset password.</p>`,
  });
};
