"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { ColumnDef, Row } from "@tanstack/react-table";
import { Trash2 } from "lucide-react";
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
import type { components } from "~/generated/api-types";
import { api } from "~/lib/api";

type BusRead = components["schemas"]["BusRead"];
interface BusWithDepot extends BusRead {
	depot_name?: string | null;
}

export default function BusesDataPage() {
	const queryClient = useQueryClient();

	const { data: buses = [] } = useQuery({
		queryKey: ["buses"],
		queryFn: () => api.buses.list() as Promise<BusWithDepot[]>,
	});

	const uploadMutation = useMutation({
		mutationFn: api.buses.upload,
		onSuccess: (data) => {
			queryClient.invalidateQueries({ queryKey: ["buses"] });
			toast.success(
				`Imported ${data.created} buses, created ${data.depots_created} depots`,
			);
		},
		onError: (error) => {
			toast.error(`Upload failed: ${error.message}`);
		},
	});

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
			accessorKey: "depot_name",
			header: "Depot",
			cell: ({ row }: { row: Row<BusWithDepot> }) =>
				row.original.depot_name || "Unassigned",
		},
		{
			id: "actions",
			cell: () => (
				<Button disabled size="icon" variant="ghost">
					<Trash2 className="h-4 w-4" />
				</Button>
			),
		},
	];

	return (
		<div className="space-y-6">
			<Card>
				<CardHeader>
					<CardTitle>Import Buses</CardTitle>
					<CardDescription>
						Upload CSV file with bus details (bus_no, capacity, depot_name)
					</CardDescription>
				</CardHeader>
				<CardContent>
					<CsvDropzone
						description="Required columns: bus_no, capacity, depot_name"
						onUpload={(file) => uploadMutation.mutateAsync(file)}
					/>
				</CardContent>
			</Card>

			<Card>
				<CardHeader>
					<CardTitle>Fleet List</CardTitle>
					<CardDescription>{buses.length} buses enrolled</CardDescription>
				</CardHeader>
				<CardContent>
					<DataTable columns={columns} data={buses} filterColumn="bus_no" />
				</CardContent>
			</Card>
		</div>
	);
}
