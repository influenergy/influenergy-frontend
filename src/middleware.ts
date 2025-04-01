import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const AUTH_PAGES = ["/", "/login", "/register", "/get-started"];
export function middleware(request: NextRequest) {
  const authCookie = request.cookies.get("access_token");
  let authToken = null;

  if (authCookie?.value) {
    try {
      // Parse the JWT token from cookie
      authToken = authCookie.value;
    } catch (error) {
      console.error("Error parsing auth token:", error);
    }
  }

  const { pathname } = request.nextUrl;

  // Check if the current path is in the AUTH_PAGES array
  const isAuthPage = AUTH_PAGES.includes(pathname);
  const isProtectedRoute = pathname.startsWith("/dashboard");

  // If user is authenticated and trying to access login, register, or home page
  if (authToken && isAuthPage) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  // If user is not authenticated and trying to access protected routes
  if (!authToken && isProtectedRoute) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

// Update the matcher to include /get-started explicitly
export const config = {
  matcher: [
    "/",
    "/login",
    "/register",
    "/get-started",
    "/dashboard/:path*",
  ],
};
