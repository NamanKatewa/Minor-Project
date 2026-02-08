"use client";

import {
	type ColumnDef,
	type ColumnFiltersState,
	flexRender,
	getCoreRowModel,
	getFilteredRowModel,
	getPaginationRowModel,
	getSortedRowModel,
	type SortingState,
	useReactTable,
	type VisibilityState,
} from "@tanstack/react-table";
import { ChevronLeft, ChevronRight, SlidersHorizontal } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "~/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuCheckboxItem,
	DropdownMenuContent,
	DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { Input } from "~/components/ui/input";
import {
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "~/components/ui/table";
import { cn } from "~/lib/utils";

interface DataTableProps<TData, TValue> {
	columns: ColumnDef<TData, TValue>[];
	data: TData[];
	filterColumn?: string;
	filterPlaceholder?: string;
	enablePagination?: boolean;
	className?: string;
	containerClassName?: string;
	selectedRowId?: string | null;
	onRowClick?: (row: TData) => void;
	getRowId?: (row: TData, index: number) => string;
}

export function DataTable<TData, TValue>({
	columns,
	data,
	filterColumn,
	filterPlaceholder = "Filter...",
	enablePagination = true,
	className,
	containerClassName,
	selectedRowId,
	onRowClick,
	getRowId,
}: DataTableProps<TData, TValue>) {
	const [sorting, setSorting] = useState<SortingState>([]);
	const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
	const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
	const [rowSelection, setRowSelection] = useState({});

	const table = useReactTable({
		data,
		columns,
		getCoreRowModel: getCoreRowModel(),
		getPaginationRowModel: enablePagination
			? getPaginationRowModel()
			: undefined,
		onSortingChange: setSorting,
		getSortedRowModel: getSortedRowModel(),
		onColumnFiltersChange: setColumnFilters,
		getFilteredRowModel: getFilteredRowModel(),
		onColumnVisibilityChange: setColumnVisibility,
		onRowSelectionChange: setRowSelection,
		getRowId,
		enableRowSelection: true,
		enableMultiRowSelection: false,
		state: {
			sorting,
			columnFilters,
			columnVisibility,
			rowSelection,
		},
	});

	// Sync rowSelection with selectedRowId
	useEffect(() => {
		if (selectedRowId) {
			setRowSelection({ [selectedRowId]: true });
		} else {
			setRowSelection({});
		}
	}, [selectedRowId]);

	// Auto-scroll to selected row
	useEffect(() => {
		if (selectedRowId) {
			const row = document.getElementById(`row-${selectedRowId}`);
			if (row) {
				row.scrollIntoView({ behavior: "smooth", block: "center" });
			}
		}
	}, [selectedRowId]);

	return (
		<div className={cn("space-y-4", className)}>
			<div className="flex items-center justify-between py-4">
				{filterColumn && (
					<Input
						className="max-w-sm"
						onChange={(event) =>
							table.getColumn(filterColumn)?.setFilterValue(event.target.value)
						}
						placeholder={filterPlaceholder}
						value={
							(table.getColumn(filterColumn)?.getFilterValue() as string) ?? ""
						}
					/>
				)}

				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button className="ml-auto" variant="outline">
							<SlidersHorizontal className="mr-2 h-4 w-4" />
							View
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent align="end">
						{table
							.getAllColumns()
							.filter((column) => column.getCanHide())
							.map((column) => {
								return (
									<DropdownMenuCheckboxItem
										checked={column.getIsVisible()}
										className="capitalize"
										key={column.id}
										onCheckedChange={(value) =>
											column.toggleVisibility(!!value)
										}
									>
										{column.id}
									</DropdownMenuCheckboxItem>
								);
							})}
					</DropdownMenuContent>
				</DropdownMenu>
			</div>

			<div
				className={cn(
					"rounded-md border",
					"overflow-auto rounded-md border",
					containerClassName,
				)}
			>
				<table className="w-full caption-bottom text-sm">
					<TableHeader className="sticky top-0 z-10 bg-background shadow-sm">
						{table.getHeaderGroups().map((headerGroup) => (
							<TableRow key={headerGroup.id}>
								{headerGroup.headers.map((header) => {
									return (
										<TableHead key={header.id}>
											{header.isPlaceholder
												? null
												: flexRender(
														header.column.columnDef.header,
														header.getContext(),
													)}
										</TableHead>
									);
								})}
							</TableRow>
						))}
					</TableHeader>
					<TableBody>
						{table.getRowModel().rows?.length ? (
							table.getRowModel().rows.map((row) => {
								return (
									<TableRow
										className={cn(
											"cursor-pointer transition-colors",
											row.getIsSelected()
												? "bg-primary/20 hover:bg-primary/20"
												: "hover:bg-muted/50",
										)}
										data-state={row.getIsSelected() && "selected"}
										id={`row-${row.id}`}
										key={row.id}
										onClick={() => onRowClick?.(row.original)}
									>
										{row.getVisibleCells().map((cell) => (
											<TableCell key={cell.id}>
												{flexRender(
													cell.column.columnDef.cell,
													cell.getContext(),
												)}
											</TableCell>
										))}
									</TableRow>
								);
							})
						) : (
							<TableRow>
								<TableCell
									className="h-24 text-center"
									colSpan={columns.length}
								>
									No results.
								</TableCell>
							</TableRow>
						)}
					</TableBody>
				</table>
			</div>

			{enablePagination && (
				<div className="flex items-center justify-end space-x-2 py-4">
					<Button
						disabled={!table.getCanPreviousPage()}
						onClick={() => table.previousPage()}
						size="sm"
						variant="outline"
					>
						<ChevronLeft className="mr-2 h-4 w-4" />
						Previous
					</Button>
					<Button
						disabled={!table.getCanNextPage()}
						onClick={() => table.nextPage()}
						size="sm"
						variant="outline"
					>
						Next
						<ChevronRight className="ml-2 h-4 w-4" />
					</Button>
				</div>
			)}
		</div>
	);
}
