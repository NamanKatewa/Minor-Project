"use client";

import { AlertTriangle } from "lucide-react";
import { nanoid } from "nanoid";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";

interface OptimizationError {
	error_type: string;
	message: string;
	details?: {
		total_students?: number;
		total_capacity?: number;
		buses_available?: number;
		capacity_needed?: number;
		additional_buses_needed?: number;
	};
	suggestions?: string[];
}

interface OptimizationErrorCardProps {
	error: OptimizationError;
	onDismiss: () => void;
}

export function OptimizationErrorCard({
	error,
	onDismiss,
}: OptimizationErrorCardProps) {
	const isCapacityError = error.error_type === "capacity_insufficient";
	const isNoSolutionError = error.error_type === "no_feasible_solution";

	const getTitle = () => {
		if (isCapacityError) return "Capacity Insufficient";
		if (isNoSolutionError) return "No Feasible Solution";
		return "Optimization Failed";
	};

	return (
		<Card className="border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-950/30">
			<CardHeader>
				<CardTitle className="flex items-center gap-2 text-red-800 dark:text-red-200">
					<AlertTriangle className="h-5 w-5" />
					{getTitle()}
				</CardTitle>
			</CardHeader>
			<CardContent className="space-y-4">
				{/* Show message for non-capacity errors */}
				{!isCapacityError && (
					<p className="font-medium text-red-800 dark:text-red-200">
						{error.message}
					</p>
				)}

				{isCapacityError && error.details && (
					<div className="grid grid-cols-2 gap-4 rounded-lg bg-white/50 p-4 dark:bg-black/20">
						<div>
							<p className="text-muted-foreground text-sm">Students</p>
							<p className="font-bold text-red-600 text-xl">
								{error.details.total_students?.toLocaleString()}
							</p>
						</div>
						<div>
							<p className="text-muted-foreground text-sm">Capacity</p>
							<p className="font-bold text-xl">
								{error.details.total_capacity?.toLocaleString()}
							</p>
						</div>
						<div>
							<p className="text-muted-foreground text-sm">Buses Available</p>
							<p className="font-bold text-lg">
								{error.details.buses_available}
							</p>
						</div>
						<div>
							<p className="text-muted-foreground text-sm">
								Additional Buses Needed
							</p>
							<p className="font-bold text-lg text-red-600">
								{error.details.additional_buses_needed}
							</p>
						</div>
					</div>
				)}

				{error.suggestions && (
					<div>
						<p className="mb-2 font-medium text-red-800 dark:text-red-200">
							Suggestions:
						</p>
						<ul className="space-y-1">
							{error.suggestions.map((suggestion) => (
								<li
									className="flex items-start gap-2 text-red-700 text-sm dark:text-red-300"
									key={nanoid()}
								>
									<span className="mt-1">•</span>
									<span>{suggestion}</span>
								</li>
							))}
						</ul>
					</div>
				)}

				<Button className="w-full" onClick={onDismiss} variant="outline">
					Dismiss
				</Button>
			</CardContent>
		</Card>
	);
}
