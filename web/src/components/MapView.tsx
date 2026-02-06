"use client";

import L from "leaflet";
import { useTheme } from "next-themes";
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
	const layerRef = useRef<L.Layer | null>(null);
	const { resolvedTheme } = useTheme();

	useEffect(() => {
		if (!mapRef.current || mapInstanceRef.current) return;

		const map = L.map(mapRef.current, {
			center: NCR_CENTER,
			zoom: DEFAULT_ZOOM,
		});

		mapInstanceRef.current = map;

		const initialFlavor = resolvedTheme === "dark" ? "dark" : "light";
		const layer = leafletLayer({
			url: "/tiles/ncr-extended.pmtiles",
			flavor: initialFlavor,
		});

		layer.addTo(map);
		layerRef.current = layer as unknown as L.Layer;

		return () => {
			if (mapInstanceRef.current) {
				mapInstanceRef.current.remove();
				mapInstanceRef.current = null;
			}
		};
	}, [resolvedTheme]);

	useEffect(() => {
		if (!mapInstanceRef.current || !layerRef.current) return;

		const currentFlavor = resolvedTheme === "dark" ? "dark" : "light";

		if (layerRef.current) {
			mapInstanceRef.current.removeLayer(layerRef.current);
		}

		const newLayer = leafletLayer({
			url: "/tiles/ncr-extended.pmtiles",
			flavor: currentFlavor,
		});

		newLayer.addTo(mapInstanceRef.current);
		layerRef.current = newLayer as unknown as L.Layer;
	}, [resolvedTheme]);

	return (
		<div
			className={`h-full w-full ${className}`}
			ref={mapRef}
			style={{ minHeight: "100vh" }}
		/>
	);
}
