import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

/**
 * Checks if the user is authenticated and redirects to the appropriate page.
 * If the user is authenticated:
 *   - If the user is on the login or register page, redirect to the dashboard.
 *   - If the user is on a protected route and has not completed the questionnaire, redirect to the questionnaire.
 *   - If the user is on a protected route and has completed the questionnaire, allow the request to continue.
 * If the user is not authenticated:
 *   - If the user is on a protected route, redirect to the login page.
 *   - If the user is on the login or register page, allow the request to continue.
 *   - If the user is on a public route, allow the request to continue.
 * @param req - The request object.
 * @returns The response object.
 */
export function middleware(request: NextRequest) {
  const token = request.cookies.get('token')?.value;
  const isAuthPage = request.nextUrl.pathname.startsWith('/login') || 
                    request.nextUrl.pathname.startsWith('/register');
  const isProtectedRoute = request.nextUrl.pathname.startsWith('/dashboard');
  const questionnaireCompleted = request.cookies.get('questionnaireCompleted')?.value === 'true';

  if (isAuthPage && token) {
    // User is authenticated and on the login or register page, redirect to the dashboard.
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  if (isProtectedRoute && !token) {
    // User is not authenticated and on a protected route, redirect to the login page.
    return NextResponse.redirect(new URL('/login', request.url));
  }

  if (
    isProtectedRoute && 
    token && 
    !request.nextUrl.pathname.startsWith('/questionnaire') &&
    !questionnaireCompleted
  ) {
    // User is authenticated, on a protected route, and has not completed the questionnaire, redirect to the questionnaire.
    return NextResponse.redirect(new URL('/questionnaire', request.url));
  }

  // User is authenticated and on a protected route, or user is not authenticated and on a public route, allow the request to continue.
  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*', '/login', '/register'],
};
