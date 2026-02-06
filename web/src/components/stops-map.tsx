"use client";

import L from "leaflet";
import { useTheme } from "next-themes";
import { useEffect, useRef } from "react";
import "leaflet/dist/leaflet.css";
import { leafletLayer } from "protomaps-leaflet";
import type { components } from "~/generated/api-types";

const NCR_CENTER: [number, number] = [28.405, 77.075];
const DEFAULT_ZOOM = 10;
const NCR_BOUNDS = L.latLngBounds([27.83, 76.5], [28.98, 77.65]);

type StopRead = components["schemas"]["StopRead"];

interface StopsMapProps {
	stops: StopRead[];
	className?: string;
	onStopClick?: (stop: StopRead) => void;
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
	const mapInstanceRef = useRef<L.Map | null>(null);
	const layerRef = useRef<L.Layer | null>(null);
	const markersRef = useRef<L.LayerGroup | null>(null);
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
			attributionControl: false,
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

	useEffect(() => {
		if (!mapInstanceRef.current || !markersRef.current) return;

		markersRef.current.clearLayers();

		stops.forEach((stop) => {
			if (stop.lat && stop.lon) {
				const isSelected = stop.id === selectedStopId;
				const color = isSelected ? "#ef4444" : "#10b981";
				const radius = isSelected ? 8 : 4;

				const marker = L.circleMarker([stop.lat, stop.lon], {
					radius: radius,
					fillColor: color,
					color: "#fff",
					weight: 1,
					opacity: 1,
					fillOpacity: 0.8,
					className: isEditMode ? "cursor-move" : "",
				});


				if (isEditMode) {
					const editMarker = L.marker([stop.lat, stop.lon], {
						draggable: true,
						icon: L.divIcon({
							className: "bg-transparent",
							html: `<div style="background-color: ${color}; width: 16px; height: 16px; border-radius: 50%; border: 2px solid white;"></div>`,
							iconSize: [16, 16],
							iconAnchor: [8, 8],
						}),
					});

					editMarker.on("dragend", (e) => {
						const marker = e.target as L.Marker;
						const position = marker.getLatLng();
						if (onStopMove && stop.id) {
							onStopMove(stop.id, position.lat, position.lng);
						}
					});

					editMarker.bindPopup(
						`<b>${stop.name}</b><br>Lat: ${stop.lat.toFixed(4)}<br>Lng: ${stop.lon.toFixed(4)}`,
					);
					markersRef.current?.addLayer(editMarker);
				} else {
					marker.bindPopup(`<b>${stop.name}</b><br>${stop.locality || ""}`);
					marker.on("click", () => {
						onStopClick?.(stop);
					});
					markersRef.current?.addLayer(marker);
				}
			}
		});
	}, [stops, selectedStopId, onStopClick, isEditMode, onStopMove]);

	return (
		<div className={`relative h-full w-full ${className}`}>
			<style>{`
            .leaflet-container {
                z-index: 0;
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
