import { NextResponse, NextRequest } from 'next/server';
import { jwtVerify, JWTPayload } from 'jose';

const SECRET_KEY = process.env.TOKEN_SECRET_KEY;

if (!SECRET_KEY) {
    throw new Error("Missing environment variable: TOKEN_SECRET_KEY");
}

const encoder = new TextEncoder().encode(SECRET_KEY);

const publicRoutes = ['/sign-in', '/sign-up', '/']; // Define public routes

// Function to verify JWT and extract payload
async function verifyToken(token: string): Promise<JWTPayload | null> {
    try {
        const { payload } = await jwtVerify(token, encoder);
        return payload;
    } catch (error) {
        console.error('JWT Verification Error:', error);
        return null;
    }
}

export async function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;
    const pathSegments = pathname.split('/');
    const rolePath = pathSegments[2]; // Extract the role segment from the path

    const token = request.cookies.get('token')?.value;

    if (publicRoutes.includes(pathname)) {
        return NextResponse.next();
    }

    if (!token) {
        console.warn('No token found, redirecting to /sign-in');
        return NextResponse.redirect(new URL('/sign-in', request.url));
    }

    const payload = await verifyToken(token);

    if (!payload || (payload.exp && payload.exp < Math.floor(Date.now() / 1000))) {
        console.warn('Invalid or expired token, redirecting to /sign-in');
        return NextResponse.redirect(new URL('/sign-in', request.url));
    }

    const userRole = payload.role;

    // Restrict access based on role
    if (
        (rolePath === 'admin' && userRole === 'student' || userRole === "parent") ||
        (rolePath === 'student' && userRole !== 'student') ||
        (rolePath === 'parent' && userRole !== 'parent')
    ) {
        console.warn(`Unauthorized access to ${rolePath}, redirecting to /not-authorized`);
        return NextResponse.redirect(new URL('/not-authorized', request.url));
    }


    return NextResponse.next();
}

export const config = {
    matcher: [
        '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
        '/(api|trpc)(.*)',
        '/:id(admin|student|parent)/:path*',
    ],
};
