"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { Button } from "~/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "~/components/ui/dialog";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import type { components } from "~/generated/api-types";
import { api } from "~/lib/api";

type DepotRead = components["schemas"]["DepotRead"];

const formSchema = z.object({
	name: z.string().min(1, "Name is required"),
	lat: z.number().nullable().optional(),
	lon: z.number().nullable().optional(),
});

interface EditDepotDialogProps {
	open: boolean;
	onOpenChange: (open: boolean) => void;
	depot: DepotRead | null;
}

export function EditDepotDialog({
	open,
	onOpenChange,
	depot,
}: EditDepotDialogProps) {
	const queryClient = useQueryClient();

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			name: "",
			lat: null,
			lon: null,
		},
	});

	useEffect(() => {
		if (depot) {
			form.reset({
				name: depot.name,
				lat: depot.lat,
				lon: depot.lon,
			});
		}
	}, [depot, form]);

	const mutation = useMutation({
		mutationFn: (values: z.infer<typeof formSchema>) => {
			if (!depot) throw new Error("No depot selected");
			return api.depots.update(depot.id, values);
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["depots"] });
			queryClient.invalidateQueries({ queryKey: ["buses"] });
			toast.success("Depot updated successfully");
			onOpenChange(false);
		},
		onError: (error: Error) => {
			toast.error(`Failed to update depot: ${error.message}`);
		},
	});

	const onSubmit = (values: z.infer<typeof formSchema>) => {
		mutation.mutate(values);
	};

	return (
		<Dialog onOpenChange={onOpenChange} open={open}>
			<DialogContent className="sm:max-w-[425px]">
				<DialogHeader>
					<DialogTitle>Edit Depot</DialogTitle>
					<DialogDescription>
						Update the depot details. Coordinates are optional.
					</DialogDescription>
				</DialogHeader>
				<Form {...form}>
					<form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
						<FormField
							control={form.control}
							name="name"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Name</FormLabel>
									<FormControl>
										<Input placeholder="Depot Name" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<div className="grid grid-cols-2 gap-4">
							<FormField
								control={form.control}
								name="lat"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Latitude</FormLabel>
										<FormControl>
											<Input
												step="any"
												type="number"
												{...field}
												onChange={(e) => {
													const val = e.target.value;
													field.onChange(val === "" ? null : Number(val));
												}}
												value={field.value ?? ""}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="lon"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Longitude</FormLabel>
										<FormControl>
											<Input
												step="any"
												type="number"
												{...field}
												onChange={(e) => {
													const val = e.target.value;
													field.onChange(val === "" ? null : Number(val));
												}}
												value={field.value ?? ""}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						</div>
						<DialogFooter>
							<Button disabled={mutation.isPending} type="submit">
								{mutation.isPending ? "Saving..." : "Save changes"}
							</Button>
						</DialogFooter>
					</form>
				</Form>
			</DialogContent>
		</Dialog>
	);
}
