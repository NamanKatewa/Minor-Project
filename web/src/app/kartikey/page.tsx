"use client";

import type React from "react";

const Dashboard = () => {
	return (
		<div className="flex min-h-screen bg-gray-100">
			{/* ===== Sidebar ===== */}
			<aside className="w-64 border-r bg-white shadow-sm">
				<div className="p-5 font-bold text-blue-600 text-xl">Bus Optimizer</div>
				<nav className="space-y-2 px-4 text-gray-700">
					<SidebarItem active label="Dashboard" />
					<SidebarItem label="Stops" />
					<SidebarItem label="Demand" />
					<SidebarItem label="Fleet" />
					<SidebarItem label="Scenarios" />
					<SidebarItem label="Optimization" />
					<SidebarItem label="Comparison" />
					<SidebarItem label="Exports" />
				</nav>
			</aside>

			{/* ===== Main Content ===== */}
			<main className="flex-1 space-y-6 p-6">
				{/* ===== Top Control Bar ===== */}
				<div className="flex items-center justify-between rounded-lg bg-white p-4 shadow-sm">
					<div className="flex gap-4">
						<select className="rounded border px-3 py-2">
							<option>Semester Plan v1</option>
							<option>Semester Plan v2</option>
						</select>

						<div className="flex overflow-hidden rounded border">
							<button className="bg-blue-600 px-4 py-2 text-white">
								Morning
							</button>
							<button className="bg-white px-4 py-2">Evening</button>
						</div>
					</div>

					<button className="rounded bg-green-600 px-5 py-2 text-white">
						Run Optimization
					</button>
				</div>

				{/* ===== KPI Cards ===== */}
				<div className="grid grid-cols-1 gap-4 md:grid-cols-4">
					<KpiCard title="Total Stops" value="102" />
					<KpiCard title="Active Buses" value="40" />
					<KpiCard title="Students" value="1,860" />
					<KpiCard title="Avg Load" value="78%" />
				</div>

				{/* ===== Map + Route Summary ===== */}
				<div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
					{/* Map Placeholder */}
					<div className="rounded-lg bg-white p-4 shadow-sm lg:col-span-2">
						<h3 className="mb-3 font-semibold">Route Map</h3>
						<div className="flex h-96 items-center justify-center rounded bg-gray-200">
							<span className="text-gray-500">
								Map Visualization Placeholder
							</span>
						</div>
					</div>

					{/* Route Summary */}
					<div className="rounded-lg bg-white p-4 shadow-sm">
						<h3 className="mb-3 font-semibold">Routes Summary</h3>

						<RouteCard
							bus="Bus 12"
							load="85%"
							status="ok"
							stops={14}
							time="96 min"
						/>
						<RouteCard
							bus="Bus 08"
							load="92%"
							status="warning"
							stops={16}
							time="110 min"
						/>
						<RouteCard
							bus="Bus 21"
							load="70%"
							status="ok"
							stops={12}
							time="88 min"
						/>
					</div>
				</div>

				{/* ===== Table View ===== */}
				<div className="rounded-lg bg-white p-4 shadow-sm">
					<h3 className="mb-3 font-semibold">Bus Schedule Table</h3>

					<table className="w-full border text-sm">
						<thead className="bg-gray-100">
							<tr>
								<TableHead>Bus</TableHead>
								<TableHead>Stops</TableHead>
								<TableHead>Start</TableHead>
								<TableHead>Arrival</TableHead>
								<TableHead>Duration</TableHead>
								<TableHead>Max Load</TableHead>
							</tr>
						</thead>
						<tbody>
							<TableRow
								arrival="07:46"
								bus="Bus 12"
								duration="96 min"
								load="85%"
								start="06:10"
								stops="14"
							/>
							<TableRow
								arrival="07:55"
								bus="Bus 08"
								duration="110 min"
								load="92%"
								start="06:05"
								stops="16"
							/>
							<TableRow
								arrival="07:48"
								bus="Bus 21"
								duration="88 min"
								load="70%"
								start="06:20"
								stops="12"
							/>
						</tbody>
					</table>
				</div>
			</main>
		</div>
	);
};

/* ===== Reusable Components ===== */

const SidebarItem = ({
	label,
	active = false,
}: {
	label: string;
	active?: boolean;
}) => (
	<div
		className={`cursor-pointer rounded px-3 py-2 ${
			active ? "bg-blue-100 text-blue-700" : "hover:bg-gray-100"
		}`}
	>
		{label}
	</div>
);

const KpiCard = ({ title, value }: { title: string; value: string }) => (
	<div className="rounded-lg bg-white p-4 shadow-sm">
		<p className="text-gray-500 text-sm">{title}</p>
		<p className="mt-1 font-bold text-2xl">{value}</p>
	</div>
);

const RouteCard = ({
	bus,
	stops,
	time,
	load,
	status,
}: {
	bus: string;
	stops: number;
	time: string;
	load: string;
	status: "ok" | "warning";
}) => (
	<div className="mb-3 rounded border p-3">
		<div className="flex justify-between font-medium">
			<span>{bus}</span>
			<span>{status === "ok" ? "✅" : "⚠️"}</span>
		</div>
		<p className="text-gray-600 text-sm">
			{stops} stops • {time} • Load {load}
		</p>
	</div>
);

const TableHead = ({ children }: { children: React.ReactNode }) => (
	<th className="border px-3 py-2 text-left">{children}</th>
);

const TableRow = ({
	bus,
	stops,
	start,
	arrival,
	duration,
	load,
}: {
	bus: string;
	stops: string;
	start: string;
	arrival: string;
	duration: string;
	load: string;
}) => (
	<tr>
		<td className="border px-3 py-2">{bus}</td>
		<td className="border px-3 py-2">{stops}</td>
		<td className="border px-3 py-2">{start}</td>
		<td className="border px-3 py-2">{arrival}</td>
		<td className="border px-3 py-2">{duration}</td>
		<td className="border px-3 py-2">{load}</td>
	</tr>
);

export default Dashboard;
