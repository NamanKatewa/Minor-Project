"use client";

import { Loader2 } from "lucide-react";

export function OptimizationLoadingWarning() {
	return (
		<div className="flex items-center gap-3 rounded-lg border border-blue-200 bg-blue-50 p-4 dark:border-blue-900 dark:bg-blue-950/30">
			<Loader2 className="h-5 w-5 animate-spin text-blue-600" />
			<div>
				<p className="font-medium text-blue-800 text-sm">
					Optimization in progress...
				</p>
				<p className="text-blue-700 text-sm">
					This may take up to 1 hour. You can navigate away and come back
					later.
				</p>
			</div>
		</div>
	);
}
