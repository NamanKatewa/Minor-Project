import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { uncachedAuth } from "~/server/auth";

export async function middleware(request: NextRequest) {
	const session = await uncachedAuth();

	const isProtectedRoute =
		request.nextUrl.pathname.startsWith("/dashboard") ||
		request.nextUrl.pathname.startsWith("/stops") ||
		request.nextUrl.pathname.startsWith("/buses") ||
		request.nextUrl.pathname.startsWith("/optimize") ||
		request.nextUrl.pathname.startsWith("/settings");

	if (isProtectedRoute && !session) {
		const loginUrl = new URL("/auth/login", request.url);
		return NextResponse.redirect(loginUrl);
	}

	return NextResponse.next();
}

export const config = {
	matcher: [
		"/dashboard/:path*",
		"/stops/:path*",
		"/buses/:path*",
		"/optimize/:path*",
		"/settings/:path*",
	],
};
