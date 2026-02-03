"use client";

const Dashboard = () => {
	return (
		<div className="flex h-screen bg-gray-100">
			{/* Sidebar */}
			<aside className="w-64 bg-white p-4 shadow-md">
				<h2 className="mb-6 font-semibold text-xl">Menu</h2>
				<ul className="space-y-4 text-gray-700">
					<li className="cursor-pointer hover:text-black">Dashboard</li>
					<li className="cursor-pointer hover:text-black">Routes</li>
					<li className="cursor-pointer hover:text-black">Bus Stops</li>
					<li className="cursor-pointer hover:text-black">Buses</li>
					<li className="cursor-pointer hover:text-black">Analytics</li>
				</ul>
			</aside>

			{/* Main Content */}
			<main className="flex flex-1 flex-col">
				{/* Header */}
				<header className="flex items-center justify-between bg-white px-6 py-4 shadow-sm">
					<h1 className="font-bold text-2xl">Bus Route Optimization</h1>
					<div className="relative">
						<button className="rounded-full border px-4 py-2">Account</button>
					</div>
				</header>

				{/* Content Area */}
				<section className="grid flex-1 grid-cols-3 gap-6 p-6">
					{/* Map View */}
					<div className="col-span-2 rounded-lg bg-white p-4 shadow-md">
						<h3 className="mb-2 font-semibold text-lg">Map View</h3>
						<div className="flex h-64 items-center justify-center rounded bg-gray-200">
							<span className="text-gray-600">
								Map (Routes, Stops, Start & End)
							</span>
						</div>
					</div>

					{/* Route Information Panel */}
					<div className="rounded-lg bg-white p-4 shadow-md">
						<h3 className="mb-4 font-semibold text-lg">Route Information</h3>
						<div className="space-y-3">
							<div>
								<label className="text-gray-600 text-sm">Distance</label>
								<div className="rounded border px-3 py-2">-- km</div>
							</div>
							<div>
								<label className="text-gray-600 text-sm">Estimated Time</label>
								<div className="rounded border px-3 py-2">-- mins</div>
							</div>
							<div>
								<label className="text-gray-600 text-sm">Number of Stops</label>
								<div className="rounded border px-3 py-2">--</div>
							</div>
							<div>
								<label className="text-gray-600 text-sm">Bus Name</label>
								<select className="w-full rounded border px-3 py-2">
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
					<button className="w-full rounded-lg bg-black py-3 text-lg text-white hover:opacity-90">
						Optimize Route
					</button>
				</div>
			</main>
		</div>
	);
};

export default Dashboard;
