import { auth } from "@/auth";
import { NextResponse } from "next/server";

const protectedRoutes = ["/dashboard"];

export default async function middleware(request) {
  const session = await auth();

  if (
    (session && request.nextUrl.pathname === "/signIn") ||
    (session && request.nextUrl.pathname === "/signUp")
  ) {
    const absoluteURL = new URL("/dashboard", request.nextUrl);
    return NextResponse.redirect(absoluteURL.toString());
  }

  const isProtected = protectedRoutes.some((route) =>
    request.nextUrl.pathname.startsWith(route)
  );

  if (!session && isProtected) {
    const absoluteURL = new URL("/", request.nextUrl);
    return NextResponse.redirect(absoluteURL.toString());
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
