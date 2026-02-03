"use client";

import dynamic from "next/dynamic";

const MapView = dynamic(() => import("~/components/MapView"), {
	ssr: false,
	loading: () => (
		<div className="flex min-h-screen items-center justify-center bg-gray-100">
			<div className="text-gray-600 text-lg">Loading map...</div>
		</div>
	),
});

export default function HomePage() {
	return (
		<main className="min-h-screen">
			<MapView />
		</main>
	);
}
