"use client";

import { usePathname, useRouter } from "next/navigation";
import { Tabs, TabsList, TabsTrigger } from "~/components/ui/tabs";

export default function DataLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const router = useRouter();
	const pathname = usePathname();

	// Extract the last segment of the path
	const segment = pathname.split("/").pop();
	const activeTab = ["stops", "buses", "demand", "depots"].includes(
		segment || "",
	)
		? segment
		: "stops";

	return (
		<div className="flex-1 space-y-4 p-8 pt-6">
			<div className="flex items-center justify-between space-y-2">
				<h2 className="font-bold text-3xl tracking-tight">Data Management</h2>
			</div>
			<Tabs
				className="space-y-4"
				onValueChange={(value) => router.push(`/dashboard/data/${value}`)}
				value={activeTab}
			>
				<TabsList>
					<TabsTrigger value="stops">Stops</TabsTrigger>
					<TabsTrigger value="buses">Buses</TabsTrigger>
					<TabsTrigger value="demand">Demand</TabsTrigger>
					<TabsTrigger value="depots">Depots</TabsTrigger>
				</TabsList>
				{children}
			</Tabs>
		</div>
	);
}
