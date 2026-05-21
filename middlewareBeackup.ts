import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { auth } from './auth';

export async function middleware(req: NextRequest) {
  const token = await auth();
  const { pathname, searchParams } = new URL(req.url);
  const redirectUrl = searchParams.get('redirect');
  const loginUrl = new URL('/login', req.url);

  loginUrl.searchParams.set('redirect', pathname); // Store the attempted URL

  const protectedRoutes = [
    '/dashboard',
    '/wishlist',
    '/cart',
    '/checkout',
    '/purchase_history',
    '/profile',
    '/address',
    '/wish_list',
    '/address/edit/:path*',
    '/address/add'
  ];

  const isProtectedRoute = protectedRoutes.some(route => pathname.startsWith(route.replace(':path*', '')));

  // If authenticated and on the login page, redirect to home or the desired protected route
  if (token?.user && pathname === '/login') {
    const redirectTo = redirectUrl || '/';
    return NextResponse.redirect(new URL(redirectTo, req.url));
  }

  // If not authenticated and on a protected route, redirect to the login page
  if (!token && isProtectedRoute) {
    return NextResponse.redirect(loginUrl); // Redirect to login page with `redirect` query parameter
  }

  return NextResponse.next();
}

// Configuration to apply the middleware to specific routes
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
};
