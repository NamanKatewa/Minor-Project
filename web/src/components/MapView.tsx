"use client";

import L from "leaflet";
import { useEffect, useRef } from "react";
import "leaflet/dist/leaflet.css";
import { leafletLayer } from "protomaps-leaflet";

const NCR_CENTER: [number, number] = [28.4, 77.1];
const DEFAULT_ZOOM = 10;

interface MapViewProps {
	className?: string;
}

export default function MapView({ className = "" }: MapViewProps) {
	const mapRef = useRef<HTMLDivElement>(null);
	const mapInstanceRef = useRef<L.Map | null>(null);

	useEffect(() => {
		if (!mapRef.current || mapInstanceRef.current) return;

		const map = L.map(mapRef.current, {
			center: NCR_CENTER,
			zoom: DEFAULT_ZOOM,
		});

		mapInstanceRef.current = map;

		const layer = leafletLayer({
			url: "/tiles/ncr-extended.pmtiles",
			flavor: "light",
		});

		layer.addTo(map);

		return () => {
			if (mapInstanceRef.current) {
				mapInstanceRef.current.remove();
				mapInstanceRef.current = null;
			}
		};
	}, []);

	return (
		<div
			className={`h-full w-full ${className}`}
			ref={mapRef}
			style={{ minHeight: "100vh" }}
		/>
	);
}
