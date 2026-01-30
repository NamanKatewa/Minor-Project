"use client";

import React from "react";

const Dashboard = () => {
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md p-4">
        <h2 className="text-xl font-semibold mb-6">Menu</h2>
        <ul className="space-y-4 text-gray-700">
          <li className="cursor-pointer hover:text-black">Dashboard</li>
          <li className="cursor-pointer hover:text-black">Routes</li>
          <li className="cursor-pointer hover:text-black">Bus Stops</li>
          <li className="cursor-pointer hover:text-black">Buses</li>
          <li className="cursor-pointer hover:text-black">Analytics</li>
        </ul>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col">
        {/* Header */}
        <header className="flex items-center justify-between bg-white px-6 py-4 shadow-sm">
          <h1 className="text-2xl font-bold">Bus Route Optimization</h1>
          <div className="relative">
            <button className="border rounded-full px-4 py-2">Account</button>
          </div>
        </header>

        {/* Content Area */}
        <section className="flex-1 p-6 grid grid-cols-3 gap-6">
          {/* Map View */}
          <div className="col-span-2 bg-white rounded-lg shadow-md p-4">
            <h3 className="text-lg font-semibold mb-2">Map View</h3>
            <div className="h-64 bg-gray-200 flex items-center justify-center rounded">
              <span className="text-gray-600">Map (Routes, Stops, Start & End)</span>
            </div>
          </div>

          {/* Route Information Panel */}
          <div className="bg-white rounded-lg shadow-md p-4">
            <h3 className="text-lg font-semibold mb-4">Route Information</h3>
            <div className="space-y-3">
              <div>
                <label className="text-sm text-gray-600">Distance</label>
                <div className="border rounded px-3 py-2">-- km</div>
              </div>
              <div>
                <label className="text-sm text-gray-600">Estimated Time</label>
                <div className="border rounded px-3 py-2">-- mins</div>
              </div>
              <div>
                <label className="text-sm text-gray-600">Number of Stops</label>
                <div className="border rounded px-3 py-2">--</div>
              </div>
              <div>
                <label className="text-sm text-gray-600">Bus Name</label>
                <select className="w-full border rounded px-3 py-2">
                  <option>Select Bus</option>
                  <option>Bus 1</option>
                  <option>Bus 2</option>
                </select>
              </div>
            </div>
          </div>
        </section>

        {/* Optimize Button */}
        <div className="p-6">
          <button className="w-full bg-black text-white py-3 rounded-lg text-lg hover:opacity-90">
            Optimize Route
          </button>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
