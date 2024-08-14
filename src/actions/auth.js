"use server";

import { signIn, signOut } from "@/auth";
import { signInSchema } from "../lib/schema";
import { revalidatePath } from "next/cache";
import saltAndHashPassword from "../utils/helper";
import db from "@/db";
import getUserFromDb from "../utils/getUser";
import Credentials from "next-auth/providers/credentials";
import { AuthError } from "next-auth";

export async function signInFn(signInSchema) {
  await signIn("credentials", signInSchema, { redirectTo: "/" });
  revalidatePath("/");
}

export async function logout() {
  await signOut({ redirectTo: "/welcome" });
  revalidatePath("/");
}

export const loginWithCreds = async (credentials) => {
  const { email, password } = await signInSchema.parseAsync(credentials);

  try {
    await signIn("credentials", {
      email: credentials.email,
      password: credentials.password,
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
