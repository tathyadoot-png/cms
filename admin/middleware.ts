import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("accessToken");
  const { pathname } = request.nextUrl;

  // Agar login page hai to allow karo
  if (pathname === "/login") {
    // Agar already logged in hai to dashboard bhejo
    if (token) {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }
    return NextResponse.next();
  }

  // Agar protected route hai aur token nahi hai
  if (!token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}
