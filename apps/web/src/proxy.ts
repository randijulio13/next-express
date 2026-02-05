import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

/**
 * Proxy function handling redirects based on auth status
 */
export function proxy(request: NextRequest) {
    const token = request.cookies.get('token')?.value;
    const { pathname } = request.nextUrl;

    // Protect dashboard routes
    if (pathname.startsWith('/dashboard')) {
        if (!token) {
            return NextResponse.redirect(new URL('/login', request.url));
        }
    }

    // Redirect authenticated users away from auth pages
    if (pathname.startsWith('/login') || pathname.startsWith('/register')) {
        if (token) {
            return NextResponse.redirect(new URL('/dashboard', request.url));
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/dashboard/:path*', '/login', '/register'],
};
