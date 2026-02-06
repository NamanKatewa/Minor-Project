"use client";

import L from "leaflet";
import { useTheme } from "next-themes";
import { useEffect, useRef } from "react";
import "leaflet/dist/leaflet.css";
import { leafletLayer } from "protomaps-leaflet";

const NCR_CENTER: [number, number] = [28.405, 77.075];
const DEFAULT_ZOOM = 11;

const NCR_BOUNDS = L.latLngBounds([27.83, 76.5], [28.98, 77.65]);

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
			minZoom: 9,
			maxZoom: 18,
			maxBounds: NCR_BOUNDS,
			maxBoundsViscosity: 1.0,
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
		<>
			<style>{`
				.leaflet-control-zoom {
					border: 1px solid #e5e7eb !important;
					box-shadow: none !important;
					border-radius: 0 !important;
					overflow: hidden;
				}
				.leaflet-control-zoom a {
					background: #ffffff !important;
					color: #1f2937 !important;
					border: none !important;
					border-bottom: 1px solid #e5e7eb !important;
					width: 32px !important;
					height: 32px !important;
					line-height: 32px !important;
					font-size: 16px !important;
					font-weight: 600 !important;
					border-radius: 0 !important;
					transition: background 0.15s ease;
				}
				.leaflet-control-zoom a:hover {
					background: #f3f4f6 !important;
				}
				.leaflet-control-zoom-out {
					border-bottom: none !important;
				}
				.leaflet-control-attribution {
					background: rgba(255, 255, 255, 0.9) !important;
					color: #6b7280 !important;
					font-size: 10px !important;
					padding: 2px 6px !important;
					border-radius: 0 !important;
				}
				.leaflet-control-attribution a {
					color: #10b981 !important;
				}
				
				.dark .leaflet-control-zoom {
					border-color: #374151 !important;
				}
				.dark .leaflet-control-zoom a {
					background: #1f2937 !important;
					color: #f9fafb !important;
					border-bottom-color: #374151 !important;
				}
				.dark .leaflet-control-zoom a:hover {
					background: #374151 !important;
				}
				.dark .leaflet-control-attribution {
					background: rgba(31, 41, 55, 0.9) !important;
					color: #9ca3af !important;
				}
			`}</style>
			<div
				className={`h-full w-full ${className}`}
				ref={mapRef}
				style={{ minHeight: "100vh" }}
			/>
		</>
	);
}
