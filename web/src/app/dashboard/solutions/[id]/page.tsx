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
import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "~/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import type { components } from "~/generated/api-types";
import { api } from "~/lib/api";

type BusRoute = components["schemas"]["BusRoute"];

const _RouteMap = dynamic(() => import("~/components/cluster-map"), {
	ssr: false,
	loading: () => (
		<div className="h-full w-full animate-pulse rounded-md bg-muted" />
	),
});

export default function SolutionDetailPage() {
	const params = useParams();
	const solutionId = params.id as string;

	const { data: solution, isLoading } = useQuery({
		queryKey: ["solution", solutionId],
		queryFn: () => api.optimization.get(solutionId),
		enabled: !!solutionId,
	});

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

			{/* Routes Tabs */}
			<Card>
				<CardHeader>
					<CardTitle>Route Details</CardTitle>
					<CardDescription>
						{solution.routes.length} routes generated with an average
						utilization of {solution.stats.avg_utilization.toFixed(1)}%
					</CardDescription>
				</CardHeader>
				<CardContent>
					<Tabs className="space-y-4" defaultValue="routes">
						<TabsList>
							<TabsTrigger value="routes">Route List</TabsTrigger>
							<TabsTrigger value="map">Route Map</TabsTrigger>
						</TabsList>

						<TabsContent className="space-y-4" value="routes">
							{solution.routes.map((route, idx) => (
								<RouteCard index={idx} key={route.bus_id} route={route} />
							))}
						</TabsContent>

						<TabsContent value="map">
							<div className="h-[500px] rounded-lg border">
								{/* TODO: Create a proper route map component */}
								<div className="flex h-full items-center justify-center text-muted-foreground">
									Route map visualization coming soon
								</div>
							</div>
						</TabsContent>
					</Tabs>
				</CardContent>
			</Card>
		</div>
	);
}

function RouteCard({ route, index }: { route: BusRoute; index: number }) {
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
		<div className="rounded-lg border p-4">
			<div className="mb-4 flex items-center justify-between">
				<div className="flex items-center gap-3">
					<div className={`h-3 w-3 rounded-full ${color}`} />
					<div>
						<h3 className="font-semibold">Bus {route.bus_no}</h3>
						<p className="text-muted-foreground text-sm">
							Capacity: {route.total_students}/{route.capacity} students
						</p>
					</div>
				</div>
				<div className="text-right">
					<div className="flex items-center gap-4 text-sm">
						<div className="flex items-center gap-1">
							<Route className="h-4 w-4 text-muted-foreground" />
							<span>{route.total_distance_km.toFixed(1)} km</span>
						</div>
						<div className="flex items-center gap-1">
							<Clock className="h-4 w-4 text-muted-foreground" />
							<span>{route.total_time_min} min</span>
						</div>
					</div>
					<div className="mt-1">
						<Badge
							variant={
								route.capacity_utilization > 90 ? "destructive" : "secondary"
							}
						>
							{route.capacity_utilization.toFixed(0)}% utilized
						</Badge>
					</div>
				</div>
			</div>

			{/* Depot Info */}
			<div className="mb-3 flex items-center gap-2 rounded bg-muted/50 p-2 text-sm">
				<MapPin className="h-4 w-4 text-muted-foreground" />
				<span className="text-muted-foreground">Depot:</span>
				<span className="font-medium">{route.depot_name || "Unknown"}</span>
			</div>

			{route.warnings.length > 0 && (
				<div className="mb-3 flex items-center gap-2 rounded bg-yellow-50 p-2 text-sm text-yellow-700 dark:bg-yellow-950/30 dark:text-yellow-300">
					<AlertTriangle className="h-4 w-4" />
					{route.warnings.join(", ")}
				</div>
			)}

			<div className="space-y-2">
				{route.stops.map((stop, stopIdx) => (
					<div
						className="flex items-center gap-3 rounded-md bg-muted/50 p-2"
						key={stop.stop_id}
					>
						<div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-muted font-medium text-xs">
							{stopIdx + 1}
						</div>
						<div className="min-w-0 flex-1">
							<p className="truncate font-medium text-sm">{stop.stop_name}</p>
							<p className="text-muted-foreground text-xs">
								{stop.stop_code} • {stop.students_boarding} students
							</p>
						</div>
						<div className="text-right text-sm">
							<p className="font-medium">{stop.arrival_time}</p>
							<p className="text-muted-foreground text-xs">
								+{stop.cumulative_time_min} min
							</p>
						</div>
					</div>
				))}
			</div>
		</div>
	);
}
