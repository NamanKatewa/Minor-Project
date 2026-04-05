"use client";

import L from "leaflet";
import { useTheme } from "next-themes";
import { useEffect, useRef } from "react";
import "leaflet/dist/leaflet.css";
import { leafletLayer } from "protomaps-leaflet";

const NCR_CENTER: [number, number] = [28.405, 77.075];
const DEFAULT_ZOOM = 10;
const NCR_BOUNDS = L.latLngBounds([27.83, 76.5], [28.98, 77.65]);

const GROUP_COLORS = [
	"#ef4444",
	"#3b82f6",
	"#f59e0b",
	"#10b981",
	"#8b5cf6",
	"#ec4899",
	"#06b6d4",
	"#f97316",
	"#6366f1",
	"#14b8a6",
	"#e11d48",
	"#2563eb",
	"#d97706",
	"#059669",
	"#7c3aed",
];

interface ClusterStop {
	id: string;
	name: string;
	lat: number;
	lon: number;
}

interface ClusterGroup {
	stops: ClusterStop[];
	max_distance_m: number;
}

interface ClusterMapProps {
	groups: ClusterGroup[];
	className?: string;
	selectedGroupIndex?: number | null;
	onGroupSelect?: (index: number | null) => void;
}

export default function ClusterMap({
	groups,
	className = "",
	selectedGroupIndex,
	onGroupSelect,
}: ClusterMapProps) {
	const mapRef = useRef<HTMLDivElement>(null);
	const mapInstanceRef = useRef<L.Map | null>(null);
	const layerRef = useRef<L.Layer | null>(null);
	const markersRef = useRef<L.LayerGroup | null>(null);
	const { resolvedTheme } = useTheme();

	// Initialize map
	useEffect(() => {
		if (!mapRef.current || mapInstanceRef.current) return;

		const map = L.map(mapRef.current, {
			center: NCR_CENTER,
			zoom: DEFAULT_ZOOM,
			minZoom: 9,
			maxZoom: 18,
			maxBounds: NCR_BOUNDS,
			maxBoundsViscosity: 1.0,
			attributionControl: false,
			preferCanvas: true,
		});

		mapInstanceRef.current = map;
		markersRef.current = L.layerGroup().addTo(map);

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
				markersRef.current = null;
				layerRef.current = null;
			}
		};
	}, [resolvedTheme]);

	// Theme changes
	useEffect(() => {
		if (!mapInstanceRef.current || !layerRef.current) return;
		const flavor = resolvedTheme === "dark" ? "dark" : "light";
		mapInstanceRef.current.removeLayer(layerRef.current);

		const newLayer = leafletLayer({
			url: "/tiles/ncr-extended.pmtiles",
			flavor,
		});
		newLayer.addTo(mapInstanceRef.current);

		const layerWithBack = newLayer as unknown as L.Layer & {
			bringToBack?: () => void;
		};
		if (typeof layerWithBack.bringToBack === "function") {
			layerWithBack.bringToBack();
		}

		layerRef.current = newLayer as unknown as L.Layer;
	}, [resolvedTheme]);

	// Render cluster markers
	useEffect(() => {
		if (!mapInstanceRef.current || !markersRef.current) return;
		markersRef.current.clearLayers();

		groups.forEach((group, groupIdx) => {
			const color = GROUP_COLORS[groupIdx % GROUP_COLORS.length] ?? "#ef4444";
			const isSelected = selectedGroupIndex === groupIdx;
			const dimmed =
				selectedGroupIndex !== null &&
				selectedGroupIndex !== undefined &&
				!isSelected;
			const opacity = dimmed ? 0.25 : 1;

			// Draw connecting lines between stops in each group
			if (group.stops.length >= 2) {
				// Connect all to centroid
				const centroidLat =
					group.stops.reduce((sum, s) => sum + s.lat, 0) / group.stops.length;
				const centroidLon =
					group.stops.reduce((sum, s) => sum + s.lon, 0) / group.stops.length;

				for (const stop of group.stops) {
					const line = L.polyline(
						[
							[stop.lat, stop.lon],
							[centroidLat, centroidLon],
						],
						{
							color,
							weight: 2,
							opacity: opacity * 0.5,
							dashArray: "4 4",
						},
					);
					markersRef.current?.addLayer(line);
				}

				// Radius circle around centroid
				const radiusM = Math.max(group.max_distance_m / 2, 50);
				const circle = L.circle([centroidLat, centroidLon], {
					radius: radiusM,
					color,
					fillColor: color,
					fillOpacity: opacity * 0.08,
					weight: isSelected ? 2 : 1,
					opacity: opacity * 0.4,
				});
				circle.on("click", () => {
					onGroupSelect?.(isSelected ? null : groupIdx);
				});
				markersRef.current?.addLayer(circle);
			}

			// Stop markers
			for (const stop of group.stops) {
				const marker = L.circleMarker([stop.lat, stop.lon], {
					radius: isSelected ? 7 : 5,
					fillColor: color,
					color: "#fff",
					weight: isSelected ? 2 : 1,
					opacity,
					fillOpacity: opacity * 0.9,
				});

				marker.bindTooltip(
					`<b>${stop.name}</b><br><span style="color:${color}">Group ${groupIdx + 1}</span> · ${Math.round(group.max_distance_m)}m apart`,
					{
						direction: "top",
						className:
							"bg-background text-foreground border shadow-sm px-2 py-1 rounded text-xs",
					},
				);

				marker.on("click", () => {
					onGroupSelect?.(isSelected ? null : groupIdx);
				});

				markersRef.current?.addLayer(marker);
			}
		});
	}, [groups, selectedGroupIndex, onGroupSelect]);

	// Fly to selected group
	useEffect(() => {
		if (
			!mapInstanceRef.current ||
			selectedGroupIndex === null ||
			selectedGroupIndex === undefined
		)
			return;
		const group = groups[selectedGroupIndex];
		if (!group) return;

		const bounds = L.latLngBounds(
			group.stops.map((s) => [s.lat, s.lon] as [number, number]),
		);
		mapInstanceRef.current.fitBounds(bounds.pad(0.5), {
			animate: true,
			maxZoom: 16,
		});
	}, [selectedGroupIndex, groups]);

	return (
		<div className={`relative ${className}`}>
			<style>{`
				.leaflet-container { z-index: 0; }
				.leaflet-marker-icon,
				.leaflet-marker-shadow,
				.leaflet-zoom-animated {
					transition: none !important;
				}
			`}</style>
			<div
				className="h-full w-full rounded-md border outline-none focus:outline-none"
				ref={mapRef}
				style={{ minHeight: "400px", outline: "none" }}
			/>
		</div>
	);
}
