"use client";

import dynamic from "next/dynamic";
import { DashboardLayout } from "~/components/layout";

const MapView = dynamic(() => import("~/components/MapView"), {
	ssr: false,
	loading: () => (
		<div className="flex h-[calc(100vh-8rem)] items-center justify-center rounded-xl border border-slate-200 bg-slate-100 dark:border-slate-700 dark:bg-slate-800">
			<div className="text-lg text-slate-600 dark:text-slate-300">
				Loading map...
			</div>
		</div>
	),
});

export default function DashboardPage() {
	return (
		<DashboardLayout>
			<div className="h-[calc(100vh-8rem)] overflow-hidden rounded-xl border border-slate-200 dark:border-slate-700">
				<MapView />
			</div>
		</DashboardLayout>
	);
}
