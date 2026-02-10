"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { ColumnDef } from "@tanstack/react-table";
import { Edit, Trash2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
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
import { DeleteAllDepotsDialog } from "./_components/delete-all-depots-dialog";
import { DeleteDepotDialog } from "./_components/delete-depot-dialog";
import { EditDepotDialog } from "./_components/edit-depot-dialog";

type DepotRead = components["schemas"]["DepotRead"];

export default function DepotsDataPage() {
	const queryClient = useQueryClient();
	const [isDeleteAllOpen, setIsDeleteAllOpen] = useState(false);
	const [depotToDelete, setDepotToDelete] = useState<DepotRead | null>(null);
	const [depotToEdit, setDepotToEdit] = useState<DepotRead | null>(null);

	const { data: depots = [], isLoading } = useQuery({
		queryKey: ["depots"],
		queryFn: api.depots.list,
	});

	const deleteAllMutation = useMutation({
		mutationFn: api.depots.deleteAll,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["depots"] });
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
			toast.success("Depot deleted");
			setDepotToDelete(null);
		},
		onError: (error: Error) => {
			toast.error(`Delete failed: ${error.message}`);
		},
	});

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
			</div>

			<div className="flex h-full flex-col space-y-6 overflow-hidden">
				<Card className="flex min-h-0 flex-1 flex-col overflow-hidden">
					<CardHeader>
						<CardTitle>Depot List</CardTitle>
						<CardDescription>{depots.length} depots managed</CardDescription>
					</CardHeader>
					<CardContent className="flex flex-col overflow-hidden">
						<DataTable
							columns={columns}
							containerClassName="h-[450px] overflow-y-auto"
							data={depots}
							enablePagination={false}
							filterColumn="name"
							isLoading={isLoading}
						/>
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
