"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { Row } from "@tanstack/react-table";
import { Loader2 } from "lucide-react";
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
} from "~/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import type { components } from "~/generated/api-types";
import { api } from "~/lib/api";

type DemandWithStop = components["schemas"]["DemandWithStop"];
type DemandImport = components["schemas"]["DemandImport"];

type DemandValidationStatus = "valid" | "invalid";

interface AugmentedDemand extends DemandImport {
	id: string;
	validationStatus: DemandValidationStatus;
	validationErrors: string[];
}

export default function DemandDataPage() {
	const queryClient = useQueryClient();
	const [pendingDemand, setPendingDemand] = useState<AugmentedDemand[]>([]);
	const [isImportConfirmOpen, setIsImportConfirmOpen] = useState(false);
	const [isDeleteAllOpen, setIsDeleteAllOpen] = useState(false);

	const { data: demand = [], isLoading } = useQuery({
		queryKey: ["demand"],
		queryFn: () => api.demand.list() as Promise<DemandWithStop[]>,
	});

	const { data: stops = [] } = useQuery({
		queryKey: ["stops"],
		queryFn: api.stops.list,
	});

	const bulkCreateMutation = useMutation({
		mutationFn: (data: DemandImport[]) => api.demand.bulkCreate(data),
		onSuccess: (data) => {
			queryClient.invalidateQueries({ queryKey: ["demand"] });
			toast.success(
				`Imported ${data.created} records. Skipped ${data.skipped} (invalid stop codes).`,
			);
			setPendingDemand([]);
			setIsImportConfirmOpen(false);
		},
		onError: (error: Error) => {
			toast.error(`Import failed: ${error.message}`);
			setIsImportConfirmOpen(false);
		},
	});

	const deleteAllMutation = useMutation({
		mutationFn: api.demand.deleteAll,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["demand"] });
			toast.success("All demand data deleted");
			setIsDeleteAllOpen(false);
		},
		onError: (error: Error) => {
			toast.error(`Delete failed: ${error.message}`);
			setIsDeleteAllOpen(false);
		},
	});

	interface CsvRow {
		stop_id?: string;
		stop_code?: string;
		student_count?: string;
	}

	const handleDrop = (file: File) => {
		Papa.parse<CsvRow>(file, {
			header: true,
			skipEmptyLines: true,
			complete: (results) => {
				const parsedDemand: AugmentedDemand[] = results.data.map(
					(row, index) => {
						const errors: string[] = [];
						let status: "valid" | "invalid" = "valid";

						const stopCode = row.stop_id?.trim() || row.stop_code?.trim();
						if (!stopCode) {
							status = "invalid";
							errors.push("Missing Stop Code");
						}

						const count = Number.parseInt(row.student_count || "0", 10);
						if (Number.isNaN(count) || count < 0) {
							status = "invalid";
							errors.push("Invalid student count");
						}

						return {
							id: `temp-${index}`,
							stop_code: stopCode || "",
							student_count: count,
							validationStatus: status,
							validationErrors: errors,
						};
					},
				);

				setPendingDemand(parsedDemand);

				const validCount = parsedDemand.filter(
					(d) => d.validationStatus === "valid",
				).length;
				if (validCount === 0) {
					toast.error("No valid records found in CSV");
				} else {
					toast.success(`Parsed ${validCount} valid records`);
				}
			},
		});
	};

	const validatedPendingDemand = useMemo(() => {
		if (pendingDemand.length === 0) return [];

		const stopCodeMap = new Map(stops.map((s) => [s.stop_code, s.name]));

		return pendingDemand.map((d) => {
			if (d.validationStatus !== "valid") return d;

			let status: DemandValidationStatus = "valid";
			const errors: string[] = [];

			const existingStop = stopCodeMap.get(d.stop_code);
			if (existingStop === undefined) {
				status = "invalid";
				errors.push(`Stop code not found: ${d.stop_code}`);
			}

			return {
				...d,
				validationStatus: status,
				validationErrors: errors,
			};
		});
	}, [pendingDemand, stops]);

	const handleCommit = () => {
		const validCount = validatedPendingDemand.filter(
			(d) => d.validationStatus === "valid",
		).length;
		if (validCount === 0) {
			toast.error("No valid demand to import.");
			return;
		}
		setIsImportConfirmOpen(true);
	};

	const confirmImport = () => {
		const validDemand: DemandImport[] = validatedPendingDemand
			.filter((d) => d.validationStatus === "valid")
			.map(({ stop_code, student_count }) => ({
				stop_code,
				student_count,
			}));

		bulkCreateMutation.mutate(validDemand);
	};

	const columns = [
		{
			accessorKey: "stop_name" as const,
			header: "Stop Name",
			cell: ({ row }: { row: Row<DemandWithStop> }) => {
				const data = row.original;
				return (
					data.stop_name || (
						<span className="text-muted-foreground italic">
							Unknown Stop ({data.stop_id})
						</span>
					)
				);
			},
		},
		{
			accessorKey: "student_count" as const,
			header: "Students",
		},
	];

	const reviewColumns = [
		{
			accessorKey: "stop_code" as const,
			header: "Stop Code",
		},
		{
			accessorKey: "student_count" as const,
			header: "Students",
		},
		{
			header: "Status",
			cell: ({ row }: { row: { original: AugmentedDemand } }) => {
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
		<div className="flex h-full flex-col space-y-6 overflow-hidden">
			<div className="flex items-center justify-between">
				<h2 className="font-bold text-3xl tracking-tight">Demand Data</h2>
				<Button
					disabled={demand.length === 0 || deleteAllMutation.isPending}
					onClick={() => setIsDeleteAllOpen(true)}
					variant="destructive"
				>
					{deleteAllMutation.isPending ? (
						<Loader2 className="mr-2 h-4 w-4 animate-spin" />
					) : null}
					Delete All
				</Button>
			</div>

			<Card className="flex-shrink-0">
				<CardHeader>
					<CardTitle>Import Demand</CardTitle>
					<CardDescription>
						Upload CSV (Header mapping: stop_code, student_count)
					</CardDescription>
				</CardHeader>
				<CardContent>
					{pendingDemand.length === 0 ? (
						<CsvDropzone
							description="Drag & drop demand.csv here"
							onFileSelect={(file) => handleDrop(file)}
						/>
					) : (
						<div className="flex items-center justify-between">
							<p className="text-muted-foreground text-sm">
								Reviewing {pendingDemand.length} records. Valid:{" "}
								{
									validatedPendingDemand.filter(
										(d) => d.validationStatus === "valid",
									).length
								}{" "}
								(
								{validatedPendingDemand
									.filter((d) => d.validationStatus === "valid")
									.reduce((sum, d) => sum + d.student_count, 0)}{" "}
								students)
							</p>
							<div className="space-x-2">
								<Button
									disabled={bulkCreateMutation.isPending}
									onClick={() => setPendingDemand([])}
									variant="outline"
								>
									Cancel
								</Button>
								<Button
									className="min-w-[140px]"
									disabled={
										validatedPendingDemand.filter(
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
						{pendingDemand.length > 0 ? "Review Data" : "Demand List"}
					</CardTitle>
					<CardDescription>
						{pendingDemand.length > 0
							? "Review demand before importing"
							: `${demand.length} stops with demand`}
					</CardDescription>
				</CardHeader>
				<CardContent className="flex-1 overflow-hidden">
					{pendingDemand.length > 0 ? (
						<Tabs className="flex h-full flex-col" defaultValue="valid">
							<TabsList>
								<TabsTrigger value="valid">
									Valid (
									{
										validatedPendingDemand.filter(
											(d) => d.validationStatus === "valid",
										).length
									}
									)
								</TabsTrigger>
								<TabsTrigger value="invalid">
									Invalid (
									{
										validatedPendingDemand.filter(
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
									data={validatedPendingDemand.filter(
										(d) => d.validationStatus === "valid",
									)}
									enablePagination={false}
								/>
							</TabsContent>
							<TabsContent className="flex-1 overflow-hidden" value="invalid">
								<DataTable
									columns={reviewColumns}
									containerClassName="h-[400px] overflow-y-auto"
									data={validatedPendingDemand.filter(
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
							data={demand}
							enablePagination={false}
							filterColumn="stop_name"
							isLoading={isLoading}
						/>
					)}
				</CardContent>
			</Card>

			<Dialog onOpenChange={setIsImportConfirmOpen} open={isImportConfirmOpen}>
				<DialogContent>
					<DialogHeader>
						<DialogTitle>Confirm Import</DialogTitle>
						<DialogDescription>
							Import{" "}
							{
								validatedPendingDemand.filter(
									(d) => d.validationStatus === "valid",
								).length
							}{" "}
							demand records?
						</DialogDescription>
					</DialogHeader>
					<DialogFooter>
						<Button
							onClick={() => setIsImportConfirmOpen(false)}
							variant="outline"
						>
							Cancel
						</Button>
						<Button onClick={confirmImport}>Import</Button>
					</DialogFooter>
				</DialogContent>
			</Dialog>

			<Dialog onOpenChange={setIsDeleteAllOpen} open={isDeleteAllOpen}>
				<DialogContent>
					<DialogHeader>
						<DialogTitle>Delete All Demand?</DialogTitle>
						<DialogDescription>
							This will permanently delete all demand records. This action
							cannot be undone.
						</DialogDescription>
					</DialogHeader>
					<DialogFooter>
						<Button onClick={() => setIsDeleteAllOpen(false)} variant="outline">
							Cancel
						</Button>
						<Button
							onClick={() => deleteAllMutation.mutate()}
							variant="destructive"
						>
							Delete
						</Button>
					</DialogFooter>
				</DialogContent>
			</Dialog>
		</div>
	);
}
