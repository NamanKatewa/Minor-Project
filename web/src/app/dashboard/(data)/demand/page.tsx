"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { ColumnDef, Row } from "@tanstack/react-table";
import { useState } from "react";
import { toast } from "sonner";
import { CsvDropzone } from "~/components/csv-dropzone";
import { DataTable } from "~/components/data-table";
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
import type { components } from "~/generated/api-types";
import { api } from "~/lib/api";

type DemandRead = components["schemas"]["DemandRead"];
interface DemandWithStopName extends DemandRead {
	stop_name?: string;
}

export default function DemandDataPage() {
	const queryClient = useQueryClient();
	const [selectedSemester, setSelectedSemester] = useState<string>("");

	const { data: semesters = [] } = useQuery({
		queryKey: ["semesters"],
		queryFn: api.demand.semesters,
	});

	if (!selectedSemester && semesters.length > 0 && semesters[0]) {
		setSelectedSemester(semesters[0]);
	}

	const { data: demand = [] } = useQuery({
		queryKey: ["demand", selectedSemester],
		queryFn: () =>
			api.demand.list(selectedSemester) as Promise<DemandWithStopName[]>,
		enabled: !!selectedSemester,
	});

	const uploadMutation = useMutation({
		mutationFn: api.demand.upload,
		onSuccess: (data) => {
			queryClient.invalidateQueries({ queryKey: ["demand"] });
			queryClient.invalidateQueries({ queryKey: ["semesters"] });
			toast.success(`Imported demand with ${data.created} records`);
		},
		onError: (error) => {
			toast.error(`Upload failed: ${error.message}`);
		},
	});

	const columns: ColumnDef<DemandWithStopName>[] = [
		{
			accessorKey: "stop_name",
			header: "Stop Name",
			cell: ({ row }: { row: Row<DemandWithStopName> }) => {
				const data = row.original;
				return data.stop_name || data.stop_id;
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

	return (
		<div className="space-y-6">
			<Card>
				<CardHeader>
					<CardTitle>Import Demand</CardTitle>
					<CardDescription>
						Upload CSV with student counts per stop per semester
					</CardDescription>
				</CardHeader>
				<CardContent>
					<CsvDropzone
						description="Required columns: stop_id (matches stop name), student_count, semester"
						onUpload={(file) => uploadMutation.mutateAsync(file)}
					/>
				</CardContent>
			</Card>

			<Card>
				<CardHeader className="flex flex-row items-center justify-between">
					<div>
						<CardTitle>Demand Data</CardTitle>
						<CardDescription>Student distribution across stops</CardDescription>
					</div>
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
				</CardHeader>
				<CardContent>
					<DataTable columns={columns} data={demand} filterColumn="stop_name" />
				</CardContent>
			</Card>
		</div>
	);
}
