"use client";

import L from "leaflet";
import { useTheme } from "next-themes";
import { useEffect, useRef, useState } from "react";
import "leaflet/dist/leaflet.css";
import { leafletLayer } from "protomaps-leaflet";

const NCR_CENTER: [number, number] = [28.405, 77.075];
const DEFAULT_ZOOM = 10;
const NCR_BOUNDS = L.latLngBounds([27.83, 76.5], [28.98, 77.65]);

interface StopsMapProps {
	stops: {
		id: string;
		name: string;
		lat?: number | null;
		lon?: number | null;
		stop_code?: string | null;
		locality?: string | null;
		zone?: string | null;
		active?: boolean;
	}[];
	className?: string;
	onStopClick?: (stop: {
		id: string;
		name: string;
		lat?: number | null;
		lon?: number | null;
	}) => void;
	selectedStopId?: string | null;
	isEditMode?: boolean;
	onStopMove?: (stopId: string, lat: number, lng: number) => void;
}

export default function StopsMap({
	stops,
	className = "",
	onStopClick,
	selectedStopId,
	isEditMode = false,
	onStopMove,
}: StopsMapProps) {
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
	const prevSelectedStopId = useRef<string | null>(null);

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

	// Render markers (only when stops or edit mode changes)
	useEffect(() => {
		if (!mapInstanceRef.current || !markersRef.current) return;

		// console.log("Rendering markers...", stops.length);
		markersRef.current.clearLayers();
		markerRegistry.current.clear();

		const defaultStyle = {
			radius: 6,
			fillColor: "#10b981", // green-500
			color: "#fff",
			weight: 1,
			opacity: 1,
			fillOpacity: 0.8,
		};

		const selectedStyle = {
			radius: 8,
			fillColor: "#ef4444", // red-500
			color: "#fff",
			weight: 2,
			opacity: 1,
			fillOpacity: 0.8,
		};

		stops.forEach((stop) => {
			if (stop.lat && stop.lon) {
				const isSelected = stop.id === selectedStopId;
				const currentStyle = isSelected ? selectedStyle : defaultStyle;

				if (isEditMode) {
					// Edit mode markers (draggable)
					const editMarker = L.marker([stop.lat, stop.lon], {
						draggable: true,
						icon: L.divIcon({
							className: "bg-transparent",
							html: `<div style="background-color: ${isSelected ? "#ef4444" : "#10b981"}; width: 12px; height: 12px; border-radius: 50%; border: 1px solid white;"></div>`,
							iconSize: [12, 12],
							iconAnchor: [6, 6],
						}),
					});

					editMarker.on("dragend", (e) => {
						const marker = e.target as L.Marker;
						const position = marker.getLatLng();
						if (onStopMove && stop.id) {
							onStopMove(stop.id, position.lat, position.lng);
						}
					});

					const tooltip = L.tooltip({
						permanent: true,
						direction: "top",
						interactive: true,
						className:
							"bg-background text-foreground border shadow-sm px-2 py-1 rounded text-xs font-medium cursor-pointer",
					}).setContent(stop.name);
					editMarker.bindTooltip(tooltip);

					editMarker.bindPopup(
						`<b>${stop.name}</b><br>Lat: ${stop.lat.toFixed(4)}<br>Lng: ${stop.lon.toFixed(4)}`,
					);
					markersRef.current?.addLayer(editMarker);
					markerRegistry.current.set(stop.id, editMarker);
				} else {
					// Normal mode markers (circle markers)
					const marker = L.circleMarker([stop.lat, stop.lon], {
						...currentStyle,
						className: "",
					});

					const tooltip = L.tooltip({
						permanent: true,
						direction: "top",
						interactive: true,
						className:
							"bg-background text-foreground border shadow-sm px-2 py-1 rounded text-xs font-medium cursor-pointer",
					}).setContent(stop.name);

					tooltip.on("click", (e) => {
						L.DomEvent.stopPropagation(e);
						onStopClick?.(stop);
					});

					marker.bindTooltip(tooltip);
					marker.on("click", () => {
						onStopClick?.(stop);
					});

					markersRef.current?.addLayer(marker);
					markerRegistry.current.set(stop.id, marker);
				}
			}
		});

		// Sync prevSelectedStopId
		prevSelectedStopId.current = selectedStopId || null;
	}, [stops, isEditMode, onStopMove, onStopClick, selectedStopId]);

	// Handle selection changes efficiently
	useEffect(() => {
		if (isEditMode) return; // Edit mode re-renders anyway for now, or handles styles differently
		if (!selectedStopId && !prevSelectedStopId.current) return;
		if (selectedStopId === prevSelectedStopId.current) return;

		const defaultStyle = {
			radius: 6,
			fillColor: "#10b981",
			fillOpacity: 0.8,
			weight: 1,
			color: "#fff",
		};

		const selectedStyle = {
			radius: 8,
			fillColor: "#ef4444",
			fillOpacity: 0.8,
			weight: 2,
			color: "#fff",
		};

		// Reset previous
		if (prevSelectedStopId.current) {
			const prevMarker = markerRegistry.current.get(prevSelectedStopId.current);
			if (prevMarker && prevMarker instanceof L.CircleMarker) {
				prevMarker.setStyle(defaultStyle);
			}
		}

		// Highlight new
		if (selectedStopId) {
			const newMarker = markerRegistry.current.get(selectedStopId);
			if (newMarker && newMarker instanceof L.CircleMarker) {
				newMarker.setStyle(selectedStyle);
				// Bring to front
				newMarker.bringToFront();
			}
		}

		prevSelectedStopId.current = selectedStopId || null;
	}, [selectedStopId, isEditMode]);

	// Sync map view with selected stop
	useEffect(() => {
		if (selectedStopId && mapInstanceRef.current && stops.length > 0) {
			const selectedStop = stops.find((s) => s.id === selectedStopId);
			if (selectedStop?.lat && selectedStop?.lon) {
				mapInstanceRef.current.setView(
					[selectedStop.lat, selectedStop.lon],
					15,
					{
						animate: false,
					},
				);
			}
		}
	}, [selectedStopId, stops]);

	return (
		<div
			className={`relative h-full w-full ${className} ${zoom < 13 ? "hide-tooltips" : ""}`}
		>
			<style>{`
            .leaflet-container {
                z-index: 0;
                position: relative;
            }
            .leaflet-pane.leaflet-basemap-pane { z-index: 200 !important; }
            .hide-tooltips .leaflet-tooltip {
                display: none !important;
            }
			/* Prevent global transitions from affecting Leaflet markers (fixes drifting) */
			.leaflet-marker-icon,
			.leaflet-marker-shadow,
			.leaflet-zoom-animated {
				transition: none !important;
			}
			/* Canvas tile seam fix — must use !important to beat Leaflet inline styles */
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
