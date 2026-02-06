import { useSession } from "next-auth/react";

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
