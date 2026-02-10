"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

import { Button } from "~/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "~/components/ui/dialog";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { Switch } from "~/components/ui/switch";
import type { components } from "~/generated/api-types";
import { api } from "~/lib/api";

type StopRead = components["schemas"]["StopRead"];
type StopUpdate = components["schemas"]["StopUpdate"];

interface EditStopDialogProps {
	stop: StopRead | null;
	open: boolean;
	onOpenChange: (open: boolean) => void;
}

export function EditStopDialog({
	stop,
	open,
	onOpenChange,
}: EditStopDialogProps) {
	const queryClient = useQueryClient();
	const [formData, setFormData] = useState<StopUpdate>({
		name: "",
		stop_code: "",
		lat: 0,
		lon: 0,
		locality: "",
		zone: "",
		active: true,
	});

	useEffect(() => {
		if (stop) {
			setFormData({
				name: stop.name,
				stop_code: stop.stop_code,
				lat: stop.lat,
				lon: stop.lon,
				locality: stop.locality,
				zone: stop.zone,
				active: stop.active,
			});
		}
	}, [stop]);

	const mutation = useMutation({
		mutationFn: (values: StopUpdate) => {
			if (!stop) throw new Error("No stop selected");
			return api.stops.update(stop.id, values);
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["stops"] });
			toast.success("Stop updated successfully");
			onOpenChange(false);
		},
		onError: (error: Error) => {
			toast.error(`Failed to update stop: ${error.message}`);
		},
	});

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		mutation.mutate(formData);
	};

	const handleChange = (
		field: keyof StopUpdate,
		value: StopUpdate[keyof StopUpdate],
	) => {
		setFormData((prev) => ({ ...prev, [field]: value }));
	};

	return (
		<Dialog onOpenChange={onOpenChange} open={open}>
			<DialogContent className="sm:max-w-[425px]">
				<DialogHeader>
					<DialogTitle>Edit Stop</DialogTitle>
					<DialogDescription>
						Update the details for this stop.
					</DialogDescription>
				</DialogHeader>
				<form className="space-y-4" onSubmit={handleSubmit}>
					<div className="space-y-2">
						<Label htmlFor="name">Name</Label>
						<Input
							id="name"
							onChange={(e) => handleChange("name", e.target.value)}
							placeholder="Stop Name"
							required
							value={formData.name || ""}
						/>
					</div>

					<div className="space-y-2">
						<Label htmlFor="stop_code">Stop Code (Optional)</Label>
						<Input
							id="stop_code"
							onChange={(e) =>
								handleChange("stop_code", e.target.value || null)
							}
							placeholder="STOP-001"
							value={formData.stop_code || ""}
						/>
					</div>

					<div className="grid grid-cols-2 gap-4">
						<div className="space-y-2">
							<Label htmlFor="lat">Latitude</Label>
							<Input
								id="lat"
								onChange={(e) => {
									const val = parseFloat(e.target.value);
									handleChange("lat", Number.isNaN(val) ? null : val);
								}}
								placeholder="0.0"
								step="any"
								type="number"
								value={formData.lat ?? ""}
							/>
						</div>
						<div className="space-y-2">
							<Label htmlFor="lon">Longitude</Label>
							<Input
								id="lon"
								onChange={(e) => {
									const val = parseFloat(e.target.value);
									handleChange("lon", Number.isNaN(val) ? null : val);
								}}
								placeholder="0.0"
								step="any"
								type="number"
								value={formData.lon ?? ""}
							/>
						</div>
					</div>

					<div className="grid grid-cols-2 gap-4">
						<div className="space-y-2">
							<Label htmlFor="locality">Locality</Label>
							<Input
								id="locality"
								onChange={(e) =>
									handleChange("locality", e.target.value || null)
								}
								placeholder="Locality"
								value={formData.locality || ""}
							/>
						</div>
						<div className="space-y-2">
							<Label htmlFor="zone">Zone</Label>
							<Input
								id="zone"
								onChange={(e) => handleChange("zone", e.target.value || null)}
								placeholder="Zone"
								value={formData.zone || ""}
							/>
						</div>
					</div>

					<div className="flex flex-row items-center justify-between rounded-lg border p-4">
						<div className="space-y-0.5">
							<Label className="text-base">Active Status</Label>
						</div>
						<Switch
							checked={!!formData.active}
							onCheckedChange={(checked) => handleChange("active", checked)}
						/>
					</div>

					<DialogFooter>
						<Button
							disabled={mutation.isPending}
							onClick={() => onOpenChange(false)}
							type="button"
							variant="outline"
						>
							Cancel
						</Button>
						<Button disabled={mutation.isPending} type="submit">
							{mutation.isPending && (
								<Loader2 className="mr-2 h-4 w-4 animate-spin" />
							)}
							Save Changes
						</Button>
					</DialogFooter>
				</form>
			</DialogContent>
		</Dialog>
	);
}
