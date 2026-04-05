"use client";

import L from "leaflet";
import { useTheme } from "next-themes";
import { useEffect, useRef } from "react";
import "leaflet/dist/leaflet.css";
import { leafletLayer } from "protomaps-leaflet";
import type { components } from "~/generated/api-types";

type BusRoute = components["schemas"]["BusRoute"];
type UnassignedStop = components["schemas"]["UnassignedStop"];
type RouteStop = components["schemas"]["RouteStop"];

const NCR_CENTER: [number, number] = [28.405, 77.075];
const DEFAULT_ZOOM = 11;
const NCR_BOUNDS = L.latLngBounds([27.83, 76.5], [28.98, 77.65]);

const ROUTE_COLORS = [
	"#ef4444", // Red
	"#3b82f6", // Blue
	"#22c55e", // Green
	"#f59e0b", // Amber
	"#8b5cf6", // Violet
	"#ec4899", // Pink
	"#06b6d4", // Cyan
	"#f97316", // Orange
	"#6366f1", // Indigo
	"#14b8a6", // Teal
];

interface RoutesMapProps {
	routes: BusRoute[];
	unassignedStops?: UnassignedStop[];
	className?: string;
	selectedRouteIndex?: number | null;
	onRouteSelect?: (index: number | null) => void;
}

export default function RoutesMap({
	routes,
	unassignedStops = [],
	className = "",
	selectedRouteIndex,
	onRouteSelect,
}: RoutesMapProps) {
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

	// Render routes and stops
	useEffect(() => {
		if (!mapInstanceRef.current || !markersRef.current) return;
		markersRef.current.clearLayers();

		// Render Routes
		routes.forEach((route, idx) => {
			const isSelected = selectedRouteIndex === idx;
			const hasSelection =
				selectedRouteIndex !== null && selectedRouteIndex !== undefined;

			// If a route is selected, only render that specific route
			if (hasSelection && !isSelected) return;

			const color = ROUTE_COLORS[idx % ROUTE_COLORS.length] ?? "#ef4444";
			const opacity = 0.8;
			const weight = isSelected ? 5 : 3;

			// Create path: Use OSRM geometry if available, otherwise fallback to straight lines
			const pathPoints: [number, number][] =
				route.geometry && route.geometry.length > 0
					? (route.geometry as [number, number][])
					: [
							[route.depot_lat, route.depot_lon],
							...route.stops.map((s) => [s.lat, s.lon] as [number, number]),
						];

			// Draw route polyline
			const polyline = L.polyline(pathPoints, {
				color,
				weight,
				opacity,
				lineJoin: "round",
			});

			polyline.on("click", (e) => {
				L.DomEvent.stopPropagation(e);
				onRouteSelect?.(isSelected ? null : idx);
			});

			polyline.bindTooltip(`Bus ${route.bus_no}`, {
				sticky: true,
				className:
					"bg-background text-foreground border shadow-sm px-2 py-1 rounded text-xs font-bold",
			});

			markersRef.current?.addLayer(polyline);

			// Add Depot marker
			const depotIcon = L.divIcon({
				className: "custom-div-icon",
				html: `<div style="background-color: ${color}; width: 12px; height: 12px; border: 2px solid white; border-radius: 2px;"></div>`,
				iconSize: [12, 12],
				iconAnchor: [6, 6],
			});

			const depotMarker = L.marker([route.depot_lat, route.depot_lon], {
				icon: depotIcon,
				opacity: 1,
			});
			depotMarker.bindTooltip(`Depot: ${route.depot_name}`, {
				direction: "top",
				className:
					"bg-background text-foreground border shadow-sm px-2 py-1 rounded text-xs",
			});
			markersRef.current?.addLayer(depotMarker);
		});

		// Collect all stops and deduplicate split stops
		type RouteType = components["schemas"]["BusRoute"];
		const stopKeyMap = new Map<
			string,
			{
				stop: RouteStop;
				route: RouteType;
				routeIdx: number;
				stopPosition: number;
			}
		>();

		routes.forEach((route, idx) => {
			let stopPosition = 0;
			route.stops.forEach((stop) => {
				const key = stop.parent_stop_id || String(stop.stop_id);

				if (stopKeyMap.has(key)) {
					const existing = stopKeyMap.get(key);
					if (existing) {
						existing.stop.students_boarding += stop.students_boarding;
						existing.stop.is_split = true;
					}
				} else {
					stopKeyMap.set(key, {
						stop: { ...stop, is_split: stop.is_split || false },
						route,
						routeIdx: idx,
						stopPosition: stopPosition++,
					});
				}
			});
		});

		// Add Stop markers (deduplicated for split stops)
		stopKeyMap.forEach(({ stop, route, routeIdx, stopPosition }) => {
			const isSelected = selectedRouteIndex === routeIdx;
			const color = ROUTE_COLORS[routeIdx % ROUTE_COLORS.length];
			const opacity = isSelected ? 1 : 0.6;

			const stopMarker = L.circleMarker([stop.lat, stop.lon], {
				radius: isSelected ? 6 : 4,
				fillColor: color,
				color: "#fff",
				weight: 1,
				opacity: opacity,
				fillOpacity: opacity,
			});

			const stopLabel =
				stop.is_split && stop.students_boarding > 50
					? `${stop.stop_name} (Split)`
					: stop.stop_name;

			stopMarker.bindTooltip(
				`<b>${stopLabel}</b><br>Bus ${route.bus_no} · Stop ${stopPosition + 1}<br>${stop.students_boarding} students`,
				{
					direction: "top",
					className:
						"bg-background text-foreground border shadow-sm px-2 py-1 rounded text-xs",
				},
			);

			stopMarker.on("click", (e) => {
				L.DomEvent.stopPropagation(e);
				onRouteSelect?.(isSelected ? null : routeIdx);
			});

			markersRef.current?.addLayer(stopMarker);
		});

		// Render Unassigned Stops
		unassignedStops.forEach((stop) => {
			if (stop.lat && stop.lon) {
				const unassignedMarker = L.circleMarker([stop.lat, stop.lon], {
					radius: 5,
					fillColor: "#6b7280", // Gray-500
					color: "#fff",
					weight: 1,
					opacity: 0.8,
					fillOpacity: 0.6,
				});

				unassignedMarker.bindTooltip(
					`<b>${stop.name} (Unassigned)</b><br>${stop.reason}`,
					{
						direction: "top",
						className:
							"bg-background text-foreground border shadow-sm px-2 py-1 rounded text-xs",
					},
				);

				markersRef.current?.addLayer(unassignedMarker);
			}
		});
	}, [routes, unassignedStops, selectedRouteIndex, onRouteSelect]);

	// Fly to selected route
	useEffect(() => {
		if (
			!mapInstanceRef.current ||
			selectedRouteIndex === null ||
			selectedRouteIndex === undefined
		)
			return;
		const route = routes[selectedRouteIndex];
		if (!route) return;

		const points: [number, number][] = [
			[route.depot_lat, route.depot_lon],
			...route.stops.map((s) => [s.lat, s.lon] as [number, number]),
		];

		const bounds = L.latLngBounds(points);
		mapInstanceRef.current.fitBounds(bounds.pad(0.3), {
			animate: true,
			maxZoom: 16,
		});
	}, [routes, selectedRouteIndex]);

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
