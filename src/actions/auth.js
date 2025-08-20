"use server";

import { signIn, signOut } from "@/auth";
import { signInSchema } from "../lib/schema";
import { revalidatePath } from "next/cache";
import { AuthError } from "next-auth";

export async function logout() {
  await signOut({ redirectTo: "/" });
  revalidatePath("/");
}

export const loginWithCreds = async (credentials) => {
  await signInSchema.parseAsync(credentials);

  try {
    await signIn("credentials", {
      email: credentials.email.toLowerCase().trim(),
      password: credentials.password.trim(),
      redirectTo: "/dashboard",
    });
  } catch (error) {
    if (error instanceof AuthError) {
      if (error.cause?.err instanceof Error) {
        console.log("error.cause.err.message");
        return error.cause.err.message;
      }
      switch (error.type) {
        case "CredentialsSignin":
          return "Invalid email or password";
        default:
          return "Something went wrong";
      }
    }
    throw error;
  }

  revalidatePath("/");
};
