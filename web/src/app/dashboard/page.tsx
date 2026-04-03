"use client";

import { useQuery } from "@tanstack/react-query";
import {
	Bus,
	CheckCircle2,
	Database,
	MapPin,
	Warehouse,
	XCircle,
} from "lucide-react";
import dynamic from "next/dynamic";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Skeleton } from "~/components/ui/skeleton";
import { api } from "~/lib/api";

const StopsMap = dynamic(() => import("~/components/stops-map"), {
	ssr: false,
	loading: () => (
		<div className="flex h-[500px] items-center justify-center border bg-muted/10">
			<div className="text-center">
				<div className="mb-2 font-black font-serif text-2xl">MAP INTERFACE</div>
				<div className="font-sans text-muted-foreground text-xs uppercase tracking-widest">
					Loading Map...
				</div>
			</div>
		</div>
	),
});

export default function DashboardPage() {
	const { data: summary, isLoading: isLoadingSummary } = useQuery({
		queryKey: ["dashboard-summary"],
		queryFn: api.dashboard.summary,
	});

	if (isLoadingSummary) {
		return <DashboardSkeleton />;
	}

	const s = summary || {
		stops_count: 0,
		buses_count: 0,
		depots_count: 0,
		demand_records_count: 0,
		total_students: 0,
		total_fleet_capacity: 0,
		latest_matrix: null,
		stops: [],
	};

	// Data readiness checks
	const hasStops = s.stops_count > 0;
	const hasBuses = s.buses_count > 0;
	const hasDepots = s.depots_count > 0;
	const hasDemand = s.demand_records_count > 0;
	const hasMatrix = !!s.latest_matrix;

	const readyCount = [
		hasStops,
		hasBuses,
		hasDepots,
		hasDemand,
		hasMatrix,
	].filter(Boolean).length;
	const totalChecks = 5;

	return (
		<div className="space-y-6">
			<div className="flex items-center justify-between">
				<h1 className="font-black font-serif text-5xl uppercase tracking-tight">
					DASHBOARD
				</h1>
				<div className="text-right">
					<div className="font-bold text-2xl">UFOS</div>
					<div className="text-muted-foreground text-sm uppercase tracking-widest">
						University Fleet Optimization System
					</div>
				</div>
			</div>

			{/* Top Stats Row */}
			<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
				<StatCard
					icon={MapPin}
					label="Total Stops"
					subLabel="Active locations"
					value={s.stops_count}
				/>
				<StatCard
					icon={Bus}
					label="Total Buses"
					subLabel={`Fleet capacity: ${s.total_fleet_capacity}`}
					value={s.buses_count}
				/>
				<StatCard
					icon={Warehouse}
					label="Depots"
					subLabel="Starting points"
					value={s.depots_count}
				/>
				<StatCard
					icon={Database}
					label="Total Students"
					subLabel="Demand records"
					value={s.total_students}
				/>
			</div>

			<div className="grid gap-6 lg:grid-cols-5">
				{/* Map Section - Takes up 3/5 (60%) */}
				<div className="lg:col-span-3">
					<div className="overflow-hidden rounded-xl border bg-card shadow-sm">
						<div className="h-[500px]">
							<StopsMap isEditMode={false} stops={s.stops || []} />
						</div>
					</div>
				</div>

				{/* Sidebar / Checklist Section - Takes up 2/5 (40%) */}
				<div className="space-y-6 lg:col-span-2">
					{/* System Status Card */}
					<Card>
						<CardHeader className="pb-3">
							<CardTitle className="font-medium text-muted-foreground text-sm uppercase tracking-widest">
								System Readiness
							</CardTitle>
							<div className="flex items-baseline gap-2">
								<span className="font-black text-4xl">{readyCount}</span>
								<span className="text-muted-foreground">/ {totalChecks}</span>
							</div>
						</CardHeader>
						<CardContent className="space-y-4">
							<div className="relative h-2 w-full overflow-hidden rounded-full bg-secondary">
								<div
									className="h-full bg-primary transition-all duration-500 ease-in-out"
									style={{ width: `${(readyCount / totalChecks) * 100}%` }}
								/>
							</div>
							<div className="space-y-2">
								<CheckItem label="Stops Imported" status={hasStops} />
								<CheckItem label="Buses Imported" status={hasBuses} />
								<CheckItem label="Depots Imported" status={hasDepots} />
								<CheckItem label="Demand Data" status={hasDemand} />
								<CheckItem label="Distance Matrix" status={hasMatrix} />
							</div>
						</CardContent>
					</Card>

					{/* Matrix Info Card */}
					<Card>
						<CardHeader className="pb-3">
							<CardTitle className="font-medium text-muted-foreground text-sm uppercase tracking-widest">
								Routing Engine
							</CardTitle>
						</CardHeader>
						<CardContent>
							{s.latest_matrix ? (
								<div className="space-y-1">
									<div className="font-bold text-xl">Active</div>
									<div className="text-muted-foreground text-xs">
										Built{" "}
										{new Date(s.latest_matrix.created_at).toLocaleString()}
									</div>
									<div className="pt-2 text-xs">
										Calculated for {s.latest_matrix.stop_count} stops in{" "}
										{s.latest_matrix.build_time_seconds?.toFixed(1)}s
									</div>
								</div>
							) : (
								<div className="space-y-1">
									<div className="font-bold text-xl text-yellow-600">
										Not Built
									</div>
									<div className="text-muted-foreground text-xs">
										Distance matrix missing. Go to Demand Map to build.
									</div>
								</div>
							)}
						</CardContent>
					</Card>
				</div>
			</div>
		</div>
	);
}

function StatCard({
	label,
	value,
	subLabel,
	icon: Icon,
}: {
	label: string;
	value: number;
	subLabel: string;
	icon: React.ElementType;
}) {
	return (
		<Card>
			<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
				<CardTitle className="font-medium text-sm">{label}</CardTitle>
				<Icon className="h-4 w-4 text-muted-foreground" />
			</CardHeader>
			<CardContent>
				<div className="font-bold text-2xl">{value}</div>
				<p className="text-muted-foreground text-xs">{subLabel}</p>
			</CardContent>
		</Card>
	);
}

function CheckItem({ label, status }: { label: string; status: boolean }) {
	return (
		<div className="flex items-center justify-between text-sm">
			<span className={status ? "font-medium" : "text-muted-foreground"}>
				{label}
			</span>
			{status ? (
				<CheckCircle2 className="h-4 w-4 text-green-500" />
			) : (
				<XCircle className="h-4 w-4 text-muted-foreground/50" />
			)}
		</div>
	);
}

function DashboardSkeleton() {
	return (
		<div className="space-y-6">
			<div className="flex items-center justify-between">
				<Skeleton className="h-12 w-64" />
				<div className="space-y-2">
					<Skeleton className="ml-auto h-8 w-32" />
					<Skeleton className="ml-auto h-4 w-24" />
				</div>
			</div>
			<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
				{[...Array(4)].map((_, i) => (
					// biome-ignore lint/suspicious/noArrayIndexKey: Skeleton loader
					<Skeleton className="h-32 rounded-xl" key={i} />
				))}
			</div>
			<div className="grid gap-6 lg:grid-cols-3">
				<div className="lg:col-span-2">
					<Skeleton className="h-[500px] w-full rounded-xl" />
				</div>
				<div className="space-y-6">
					<Skeleton className="h-64 rounded-xl" />
					<Skeleton className="h-40 rounded-xl" />
				</div>
			</div>
		</div>
	);
}
