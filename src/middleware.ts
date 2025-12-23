import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const AUTH_PAGES = ["/login", "/register", "/get-started"];


const COOKIE_KEYS = [
  "access_token_creator_dev", 
  "access_token_brand_dev",
  "access_token_creator",
  "access_token_brand",
];

export function middleware(request: NextRequest) {
  
  const { pathname } = request.nextUrl;
  const isAuthPage = AUTH_PAGES.includes(pathname);
  const isProtectedRoute = pathname.startsWith("/dashboard");

  let authToken: string | null = null;

   for (const key of COOKIE_KEYS) {
    const cookie = request.cookies.get(key);
    if (cookie?.value) {
      authToken = cookie.value;
      break;
    }
  }
    
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
  matcher: ["/", "/login", "/register", "/get-started", "/dashboard/:path*"],
};
