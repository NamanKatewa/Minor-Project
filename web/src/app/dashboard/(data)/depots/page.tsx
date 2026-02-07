"use client";

import { useQuery } from "@tanstack/react-query";
import type { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "~/components/data-table";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "~/components/ui/card";
import type { components } from "~/generated/api-types";
import { api } from "~/lib/api";

type DepotRead = components["schemas"]["DepotRead"];

export default function DepotsDataPage() {
	const { data: depots = [] } = useQuery({
		queryKey: ["depots"],
		queryFn: api.depots.list,
	});

	const columns: ColumnDef<DepotRead>[] = [
		{
			accessorKey: "name",
			header: "Depot Name",
		},
		{
			id: "loc",
			header: "Location",
			cell: ({ row }) =>
				row.original.lat && row.original.lon
					? `${row.original.lat.toFixed(4)}, ${row.original.lon.toFixed(4)}`
					: "Pending Geocoding",
		},
	];

	return (
		<div className="space-y-6">
			<Card>
				<CardHeader>
					<CardTitle>Depots</CardTitle>
					<CardDescription>
						Bus depots automatically created from bus assignments
					</CardDescription>
				</CardHeader>
				<CardContent>
					<DataTable columns={columns} data={depots} filterColumn="name" />
				</CardContent>
			</Card>
		</div>
	);
}
