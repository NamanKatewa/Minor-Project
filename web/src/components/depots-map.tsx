"use client";

import L from "leaflet";
import { useTheme } from "next-themes";
import { useEffect, useRef, useState } from "react";
import "leaflet/dist/leaflet.css";
import { leafletLayer } from "protomaps-leaflet";

const NCR_CENTER: [number, number] = [28.405, 77.075];
const DEFAULT_ZOOM = 10;
const NCR_BOUNDS = L.latLngBounds([27.83, 76.5], [28.98, 77.65]);

interface DepotsMapProps {
	depots: {
		id: string;
		name: string;
		lat?: number | null;
		lon?: number | null;
	}[];
	className?: string;
	onDepotClick?: (depot: {
		id: string;
		name: string;
		lat?: number | null;
		lon?: number | null;
	}) => void;
	selectedDepotId?: string | null;
	isEditMode?: boolean;
	onDepotMove?: (depotId: string, lat: number, lng: number) => void;
}

export default function DepotsMap({
	depots,
	className = "",
	onDepotClick,
	selectedDepotId,
	isEditMode = false,
	onDepotMove,
}: DepotsMapProps) {
	const mapRef = useRef<HTMLDivElement>(null);
	const [zoom, setZoom] = useState(DEFAULT_ZOOM);
	const mapInstanceRef = useRef<L.Map | null>(null);
	const layerRef = useRef<L.Layer | null>(null);
	const markersRef = useRef<L.LayerGroup | null>(null);
	const { resolvedTheme } = useTheme();
	const themeRef = useRef(resolvedTheme);
	themeRef.current = resolvedTheme;

	const markerRegistry = useRef<Map<string, L.CircleMarker | L.Marker>>(
		new Map(),
	);
	const prevSelectedDepotId = useRef<string | null>(null);

	// Initialize map instance
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

		// Dedicated pane for basemap tiles — z-index below markers (default 600)
		const basemapPane = map.createPane("basemap");
		basemapPane.style.zIndex = "200";

		map.on("zoomend", () => {
			setZoom(map.getZoom());
		});

		mapInstanceRef.current = map;
		markersRef.current = L.layerGroup().addTo(map);

		const initialFlavor = themeRef.current === "dark" ? "dark" : "light";
		const layer = leafletLayer({
			url: "/tiles/ncr-extended.pmtiles",
			flavor: initialFlavor,
			pane: "basemap",
		});

		layer.addTo(map);
		layerRef.current = layer as unknown as L.Layer;

		// Cleanup
		return () => {
			if (mapInstanceRef.current) {
				mapInstanceRef.current.remove();
				mapInstanceRef.current = null;
				markersRef.current = null;
				layerRef.current = null;
			}
		};
	}, []); // Mount once — theme changes handled by separate effect

	// Handle theme changes — only swap the tile layer, never rebuild the map
	useEffect(() => {
		if (!mapInstanceRef.current || !layerRef.current) return;
		const currentFlavor = resolvedTheme === "dark" ? "dark" : "light";

		mapInstanceRef.current.removeLayer(layerRef.current);

		const newLayer = leafletLayer({
			url: "/tiles/ncr-extended.pmtiles",
			flavor: currentFlavor,
			pane: "basemap",
		});
		newLayer.addTo(mapInstanceRef.current);

		layerRef.current = newLayer as unknown as L.Layer;
	}, [resolvedTheme]);

	// Render markers
	useEffect(() => {
		if (!mapInstanceRef.current || !markersRef.current) return;

		markersRef.current.clearLayers();
		markerRegistry.current.clear();

		const defaultStyle = {
			radius: 8,
			fillColor: "#3b82f6", // blue-500 for depots
			color: "#fff",
			weight: 2,
			opacity: 1,
			fillOpacity: 0.8,
		};

		const selectedStyle = {
			radius: 10,
			fillColor: "#ef4444", // red-500
			color: "#fff",
			weight: 2,
			opacity: 1,
			fillOpacity: 0.9,
		};

		depots.forEach((depot) => {
			if (depot.lat && depot.lon) {
				const isSelected = depot.id === selectedDepotId;
				const currentStyle = isSelected ? selectedStyle : defaultStyle;

				if (isEditMode) {
					const editMarker = L.marker([depot.lat, depot.lon], {
						draggable: true,
						icon: L.divIcon({
							className: "bg-transparent",
							html: `<div style="background-color: ${isSelected ? "#ef4444" : "#3b82f6"}; width: 16px; height: 16px; border-radius: 4px; border: 2px solid white;"></div>`,
							iconSize: [16, 16],
							iconAnchor: [8, 8],
						}),
					});

					editMarker.on("dragend", (e) => {
						const marker = e.target as L.Marker;
						const position = marker.getLatLng();
						if (onDepotMove && depot.id) {
							onDepotMove(depot.id, position.lat, position.lng);
						}
					});

					const tooltip = L.tooltip({
						permanent: true,
						direction: "top",
						interactive: true,
						className:
							"bg-background text-foreground border shadow-sm px-2 py-1 rounded text-xs font-medium cursor-pointer",
					}).setContent(depot.name);
					editMarker.bindTooltip(tooltip);

					markersRef.current?.addLayer(editMarker);
					markerRegistry.current.set(depot.id, editMarker);
				} else {
					const marker = L.circleMarker([depot.lat, depot.lon], {
						...currentStyle,
						className: "depot-marker",
					});

					const tooltip = L.tooltip({
						permanent: true,
						direction: "top",
						interactive: true,
						className:
							"bg-background text-foreground border shadow-sm px-2 py-1 rounded text-xs font-medium cursor-pointer",
					}).setContent(depot.name);

					tooltip.on("click", (e) => {
						L.DomEvent.stopPropagation(e);
						onDepotClick?.(depot);
					});

					marker.bindTooltip(tooltip);
					marker.on("click", () => {
						onDepotClick?.(depot);
					});

					markersRef.current?.addLayer(marker);
					markerRegistry.current.set(depot.id, marker);
				}
			}
		});

		prevSelectedDepotId.current = selectedDepotId || null;
	}, [depots, isEditMode, onDepotMove, onDepotClick, selectedDepotId]);

	// Selection and view sync effects (similar to StopsMap)
	useEffect(() => {
		if (isEditMode) return;
		if (!selectedDepotId && !prevSelectedDepotId.current) return;
		if (selectedDepotId === prevSelectedDepotId.current) return;

		const defaultStyle = {
			radius: 8,
			fillColor: "#3b82f6",
			fillOpacity: 0.8,
			weight: 2,
			color: "#fff",
		};

		const selectedStyle = {
			radius: 10,
			fillColor: "#ef4444",
			fillOpacity: 0.9,
			weight: 2,
			color: "#fff",
		};

		if (prevSelectedDepotId.current) {
			const prevMarker = markerRegistry.current.get(
				prevSelectedDepotId.current,
			);
			if (prevMarker && prevMarker instanceof L.CircleMarker) {
				prevMarker.setStyle(defaultStyle);
			}
		}

		if (selectedDepotId) {
			const newMarker = markerRegistry.current.get(selectedDepotId);
			if (newMarker && newMarker instanceof L.CircleMarker) {
				newMarker.setStyle(selectedStyle);
				newMarker.bringToFront();
			}
		}

		prevSelectedDepotId.current = selectedDepotId || null;
	}, [selectedDepotId, isEditMode]);

	useEffect(() => {
		if (selectedDepotId && mapInstanceRef.current && depots.length > 0) {
			const selectedDepot = depots.find((d) => d.id === selectedDepotId);
			if (selectedDepot?.lat && selectedDepot?.lon) {
				mapInstanceRef.current.setView(
					[selectedDepot.lat, selectedDepot.lon],
					15,
					{ animate: false },
				);
			}
		}
	}, [selectedDepotId, depots]);

	return (
		<div
			className={`relative h-full w-full ${className} ${zoom < 13 ? "hide-tooltips" : ""}`}
		>
			<style>{`
            .leaflet-container { z-index: 0; position: relative; }
            .leaflet-pane.leaflet-basemap-pane { z-index: 200 !important; }
            .hide-tooltips .leaflet-tooltip { display: none !important; }
			.leaflet-marker-icon, .leaflet-marker-shadow, .leaflet-zoom-animated { transition: none !important; }
			.leaflet-tile-container canvas {
				width: 257px !important;
				height: 257px !important;
				margin-right: -1px;
				margin-bottom: -1px;
			}
        `}</style>
			<div
				className="h-full w-full rounded-md border"
				ref={mapRef}
				style={{ minHeight: "400px" }}
			/>
		</div>
	);
}
