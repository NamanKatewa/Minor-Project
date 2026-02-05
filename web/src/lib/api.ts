// API client helper for type-safe API calls.

// API base URL
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

// Type-safe fetch wrapper
export async function apiClient<T>(
	endpoint: string,
	options?: RequestInit & { token?: string },
): Promise<T> {
	const url = `${API_BASE_URL}${endpoint}`;

	const headers: Record<string, string> = {
		"Content-Type": "application/json",
		...((options?.headers as Record<string, string>) || {}),
	};

	// Add authorization header if token is provided
	if (options?.token) {
		headers.Authorization = `Bearer ${options.token}`;
	}

	const response = await fetch(url, {
		...options,
		headers,
	});

	if (!response.ok) {
		const error = await response
			.json()
			.catch(() => ({ detail: "Unknown error" }));
		throw new Error(error.detail || `API Error: ${response.statusText}`);
	}

	return response.json();
}

// Convenience methods
export const api = {
	get: <T>(endpoint: string, options?: RequestInit & { token?: string }) =>
		apiClient<T>(endpoint, { ...options, method: "GET" }),

	post: <T>(
		endpoint: string,
		data?: unknown,
		options?: RequestInit & { token?: string },
	) =>
		apiClient<T>(endpoint, {
			...options,
			method: "POST",
			body: JSON.stringify(data),
		}),

	put: <T>(
		endpoint: string,
		data?: unknown,
		options?: RequestInit & { token?: string },
	) =>
		apiClient<T>(endpoint, {
			...options,
			method: "PUT",
			body: JSON.stringify(data),
		}),

	delete: <T>(endpoint: string, options?: RequestInit & { token?: string }) =>
		apiClient<T>(endpoint, { ...options, method: "DELETE" }),
};
