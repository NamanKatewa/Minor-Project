"use client";

import dynamic from "next/dynamic";
import { DashboardLayout } from "~/components/layout";

const MapView = dynamic(() => import("~/components/MapView"), {
	ssr: false,
	loading: () => (
		<div className="flex h-[calc(100vh-8rem)] items-center justify-center border-2 border-foreground bg-background">
			<div className="text-center">
				<div className="mb-4 font-black font-serif text-3xl">MAP INTERFACE</div>
				<div className="font-sans text-muted-foreground text-sm uppercase tracking-widest">
					Loading GPS Data...
				</div>
			</div>
		</div>
	),
});

export default function DashboardPage() {
	return (
		<DashboardLayout>
			<div className="space-y-8">
				<h1 className="font-black font-serif text-7xl uppercase">DASHBOARD</h1>

				<div className="grid grid-cols-4 gap-0">
					<div className="border-foreground border-r bg-background p-8 text-center">
						<div className="mb-2 font-black font-serif text-5xl">247</div>
						<div className="font-sans text-xs uppercase tracking-widest">
							Active Buses
						</div>
					</div>

					<div className="border-foreground border-r bg-foreground p-8 text-center text-background">
						<div className="mb-2 font-black font-serif text-5xl">142</div>
						<div className="font-sans text-xs uppercase tracking-widest">
							Routes
						</div>
					</div>

					<div className="border-foreground border-r bg-accent p-8 text-center text-accent-foreground">
						<div className="mb-2 font-black font-serif text-5xl">94%</div>
						<div className="font-sans text-xs uppercase tracking-widest">
							Efficiency
						</div>
					</div>

					<div className="bg-background p-8 text-center">
						<div className="mb-2 font-black font-serif text-5xl">12.4K</div>
						<div className="font-sans text-xs uppercase tracking-widest">
							Passengers
						</div>
					</div>
				</div>

				<div className="h-[calc(100vh-24rem)] overflow-hidden border-2 border-foreground">
					<MapView />
				</div>
			</div>
		</DashboardLayout>
	);
}
