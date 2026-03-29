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
	demandMap: {
		analysis: (thresholdM?: number) =>
			fetcher<components["schemas"]["RouteAnalysisResponse"]>(
				`/demand-map/analysis${thresholdM ? `?threshold_m=${thresholdM}` : ""}`,
			),
		buildMatrix: (stopIds?: string[]) =>
			fetcher<components["schemas"]["MatrixBuildResponse"]>(
				"/demand-map/build-matrix",
				{
					method: "POST",
					body: JSON.stringify(stopIds ? { stop_ids: stopIds } : {}),
				},
			),
		latestMatrix: () =>
			fetcher<components["schemas"]["MatrixRead"]>("/demand-map/latest-matrix"),
		getMatrix: (id: string) =>
			fetcher<components["schemas"]["MatrixRead"]>(`/demand-map/matrix/${id}`),
	},
	dashboard: {
		summary: () =>
			fetcher<components["schemas"]["DashboardSummary"]>("/dashboard/summary"),
	},
	generateRoutes: {
		ready: () =>
			fetcher<components["schemas"]["RouteGenerationReadyResponse"]>(
				"/generate-routes/ready",
			),
		run: (data: components["schemas"]["RouteGenerationRequest"]) =>
			fetcher<components["schemas"]["RoutePlanRead"]>("/generate-routes/run", {
				method: "POST",
				body: JSON.stringify(data),
			}),
	},
	routes: {
		history: (limit = 20, offset = 0, scenario_type?: string | null) =>
			fetcher<components["schemas"]["RoutePlanHistoryResponse"]>(
				`/routes/history?limit=${limit}&offset=${offset}${scenario_type ? `&scenario_type=${scenario_type}` : ""}`,
			),
		list: (limit = 20, offset = 0, scenario_type?: string | null) =>
			fetcher<components["schemas"]["RoutePlanListResponse"]>(
				`/routes?limit=${limit}&offset=${offset}${scenario_type ? `&scenario_type=${scenario_type}` : ""}`,
			),
		latest: () =>
			fetcher<components["schemas"]["RoutePlanRead"]>("/routes/latest"),
		get: (id: string) =>
			fetcher<components["schemas"]["RoutePlanRead"]>(`/routes/${id}`),
		delete: (id: string) => fetcher(`/routes/${id}`, { method: "DELETE" }),
	},
};
