// export { auth as middleware } from "@/auth";

import { auth } from "@/auth";
import { NextResponse, NextRequest } from "next/server";

const protectedRoutes = ["/dashboard"];

export default async function middleware(request) {
  const session = await auth();
  console.log("here");

  const isProtected = protectedRoutes.some((route) =>
    request.nextUrl.pathname.startsWith(route)
  );

  if (!session && isProtected) {
    const absoluteURL = new URL("/welcome", request.nextUrl);
    return NextResponse.redirect(absoluteURL.toString());
  }

  return NextResponse.next();
}

export const config = {
  //   matcher: "/dashboard/:path*",
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
