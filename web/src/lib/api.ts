import type { components } from "~/generated/api-types";

const API_Base = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api";

export async function fetcher<T = unknown>(
	url: string,
	options?: RequestInit,
): Promise<T> {
	const res = await fetch(`${API_Base}${url}`, {
		...options,
		headers: {
			"Content-Type": "application/json",
			...options?.headers,
		},
	});

	if (!res.ok) {
		const error = await res
			.json()
			.catch(() => ({ detail: "An error occurred" }));
		// Handle structured error objects by stringifying them
		const errorMessage =
			typeof error.detail === "object"
				? JSON.stringify(error.detail)
				: error.detail || res.statusText;
		throw new Error(errorMessage);
	}

	return res.status === 204 ? ({} as T) : res.json();
}

export const api = {
	stops: {
		list: () => fetcher<components["schemas"]["StopRead"][]>("/stops"),
		get: (id: string) =>
			fetcher<components["schemas"]["StopRead"]>(`/stops/${id}`),
		create: (data: components["schemas"]["StopCreate"]) =>
			fetcher<components["schemas"]["StopRead"]>("/stops", {
				method: "POST",
				body: JSON.stringify(data),
			}),
		update: (id: string, data: components["schemas"]["StopUpdate"]) =>
			fetcher<components["schemas"]["StopRead"]>(`/stops/${id}`, {
				method: "PUT",
				body: JSON.stringify(data),
			}),
		delete: (id: string) => fetcher(`/stops/${id}`, { method: "DELETE" }),
		deleteAll: () => fetcher("/stops", { method: "DELETE" }),
		bulkCreate: (data: components["schemas"]["StopCreate"][]) =>
			fetcher<{ count: number }>("/stops/bulk", {
				method: "POST",
				body: JSON.stringify(data),
			}),
	},
	buses: {
		list: () => fetcher<components["schemas"]["BusWithDepot"][]>("/buses"),

		delete: (id: string) => fetcher(`/buses/${id}`, { method: "DELETE" }),
		deleteAll: () => fetcher("/buses", { method: "DELETE" }),
		bulkCreate: (data: components["schemas"]["BusImport"][]) =>
			fetcher<{ created: number; depots_created: number }>("/buses/bulk", {
				method: "POST",
				body: JSON.stringify(data),
			}),
		update: (id: string, data: components["schemas"]["BusUpdate"]) =>
			fetcher<components["schemas"]["BusRead"]>(`/buses/${id}`, {
				method: "PUT",
				body: JSON.stringify(data),
			}),
	},
	demand: {
		list: (semester?: string) =>
			fetcher<components["schemas"]["DemandWithStop"][]>(
				`/demand${semester ? `?semester=${semester}` : ""}`,
			),
		semesters: () => fetcher<string[]>("/demand/semesters"),

		deleteAll: () => fetcher("/demand", { method: "DELETE" }),
		bulkCreate: (data: components["schemas"]["DemandImport"][]) =>
			fetcher<{ created: number; skipped: number }>("/demand/bulk", {
				method: "POST",
				body: JSON.stringify(data),
			}),
	},
	depots: {
		list: () => fetcher<components["schemas"]["DepotRead"][]>("/depots"),
		deleteAll: () => fetcher("/depots", { method: "DELETE" }),
		delete: (id: string) => fetcher(`/depots/${id}`, { method: "DELETE" }),
		update: (id: string, data: components["schemas"]["DepotUpdate"]) =>
			fetcher<components["schemas"]["DepotRead"]>(`/depots/${id}`, {
				method: "PUT",
				body: JSON.stringify(data),
			}),
		bulkCreate: (data: components["schemas"]["DepotCreate"][]) =>
			fetcher<{ count: number }>("/depots/bulk", {
				method: "POST",
				body: JSON.stringify(data),
			}),
	},
	routes: {
		build: (stopIds?: string[]) =>
			fetcher<{
				id: string;
				stop_count: number;
				build_time_seconds: number;
				created_at: string;
			}>("/routes/build", {
				method: "POST",
				body: JSON.stringify(stopIds ? { stop_ids: stopIds } : {}),
			}),
		latest: () =>
			fetcher<{
				id: string;
				matrix_json: Record<string, unknown>;
				stop_count: number | null;
				build_time_seconds: number | null;
				stop_ids_json: Record<string, unknown> | null;
				created_at: string;
			}>("/routes/latest"),
		get: (id: string) =>
			fetcher<{
				id: string;
				matrix_json: Record<string, unknown>;
				stop_count: number | null;
				build_time_seconds: number | null;
				stop_ids_json: Record<string, unknown> | null;
				created_at: string;
			}>(`/routes/${id}`),
	},
	clustering: {
		suggestions: (thresholdM?: number) =>
			fetcher<{
				suggestions: Array<{
					stops: Array<{
						id: string;
						name: string;
						lat: number;
						lon: number;
					}>;
					max_distance_m: number;
				}>;
				threshold_m: number;
				total_groups: number;
			}>(
				`/clustering/suggestions${thresholdM ? `?threshold_m=${thresholdM}` : ""}`,
			),
	},
	dashboard: {
		summary: () =>
			fetcher<{
				stops_count: number;
				buses_count: number;
				depots_count: number;
				demand_records_count: number;
				total_fleet_capacity: number;
				semesters: string[];
				latest_matrix: {
					id: string;
					stop_count: number | null;
					build_time_seconds: number | null;
					created_at: string;
				} | null;
			}>("/dashboard/summary"),
	},
	optimization: {
		run: (data: components["schemas"]["OptimizationRequest"]) =>
			fetcher<components["schemas"]["OptimizationResponse"]>(
				"/optimization/run",
				{
					method: "POST",
					body: JSON.stringify(data),
				},
			),
		listSolutions: (limit = 20, offset = 0, scenario_type?: string | null) =>
			fetcher<components["schemas"]["OptimizationListResponse"]>(
				`/optimization/solutions?limit=${limit}&offset=${offset}${scenario_type ? `&scenario_type=${scenario_type}` : ""}`,
			),
		getLatest: () =>
			fetcher<components["schemas"]["OptimizationResponse"]>(
				"/optimization/solutions/latest",
			),
		get: (id: string) =>
			fetcher<components["schemas"]["OptimizationResponse"]>(
				`/optimization/solutions/${id}`,
			),
		delete: (id: string) =>
			fetcher(`/optimization/solutions/${id}`, { method: "DELETE" }),
	},
};
