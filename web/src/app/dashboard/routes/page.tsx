"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { ColumnDef } from "@tanstack/react-table";
import {
	AlertTriangle,
	Bus,
	Coins,
	Eye,
	MoreHorizontal,
	Route,
	Trash2,
	Users,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { DataTable } from "~/components/data-table";
import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "~/components/ui/card";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "~/components/ui/dialog";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import type { components } from "~/generated/api-types";
import { api } from "~/lib/api";

type RoutePlanSummary = components["schemas"]["RoutePlanSummary"];

export default function RoutesPage() {
	const router = useRouter();
	const queryClient = useQueryClient();
	const [solutionToDelete, setSolutionToDelete] =
		useState<RoutePlanSummary | null>(null);

	const { data: historyData, isLoading } = useQuery({
		queryKey: ["routes", "history"],
		queryFn: () => api.routes.history(50, 0),
	});

	const deleteMutation = useMutation({
		mutationFn: api.routes.delete,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["routes"] });
			toast.success("Route plan deleted");
			setSolutionToDelete(null);
		},
		onError: (error: Error) => {
			toast.error(`Delete failed: ${error.message}`);
		},
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

	const columns: ColumnDef<RoutePlanSummary>[] = [
		{
			accessorKey: "created_at",
			header: "Date",
			cell: ({ row }) => formatDate(row.original.created_at),
		},
		{
			accessorKey: "scenario_type",
			header: "Type",
			cell: ({ row }) => (
				<Badge
					variant={
						row.original.scenario_type === "strict" ? "default" : "secondary"
					}
				>
					{row.original.scenario_type}
				</Badge>
			),
		},
		{
			accessorKey: "total_buses",
			header: "Buses",
			cell: ({ row }) => (
				<div className="flex items-center gap-1">
					<Bus className="h-4 w-4 text-muted-foreground" />
					<span>{row.original.total_buses}</span>
				</div>
			),
		},
		{
			accessorKey: "total_students",
			header: "Students",
			cell: ({ row }) => (
				<div className="flex items-center gap-1">
					<Users className="h-4 w-4 text-muted-foreground" />
					<span>{row.original.total_students}</span>
				</div>
			),
		},
		{
			accessorKey: "total_distance_km",
			header: "Distance",
			cell: ({ row }) => (
				<div className="flex items-center gap-1">
					<Route className="h-4 w-4 text-muted-foreground" />
					<span>{row.original.total_distance_km.toFixed(1)} km</span>
				</div>
			),
		},
		{
			accessorKey: "cost_estimate",
			header: "Cost",
			cell: ({ row }) => (
				<div className="flex items-center gap-1">
					<Coins className="h-4 w-4 text-muted-foreground" />
					<span>₹{row.original.cost_estimate.toLocaleString()}</span>
				</div>
			),
		},
		{
			accessorKey: "coverage_percentage",
			header: "Coverage",
			cell: ({ row }) => (
				<div className="flex items-center gap-2">
					<span className="font-medium">
						{row.original.coverage_percentage.toFixed(1)}%
					</span>
					{row.original.has_warnings && (
						<AlertTriangle className="h-4 w-4 text-yellow-500" />
					)}
				</div>
			),
		},
		{
			id: "actions",
			cell: ({ row }) => (
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button size="icon" variant="ghost">
							<MoreHorizontal className="h-4 w-4" />
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent align="end">
						<DropdownMenuItem asChild>
							<Link href={`/dashboard/solutions/${row.original.id}`}>
								<Eye className="mr-2 h-4 w-4" />
								View Details
							</Link>
						</DropdownMenuItem>
						<DropdownMenuItem
							className="text-destructive"
							onClick={() => setSolutionToDelete(row.original)}
						>
							<Trash2 className="mr-2 h-4 w-4" />
							Delete
						</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			),
		},
	];

	return (
		<div className="flex-1 space-y-6 p-8 pt-6">
			{/* Header */}
			<div className="flex items-center justify-between">
				<div>
					<h2 className="font-bold text-3xl uppercase tracking-tight">
						Route Plans
					</h2>
					<p className="text-muted-foreground text-xs uppercase tracking-widest">
						View and manage past route generations
					</p>
				</div>
				<Link href="/dashboard/generate-routes">
					<Button className="uppercase tracking-widest">
						Generate New Routes
					</Button>
				</Link>
			</div>

			{/* Solutions Table */}
			<Card>
				<CardHeader>
					<CardTitle className="uppercase tracking-widest">
						All Route Plans
					</CardTitle>
					<CardDescription className="text-xs uppercase">
						{historyData?.solutions_data.count || 0} route plans found
					</CardDescription>
				</CardHeader>

				<CardContent>
					<DataTable
						columns={columns}
						data={historyData?.solutions_data.solutions || []}
						enablePagination={true}
						filterColumn="scenario_type"
						getRowId={(row) => row.id}
						isLoading={isLoading}
						onRowClick={(row) => router.push(`/dashboard/routes/${row.id}`)}
					/>
				</CardContent>
			</Card>

			{/* Delete Dialog */}
			<Dialog
				onOpenChange={(open) => !open && setSolutionToDelete(null)}
				open={!!solutionToDelete}
			>
				<DialogContent>
					<DialogHeader>
						<DialogTitle>Delete Route Plan</DialogTitle>
						<DialogDescription>
							Are you sure you want to delete this route plan from{" "}
							{solutionToDelete ? formatDate(solutionToDelete.created_at) : ""}?
							This action cannot be undone.
						</DialogDescription>
					</DialogHeader>
					<DialogFooter>
						<Button
							disabled={deleteMutation.isPending}
							onClick={() => setSolutionToDelete(null)}
							variant="outline"
						>
							Cancel
						</Button>
						<Button
							disabled={deleteMutation.isPending}
							onClick={() =>
								solutionToDelete && deleteMutation.mutate(solutionToDelete.id)
							}
							variant="destructive"
						>
							{deleteMutation.isPending ? "Deleting..." : "Delete"}
						</Button>
					</DialogFooter>
				</DialogContent>
			</Dialog>
		</div>
	);
}
