"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
	AlertTriangle,
	ArrowRight,
	Calendar,
	CheckCircle2,
	Clock,
	Info,
	Loader2,
	MapPin,
	Play,
	RefreshCw,
	Route,
	Search,
} from "lucide-react";
import dynamic from "next/dynamic";
import { useCallback, useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import { StopCombobox } from "~/components/stop-combobox";
import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "~/components/ui/card";
import { api } from "~/lib/api";

const ClusterMap = dynamic(() => import("~/components/cluster-map"), {
	ssr: false,
	loading: () => (
		<div className="h-full w-full animate-pulse rounded-md bg-muted" />
	),
});

export default function RoutesPage() {
	const queryClient = useQueryClient();
	const [spotFrom, setSpotFrom] = useState<string | null>(null);
	const [spotTo, setSpotTo] = useState<string | null>(null);
	const [selectedGroup, setSelectedGroup] = useState<number | null>(null);

	const { data: analysis, isLoading } = useQuery({
		queryKey: ["routes", "analysis"],
		queryFn: () => api.routes.analysis(),
	});

	const latestMatrix = analysis?.latest_matrix;
	const currentStops = analysis?.stops;
	const clusteringData = analysis?.clustering;

	// Scroll selected group into view
	useEffect(() => {
		if (selectedGroup !== null) {
			const element = document.getElementById(`cluster-item-${selectedGroup}`);
			if (element) {
				element.scrollIntoView({ behavior: "smooth", block: "nearest" });
			}
		}
	}, [selectedGroup]);

	const staleness = useMemo(() => {
		if (!latestMatrix || !currentStops) return null;

		const activeStops = currentStops.filter(
			(s) => s.active && s.lat != null && s.lon != null,
		);
		const currentIds = new Set(activeStops.map((s) => s.id));
		const matrixIds = new Set(
			(latestMatrix.stop_ids_json as { stop_ids?: string[] })?.stop_ids ?? [],
		);

		const added = activeStops.filter((s) => !matrixIds.has(s.id));
		const removed = [...matrixIds].filter((id) => !currentIds.has(id));
		const isStale = added.length > 0 || removed.length > 0;

		return { isStale, added: added.length, removed: removed.length };
	}, [latestMatrix, currentStops]);

	const activeStopCount =
		currentStops?.filter((s) => s.active && s.lat != null && s.lon != null)
			.length ?? 0;
	const hasNoStops = !isLoading && activeStopCount === 0;

	// Spot-check: stop options from the matrix
	const matrixStopOptions = useMemo(() => {
		if (!latestMatrix?.matrix_json) return [];
		const mj = latestMatrix.matrix_json as {
			stop_ids?: string[];
			stop_names?: Record<string, string>;
		};
		if (!mj.stop_ids || !mj.stop_names) return [];
		return mj.stop_ids.map((id) => ({
			id,
			name: mj.stop_names?.[id] ?? id,
		}));
	}, [latestMatrix]);

	const spotResult = useMemo(() => {
		if (!spotFrom || !spotTo || spotFrom === spotTo) return null;
		if (!latestMatrix?.matrix_json) return null;
		const mj = latestMatrix.matrix_json as {
			stop_ids?: string[];
			durations?: number[][];
			distances?: number[][];
		};
		if (!mj.stop_ids || !mj.durations || !mj.distances) return null;

		const fromIdx = mj.stop_ids.indexOf(spotFrom);
		const toIdx = mj.stop_ids.indexOf(spotTo);
		if (fromIdx === -1 || toIdx === -1) return null;

		const durationSec = mj.durations[fromIdx]?.[toIdx];
		const distanceM = mj.distances[fromIdx]?.[toIdx];
		if (durationSec == null || distanceM == null) return null;
		if (durationSec < 0 || distanceM < 0) return { unreachable: true };

		const mins = Math.round(durationSec / 60);
		const km = (distanceM / 1000).toFixed(1);
		return { mins, km, unreachable: false };
	}, [spotFrom, spotTo, latestMatrix]);

	const handleSwap = useCallback(() => {
		setSpotFrom(spotTo);
		setSpotTo(spotFrom);
	}, [spotFrom, spotTo]);

	const buildMutation = useMutation({
		mutationFn: () => api.routes.build(),
		onSuccess: (data) => {
			queryClient.invalidateQueries({ queryKey: ["routes", "analysis"] });
			toast.success(
				`Travel times calculated for ${data.stop_count} stops in ${data.build_time_seconds}s`,
			);
		},
		onError: (error: Error) => {
			toast.error(`Calculation failed: ${error.message}`);
		},
	});

	const formatDate = (dateStr: string) => {
		return new Date(dateStr).toLocaleString("en-IN", {
			day: "numeric",
			month: "short",
			year: "numeric",
			hour: "2-digit",
			minute: "2-digit",
			hour12: true,
		});
	};

	return (
		<div className="flex-1 space-y-6 p-8 pt-6">
			{/* Header */}
			<div className="flex items-center justify-between">
				<div>
					<h2 className="font-bold text-3xl tracking-tight">Route Analysis</h2>
					<p className="text-muted-foreground">
						Calculate travel times between stops and review nearby stop clusters
					</p>
				</div>
				<Button
					className="gap-2"
					disabled={buildMutation.isPending || hasNoStops}
					onClick={() => buildMutation.mutate()}
					size="lg"
				>
					{buildMutation.isPending ? (
						<>
							<Loader2 className="h-4 w-4 animate-spin" />
							Calculating...
						</>
					) : staleness?.isStale ? (
						<>
							<RefreshCw className="h-4 w-4" />
							Recalculate
						</>
					) : (
						<>
							<Play className="h-4 w-4" />
							Calculate Travel Times
						</>
					)}
				</Button>
			</div>

			{/* Staleness warning */}
			{staleness?.isStale && (
				<div className="flex items-start gap-3 rounded-lg border border-yellow-300 bg-yellow-50 p-4 dark:border-yellow-800 dark:bg-yellow-950/30">
					<AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-yellow-600 dark:text-yellow-400" />
					<div>
						<p className="font-medium text-sm text-yellow-800 dark:text-yellow-200">
							Stop data has changed since last calculation
						</p>
						<p className="mt-0.5 text-sm text-yellow-700 dark:text-yellow-300">
							{staleness.added > 0 &&
								`${staleness.added} stop${staleness.added !== 1 ? "s" : ""} added`}
							{staleness.added > 0 && staleness.removed > 0 && ", "}
							{staleness.removed > 0 &&
								`${staleness.removed} stop${staleness.removed !== 1 ? "s" : ""} removed`}
							. Click <strong>Recalculate</strong> to update travel times.
						</p>
					</div>
				</div>
			)}

			{/* No stops warning */}
			{hasNoStops && (
				<div className="flex items-start gap-3 rounded-lg border border-blue-200 bg-blue-50/50 p-4 dark:border-blue-900 dark:bg-blue-950/20">
					<Info className="mt-0.5 h-5 w-5 shrink-0 text-blue-600 dark:text-blue-400" />
					<div>
						<p className="font-medium text-sm">No stops available</p>
						<p className="mt-0.5 text-muted-foreground text-sm">
							Import stop data from the Data page before calculating travel
							times.
						</p>
					</div>
				</div>
			)}

			{/* Status cards */}
			<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
				<Card>
					<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
						<CardTitle className="font-medium text-sm">Status</CardTitle>
						<Route className="h-4 w-4 text-muted-foreground" />
					</CardHeader>
					<CardContent>
						{isLoading ? (
							<div className="h-8 w-24 animate-pulse rounded bg-muted" />
						) : latestMatrix ? (
							<div className="flex items-center gap-2">
								<CheckCircle2 className="h-5 w-5 text-green-500" />
								<span className="font-bold text-2xl">Ready</span>
							</div>
						) : (
							<div className="flex items-center gap-2">
								<AlertTriangle className="h-5 w-5 text-yellow-500" />
								<span className="font-bold text-2xl">Pending</span>
							</div>
						)}
					</CardContent>
				</Card>

				<Card>
					<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
						<CardTitle className="font-medium text-sm">Stops Covered</CardTitle>
						<MapPin className="h-4 w-4 text-muted-foreground" />
					</CardHeader>
					<CardContent>
						{isLoading ? (
							<div className="h-8 w-16 animate-pulse rounded bg-muted" />
						) : (
							<p className="font-bold text-2xl">
								{latestMatrix?.stop_count ?? "—"}
							</p>
						)}
					</CardContent>
				</Card>

				<Card>
					<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
						<CardTitle className="font-medium text-sm">
							Calculation Time
						</CardTitle>
						<Clock className="h-4 w-4 text-muted-foreground" />
					</CardHeader>
					<CardContent>
						{isLoading ? (
							<div className="h-8 w-16 animate-pulse rounded bg-muted" />
						) : (
							<p className="font-bold text-2xl">
								{latestMatrix?.build_time_seconds
									? `${latestMatrix.build_time_seconds}s`
									: "—"}
							</p>
						)}
					</CardContent>
				</Card>

				<Card>
					<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
						<CardTitle className="font-medium text-sm">Last Updated</CardTitle>
						<Calendar className="h-4 w-4 text-muted-foreground" />
					</CardHeader>
					<CardContent>
						{isLoading ? (
							<div className="h-8 w-20 animate-pulse rounded bg-muted" />
						) : (
							<p className="font-bold text-2xl">
								{latestMatrix?.created_at
									? formatDate(latestMatrix.created_at)
									: "—"}
							</p>
						)}
					</CardContent>
				</Card>
			</div>

			{/* Spot-check tool */}
			{latestMatrix && (
				<Card>
					<CardHeader className="pb-3">
						<CardTitle className="flex items-center gap-2 text-base">
							<Search className="h-4 w-4" />
							Travel Time Lookup
						</CardTitle>
						<CardDescription>
							Pick any two stops to check the travel time and distance between
							them
						</CardDescription>
					</CardHeader>
					<CardContent className="space-y-4">
						<div className="flex flex-col gap-3 sm:flex-row sm:items-end">
							<div className="flex-1 space-y-1.5">
								<span className="font-medium text-sm">From</span>
								<StopCombobox
									onSelect={setSpotFrom}
									placeholder="Select origin stop..."
									stops={matrixStopOptions}
									value={spotFrom}
								/>
							</div>
							<button
								className="hidden shrink-0 self-end pb-1 text-muted-foreground transition-colors hover:text-foreground sm:block"
								onClick={handleSwap}
								title="Swap stops"
								type="button"
							>
								<ArrowRight className="h-5 w-5" />
							</button>
							<div className="flex-1 space-y-1.5">
								<span className="font-medium text-sm">To</span>
								<StopCombobox
									onSelect={setSpotTo}
									placeholder="Select destination stop..."
									stops={matrixStopOptions}
									value={spotTo}
								/>
							</div>
						</div>

						{/* Result display */}
						{spotResult && (
							<div className="rounded-lg border bg-muted/30 p-4">
								{spotResult.unreachable ? (
									<div className="flex items-center justify-center gap-2 py-2 text-yellow-600 dark:text-yellow-400">
										<AlertTriangle className="h-5 w-5" />
										<span className="font-semibold">
											No route found between these stops
										</span>
									</div>
								) : (
									<div className="flex items-center gap-4">
										{/* From stop */}
										<div className="min-w-0 flex-1">
											<p className="truncate font-medium text-sm">
												{matrixStopOptions.find((s) => s.id === spotFrom)?.name}
											</p>
										</div>

										{/* Visual connector with stats */}
										<div className="flex shrink-0 items-center gap-3">
											<div className="hidden h-px w-6 bg-border sm:block" />
											<div className="flex items-center gap-3 rounded-full border bg-background px-4 py-2 shadow-sm">
												<div className="flex items-center gap-1.5">
													<Clock className="h-3.5 w-3.5 text-muted-foreground" />
													<span className="font-bold text-lg tabular-nums">
														{spotResult.mins}
													</span>
													<span className="text-muted-foreground text-xs">
														min
													</span>
												</div>
												<div className="h-5 w-px bg-border" />
												<div className="flex items-center gap-1.5">
													<Route className="h-3.5 w-3.5 text-muted-foreground" />
													<span className="font-bold text-lg tabular-nums">
														{spotResult.km}
													</span>
													<span className="text-muted-foreground text-xs">
														km
													</span>
												</div>
											</div>
											<div className="hidden h-px w-6 bg-border sm:block" />
										</div>

										{/* To stop */}
										<div className="min-w-0 flex-1 text-right">
											<p className="truncate font-medium text-sm">
												{matrixStopOptions.find((s) => s.id === spotTo)?.name}
											</p>
										</div>
									</div>
								)}
							</div>
						)}

						{spotFrom && spotTo && spotFrom === spotTo && (
							<p className="text-center text-muted-foreground text-sm italic">
								Select two different stops
							</p>
						)}
					</CardContent>
				</Card>
			)}

			{/* Nearby stops with map */}
			<div className="grid gap-6 lg:grid-cols-2">
				{/* Map */}
				<Card className="flex flex-col lg:row-span-1">
					<CardHeader className="pb-2">
						<CardTitle className="text-base">Cluster Map</CardTitle>
						<CardDescription>
							Click a group on the map or in the list to highlight it
						</CardDescription>
					</CardHeader>
					<CardContent className="relative min-h-0 flex-1 p-0">
						{isLoading ? (
							<div className="flex h-[450px] items-center justify-center">
								<Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
							</div>
						) : clusteringData && clusteringData.suggestions.length > 0 ? (
							<ClusterMap
								className="h-[450px] p-3 pt-0 outline-none"
								groups={clusteringData.suggestions}
								onGroupSelect={setSelectedGroup}
								selectedGroupIndex={selectedGroup}
							/>
						) : (
							<div className="flex h-[450px] flex-col items-center justify-center text-center">
								<CheckCircle2 className="mb-2 h-8 w-8 text-green-500" />
								<p className="font-medium">All stops are well-separated</p>
								<p className="text-muted-foreground text-sm">
									No clusters to display
								</p>
							</div>
						)}
					</CardContent>
				</Card>

				{/* Group list */}
				<Card className="flex flex-col">
					<CardHeader>
						<div className="flex items-center justify-between">
							<div>
								<CardTitle className="flex items-center gap-2 text-base">
									Nearby Stops
									{clusteringData && clusteringData.total_groups > 0 && (
										<Badge variant="secondary">
											{clusteringData.total_groups} group
											{clusteringData.total_groups !== 1 ? "s" : ""}
										</Badge>
									)}
								</CardTitle>
								<CardDescription className="mt-1">
									Stops within 500m — consider merging to simplify routes
								</CardDescription>
							</div>
							{selectedGroup !== null && (
								<Button
									onClick={() => setSelectedGroup(null)}
									size="sm"
									variant="ghost"
								>
									Clear
								</Button>
							)}
						</div>
					</CardHeader>
					<CardContent className="max-h-[450px] overflow-y-auto">
						{isLoading ? (
							<div className="flex items-center gap-2 py-8 text-muted-foreground">
								<Loader2 className="h-4 w-4 animate-spin" />
								Finding nearby stops...
							</div>
						) : clusteringData && clusteringData.suggestions.length > 0 ? (
							<div className="space-y-2">
								{clusteringData.suggestions.map((suggestion, idx) => {
									const isSelected = selectedGroup === idx;
									const colors = [
										"bg-red-500",
										"bg-blue-500",
										"bg-amber-500",
										"bg-emerald-500",
										"bg-violet-500",
										"bg-pink-500",
										"bg-cyan-500",
										"bg-orange-500",
										"bg-indigo-500",
										"bg-teal-500",
										"bg-rose-500",
										"bg-blue-600",
										"bg-yellow-600",
										"bg-green-600",
										"bg-purple-600",
									];
									const dotColor = colors[idx % colors.length];

									return (
										<button
											className={`w-full rounded-lg border p-3 text-left transition-all ${
												isSelected
													? "border-primary bg-muted/80 ring-1 ring-primary"
													: "border-dashed hover:bg-muted/50"
											}`}
											id={`cluster-item-${idx}`}
											// biome-ignore lint/suspicious/noArrayIndexKey: cluster groups have no stable ID
											key={`cluster-${idx}`}
											onClick={() => setSelectedGroup(isSelected ? null : idx)}
											type="button"
										>
											<div className="mb-2 flex items-center justify-between">
												<div className="flex items-center gap-2">
													<span
														className={`h-2.5 w-2.5 rounded-full ${dotColor}`}
													/>
													<span className="font-semibold text-sm">
														Group {idx + 1}
													</span>
												</div>
												<Badge className="font-normal" variant="outline">
													{Math.round(suggestion.max_distance_m)}m apart
												</Badge>
											</div>
											<ul className="space-y-1 pl-5">
												{suggestion.stops.map((stop) => (
													<li
														className="text-muted-foreground text-sm"
														key={stop.id}
													>
														{stop.name}
													</li>
												))}
											</ul>
										</button>
									);
								})}
							</div>
						) : (
							<div className="flex flex-col items-center justify-center py-8 text-center">
								<CheckCircle2 className="mb-2 h-8 w-8 text-green-500" />
								<p className="font-medium">All stops are well-separated</p>
								<p className="text-muted-foreground text-sm">
									No stops found within 500m of each other
								</p>
							</div>
						)}
					</CardContent>
				</Card>
			</div>
		</div>
	);
}
