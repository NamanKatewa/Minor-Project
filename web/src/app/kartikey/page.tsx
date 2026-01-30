"use client";

import React from "react";

const Dashboard = () => {
  return (
    <div className="flex min-h-screen bg-gray-100">
      
      {/* ===== Sidebar ===== */}
      <aside className="w-64 bg-white border-r shadow-sm">
        <div className="p-5 text-xl font-bold text-blue-600">
          Bus Optimizer
        </div>
        <nav className="px-4 space-y-2 text-gray-700">
          <SidebarItem label="Dashboard" active />
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
      <main className="flex-1 p-6 space-y-6">

        {/* ===== Top Control Bar ===== */}
        <div className="flex items-center justify-between bg-white p-4 rounded-lg shadow-sm">
          <div className="flex gap-4">
            <select className="border rounded px-3 py-2">
              <option>Semester Plan v1</option>
              <option>Semester Plan v2</option>
            </select>

            <div className="flex border rounded overflow-hidden">
              <button className="px-4 py-2 bg-blue-600 text-white">
                Morning
              </button>
              <button className="px-4 py-2 bg-white">
                Evening
              </button>
            </div>
          </div>

          <button className="bg-green-600 text-white px-5 py-2 rounded">
            Run Optimization
          </button>
        </div>

        {/* ===== KPI Cards ===== */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <KpiCard title="Total Stops" value="102" />
          <KpiCard title="Active Buses" value="40" />
          <KpiCard title="Students" value="1,860" />
          <KpiCard title="Avg Load" value="78%" />
        </div>

        {/* ===== Map + Route Summary ===== */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">

          {/* Map Placeholder */}
          <div className="lg:col-span-2 bg-white rounded-lg shadow-sm p-4">
            <h3 className="font-semibold mb-3">Route Map</h3>
            <div className="h-96 bg-gray-200 flex items-center justify-center rounded">
              <span className="text-gray-500">
                Map Visualization Placeholder
              </span>
            </div>
          </div>

          {/* Route Summary */}
          <div className="bg-white rounded-lg shadow-sm p-4">
            <h3 className="font-semibold mb-3">Routes Summary</h3>

            <RouteCard bus="Bus 12" stops={14} time="96 min" load="85%" status="ok" />
            <RouteCard bus="Bus 08" stops={16} time="110 min" load="92%" status="warning" />
            <RouteCard bus="Bus 21" stops={12} time="88 min" load="70%" status="ok" />
          </div>
        </div>

        {/* ===== Table View ===== */}
        <div className="bg-white rounded-lg shadow-sm p-4">
          <h3 className="font-semibold mb-3">Bus Schedule Table</h3>

          <table className="w-full text-sm border">
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
              <TableRow bus="Bus 12" stops="14" start="06:10" arrival="07:46" duration="96 min" load="85%" />
              <TableRow bus="Bus 08" stops="16" start="06:05" arrival="07:55" duration="110 min" load="92%" />
              <TableRow bus="Bus 21" stops="12" start="06:20" arrival="07:48" duration="88 min" load="70%" />
            </tbody>
          </table>
        </div>

      </main>
    </div>
  );
};

/* ===== Reusable Components ===== */

const SidebarItem = ({ label, active = false }: { label: string; active?: boolean }) => (
  <div
    className={`px-3 py-2 rounded cursor-pointer ${
      active ? "bg-blue-100 text-blue-700" : "hover:bg-gray-100"
    }`}
  >
    {label}
  </div>
);

const KpiCard = ({ title, value }: { title: string; value: string }) => (
  <div className="bg-white p-4 rounded-lg shadow-sm">
    <p className="text-sm text-gray-500">{title}</p>
    <p className="text-2xl font-bold mt-1">{value}</p>
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
  <div className="border rounded p-3 mb-3">
    <div className="flex justify-between font-medium">
      <span>{bus}</span>
      <span>{status === "ok" ? "✅" : "⚠️"}</span>
    </div>
    <p className="text-sm text-gray-600">
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
