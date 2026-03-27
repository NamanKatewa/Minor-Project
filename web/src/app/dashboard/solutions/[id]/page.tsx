"use client";

import { useQuery } from "@tanstack/react-query";
import {
	AlertTriangle,
	ArrowLeft,
	Bus,
	Clock,
	Coins,
	MapPin,
	Route,
	Users,
	XCircle,
} from "lucide-react";
import { nanoid } from "nanoid";
import dynamic from "next/dynamic";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "~/components/ui/card";
import type { components } from "~/generated/api-types";
import { api } from "~/lib/api";

type BusRoute = components["schemas"]["BusRoute"];

const SolutionMap = dynamic(() => import("~/components/solution-map"), {
	ssr: false,
	loading: () => (
		<div className="h-full w-full animate-pulse rounded-md bg-muted" />
	),
});

export default function SolutionDetailPage() {
	const params = useParams();
	const solutionId = params.id as string;
	const [selectedRouteIndex, setSelectedRouteIndex] = useState<number | null>(
		null,
	);

	const { data: solution, isLoading } = useQuery({
		queryKey: ["solution", solutionId],
		queryFn: () => api.optimization.get(solutionId),
		enabled: !!solutionId,
	});

	// Scroll selected route into view
	useEffect(() => {
		if (selectedRouteIndex !== null) {
			const element = document.getElementById(`route-${selectedRouteIndex}`);
			if (element) {
				element.scrollIntoView({ behavior: "smooth", block: "nearest" });
			}
		}
	}, [selectedRouteIndex]);

	const formatDate = (dateStr: string) => {
		return new Date(dateStr).toLocaleString("en-IN", {
			day: "numeric",
			month: "short",
			year: "numeric",
			hour: "2-digit",
			minute: "2-digit",
		});
	};

	const _formatTime = (minutes: number) => {
		const hours = Math.floor(minutes / 60);
		const mins = minutes % 60;
		return hours > 0 ? `${hours}h ${mins}m` : `${mins}m`;
	};

	if (isLoading) {
		return (
			<div className="flex h-full items-center justify-center">
				<div className="text-center">
					<div className="mb-4 h-8 w-8 animate-spin rounded-full border-primary border-b-2" />
					<p className="text-muted-foreground">Loading solution...</p>
				</div>
			</div>
		);
	}

	if (!solution) {
		return (
			<div className="flex h-full items-center justify-center">
				<div className="text-center">
					<XCircle className="mx-auto mb-4 h-12 w-12 text-destructive" />
					<h2 className="font-bold text-xl">Solution Not Found</h2>
					<p className="mt-2 text-muted-foreground">
						The optimization solution you&apos;re looking for doesn&apos;t
						exist.
					</p>
					<Link className="mt-4 inline-block" href="/dashboard/solutions">
						<Button variant="outline">Back to Solutions</Button>
					</Link>
				</div>
			</div>
		);
	}

	return (
		<div className="flex-1 space-y-6 p-8 pt-6">
			{/* Header */}
			<div className="flex items-center justify-between">
				<div className="flex items-center gap-4">
					<Link href="/dashboard/solutions">
						<Button size="icon" variant="outline">
							<ArrowLeft className="h-4 w-4" />
						</Button>
					</Link>
					<div>
						<div className="flex items-center gap-2">
							<h2 className="font-bold text-3xl tracking-tight">
								Solution Details
							</h2>
							<Badge
								variant={
									solution.scenario_type === "strict" ? "default" : "secondary"
								}
							>
								{solution.scenario_type}
							</Badge>
						</div>
						<p className="text-muted-foreground">
							Generated on {formatDate(solution.created_at)}
						</p>
					</div>
				</div>
			</div>

			{/* Stats Overview */}
			<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
				<Card>
					<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
						<CardTitle className="font-medium text-sm">Buses Used</CardTitle>
						<Bus className="h-4 w-4 text-muted-foreground" />
					</CardHeader>
					<CardContent>
						<div className="font-bold text-2xl">
							{solution.stats.total_buses_used}
						</div>
					</CardContent>
				</Card>

				<Card>
					<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
						<CardTitle className="font-medium text-sm">
							Total Distance
						</CardTitle>
						<Route className="h-4 w-4 text-muted-foreground" />
					</CardHeader>
					<CardContent>
						<div className="font-bold text-2xl">
							{solution.stats.total_distance_km.toFixed(1)} km
						</div>
					</CardContent>
				</Card>

				<Card>
					<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
						<CardTitle className="font-medium text-sm">
							Students Covered
						</CardTitle>
						<Users className="h-4 w-4 text-muted-foreground" />
					</CardHeader>
					<CardContent>
						<div className="font-bold text-2xl">
							{solution.stats.total_students_assigned}
						</div>
						<p className="text-muted-foreground text-xs">
							{solution.stats.coverage_percentage.toFixed(1)}% coverage
						</p>
					</CardContent>
				</Card>

				<Card>
					<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
						<CardTitle className="font-medium text-sm">
							Estimated Cost
						</CardTitle>
						<Coins className="h-4 w-4 text-muted-foreground" />
					</CardHeader>
					<CardContent>
						<div className="font-bold text-2xl">
							₹{solution.cost_estimate.toLocaleString()}
						</div>
						<p className="text-muted-foreground text-xs">
							₹{solution.fuel_cost_per_km}/km
						</p>
					</CardContent>
				</Card>
			</div>

			{/* Warnings */}
			{solution.stats.global_warnings.length > 0 && (
				<Card className="border-yellow-200 bg-yellow-50 dark:border-yellow-800 dark:bg-yellow-950/30">
					<CardHeader>
						<CardTitle className="flex items-center gap-2 text-yellow-800 dark:text-yellow-200">
							<AlertTriangle className="h-5 w-5" />
							Warnings ({solution.stats.global_warnings.length})
						</CardTitle>
					</CardHeader>
					<CardContent>
						<ul className="space-y-1">
							{solution.stats.global_warnings.map((warning) => (
								<li
									className="text-sm text-yellow-700 dark:text-yellow-300"
									key={nanoid()}
								>
									{warning}
								</li>
							))}
						</ul>
					</CardContent>
				</Card>
			)}

			{/* Unassigned Stops */}
			{solution.stats.unassigned_stops.length > 0 && (
				<Card className="border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-950/30">
					<CardHeader>
						<CardTitle className="flex items-center gap-2 text-red-800 dark:text-red-200">
							<XCircle className="h-5 w-5" />
							Unassigned Stops ({solution.stats.unassigned_stops.length})
						</CardTitle>
					</CardHeader>
					<CardContent>
						<ul className="space-y-1">
							{solution.stats.unassigned_stops.map((stop) => (
								<li
									className="text-red-700 text-sm dark:text-red-300"
									key={nanoid()}
								>
									<strong>{stop.name || "Unknown"}</strong>:{" "}
									{stop.reason || "Could not be assigned"}
								</li>
							))}
						</ul>
					</CardContent>
				</Card>
			)}

			{/* Routes Overview */}
			<div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
				{/* Route List */}
				<div className="flex flex-col gap-4 lg:col-span-4">
					<Card className="flex flex-1 flex-col overflow-hidden">
						<CardHeader>
							<CardTitle>Route List</CardTitle>
							<CardDescription>
								{solution.routes.length} routes generated
							</CardDescription>
						</CardHeader>
						<CardContent className="max-h-[700px] flex-1 space-y-4 overflow-y-auto">
							{solution.routes.map((route, idx) => (
								<RouteCard
									index={idx}
									isSelected={selectedRouteIndex === idx}
									key={`${route.bus_id}-${idx}`}
									onSelect={setSelectedRouteIndex}
									route={route}
								/>
							))}
						</CardContent>
					</Card>
				</div>

				{/* Route Map */}
				<div className="lg:col-span-8">
					<Card className="flex h-full flex-col overflow-hidden">
						<CardHeader>
							<CardTitle>Route Map</CardTitle>
							<CardDescription>
								Interactive visualization of all routes
							</CardDescription>
						</CardHeader>
						<CardContent className="flex-1 p-0">
							<div className="h-[700px] w-full">
								<SolutionMap
									className="h-full w-full"
									onRouteSelect={setSelectedRouteIndex}
									routes={solution.routes}
									selectedRouteIndex={selectedRouteIndex}
									unassignedStops={solution.stats.unassigned_stops}
								/>
							</div>
						</CardContent>
					</Card>
				</div>
			</div>
		</div>
	);
}

function RouteCard({
	route,
	index,
	isSelected,
	onSelect,
}: {
	route: BusRoute;
	index: number;
	isSelected: boolean;
	onSelect: (index: number | null) => void;
}) {
	const colors = [
		"bg-red-500",
		"bg-blue-500",
		"bg-green-500",
		"bg-yellow-500",
		"bg-purple-500",
		"bg-pink-500",
		"bg-indigo-500",
		"bg-orange-500",
	];
	const color = colors[index % colors.length];

	return (
		<button
			className={`w-full cursor-pointer rounded-lg border p-4 text-left transition-all ${
				isSelected
					? "ring-2 ring-primary ring-offset-2"
					: "hover:border-primary/50"
			}`}
			id={`route-${index}`}
			onClick={() => onSelect(isSelected ? null : index)}
			type="button"
		>
			<span className="mb-4 flex items-center justify-between">
				<span className="flex items-center gap-3">
					<span className={`h-3 w-3 rounded-full ${color}`} />
					<span>
						<span className="block font-semibold">Bus {route.bus_no}</span>
						<span className="block text-muted-foreground text-sm">
							Capacity: {route.total_students}/{route.capacity} students
						</span>
					</span>
				</span>
				<span className="text-right">
					<span className="flex items-center gap-4 text-sm">
						<span className="flex items-center gap-1">
							<Route className="h-4 w-4 text-muted-foreground" />
							<span>{route.total_distance_km.toFixed(1)} km</span>
						</span>
						<span className="flex items-center gap-1">
							<Clock className="h-4 w-4 text-muted-foreground" />
							<span>{route.total_time_min} min</span>
						</span>
					</span>
					<span className="mt-1 block">
						<Badge
							variant={
								route.capacity_utilization > 90 ? "destructive" : "secondary"
							}
						>
							{route.capacity_utilization.toFixed(0)}% utilized
						</Badge>
					</span>
				</span>
			</span>

			{/* Depot Info */}
			<span className="mb-3 flex items-center gap-2 rounded bg-muted/50 p-2 text-sm">
				<MapPin className="h-4 w-4 text-muted-foreground" />
				<span className="text-muted-foreground">Depot:</span>
				<span className="font-medium">{route.depot_name || "Unknown"}</span>
			</span>

			{route.warnings.length > 0 && (
				<span className="mb-3 flex items-center gap-2 rounded bg-yellow-50 p-2 text-sm text-yellow-700 dark:bg-yellow-950/30 dark:text-yellow-300">
					<AlertTriangle className="h-4 w-4" />
					{route.warnings.join(", ")}
				</span>
			)}

			<span className="block space-y-2">
				{route.stops.map((stop, stopIdx) => (
					<span
						className="flex items-center gap-3 rounded-md bg-muted/50 p-2"
						key={`${stop.stop_id}-${stopIdx}`}
					>
						<span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-muted font-medium text-xs">
							{stopIdx + 1}
						</span>
						<span className="min-w-0 flex-1">
							<span className="block truncate font-medium text-sm">
								{stop.stop_name}
							</span>
							<span className="block text-muted-foreground text-xs">
								{stop.stop_code} • {stop.students_boarding} students
							</span>
						</span>
						<span className="text-right text-sm">
							<span className="block font-medium">{stop.arrival_time}</span>
							<span className="block text-muted-foreground text-xs">
								+{stop.cumulative_time_min} min
							</span>
						</span>
					</span>
				))}
			</span>
		</button>
	);
}
