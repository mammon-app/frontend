// middleware.js

import { NextResponse } from 'next/server';

export function middleware(req) {
  // Get the token from cookies (assuming you're using JWT or some token-based authentication)
  const token = req.cookies.get('token');

  // Paths that are protected for unauthenticated users
  const authProtectedPaths = ['/dashboard', '/profile', '/settings', '/deposit', '/deposit-crypto', '/deposit-fiat', '/deposit-provider', '/earn-points', '/leader-board', '/referrals', '/savinngs', '/save-assets', '/swap-assets', '/wallet', '/withdraw', '/withdraw-crypto', '/withdraw-fiat', '/withdraw-provider'];

  // Paths that should be inaccessible to authenticated users
  const guestProtectedPaths = ['/', '/login', '/create-account', '/confirm-email', '/forgot-password', '/password-reset', '/about-self'];

  const url = req.nextUrl.clone();

  // Redirect authenticated users away from login, signup, etc.
  if (token && guestProtectedPaths.includes(url.pathname)) {
    url.pathname = '/dashboard';
    return NextResponse.redirect(url);
  }

  // Redirect unauthenticated users away from protected pages
  if (!token && authProtectedPaths.includes(url.pathname)) {
    url.pathname = '/login';
    return NextResponse.redirect(url);
  }

  // Continue to the requested page if not redirecting
  return NextResponse.next();
}

// Specify the paths where the middleware should apply
export const config = {
  matcher: ['/:path*'], // Apply middleware to all routes
};
