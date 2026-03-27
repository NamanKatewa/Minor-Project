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
import { DeleteAllBusesDialog } from "./_components/delete-all-buses-dialog";
import { DeleteBusDialog } from "./_components/delete-bus-dialog";
import { EditBusDialog } from "./_components/edit-bus-dialog";
import { ImportBusesDialog } from "./_components/import-buses-dialog";

type BusRead = components["schemas"]["BusRead"];

interface BusWithDepot extends BusRead {
	depot_name?: string | null;
}

interface AugmentedBusImport {
	id: string;
	bus_no: string;
	capacity: number;
	validationStatus: "valid" | "invalid";
	validationErrors: string[];
}

export default function BusesDataPage() {
	const queryClient = useQueryClient();
	const [pendingBuses, setPendingBuses] = useState<AugmentedBusImport[]>([]);
	const [isImportConfirmOpen, setIsImportConfirmOpen] = useState(false);
	const [isDeleteAllOpen, setIsDeleteAllOpen] = useState(false);
	const [busToDelete, setBusToDelete] = useState<BusWithDepot | null>(null);
	const [busToEdit, setBusToEdit] = useState<BusWithDepot | null>(null);

	const { data: buses = [], isLoading } = useQuery({
		queryKey: ["buses"],
		queryFn: () => api.buses.list() as Promise<BusWithDepot[]>,
	});

	const bulkCreateMutation = useMutation({
		mutationFn: api.buses.bulkCreate,
		onSuccess: (data) => {
			queryClient.invalidateQueries({ queryKey: ["buses"] });
			queryClient.invalidateQueries({ queryKey: ["depots"] });
			toast.success(
				`Imported ${data.created} buses, created ${data.depots_created} depots`,
			);
			setPendingBuses([]);
			setIsImportConfirmOpen(false);
		},
		onError: (error: Error) => {
			toast.error(`Import failed: ${error.message}`);
			setIsImportConfirmOpen(false);
		},
	});

	const deleteAllMutation = useMutation({
		mutationFn: api.buses.deleteAll,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["buses"] });
			queryClient.invalidateQueries({ queryKey: ["depots"] });
			toast.success("All buses deleted");
			setIsDeleteAllOpen(false);
		},
		onError: (error: Error) => {
			toast.error(`Delete failed: ${error.message}`);
			setIsDeleteAllOpen(false);
		},
	});

	const deleteMutation = useMutation({
		mutationFn: api.buses.delete,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["buses"] });
			queryClient.invalidateQueries({ queryKey: ["depots"] });
			toast.success("Bus deleted");
			setBusToDelete(null);
		},
		onError: (error: Error) => {
			toast.error(`Delete failed: ${error.message}`);
		},
	});

	interface CsvRow {
		bus_no?: string;
		capacity?: string;
	}

	const handleDrop = (file: File) => {
		Papa.parse<CsvRow>(file, {
			header: true,
			skipEmptyLines: true,
			complete: (results) => {
				const parsedBuses: AugmentedBusImport[] = results.data.map(
					(row, index) => {
						const errors: string[] = [];
						let status: "valid" | "invalid" = "valid";

						if (!row.bus_no?.trim()) {
							status = "invalid";
							errors.push("Missing Bus No");
						}

						const capacity = Number.parseInt(row.capacity || "50", 10);
						if (Number.isNaN(capacity) || capacity <= 0) {
							status = "invalid";
							errors.push("Invalid Capacity");
						}

						return {
							id: `temp-${index}`,
							bus_no: row.bus_no?.trim() || "",
							capacity,
							validationStatus: status,
							validationErrors: errors,
						};
					},
				);
				setPendingBuses(parsedBuses);
				toast.info(
					`Parsed ${parsedBuses.length} rows. Please review before importing.`,
				);
			},
			error: (error: Error) => {
				toast.error(`Failed to parse CSV: ${error.message}`);
			},
		});
	};

	const validatedPendingBuses = useMemo(() => pendingBuses, [pendingBuses]);

	const handleCommit = () => {
		const validBuses = validatedPendingBuses.filter(
			(b) => b.validationStatus === "valid",
		);
		if (validBuses.length === 0) {
			toast.error("No valid buses to import.");
			return;
		}
		setIsImportConfirmOpen(true);
	};

	const confirmImport = () => {
		const validBuses = validatedPendingBuses
			.filter((b) => b.validationStatus === "valid")
			.map(({ bus_no, capacity }) => ({
				bus_no,
				capacity,
			}));

		bulkCreateMutation.mutate(validBuses);
	};

	const columns: ColumnDef<BusWithDepot>[] = [
		{
			accessorKey: "bus_no",
			header: "Bus Number",
		},
		{
			accessorKey: "capacity",
			header: "Capacity",
		},
		{
			id: "actions",
			cell: ({ row }) => (
				<div className="flex justify-end gap-2">
					<Button
						onClick={() => setBusToEdit(row.original)}
						size="icon"
						variant="ghost"
					>
						<Edit className="h-4 w-4" />
					</Button>
					<Button
						className="text-destructive hover:text-destructive"
						onClick={() => setBusToDelete(row.original)}
						size="icon"
						variant="ghost"
					>
						<Trash2 className="h-4 w-4" />
					</Button>
				</div>
			),
		},
	];

	const reviewColumns: ColumnDef<AugmentedBusImport>[] = [
		{
			accessorKey: "bus_no",
			header: "Bus No",
		},
		{
			accessorKey: "capacity",
			header: "Capacity",
		},
		{
			header: "Status",
			cell: ({ row }) => {
				const { validationStatus, validationErrors } = row.original;
				const color =
					validationStatus === "valid" ? "text-green-600" : "text-red-600";
				return (
					<div className={`flex flex-col ${color}`}>
						<span className="font-bold capitalize">{validationStatus}</span>
						{validationErrors.map((err) => (
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
				<h2 className="font-bold text-3xl tracking-tight">Fleet Management</h2>
				<DeleteAllBusesDialog
					isDisabled={buses.length === 0}
					isPending={deleteAllMutation.isPending}
					onConfirm={() => deleteAllMutation.mutate()}
					onOpenChange={setIsDeleteAllOpen}
					open={isDeleteAllOpen}
				/>
				<ImportBusesDialog
					isPending={bulkCreateMutation.isPending}
					onConfirm={confirmImport}
					onOpenChange={setIsImportConfirmOpen}
					open={isImportConfirmOpen}
					totalCount={validatedPendingBuses.length}
					validCount={
						validatedPendingBuses.filter((b) => b.validationStatus === "valid")
							.length
					}
				/>
			</div>

			<div className="flex h-full flex-col space-y-6 overflow-hidden">
				<Card className="flex-shrink-0">
					<CardHeader>
						<CardTitle>Import Buses</CardTitle>
						<CardDescription>
							Upload CSV (Header mapping: bus_no, capacity)
						</CardDescription>
					</CardHeader>
					<CardContent>
						{pendingBuses.length === 0 ? (
							<CsvDropzone
								description="Drag & drop buses.csv here"
								onFileSelect={(file) => handleDrop(file)}
							/>
						) : (
							<div className="flex items-center justify-between">
								<p className="text-muted-foreground text-sm">
									Reviewing {pendingBuses.length} buses. Valid:{" "}
									{
										validatedPendingBuses.filter(
											(b) => b.validationStatus === "valid",
										).length
									}
								</p>
								<div className="space-x-2">
									<Button
										disabled={bulkCreateMutation.isPending}
										onClick={() => setPendingBuses([])}
										variant="outline"
									>
										Cancel
									</Button>
									<Button
										className="min-w-[140px]"
										disabled={
											validatedPendingBuses.filter(
												(b) => b.validationStatus === "valid",
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
							{pendingBuses.length > 0 ? "Review Data" : "Fleet List"}
						</CardTitle>
						<CardDescription>
							{pendingBuses.length > 0
								? "Review buses before importing"
								: `${buses.length} buses in fleet`}
						</CardDescription>
					</CardHeader>
					<CardContent className="flex flex-col overflow-hidden">
						{pendingBuses.length > 0 ? (
							<Tabs className="flex h-full flex-col" defaultValue="valid">
								<TabsList>
									<TabsTrigger value="valid">
										Valid (
										{
											validatedPendingBuses.filter(
												(b) => b.validationStatus === "valid",
											).length
										}
										)
									</TabsTrigger>
									<TabsTrigger value="invalid">
										Invalid (
										{
											validatedPendingBuses.filter(
												(b) => b.validationStatus !== "valid",
											).length
										}
										)
									</TabsTrigger>
								</TabsList>
								<TabsContent className="flex-1 overflow-hidden" value="valid">
									<DataTable
										columns={reviewColumns}
										containerClassName="h-[400px] overflow-y-auto"
										data={validatedPendingBuses.filter(
											(b) => b.validationStatus === "valid",
										)}
										enablePagination={false}
									/>
								</TabsContent>
								<TabsContent className="flex-1 overflow-hidden" value="invalid">
									<DataTable
										columns={reviewColumns}
										containerClassName="h-[400px] overflow-y-auto"
										data={validatedPendingBuses.filter(
											(b) => b.validationStatus !== "valid",
										)}
										enablePagination={false}
									/>
								</TabsContent>
							</Tabs>
						) : (
							<DataTable
								columns={columns}
								containerClassName="h-[450px] overflow-y-auto"
								data={buses}
								enablePagination={false}
								filterColumn="bus_no"
								isLoading={isLoading}
							/>
						)}
					</CardContent>
				</Card>
			</div>

			<DeleteBusDialog
				busNumber={busToDelete?.bus_no || ""}
				isPending={deleteMutation.isPending}
				onConfirm={() => busToDelete && deleteMutation.mutate(busToDelete.id)}
				onOpenChange={(open) => !open && setBusToDelete(null)}
				open={!!busToDelete}
			/>

			<EditBusDialog
				bus={busToEdit}
				onOpenChange={(open) => !open && setBusToEdit(null)}
				open={!!busToEdit}
			/>
		</div>
	);
}
