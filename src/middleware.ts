import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const token = request.cookies.get('auth-token')?.value;
  const isAuthPage = request.nextUrl.pathname.startsWith('/auth');
  const isApiRoute = request.nextUrl.pathname.startsWith('/api');

  // Redirect to login if accessing protected routes without token
  if (!token && !isAuthPage && !isApiRoute && request.nextUrl.pathname !== '/') {
    return NextResponse.redirect(new URL('/auth/login', request.url));
  }

  // Allow access to auth pages regardless of token status
  // Client-side will handle redirects if user is already authenticated

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};