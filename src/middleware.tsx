
import { NextResponse } from 'next/server';

import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;
    const hash = '#map=16/8.241531/124.243855'
    const defaultPath = '/explore';

    // Check if the user is at the root URL without any hash
    if (pathname === '/') {
        // Redirect to the map page with default parameters
        const url = request.nextUrl.clone();
        url.pathname = defaultPath;
        url.hash = hash;
        return NextResponse.redirect(url);
    }

    // Allow the request to continue
    return NextResponse.next();
}


// Configuration for the middleware to match the root path
export const config = {
    matcher: '/',
};
