import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const authToken = request.cookies.get("login-token");
  const path = request.nextUrl.pathname;

  // If user is not logged in and trying to access protected routes
  if (!authToken && path.startsWith("/user")) {
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }

  // If user is logged in and trying to access auth pages
  if (authToken && (path === "/auth/login" || path === "/auth/sign-up")) {
    return NextResponse.redirect(new URL("/user", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/user/:path*", "/auth/login", "/auth/sign-up"],
};