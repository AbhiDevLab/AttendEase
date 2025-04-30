import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtVerify } from 'jose';

export async function middleware(request: NextRequest) {
    // Get token from request headers or cookies
    const token = request.cookies.get('authToken')?.value ||
        request.headers.get('authorization')?.split(' ')[1];

    // Check if the path requires authentication
    const isAuthPath = request.nextUrl.pathname.startsWith('/teacher') ||
        request.nextUrl.pathname.startsWith('/student');

    // Public paths that don't require authentication
    const isPublicPath = request.nextUrl.pathname === '/' ||
        request.nextUrl.pathname === '/login' ||
        request.nextUrl.pathname === '/register';

    if (isAuthPath && !token) {
        // Redirect to login if trying to access protected route without token
        return NextResponse.redirect(new URL('/login', request.url));
    }

    if (token && isAuthPath) {
        try {
            // Verify token
            const secret = new TextEncoder().encode(process.env.NEXTAUTH_SECRET || 'fallback_secret');
            const { payload } = await jwtVerify(token, secret);

            // Check if user is accessing the correct role path
            const isTeacherPath = request.nextUrl.pathname.startsWith('/teacher');
            const isStudentPath = request.nextUrl.pathname.startsWith('/student');

            if ((isTeacherPath && payload.role !== 'teacher') ||
                (isStudentPath && payload.role !== 'student')) {
                // Redirect to appropriate dashboard if role doesn't match path
                return NextResponse.redirect(
                    new URL(payload.role === 'teacher' ? '/teacher/dashboard' : '/student/dashboard', request.url)
                );
            }

            // User is authenticated and authorized
            return NextResponse.next();
        } catch (error) {
            // Token is invalid
            console.error('Token verification failed:', error);
            return NextResponse.redirect(new URL('/login', request.url));
        }
    }

    return NextResponse.next();
}

// Configure which paths the middleware runs on
export const config = {
    matcher: [
        '/((?!api|_next/static|_next/image|favicon.ico).*)',
    ],
};