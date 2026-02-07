"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { ColumnDef } from "@tanstack/react-table";
import { Edit, Loader2, Maximize2, Trash2 } from "lucide-react";
import dynamic from "next/dynamic";
import Papa from "papaparse";
import { useMemo, useState } from "react";
import { toast } from "sonner";
import { CsvDropzone } from "~/components/csv-dropzone";
import { DataTable } from "~/components/data-table";
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
	DialogTrigger,
} from "~/components/ui/dialog";
import type { components } from "~/generated/api-types";
import { api } from "~/lib/api";

const StopsMap = dynamic(() => import("~/components/stops-map"), {
	ssr: false,
	loading: () => (
		<div className="h-[400px] w-full animate-pulse rounded-md bg-muted" />
	),
});

type StopRead = components["schemas"]["StopRead"];
type StopCreate = components["schemas"]["StopCreate"];

type StopValidationStatus = "valid" | "duplicate" | "invalid";

interface AugmentedStop extends StopCreate {
	validationStatus: StopValidationStatus;
	validationErrors?: string[];
	originalId?: string;
}

export default function StopsDataPage() {
	const queryClient = useQueryClient();
	const [selectedStopId, setSelectedStopId] = useState<string | null>(null);
	const [pendingStops, setPendingStops] = useState<AugmentedStop[]>([]);
	const [isEditMode, setIsEditMode] = useState(false);
	const [isDeleteAllOpen, setIsDeleteAllOpen] = useState(false);

	const { data: stops = [] } = useQuery({
		queryKey: ["stops"],
		queryFn: api.stops.list,
	});

	const validatedPendingStops = useMemo(() => {
		if (pendingStops.length === 0) return [];

		const stopCodeMap = new Map(stops.map((s) => [s.stop_code, s.id]));

		return pendingStops.map((stop) => {
			const errors: string[] = [];
			let status: StopValidationStatus = "valid";
			let originalId: string | undefined;

			if (stop.stop_code && stopCodeMap.has(stop.stop_code)) {
				status = "duplicate";
				errors.push(`Duplicate Stop Code: ${stop.stop_code}`);
				originalId = stopCodeMap.get(stop.stop_code);
			}

			if (!stop.name) {
				status = "invalid";
				errors.push("Missing Name");
			}
			if (
				stop.lat === undefined ||
				stop.lat === null ||
				stop.lat === 0 ||
				Number.isNaN(stop.lat)
			) {
				status = "invalid";
				errors.push("Invalid Latitude");
			}
			if (
				stop.lon === undefined ||
				stop.lon === null ||
				stop.lon === 0 ||
				Number.isNaN(stop.lon)
			) {
				status = "invalid";
				errors.push("Invalid Longitude");
			}

			return {
				...stop,
				validationStatus: status,
				validationErrors: errors,
				originalId,
			};
		});
	}, [pendingStops, stops]);

	const bulkCreateMutation = useMutation({
		mutationFn: api.stops.bulkCreate,
		onSuccess: (data) => {
			queryClient.invalidateQueries({ queryKey: ["stops"] });
			toast.success(`Successfully imported ${data.count} stops`);
			setPendingStops([]);
			setIsEditMode(false);
		},
		onError: (error: Error) => {
			toast.error(`Import failed: ${error.message}`);
		},
	});

	const deleteAllMutation = useMutation({
		mutationFn: api.stops.deleteAll,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["stops"] });
			toast.success("All stops deleted");
			setIsDeleteAllOpen(false);
		},
		onError: (error: Error) => {
			toast.error(`Delete failed: ${error.message}`);
			setIsDeleteAllOpen(false);
		},
	});

	const deleteMutation = useMutation({
		mutationFn: api.stops.delete,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["stops"] });
			toast.success("Stop deleted");
		},
		onError: (error: Error) => {
			toast.error(`Delete failed: ${error.message}`);
		},
	});

	interface CsvRow {
		stop_id?: string;
		stop_code?: string;
		stop_name?: string;
		name?: string;
		latitude?: string;
		lat?: string;
		longitude?: string;
		long?: string;
		lon?: string;
		locality?: string;
		zone?: string;
		active?: string;
	}

	const handleDrop = (file: File) => {
		Papa.parse<CsvRow>(file, {
			header: true,
			skipEmptyLines: true,
			complete: (results) => {
				const parsedStops: AugmentedStop[] = results.data.map((row) => ({
					stop_code: row.stop_id?.trim() || row.stop_code?.trim() || null,
					name: row.stop_name?.trim() || row.name?.trim() || "",
					lat: parseFloat(row.latitude || row.lat || "NaN"),
					lon: parseFloat(row.longitude || row.long || row.lon || "NaN"),
					locality: row.locality?.trim() || null,
					zone: row.zone?.trim() || null,
					active: row.active?.toString().toLowerCase() === "true" || true,
					validationStatus: "valid",
				}));
				setPendingStops(parsedStops);
				toast.info(
					`Parsed ${parsedStops.length} rows. Please review before importing.`,
				);
			},
			error: (error: Error) => {
				toast.error(`Failed to parse CSV: ${error.message}`);
			},
		});
	};

	const handleCommit = () => {
		const validStops = validatedPendingStops.filter(
			(s) => s.validationStatus === "valid",
		);
		if (validStops.length === 0) {
			toast.error("No valid stops to import.");
			return;
		}

		const stopsToCreate: StopCreate[] = validStops.map((s) => ({
			name: s.name,
			lat: s.lat,
			lon: s.lon,
			stop_code: s.stop_code,
			locality: s.locality,
			zone: s.zone,
			active: s.active,
		}));

		bulkCreateMutation.mutate(stopsToCreate);
	};

	const handleStopMove = (stopIdOrCode: string, lat: number, lng: number) => {
		setPendingStops((prev) =>
			prev.map((s) => {
				if (s.stop_code === stopIdOrCode) {
					return { ...s, lat, lon: lng };
				}
				return s;
			}),
		);
	};

	const mapStops = useMemo(() => {
		if (pendingStops.length > 0) {
			return validatedPendingStops.map(
				(s, idx) =>
					({
						...s,
						id: s.stop_code || `temp-${idx}`,
					}) as unknown as StopRead,
			);
		}
		return stops;
	}, [stops, validatedPendingStops, pendingStops.length]);

	const columns: ColumnDef<StopRead>[] = [
		{
			accessorKey: "name",
			header: "Stop Name",
		},
		{
			accessorKey: "locality",
			header: "Locality",
		},
		{
			accessorKey: "active",
			header: "Active",
			cell: ({ row }) => (
				<span
					className={row.original.active ? "text-green-600" : "text-red-500"}
				>
					{row.original.active ? "Yes" : "No"}
				</span>
			),
		},
		{
			id: "actions",
			cell: ({ row }) => {
				const stop = row.original;
				return (
					<div className="flex gap-2">
						<Button
							onClick={() => setSelectedStopId(stop.id)}
							size="icon"
							variant="ghost"
						>
							<Edit className="h-4 w-4" />
						</Button>
						<Button
							className="text-destructive hover:text-destructive"
							onClick={() => {
								if (confirm("Delete this stop?")) {
									deleteMutation.mutate(stop.id);
								}
							}}
							size="icon"
							variant="ghost"
						>
							<Trash2 className="h-4 w-4" />
						</Button>
					</div>
				);
			},
		},
	];

	const reviewColumns: ColumnDef<AugmentedStop>[] = [
		{
			accessorKey: "stop_code",
			header: "Code",
		},
		{
			accessorKey: "name",
			header: "Name",
		},
		{
			accessorKey: "lat",
			header: "Lat",
			cell: ({ row }) => row.original.lat?.toFixed(4),
		},
		{
			accessorKey: "lon",
			header: "Lon",
			cell: ({ row }) => row.original.lon?.toFixed(4),
		},
		{
			header: "Status",
			cell: ({ row }) => {
				const { validationStatus, validationErrors } = row.original;
				let color = "text-green-600";
				if (validationStatus === "duplicate") color = "text-yellow-600";
				if (validationStatus === "invalid") color = "text-red-600";

				return (
					<div className={`flex flex-col ${color}`}>
						<span className="font-bold capitalize">{validationStatus}</span>
						{validationErrors?.map((err) => (
							<span className="text-xs" key={err}>
								{err}
							</span>
						))}
					</div>
				);
			},
		},
	];

	return (
		<div className="flex h-full flex-col space-y-6">
			<div className="flex items-center justify-between">
				<h2 className="font-bold text-3xl tracking-tight">Stops Management</h2>
				<Dialog onOpenChange={setIsDeleteAllOpen} open={isDeleteAllOpen}>
					<DialogTrigger asChild>
						<Button disabled={stops.length === 0} variant="destructive">
							<Trash2 className="mr-2 h-4 w-4" /> Delete All Stops
						</Button>
					</DialogTrigger>
					<DialogContent>
						<DialogHeader>
							<DialogTitle>Are you absolutely sure?</DialogTitle>
							<DialogDescription>
								This action cannot be undone. This will permanently delete ALL
								stops from the database.
							</DialogDescription>
						</DialogHeader>
						<DialogFooter>
							<Button
								className="hover:bg-zinc-100 hover:text-zinc-900 dark:hover:bg-zinc-800 dark:hover:text-zinc-50"
								disabled={deleteAllMutation.isPending}
								onClick={() => setIsDeleteAllOpen(false)}
								variant="outline"
							>
								Cancel
							</Button>
							<Button
								className="min-w-[120px]"
								disabled={deleteAllMutation.isPending}
								onClick={() => deleteAllMutation.mutate()}
								variant="destructive"
							>
								{deleteAllMutation.isPending ? (
									<>
										<Loader2 className="mr-2 h-4 w-4 animate-spin" />
										Deleting...
									</>
								) : (
									"Delete All"
								)}
							</Button>
						</DialogFooter>
					</DialogContent>
				</Dialog>
			</div>

			<div className="grid h-full min-h-0 flex-1 grid-cols-1 gap-6 lg:grid-cols-2">
				<div className="flex h-full flex-col space-y-6 overflow-hidden">
					<Card className="flex-shrink-0">
						<CardHeader>
							<CardTitle>Import Stops</CardTitle>
							<CardDescription>
								Upload CSV (Header mapping: stop_id, stop_name, latitude,
								longitude)
							</CardDescription>
						</CardHeader>
						<CardContent>
							{pendingStops.length === 0 ? (
								<CsvDropzone
									description="Drag & drop stops.csv here"
									onFileSelect={handleDrop}
								/>
							) : (
								<div className="space-y-4">
									<div className="flex items-center justify-between">
										<p className="text-muted-foreground text-sm">
											Reviewing {pendingStops.length} stops. Valid:{" "}
											{
												validatedPendingStops.filter(
													(s) => s.validationStatus === "valid",
												).length
											}
										</p>
										<div className="space-x-2">
											<Button
												disabled={bulkCreateMutation.isPending}
												onClick={() => setPendingStops([])}
												variant="outline"
											>
												Cancel
											</Button>
											<Button
												className="min-w-[140px]"
												disabled={
													validatedPendingStops.filter(
														(s) => s.validationStatus === "valid",
													).length === 0 || bulkCreateMutation.isPending
												}
												onClick={handleCommit}
											>
												{bulkCreateMutation.isPending ? (
													<>
														<Loader2 className="mr-2 h-4 w-4 animate-spin" />
														Importing...
													</>
												) : (
													"Import Valid"
												)}
											</Button>
										</div>
									</div>
									<Button
										className="w-full"
										onClick={() => setIsEditMode(!isEditMode)}
										variant="secondary"
									>
										<Maximize2 className="mr-2 h-4 w-4" />
										{isEditMode ? "Exit Map Edit Mode" : "View on Map"}
									</Button>
								</div>
							)}
						</CardContent>
					</Card>

					<Card className="flex min-h-0 flex-1 flex-col overflow-hidden">
						<CardHeader>
							<CardTitle>
								{pendingStops.length > 0 ? "Review Data" : "Existing Stops"}
							</CardTitle>
							<CardDescription>
								{pendingStops.length > 0
									? "Edit invalid rows in CSV and re-upload"
									: `${stops.length} stops recorded`}
							</CardDescription>
						</CardHeader>
						<CardContent className="flex flex-col">
							{pendingStops.length > 0 ? (
								<DataTable
									columns={reviewColumns}
									containerClassName="h-[450px] overflow-y-auto"
									data={validatedPendingStops}
									enablePagination={false}
								/>
							) : (
								<DataTable
									columns={columns}
									containerClassName="h-[450px] overflow-y-auto"
									data={stops}
									enablePagination={false}
									filterColumn="name"
								/>
							)}
						</CardContent>
					</Card>
				</div>

				<Card
					className={`flex h-full flex-col transition-all duration-300 ${isEditMode ? "fixed inset-4 z-50 h-[calc(100vh-2rem)] border-2 shadow-2xl" : "min-h-[500px]"}`}
				>
					<CardHeader className={isEditMode ? "hidden" : "block"}>
						<CardTitle>Map View</CardTitle>
						<CardDescription>Visual location of all stops</CardDescription>
					</CardHeader>
					<CardContent className="relative min-h-0 flex-1 p-0">
						<StopsMap
							className="absolute inset-0 h-full w-full rounded-b-lg"
							isEditMode={isEditMode}
							onStopClick={(stop) => setSelectedStopId(stop.id)}
							onStopMove={handleStopMove}
							selectedStopId={selectedStopId}
							stops={mapStops}
						/>
						{isEditMode && (
							<Button
								className="absolute top-4 right-4 z-[400]"
								onClick={() => setIsEditMode(false)}
								variant="destructive"
							>
								Close Edit Mode
							</Button>
						)}
					</CardContent>
				</Card>
			</div>
		</div>
	);
}
