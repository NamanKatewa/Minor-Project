import { useSession } from "next-auth/react";

/**
 * Hook to get the current user session with access token.
 * Use this to access user data and the FastAPI JWT token.
 */
export function useAuth() {
	const { data: session, status } = useSession();

	return {
		session,
		user: session?.user,
		accessToken: session?.user?.accessToken,
		isAuthenticated: !!session?.user,
		isLoading: status === "loading",
	};
}
