import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
    const path = request.nextUrl.pathname;
    const token = request.cookies.get("token");
    
    if (token) {
        if (path === "/login" || path === "/signup" || path === "/verify") {
            return NextResponse.redirect(new URL("/profile", request.url));
        }
    }

    if (!token) {
        if (path !== "/login" && path !== "/signup" && path !== "/verify") {
            return NextResponse.redirect(new URL("/login", request.url));
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/", "/login", "/signup", "/profile", "/verifyemail"],
};
