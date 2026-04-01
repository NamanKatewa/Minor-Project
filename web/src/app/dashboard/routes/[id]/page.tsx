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
import { Skeleton } from "~/components/ui/skeleton";
import type { components } from "~/generated/api-types";
import { api } from "~/lib/api";

type BusRoute = components["schemas"]["BusRoute"];

const RoutesMap = dynamic(() => import("~/components/solution-map"), {
	ssr: false,
	loading: () => (
		<div className="h-full w-full animate-pulse rounded-md bg-muted" />
	),
});

export default function RouteDetailPage() {
	const params = useParams();
	const solutionId = params.id as string;
	const [selectedRouteIndex, setSelectedRouteIndex] = useState<number | null>(
		null,
	);

	const { data: solution, isLoading } = useQuery({
		queryKey: ["route-plan", solutionId],
		queryFn: () => api.routes.get(solutionId),
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
		return <SolutionSkeleton />;
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
					<Link href="/dashboard/routes">
						<Button size="icon" variant="outline">
							<ArrowLeft className="h-4 w-4" />
						</Button>
					</Link>
					<div>
						<div className="flex items-center gap-2">
							<h2 className="font-bold text-3xl uppercase tracking-tight">
								Route Plan Overview
							</h2>
							<Badge
								variant={
									solution.scenario_type === "strict" ? "default" : "secondary"
								}
							>
								{solution.scenario_type}
							</Badge>
						</div>
						<p className="text-muted-foreground text-xs uppercase tracking-widest">
							Generated on {formatDate(solution.created_at)}
						</p>
					</div>
				</div>
			</div>

			{/* Stats Overview */}
			<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
				<Card>
					<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
						<CardTitle className="font-medium text-sm uppercase tracking-widest">
							Buses Used
						</CardTitle>
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
						<CardTitle className="font-medium text-sm uppercase tracking-widest">
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
						<CardTitle className="font-medium text-sm uppercase tracking-widest">
							Coverage
						</CardTitle>
						<Users className="h-4 w-4 text-muted-foreground" />
					</CardHeader>
					<CardContent>
						<div className="font-bold text-2xl">
							{solution.stats.total_students_assigned}
						</div>
						<p className="text-muted-foreground text-xs uppercase tracking-widest">
							{solution.stats.coverage_percentage.toFixed(1)}% coverage
						</p>
					</CardContent>
				</Card>

				<Card>
					<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
						<CardTitle className="font-medium text-sm uppercase tracking-widest">
							Est. Cost
						</CardTitle>
						<Coins className="h-4 w-4 text-muted-foreground" />
					</CardHeader>
					<CardContent>
						<div className="font-bold text-2xl">
							₹{solution.cost_estimate.toLocaleString()}
						</div>
						<p className="text-muted-foreground text-xs uppercase tracking-widest">
							₹{solution.fuel_cost_per_km}/km
						</p>
					</CardContent>
				</Card>
			</div>

			{/* Routes Overview */}
			<div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
				{/* Route List */}
				<div className="flex flex-col gap-4 lg:col-span-4">
					<Card className="flex flex-1 flex-col overflow-hidden py-0">
						<CardHeader className="pt-6">
							<CardTitle className="uppercase tracking-widest">
								Route List
							</CardTitle>
							<CardDescription className="text-xs uppercase">
								{solution.routes.length} routes generated
							</CardDescription>
						</CardHeader>
						<CardContent className="flex max-h-[700px] flex-1 flex-col items-center space-y-4 overflow-y-auto px-6 pb-6">
							{solution.routes.map((route, idx) => (
								<div className="w-full max-w-md" key={`${route.bus_id}-${idx}`}>
									<RouteCard
										index={idx}
										isSelected={selectedRouteIndex === idx}
										onSelect={setSelectedRouteIndex}
										route={route}
									/>
								</div>
							))}
						</CardContent>
					</Card>
				</div>

				{/* Route Map */}
				<div className="lg:col-span-8">
					<Card className="flex h-full flex-col overflow-hidden">
						<CardHeader>
							<CardTitle className="uppercase tracking-widest">
								Route Map
							</CardTitle>
							<CardDescription className="text-xs uppercase">
								Interactive visualization of all routes
							</CardDescription>
						</CardHeader>
						<CardContent className="flex-1 p-0">
							<div className="h-[700px] w-full">
								<RoutesMap
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

function SolutionSkeleton() {
	return (
		<div className="flex-1 space-y-6 p-8 pt-6">
			<div className="flex items-center justify-between">
				<div className="flex items-center gap-4">
					<Skeleton className="h-10 w-10" />
					<div className="space-y-2">
						<Skeleton className="h-8 w-48" />
						<Skeleton className="h-4 w-32" />
					</div>
				</div>
			</div>
			<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
				{[...Array(4)].map(() => (
					<Skeleton className="h-32 rounded-xl" key={nanoid()} />
				))}
			</div>
			<div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
				<div className="lg:col-span-4">
					<Skeleton className="h-[700px] rounded-xl" />
				</div>
				<div className="lg:col-span-8">
					<Skeleton className="h-[700px] rounded-xl" />
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
						<span className="block font-semibold uppercase">
							Bus {route.bus_no}
						</span>
						<span className="block text-muted-foreground text-xs uppercase tracking-widest">
							{route.total_students}/{route.capacity} seats
						</span>
					</span>
				</span>
				<span className="text-right">
					<span className="flex items-center gap-4 text-sm">
						<span className="flex items-center gap-1 font-mono">
							<Route className="h-3 w-3 text-muted-foreground" />
							<span>{route.total_distance_km.toFixed(1)}km</span>
						</span>
						<span className="flex items-center gap-1 font-mono">
							<Clock className="h-3 w-3 text-muted-foreground" />
							<span>{route.total_time_min}m</span>
						</span>
					</span>
					<span className="mt-1 block">
						<Badge
							className="h-4 text-[10px] uppercase"
							variant={
								route.capacity_utilization > 90 ? "destructive" : "secondary"
							}
						>
							{route.capacity_utilization.toFixed(0)}% Util
						</Badge>
					</span>
				</span>
			</span>

			{/* Depot Info */}
			<span className="mb-3 flex items-center gap-2 rounded bg-muted/50 p-2 text-xs uppercase tracking-widest">
				<MapPin className="h-3 w-3 text-muted-foreground" />
				<span className="text-muted-foreground">Depot:</span>
				<span className="truncate font-medium">
					{route.depot_name || "Unknown"}
				</span>
			</span>

			{route.warnings.length > 0 && (
				<div className="mb-3 space-y-1">
					{route.warnings.map((warning) => (
						<span
							className="flex items-center gap-2 rounded bg-yellow-500/10 p-1.5 font-bold text-[10px] text-yellow-700 uppercase dark:bg-yellow-950/30 dark:text-yellow-400"
							key={nanoid()}
						>
							<AlertTriangle className="h-3 w-3" />
							{warning}
						</span>
					))}
				</div>
			)}

			<span className="block space-y-2">
				{(() => {
					type Stop = components["schemas"]["RouteStop"];
					const mergedStops: Map<string, Stop> = new Map();

					route.stops.forEach((s) => {
						const key = s.parent_stop_id || String(s.stop_id);
						if (mergedStops.has(key)) {
							const existing = mergedStops.get(key);
							if (existing) {
								existing.students_boarding += s.students_boarding;
							}
						} else {
							mergedStops.set(key, { ...s });
						}
					});

					return Array.from(mergedStops.values()).map((stop, stopIdx) => (
						<span
							className="flex items-center gap-3 rounded-md border border-transparent bg-muted/30 p-2 transition-colors hover:border-muted-foreground/10"
							key={`${stop.stop_id}-${stopIdx}`}
						>
							<span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-muted font-black text-[10px]">
								{stopIdx + 1}
							</span>
							<span className="min-w-0 flex-1">
								<span className="block truncate font-bold text-xs uppercase">
									{stop.is_split && stop.students_boarding > 50
										? `${stop.stop_name} (Split)`
										: stop.stop_name}
								</span>
								<span className="block font-mono text-[10px] text-muted-foreground">
									{stop.stop_code} • {stop.students_boarding} students
								</span>
							</span>
							<span className="text-right text-xs">
								<span className="block font-black font-mono">
									{stop.arrival_time}
								</span>
								<span className="block font-mono text-[10px] text-muted-foreground">
									+{stop.cumulative_time_min}m
								</span>
							</span>
						</span>
					));
				})()}
			</span>
		</button>
	);
}
