"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { ColumnDef, Row } from "@tanstack/react-table";
import { Loader2 } from "lucide-react";
import Papa from "papaparse";
import { useMemo, useState } from "react";
import { toast } from "sonner";
import { CsvDropzone } from "~/components/csv-dropzone";
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
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "~/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import type { components } from "~/generated/api-types";
import { api } from "~/lib/api";
import { DeleteAllDemandDialog } from "./_components/delete-all-demand-dialog";
import { ImportDemandDialog } from "./_components/import-demand-dialog";

type DemandWithStop = components["schemas"]["DemandWithStop"];
type DemandImport = components["schemas"]["DemandImport"];

interface AugmentedDemandImport extends DemandImport {
	id: string;
	validationStatus: "valid" | "invalid";
	validationErrors: string[];
}

export default function DemandDataPage() {
	const queryClient = useQueryClient();
	const [selectedSemester, setSelectedSemester] = useState<string>("");
	const [pendingDemand, setPendingDemand] = useState<AugmentedDemandImport[]>(
		[],
	);
	const [isImportConfirmOpen, setIsImportConfirmOpen] = useState(false);
	const [isDeleteAllOpen, setIsDeleteAllOpen] = useState(false);

	const { data: semesters = [] } = useQuery({
		queryKey: ["semesters"],
		queryFn: api.demand.semesters,
	});

	if (!selectedSemester && semesters.length > 0 && semesters[0]) {
		setSelectedSemester(semesters[0]);
	}

	const { data: demand = [], isLoading } = useQuery({
		queryKey: ["demand", selectedSemester],
		queryFn: () =>
			api.demand.list(selectedSemester) as Promise<DemandWithStop[]>,
		enabled: !!selectedSemester,
	});

	const bulkCreateMutation = useMutation({
		mutationFn: api.demand.bulkCreate,
		onSuccess: (data) => {
			queryClient.invalidateQueries({ queryKey: ["demand"] });
			queryClient.invalidateQueries({ queryKey: ["semesters"] });
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
			queryClient.invalidateQueries({ queryKey: ["semesters"] });
			toast.success("All demand data deleted");
			setIsDeleteAllOpen(false);
			setSelectedSemester("");
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
		semester?: string;
	}

	const handleDrop = (file: File) => {
		Papa.parse<CsvRow>(file, {
			header: true,
			skipEmptyLines: true,
			complete: (results) => {
				const parsedDemand: AugmentedDemandImport[] = results.data.map(
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
							errors.push("Invalid Student Count");
						}

						if (!row.semester?.trim()) {
							status = "invalid";
							errors.push("Missing Semester");
						}

						return {
							id: `temp-${index}`,
							stop_code: stopCode || "",
							student_count: count,
							semester: row.semester?.trim() || "",
							validationStatus: status,
							validationErrors: errors,
						};
					},
				);
				setPendingDemand(parsedDemand);
				toast.info(
					`Parsed ${parsedDemand.length} rows. Please review before importing.`,
				);
			},
			error: (error: Error) => {
				toast.error(`Failed to parse CSV: ${error.message}`);
			},
		});
	};

	const validatedPendingDemand = useMemo(() => pendingDemand, [pendingDemand]);

	const handleCommit = () => {
		const validDemand = validatedPendingDemand.filter(
			(d) => d.validationStatus === "valid",
		);
		if (validDemand.length === 0) {
			toast.error("No valid demand records to import.");
			return;
		}
		setIsImportConfirmOpen(true);
	};

	const confirmImport = () => {
		const validDemand = validatedPendingDemand
			.filter((d) => d.validationStatus === "valid")
			.map(({ stop_code, student_count, semester }) => ({
				stop_code,
				student_count,
				semester,
			}));

		bulkCreateMutation.mutate(validDemand);
	};

	const columns: ColumnDef<DemandWithStop>[] = [
		{
			accessorKey: "stop_name",
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
			accessorKey: "student_count",
			header: "Students",
		},
		{
			accessorKey: "semester",
			header: "Semester",
		},
	];

	const reviewColumns: ColumnDef<AugmentedDemandImport>[] = [
		{
			accessorKey: "stop_code",
			header: "Stop Code",
		},
		{
			accessorKey: "student_count",
			header: "Students",
		},
		{
			accessorKey: "semester",
			header: "Semester",
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
				<h2 className="font-bold text-3xl tracking-tight">Demand Management</h2>
				<DeleteAllDemandDialog
					isDisabled={demand.length === 0 && semesters.length === 0}
					isPending={deleteAllMutation.isPending}
					onConfirm={() => deleteAllMutation.mutate()}
					onOpenChange={setIsDeleteAllOpen}
					open={isDeleteAllOpen}
				/>
				<ImportDemandDialog
					isPending={bulkCreateMutation.isPending}
					onConfirm={confirmImport}
					onOpenChange={setIsImportConfirmOpen}
					open={isImportConfirmOpen}
					totalCount={validatedPendingDemand.length}
					validCount={
						validatedPendingDemand.filter((d) => d.validationStatus === "valid")
							.length
					}
				/>
			</div>

			<div className="flex h-full flex-col space-y-6 overflow-hidden">
				<Card className="flex-shrink-0">
					<CardHeader>
						<CardTitle>Import Demand</CardTitle>
						<CardDescription>
							Upload CSV (Header mapping: stop_code, student_count, semester)
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
									}
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
					<CardHeader className="flex flex-row items-center justify-between">
						<div>
							<CardTitle className="flex items-center gap-2">
								{pendingDemand.length > 0 ? "Review Data" : "Demand Data"}
								{pendingDemand.length === 0 &&
									!isLoading &&
									demand.length > 0 && (
										<Badge className="font-mono" variant="secondary">
											{demand.length} records
										</Badge>
									)}
							</CardTitle>
							<CardDescription>
								{pendingDemand.length > 0
									? "Review demand records before importing"
									: "Student distribution across stops"}
							</CardDescription>
						</div>
						{pendingDemand.length === 0 && (
							<div className="w-[200px]">
								<Select
									onValueChange={setSelectedSemester}
									value={selectedSemester}
								>
									<SelectTrigger>
										<SelectValue placeholder="Select Semester" />
									</SelectTrigger>
									<SelectContent>
										{semesters.map((sem: string) => (
											<SelectItem key={sem} value={sem}>
												{sem}
											</SelectItem>
										))}
									</SelectContent>
								</Select>
							</div>
						)}
					</CardHeader>
					<CardContent className="flex flex-col overflow-hidden">
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
			</div>
		</div>
	);
}
