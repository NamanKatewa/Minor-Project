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

	const isAuthRoute =
		request.nextUrl.pathname.startsWith("/auth/login") ||
		request.nextUrl.pathname.startsWith("/auth/register");

	if (isProtectedRoute && !session) {
		const loginUrl = new URL("/auth/login", request.url);
		return NextResponse.redirect(loginUrl);
	}

	if (isAuthRoute && session) {
		const dashboardUrl = new URL("/dashboard", request.url);
		return NextResponse.redirect(dashboardUrl);
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
		"/auth/:path*",
	],
};
