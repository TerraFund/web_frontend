import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Protected path prefixes requiring authentication
const PROTECTED_ROUTES = ['/dashboard', '/admin'];
const ADMIN_ONLY_ROUTES = ['/admin'];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Check if requested route requires authentication
  const isProtectedRoute = PROTECTED_ROUTES.some((route) => pathname.startsWith(route));
  const isAdminRoute = ADMIN_ONLY_ROUTES.some((route) => pathname.startsWith(route));

  if (!isProtectedRoute) {
    return NextResponse.next();
  }

  // Retrieve token from Cookie or Authorization header
  const token = request.cookies.get('terrafund_token')?.value || request.headers.get('authorization');

  // If unauthenticated, redirect to login with return URL parameter
  if (!token) {
    const loginUrl = new URL('/auth/login', request.url);
    loginUrl.searchParams.set('redirect', pathname);
    return NextResponse.redirect(loginUrl);
  }

  // Admin route role check (if user role cookie exists)
  const userRole = request.cookies.get('terrafund_role')?.value;
  if (isAdminRoute && userRole && userRole.toLowerCase() !== 'admin') {
    const dashboardUrl = new URL('/dashboard', request.url);
    return NextResponse.redirect(dashboardUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*', '/admin/:path*'],
};