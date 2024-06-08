
import { NextResponse } from 'next/server';

export function middleware(request: { nextUrl: { pathname: string; }; url: string | URL | undefined; }) {
    // Check if the request path is the root
    if (request.nextUrl.pathname === '/') {
        // Redirect to /explore
        return NextResponse.redirect(new URL('/explore', request.url));
    }

    // Allow other requests to continue
    return NextResponse.next();
}

// Configuration for the middleware to match the root path
export const config = {
    matcher: '/',
};
