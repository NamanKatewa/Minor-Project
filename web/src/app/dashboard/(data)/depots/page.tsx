"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { ColumnDef } from "@tanstack/react-table";
import { Edit, Loader2, Trash2 } from "lucide-react";
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import type { components } from "~/generated/api-types";
import { api } from "~/lib/api";
import { DeleteAllDepotsDialog } from "./_components/delete-all-depots-dialog";
import { DeleteDepotDialog } from "./_components/delete-depot-dialog";
import { EditDepotDialog } from "./_components/edit-depot-dialog";
import { ImportDepotsDialog } from "./_components/import-depots-dialog";

type DepotRead = components["schemas"]["DepotRead"];
type DepotCreate = components["schemas"]["DepotCreate"];

interface AugmentedDepot extends DepotCreate {
	id: string;
	validationStatus: "valid" | "duplicate" | "invalid";
	validationErrors: string[];
}

export default function DepotsDataPage() {
	const queryClient = useQueryClient();
	const [isDeleteAllOpen, setIsDeleteAllOpen] = useState(false);
	const [depotToDelete, setDepotToDelete] = useState<DepotRead | null>(null);
	const [depotToEdit, setDepotToEdit] = useState<DepotRead | null>(null);
	const [pendingDepots, setPendingDepots] = useState<AugmentedDepot[]>([]);
	const [isImportConfirmOpen, setIsImportConfirmOpen] = useState(false);

	const { data: depots = [], isLoading } = useQuery({
		queryKey: ["depots"],
		queryFn: api.depots.list,
	});

	const validatedPendingDepots = useMemo(() => {
		if (pendingDepots.length === 0) return [];

		const depotNameMap = new Map(
			depots.map((d) => [d.name.toLowerCase(), d.id]),
		);

		return pendingDepots.map((depot) => {
			const errors: string[] = [];
			let status: "valid" | "duplicate" | "invalid" = "valid";

			if (!depot.name?.trim()) {
				status = "invalid";
				errors.push("Missing Depot Name");
			} else if (depotNameMap.has(depot.name.toLowerCase())) {
				status = "duplicate";
				errors.push(`Duplicate: ${depot.name}`);
			}

			if (depot.lat !== undefined && depot.lat !== null) {
				if (Number.isNaN(depot.lat) || depot.lat < -90 || depot.lat > 90) {
					status = "invalid";
					errors.push("Invalid Latitude (-90 to 90)");
				}
			}

			if (depot.lon !== undefined && depot.lon !== null) {
				if (Number.isNaN(depot.lon) || depot.lon < -180 || depot.lon > 180) {
					status = "invalid";
					errors.push("Invalid Longitude (-180 to 180)");
				}
			}

			return {
				...depot,
				validationStatus: status,
				validationErrors: errors,
			};
		});
	}, [pendingDepots, depots]);

	const bulkCreateMutation = useMutation({
		mutationFn: api.depots.bulkCreate,
		onSuccess: (data) => {
			queryClient.invalidateQueries({ queryKey: ["depots"] });
			toast.success(`Successfully imported ${data.count} depots`);
			setPendingDepots([]);
			setIsImportConfirmOpen(false);
		},
		onError: (error: Error) => {
			toast.error(`Import failed: ${error.message}`);
			setIsImportConfirmOpen(false);
		},
	});

	const deleteAllMutation = useMutation({
		mutationFn: api.depots.deleteAll,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["depots"] });
			queryClient.invalidateQueries({ queryKey: ["buses"] });
			toast.success("All depots deleted");
			setIsDeleteAllOpen(false);
		},
		onError: (error: Error) => {
			toast.error(`Delete failed: ${error.message}`);
			setIsDeleteAllOpen(false);
		},
	});

	const deleteMutation = useMutation({
		mutationFn: api.depots.delete,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["depots"] });
			queryClient.invalidateQueries({ queryKey: ["buses"] });
			toast.success("Depot deleted");
			setDepotToDelete(null);
		},
		onError: (error: Error) => {
			toast.error(`Delete failed: ${error.message}`);
		},
	});

	interface CsvRow {
		depot_name?: string;
		name?: string;
		lat?: string;
		lon?: string;
		latitude?: string;
		longitude?: string;
	}

	const handleDrop = (file: File) => {
		Papa.parse<CsvRow>(file, {
			header: true,
			skipEmptyLines: true,
			complete: (results) => {
				const parsedDepots: AugmentedDepot[] = results.data.map(
					(row, index) => {
						const name = row.depot_name?.trim() || row.name?.trim() || "";
						const lat = row.lat
							? parseFloat(row.lat)
							: row.latitude
								? parseFloat(row.latitude)
								: undefined;
						const lon = row.lon
							? parseFloat(row.lon)
							: row.longitude
								? parseFloat(row.longitude)
								: undefined;

						return {
							id: name || `temp-${index}`,
							name,
							lat: lat !== undefined && !Number.isNaN(lat) ? lat : undefined,
							lon: lon !== undefined && !Number.isNaN(lon) ? lon : undefined,
							validationStatus: "valid" as const,
							validationErrors: [],
						};
					},
				);
				setPendingDepots(parsedDepots);
				toast.info(
					`Parsed ${parsedDepots.length} rows. Please review before importing.`,
				);
			},
			error: (error: Error) => {
				toast.error(`Failed to parse CSV: ${error.message}`);
			},
		});
	};

	const handleCommit = () => {
		const validDepots = validatedPendingDepots.filter(
			(d) => d.validationStatus === "valid",
		);
		if (validDepots.length === 0) {
			toast.error("No valid depots to import.");
			return;
		}
		setIsImportConfirmOpen(true);
	};

	const confirmImport = () => {
		const validDepots = validatedPendingDepots.filter(
			(d) => d.validationStatus === "valid",
		);

		const depotsToCreate: DepotCreate[] = validDepots.map((d) => ({
			name: d.name,
			lat: d.lat,
			lon: d.lon,
		}));

		bulkCreateMutation.mutate(depotsToCreate);
	};

	const columns: ColumnDef<DepotRead>[] = [
		{
			accessorKey: "name",
			header: "Name",
		},
		{
			accessorKey: "lat",
			header: "Latitude",
			cell: ({ row }) => row.original.lat?.toFixed(6) ?? "-",
		},
		{
			accessorKey: "lon",
			header: "Longitude",
			cell: ({ row }) => row.original.lon?.toFixed(6) ?? "-",
		},
		{
			id: "actions",
			cell: ({ row }) => (
				<div className="flex justify-end gap-2">
					<Button
						onClick={() => setDepotToEdit(row.original)}
						size="icon"
						variant="ghost"
					>
						<Edit className="h-4 w-4" />
					</Button>
					<Button
						className="text-destructive hover:text-destructive"
						onClick={() => setDepotToDelete(row.original)}
						size="icon"
						variant="ghost"
					>
						<Trash2 className="h-4 w-4" />
					</Button>
				</div>
			),
		},
	];

	const reviewColumns: ColumnDef<AugmentedDepot>[] = [
		{
			accessorKey: "name",
			header: "Depot Name",
		},
		{
			accessorKey: "lat",
			header: "Lat",
			cell: ({ row }) => row.original.lat?.toFixed(4) ?? "-",
		},
		{
			accessorKey: "lon",
			header: "Lon",
			cell: ({ row }) => row.original.lon?.toFixed(4) ?? "-",
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
		<div className="space-y-6">
			<div className="flex items-center justify-between">
				<h2 className="font-bold text-3xl tracking-tight">Depot Management</h2>
				<DeleteAllDepotsDialog
					isDisabled={depots.length === 0}
					isPending={deleteAllMutation.isPending}
					onConfirm={() => deleteAllMutation.mutate()}
					onOpenChange={setIsDeleteAllOpen}
					open={isDeleteAllOpen}
				/>

				<ImportDepotsDialog
					isPending={bulkCreateMutation.isPending}
					onConfirm={confirmImport}
					onOpenChange={setIsImportConfirmOpen}
					open={isImportConfirmOpen}
					totalCount={validatedPendingDepots.length}
					validCount={
						validatedPendingDepots.filter((d) => d.validationStatus === "valid")
							.length
					}
				/>
			</div>

			<div className="flex h-full flex-col space-y-6 overflow-hidden">
				<Card className="flex-shrink-0">
					<CardHeader>
						<CardTitle>Import Depots</CardTitle>
						<CardDescription>
							Upload CSV (Header mapping: depot_name, lat, lon)
						</CardDescription>
					</CardHeader>
					<CardContent>
						{pendingDepots.length === 0 ? (
							<CsvDropzone
								description="Drag & drop depot.csv here"
								onFileSelect={handleDrop}
							/>
						) : (
							<div className="flex items-center justify-between">
								<p className="text-muted-foreground text-sm">
									Reviewing {pendingDepots.length} depots. Valid:{" "}
									{
										validatedPendingDepots.filter(
											(d) => d.validationStatus === "valid",
										).length
									}
								</p>
								<div className="space-x-2">
									<Button
										disabled={bulkCreateMutation.isPending}
										onClick={() => setPendingDepots([])}
										variant="outline"
									>
										Cancel
									</Button>
									<Button
										className="min-w-[140px]"
										disabled={
											validatedPendingDepots.filter(
												(d) => d.validationStatus === "valid",
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
						)}
					</CardContent>
				</Card>

				<Card className="flex min-h-0 flex-1 flex-col overflow-hidden">
					<CardHeader>
						<CardTitle>
							{pendingDepots.length > 0 ? "Review Data" : "Depot List"}
						</CardTitle>
						<CardDescription>
							{pendingDepots.length > 0
								? "Review depots before importing"
								: `${depots.length} depots managed`}
						</CardDescription>
					</CardHeader>
					<CardContent className="flex flex-col overflow-hidden">
						{pendingDepots.length > 0 ? (
							<Tabs className="flex h-full flex-col" defaultValue="valid">
								<TabsList>
									<TabsTrigger value="valid">
										Valid (
										{
											validatedPendingDepots.filter(
												(d) => d.validationStatus === "valid",
											).length
										}
										)
									</TabsTrigger>
									<TabsTrigger value="invalid">
										Invalid (
										{
											validatedPendingDepots.filter(
												(d) => d.validationStatus !== "valid",
											).length
										}
										)
									</TabsTrigger>
								</TabsList>
								<TabsContent className="flex-1 overflow-hidden" value="valid">
									<DataTable
										columns={reviewColumns}
										containerClassName="h-[400px] overflow-y-auto"
										data={validatedPendingDepots.filter(
											(d) => d.validationStatus === "valid",
										)}
										enablePagination={false}
									/>
								</TabsContent>
								<TabsContent className="flex-1 overflow-hidden" value="invalid">
									<DataTable
										columns={reviewColumns}
										containerClassName="h-[400px] overflow-y-auto"
										data={validatedPendingDepots.filter(
											(d) => d.validationStatus !== "valid",
										)}
										enablePagination={false}
									/>
								</TabsContent>
							</Tabs>
						) : (
							<DataTable
								columns={columns}
								containerClassName="h-[450px] overflow-y-auto"
								data={depots}
								enablePagination={false}
								filterColumn="name"
								isLoading={isLoading}
							/>
						)}
					</CardContent>
				</Card>
			</div>

			<DeleteDepotDialog
				depotName={depotToDelete?.name || ""}
				isPending={deleteMutation.isPending}
				onConfirm={() =>
					depotToDelete && deleteMutation.mutate(depotToDelete.id)
				}
				onOpenChange={(open: boolean) => !open && setDepotToDelete(null)}
				open={!!depotToDelete}
			/>

			<EditDepotDialog
				depot={depotToEdit}
				onOpenChange={(open) => !open && setDepotToEdit(null)}
				open={!!depotToEdit}
			/>
		</div>
	);
}
