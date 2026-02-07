import type { DefaultSession, NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";

declare module "next-auth" {
	interface Session extends DefaultSession {
		user: {
			id: string;
			accessToken: string;
		} & DefaultSession["user"];
	}

	interface User {
		id?: string;
		email?: string | null;
		name?: string | null;
		accessToken?: string;
	}
}

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

export const authConfig = {
	providers: [
		Credentials({
			name: "credentials",
			credentials: {
				email: { label: "Email", type: "email" },
				password: { label: "Password", type: "password" },
			},
			async authorize(credentials) {
				if (!credentials?.email || !credentials?.password) {
					return null;
				}

				try {
					const response = await fetch(`${API_URL}/auth/login`, {
						method: "POST",
						headers: { "Content-Type": "application/json" },
						body: JSON.stringify({
							email: credentials.email,
							password: credentials.password,
						}),
					});

					if (!response.ok) {
						return null;
					}

					const data = (await response.json()) as {
						access_token: string;
						user: { id: string; email: string; name: string | null };
					};

					return {
						id: data.user.id,
						email: data.user.email,
						name: data.user.name,
						accessToken: data.access_token,
					};
				} catch (error) {
					console.error("Auth error:", error);
					return null;
				}
			},
		}),
	],
	session: {
		strategy: "jwt",
	},
	callbacks: {
		jwt: ({ token, user }) => {
			if (user) {
				token.id = user.id;
				token.accessToken = user.accessToken;
			}
			return token;
		},
		session: ({ session, token }) => ({
			...session,
			user: {
				...session.user,
				id: token.id as string,
				accessToken: token.accessToken as string,
			},
		}),
	},
	pages: {
		signIn: "/login",
	},
} satisfies NextAuthConfig;
