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
		throw new Error(error.detail || res.statusText);
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
		list: () => fetcher<components["schemas"]["BusRead"][]>("/buses"),
		upload: (file: File) => {
			const formData = new FormData();
			formData.append("file", file);
			return fetch(`${API_Base}/buses/upload`, {
				method: "POST",
				body: formData,
			}).then(
				(res) =>
					res.json() as Promise<{ created: number; depots_created: number }>,
			);
		},
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
			fetcher<components["schemas"]["DemandRead"][]>(
				`/demand${semester ? `?semester=${semester}` : ""}`,
			),
		semesters: () => fetcher<string[]>("/demand/semesters"),
		upload: (file: File) => {
			const formData = new FormData();
			formData.append("file", file);
			return fetch(`${API_Base}/demand/upload`, {
				method: "POST",
				body: formData,
			}).then(
				(res) =>
					res.json() as Promise<{ created: number; total_errors: number }>,
			);
		},
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
	},
};
