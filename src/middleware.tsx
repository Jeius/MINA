
import { NextResponse } from 'next/server';

// export function middleware(request: { nextUrl: { pathname: string; }; url: string | URL | undefined; }) {
//     // Check if the request path is the root
//     if (request.nextUrl.pathname === '/') {
//         // Redirect to /explore
//         return NextResponse.redirect(new URL('/explore', request.url));
//     }

//     // Allow other requests to continue
//     return NextResponse.next();
// }




import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
    const { pathname, hash } = request.nextUrl;
    const defaultHash = '#map=16/8.241530595/124.243854763';
    const defaultPath = '/explore';

    // Check if the user is at the root URL without any hash
    if (pathname === '/' && !hash) {
        // Redirect to the map page with default parameters
        const url = request.nextUrl.clone();
        url.pathname = defaultPath;
        url.hash = defaultHash; // Default zoom and coordinates
        return NextResponse.redirect(url);
    }

    // Allow the request to continue
    return NextResponse.next();
}


// Configuration for the middleware to match the root path
export const config = {
    matcher: '/',
};
