"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
	AlertCircle,
	AlertTriangle,
	Bus,
	CheckCircle2,
	Clock,
	Coins,
	Loader2,
	MapPin,
	Play,
	Route,
	TrendingUp,
	Users,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "~/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "~/components/ui/card";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "~/components/ui/select";
import { api } from "~/lib/api";
import { OptimizationErrorCard } from "./_components/optimization-error-card";
import { OptimizationLoadingWarning } from "./_components/optimization-loading-warning";

interface OptimizationError {
	error_type: string;
	message: string;
	details?: {
		total_students?: number;
		total_capacity?: number;
		buses_available?: number;
		capacity_needed?: number;
		additional_buses_needed?: number;
	};
	suggestions?: string[];
}

export default function GenerateRoutesPage() {
	const queryClient = useQueryClient();
	const [scenarioType, setScenarioType] = useState("strict");
	const [fuelCostPerKm, setFuelCostPerKm] = useState("12.33");
	const [maxRideTime, setMaxRideTime] = useState("350");
	const [arrivalDeadline, setArrivalDeadline] = useState("09:05");
	const [enableSplitDelivery, setEnableSplitDelivery] = useState(true);
	const [lastError, setLastError] = useState<OptimizationError | null>(null);

	const { data: readyData, isLoading } = useQuery({
		queryKey: ["generate-routes", "ready"],
		queryFn: api.generateRoutes.ready,
	});

	const optimizeMutation = useMutation({
		mutationFn: api.generateRoutes.run,
		onSuccess: (data) => {
			setLastError(null);
			queryClient.invalidateQueries({ queryKey: ["routes"] });
			toast.success(
				`Route generation complete! Generated ${data.routes.length} routes covering ${data.stats.total_students_assigned} students.`,
			);
		},
		onError: (error: Error) => {
			// Try to parse structured error
			let parsedError: OptimizationError | null = null;
			try {
				// The error message might be JSON stringified
				const errorData = JSON.parse(error.message);
				if (errorData.error_type) {
					parsedError = errorData;
				}
			} catch {
				// Not JSON, treat as plain text
			}

			if (parsedError) {
				setLastError(parsedError);
				toast.error(parsedError.message);
			} else if (error.message.includes("already in progress")) {
				setLastError(null);
				toast.error(
					"An optimization is already running. Please wait for it to complete.",
				);
			} else {
				setLastError(null);
				toast.error(`Optimization failed: ${error.message}`);
			}
		},
	});

	const handleOptimize = () => {
		optimizeMutation.mutate({
			scenario_type: scenarioType,
			matrix_id: null,
			fuel_cost_per_km: Number.parseFloat(fuelCostPerKm) || 12.33,
			bus_ids: null,
			max_ride_time_min: Number.parseInt(maxRideTime, 10) || null,
			arrival_deadline: arrivalDeadline || null,
			enable_split_delivery: enableSplitDelivery,
		});
	};

	const hasMatrix = !!readyData?.has_matrix;
	const hasStops = (readyData?.stops_count ?? 0) > 0;
	const hasBuses = (readyData?.buses_count ?? 0) > 0;
	const hasDemand = (readyData?.demand_records_count ?? 0) > 0;

	const isReady = hasMatrix && hasStops && hasBuses && hasDemand;

	return (
		<div className="flex-1 space-y-6 p-8 pt-6">
			{/* Header */}
			<div className="flex items-center justify-between">
				<div>
					<h2 className="font-bold text-3xl uppercase tracking-tight">
						Generate Routes
					</h2>
					<p className="text-muted-foreground text-xs uppercase tracking-widest">
						Run the solver to create optimal bus routes
					</p>
				</div>
			</div>

			{/* Error Display */}
			{lastError && (
				<OptimizationErrorCard
					error={lastError}
					onDismiss={() => setLastError(null)}
				/>
			)}

			{/* Optimization Running Warning */}
			{optimizeMutation.isPending && <OptimizationLoadingWarning />}

			{/* Prerequisites Check */}
			<Card>
				<CardHeader>
					<CardTitle className="flex items-center gap-2">
						<CheckCircle2 className="h-5 w-5" />
						Prerequisites Check
					</CardTitle>
					<CardDescription>
						Ensure all required data is available before running optimization
					</CardDescription>
				</CardHeader>
				<CardContent>
					<div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
						<div className="flex items-center gap-3 rounded-lg border p-3">
							<div
								className={`rounded-full p-2 ${hasStops ? "bg-green-100 text-green-600" : "bg-red-100 text-red-600"}`}
							>
								<MapPin className="h-4 w-4" />
							</div>
							<div>
								<p className="font-medium text-sm">Stops</p>
								<div className="text-muted-foreground text-xs">
									{isLoading ? (
										<div className="h-3 w-12 animate-pulse rounded bg-muted" />
									) : hasStops ? (
										`${readyData?.stops_count} stops`
									) : (
										"No stops found"
									)}
								</div>
							</div>
						</div>

						<div className="flex items-center gap-3 rounded-lg border p-3">
							<div
								className={`rounded-full p-2 ${hasBuses ? "bg-green-100 text-green-600" : "bg-red-100 text-red-600"}`}
							>
								<Bus className="h-4 w-4" />
							</div>
							<div>
								<p className="font-medium text-sm">Buses</p>
								<div className="text-muted-foreground text-xs">
									{isLoading ? (
										<div className="h-3 w-12 animate-pulse rounded bg-muted" />
									) : hasBuses ? (
										`${readyData?.buses_count} buses`
									) : (
										"No buses found"
									)}
								</div>
							</div>
						</div>

						<div className="flex items-center gap-3 rounded-lg border p-3">
							<div
								className={`rounded-full p-2 ${hasDemand ? "bg-green-100 text-green-600" : "bg-red-100 text-red-600"}`}
							>
								<Users className="h-4 w-4" />
							</div>
							<div>
								<p className="font-medium text-sm">Demand</p>
								<div className="text-muted-foreground text-xs">
									{isLoading ? (
										<div className="h-3 w-12 animate-pulse rounded bg-muted" />
									) : hasDemand ? (
										`${readyData?.total_students_count} students`
									) : (
										"No demand data"
									)}
								</div>
							</div>
						</div>

						<div className="flex items-center gap-3 rounded-lg border p-3">
							<div
								className={`rounded-full p-2 ${hasMatrix ? "bg-green-100 text-green-600" : "bg-red-100 text-red-600"}`}
							>
								<Route className="h-4 w-4" />
							</div>
							<div>
								<p className="font-medium text-sm">Distance Matrix</p>
								<div className="text-muted-foreground text-xs">
									{isLoading ? (
										<div className="h-3 w-16 animate-pulse rounded bg-muted" />
									) : hasMatrix ? (
										`${readyData?.latest_matrix_stop_count} stops`
									) : (
										"Not calculated"
									)}
								</div>
							</div>
						</div>
					</div>

					{!isReady && !isLoading && (
						<div className="mt-4 flex items-start gap-2 rounded-lg bg-yellow-50 p-3 dark:bg-yellow-950/30">
							<AlertTriangle className="mt-0.5 h-4 w-4 text-yellow-600" />
							<p className="text-sm text-yellow-800">
								Please complete all prerequisites before running optimization.
								{!hasMatrix && (
									<>
										{" "}
										Go to{" "}
										<Link className="underline" href="/dashboard/routes">
											Routes
										</Link>{" "}
										to calculate travel times.
									</>
								)}
							</p>
						</div>
					)}
				</CardContent>
			</Card>

			<div className="grid gap-6 lg:grid-cols-2">
				{/* Optimization Form */}
				<Card>
					<CardHeader>
						<CardTitle>Optimization Parameters</CardTitle>
						<CardDescription>
							Configure the solver settings for your scenario
						</CardDescription>
					</CardHeader>
					<CardContent className="space-y-4">
						<div className="space-y-2">
							<Label htmlFor="scenario">Scenario Type</Label>
							<Select onValueChange={setScenarioType} value={scenarioType}>
								<SelectTrigger id="scenario">
									<SelectValue />
								</SelectTrigger>
								<SelectContent>
									<SelectItem value="strict">
										Strict (Hard constraints)
									</SelectItem>
									<SelectItem value="suggested">
										Suggested (Relaxed constraints)
									</SelectItem>
								</SelectContent>
							</Select>
						</div>

						<div className="space-y-2">
							<Label htmlFor="fuel-cost">Fuel Cost per KM (₹)</Label>
							<Input
								id="fuel-cost"
								min="1"
								onChange={(e) => setFuelCostPerKm(e.target.value)}
								type="number"
								value={fuelCostPerKm}
							/>
						</div>

						<div className="grid grid-cols-2 gap-4">
							<div className="space-y-2">
								<Label htmlFor="max-ride">Max Ride Time (min)</Label>
								<Input
									id="max-ride"
									min="1"
									onChange={(e) => setMaxRideTime(e.target.value)}
									type="number"
									value={maxRideTime}
								/>
							</div>

							<div className="space-y-2">
								<Label htmlFor="deadline">Arrival Deadline</Label>
								<Input
									id="deadline"
									onChange={(e) => setArrivalDeadline(e.target.value)}
									type="time"
									value={arrivalDeadline}
								/>
							</div>

							<div className="flex items-center gap-2 pt-2">
								<input
									checked={enableSplitDelivery}
									className="h-4 w-4"
									id="splitDelivery"
									onChange={(e) => setEnableSplitDelivery(e.target.checked)}
									type="checkbox"
								/>
								<Label className="text-sm" htmlFor="splitDelivery">
									Split Delivery (allow stops to use multiple buses)
								</Label>
							</div>
						</div>

						<Button
							className="w-full gap-2"
							disabled={!isReady || optimizeMutation.isPending || isLoading}
							onClick={handleOptimize}
							size="lg"
						>
							{optimizeMutation.isPending ? (
								<>
									<Loader2 className="h-4 w-4 animate-spin" />
									Optimizing...
								</>
							) : (
								<>
									<Play className="h-4 w-4" />
									Run Optimization
								</>
							)}
						</Button>
					</CardContent>
				</Card>

				{/* Results or Placeholder */}
				{optimizeMutation.isSuccess ? (
					<Card>
						<CardHeader>
							<CardTitle className="flex items-center gap-2">
								<CheckCircle2 className="h-5 w-5 text-green-500" />
								Optimization Complete
							</CardTitle>
							<CardDescription>
								Generated at{" "}
								{new Date(optimizeMutation.data.created_at).toLocaleString()}
							</CardDescription>
						</CardHeader>
						<CardContent className="space-y-4">
							<div className="grid grid-cols-2 gap-4">
								<div className="rounded-lg bg-muted p-3">
									<p className="text-muted-foreground text-xs">Buses Used</p>
									<p className="font-bold text-2xl">
										{optimizeMutation.data.stats.total_buses_used}
									</p>
								</div>
								<div className="rounded-lg bg-muted p-3">
									<p className="text-muted-foreground text-xs">
										Total Distance
									</p>
									<p className="font-bold text-2xl">
										{optimizeMutation.data.stats.total_distance_km.toFixed(1)}{" "}
										km
									</p>
								</div>
								<div className="rounded-lg bg-muted p-3">
									<p className="text-muted-foreground text-xs">
										Students Covered
									</p>
									<p className="font-bold text-2xl">
										{optimizeMutation.data.stats.total_students_assigned}
									</p>
								</div>
								<div className="rounded-lg bg-muted p-3">
									<p className="text-muted-foreground text-xs">Coverage</p>
									<p className="font-bold text-2xl">
										{optimizeMutation.data.stats.coverage_percentage.toFixed(1)}
										%
									</p>
								</div>
							</div>

							<div className="rounded-lg border p-3">
								<div className="flex items-center justify-between">
									<div className="flex items-center gap-2">
										<Coins className="h-5 w-5 text-muted-foreground" />
										<span className="font-medium">Estimated Cost</span>
									</div>
									<span className="font-bold text-xl">
										₹{optimizeMutation.data.cost_estimate.toLocaleString()}
									</span>
								</div>
							</div>

							{optimizeMutation.data.stats.global_warnings.length > 0 && (
								<div className="rounded-lg border border-yellow-200 bg-yellow-50 p-3 dark:border-yellow-800 dark:bg-yellow-950/30">
									<div className="flex items-center gap-2">
										<AlertTriangle className="h-4 w-4 text-yellow-600" />
										<span className="font-medium text-sm text-yellow-800">
											{optimizeMutation.data.stats.global_warnings.length}{" "}
											warning
											{optimizeMutation.data.stats.global_warnings.length !== 1
												? "s"
												: ""}
										</span>
									</div>
								</div>
							)}

							<Link href={`/dashboard/routes/${optimizeMutation.data.id}`}>
								<Button className="w-full" variant="secondary">
									View Full Solution Details
								</Button>
							</Link>
						</CardContent>
					</Card>
				) : (
					<Card className="flex flex-col items-center justify-center p-8 text-center">
						<div className="mb-4 rounded-full bg-muted p-4">
							<Route className="h-8 w-8 text-muted-foreground" />
						</div>
						<h3 className="font-semibold text-lg">Ready to Optimize</h3>
						<p className="mt-2 max-w-sm text-muted-foreground text-sm">
							Configure your parameters and click Run Optimization to generate
							optimal bus routes using the CVRPTW algorithm.
						</p>
					</Card>
				)}
			</div>

			{/* Quick Stats */}
			{readyData && (
				<div className="grid gap-4 md:grid-cols-4">
					<Card>
						<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
							<CardTitle className="font-medium text-sm">
								Fleet Capacity
							</CardTitle>
							<Bus className="h-4 w-4 text-muted-foreground" />
						</CardHeader>
						<CardContent>
							<div className="font-bold text-2xl">
								{readyData.total_fleet_capacity}
							</div>
							<p className="text-muted-foreground text-xs">
								{readyData.total_students_count} students mapped
							</p>
						</CardContent>
					</Card>

					<Card>
						<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
							<CardTitle className="font-medium text-sm">
								Active Stops
							</CardTitle>
							<MapPin className="h-4 w-4 text-muted-foreground" />
						</CardHeader>
						<CardContent>
							<div className="font-bold text-2xl">{readyData.stops_count}</div>
							<p className="text-muted-foreground text-xs">locations</p>
						</CardContent>
					</Card>

					<Card>
						<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
							<CardTitle className="font-medium text-sm">
								Available Buses
							</CardTitle>
							<TrendingUp className="h-4 w-4 text-muted-foreground" />
						</CardHeader>
						<CardContent>
							<div className="font-bold text-2xl">{readyData.buses_count}</div>
							<p className="text-muted-foreground text-xs">vehicles</p>
						</CardContent>
					</Card>

					<Card>
						<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
							<CardTitle className="font-medium text-sm">
								Matrix Status
							</CardTitle>
							<Clock className="h-4 w-4 text-muted-foreground" />
						</CardHeader>
						<CardContent>
							<div className="flex items-center gap-2">
								{hasMatrix ? (
									<>
										<CheckCircle2 className="h-5 w-5 text-green-500" />
										<span className="font-bold">Ready</span>
									</>
								) : (
									<>
										<AlertCircle className="h-5 w-5 text-yellow-500" />
										<span className="font-bold">Pending</span>
									</>
								)}
							</div>
						</CardContent>
					</Card>
				</div>
			)}
		</div>
	);
}
