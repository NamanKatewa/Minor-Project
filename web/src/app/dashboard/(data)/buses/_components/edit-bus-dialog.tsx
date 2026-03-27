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

type BusRead = components["schemas"]["BusRead"];

const formSchema = z.object({
	bus_no: z.string().min(1, "Bus number is required"),
	capacity: z.number().min(1, "Capacity must be at least 1"),
});

interface EditBusDialogProps {
	open: boolean;
	onOpenChange: (open: boolean) => void;
	bus: BusRead | null;
}

export function EditBusDialog({ open, onOpenChange, bus }: EditBusDialogProps) {
	const queryClient = useQueryClient();

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			bus_no: "",
			capacity: 50,
		},
	});

	useEffect(() => {
		if (bus) {
			form.reset({
				bus_no: bus.bus_no,
				capacity: bus.capacity,
			});
		}
	}, [bus, form]);

	const mutation = useMutation({
		mutationFn: (values: z.infer<typeof formSchema>) => {
			if (!bus) throw new Error("No bus selected");
			return api.buses.update(bus.id, values);
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["buses"] });
			toast.success("Bus updated successfully");
			onOpenChange(false);
		},
		onError: (error: Error) => {
			toast.error(`Failed to update bus: ${error.message}`);
		},
	});

	const onSubmit = (values: z.infer<typeof formSchema>) => {
		mutation.mutate(values);
	};

	return (
		<Dialog onOpenChange={onOpenChange} open={open}>
			<DialogContent className="sm:max-w-[425px]">
				<DialogHeader>
					<DialogTitle>Edit Bus</DialogTitle>
					<DialogDescription>
						Make changes to the bus details here. Click save when you're done.
					</DialogDescription>
				</DialogHeader>
				<Form {...form}>
					<form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
						<FormField
							control={form.control}
							name="bus_no"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Bus Number</FormLabel>
									<FormControl>
										<Input placeholder="HR-55-1234" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="capacity"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Capacity</FormLabel>
									<FormControl>
										<Input
											type="number"
											{...field}
											onChange={(e) =>
												field.onChange(Number.parseInt(e.target.value, 10))
											}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
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
