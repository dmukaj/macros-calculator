import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import db from "./db";
import Credentials from "next-auth/providers/credentials";
import { ZodError } from "zod";
import { signInSchema } from "@/lib/schema";
import { verifyPassword } from "./utils/helper";
import getUserFromDb from "./utils/getUser";

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(db),
  providers: [
    Credentials({
      credentials: {
        email: { type: "email" },
        password: { type: "password" },
      },
      authorize: async (credentials) => {
        if (!credentials || !credentials.email || !credentials.password) {
          throw new Error("Missing credentials.");
        }

        let user = await db.user.findUnique({
          where: {
            email: credentials.email,
          },
        });

        if (!user) {
          throw new Error("User not found.");
        } else {
          const passMatch = verifyPassword(
            credentials.password,
            user.hashedPassword
          );
          if (!passMatch) {
            throw new Error("Invalid username or password.");
          }
        }
        console.log("user", user);
        if (user) return user;
        return null;
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
  },
  // debug: process.env.NODE_ENV !== "production",
});
