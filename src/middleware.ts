// Import default middleware from 'next-auth/middleware'
export { default } from 'next-auth/middleware'

// Define a configuration object
// const excludedRoutes = [
//     'sign-in',
//     'api',
//     '_next/static',
//     '_next/image',
//     'favicon.ico',
//     'icon-192x192.png',
// ]

export const config = {
    // Define a matcher array
    matcher: [
        // Define a regular expression to match paths
        // The regular expression excludes the following paths:
        // - login
        // - api
        // - _next/static
        // - _next/image
        // - favicon.ico
        // '/dashboard/:path*',
        '/((?!login|api|_next/static|_next/image|favicon.ico).*)',
    ],
}
