import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'


export function middleware(request: NextRequest) {
    const path = request.nextUrl.pathname;

    const isPublicPath = path === "/login" || path === "/signup" 
    || path === '/verifyemail';

    const token = request.cookies.get("token")?.value || '';

    if(isPublicPath && token){
        return NextResponse.redirect(new URL('/profile', request.url))
    }else if(!isPublicPath && !token){
        return NextResponse.redirect(new URL('/login', request.url))
    }
    return NextResponse.next();
}
 
export const config = {
  matcher: [
    "/",
    "/login",
    "/signup",
    "/profile",
    "/verifyemail",
  ],//whichever path im visiting run this before visiting
}