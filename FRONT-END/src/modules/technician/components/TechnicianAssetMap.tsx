import { useEffect, useRef } from "react";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import type { TechnicianAssetMapProps } from "@/features/technician-map";
import { useMap } from "@/shared/components/map/usaMap";
import { markerColors } from "../utils/markerColors";

const routeSourceId = "technician-route-source";
const routeLayerId = "technician-route-layer";

export function TechnicianAssetMap({
  machines,
  selectedMachineId = null,
  onMarkerSelect,
  onMapBackgroundClick,
  routeOrigin = null,
}: TechnicianAssetMapProps) {
  const { mapContainer, mapRef } = useMap();
  const markerRefs = useRef<maplibregl.Marker[]>([]);

  useEffect(() => {
    return () => {
      markerRefs.current.forEach((marker) => marker.remove());
      markerRefs.current = [];
    };
  }, []);

  useEffect(() => {
    const map = mapRef.current;

    if (!map || !onMapBackgroundClick) {
      return;
    }

    const handleMapClick = () => {
      onMapBackgroundClick();
    };

    map.on("click", handleMapClick);

    return () => {
      map.off("click", handleMapClick);
    };
  }, [mapRef, onMapBackgroundClick]);

  useEffect(() => {
    const map = mapRef.current;

    if (!map) {
      return;
    }

    markerRefs.current.forEach((marker) => marker.remove());
    markerRefs.current = [];

    machines.forEach((machine) => {
      const palette = markerColors[machine.status];
      const isSelected = machine.id === selectedMachineId;

      const markerWrapper = document.createElement("button");
      markerWrapper.type = "button";
      markerWrapper.setAttribute("aria-label", machine.name);
      markerWrapper.className =
        "group block cursor-pointer border-none bg-transparent p-0 outline-none";
      markerWrapper.style.zIndex = isSelected ? "40" : "1";

      markerWrapper.innerHTML = `<div class="relative flex flex-col items-center pb-1.5 transition-all
            duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] origin-bottom
            ${isSelected ? "scale-125" : "scale-100"} " >

          <div class="absolute bottom-full mb-2 whitespace-nowrap rounded-xl border border-white/80 bg-white/95 px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.2em] shadow-[0_8px_16px_rgba(62,52,39,0.08)] backdrop-blur-md transition-all duration-300 ${
            isSelected
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-2 pointer-events-none group-hover:opacity-100 group-hover:translate-y-0"
          }" style="color: ${isSelected ? palette.accent : "#2d241c"};">
            ${machine.code}
          </div>

          <div class="relative flex h-10 w-10 items-center justify-center rounded-full border-2 bg-white shadow-md transition-colors duration-300"
               style="border-color: ${palette.accent}; background-color: ${isSelected ? palette.bg : "white"}; box-shadow: ${isSelected ? `0 0 24px ${palette.glow}, 0 4px 12px rgba(0,0,0,0.1)` : "0 4px 10px rgba(0,0,0,0.08)"};">
            <span class="material-symbols-outlined text-[20px]" style="color: ${palette.accent};">
              memory
            </span>

            <span class="absolute -right-1 -top-1 h-3.5 w-3.5 rounded-full border-2 border-white" style="background-color: ${palette.accent};"></span>
          </div>

          <div class="h-2 w-0.5 mt-0.5 rounded-full opacity-80" style="background-color: ${palette.accent};"></div>

          <div class="absolute bottom-0 h-1.5 w-5 rounded-[100%] bg-[#2d241c]/30 blur-[2.5px] transition-all duration-300" style="transform: ${isSelected ? "scale(1.2)" : "scale(1)"};"></div>
        </div>
      `;

      markerWrapper.addEventListener("click", (event) => {
        event.stopPropagation();
        onMarkerSelect?.(machine);

        map.flyTo({
          center: [machine.longitude, machine.latitude],
          zoom: 15,
          essential: true,
          duration: 900,
        });
      });

      const marker = new maplibregl.Marker({
        element: markerWrapper,
        anchor: "bottom",
      })
        .setLngLat([machine.longitude, machine.latitude])
        .addTo(map);

      markerRefs.current.push(marker);
    });

    if (machines.length === 0) {
      return;
    }

    if (selectedMachineId !== null) {
      const selectedMachine = machines.find(
        (machine) => machine.id === selectedMachineId,
      );

      if (selectedMachine) {
        map.flyTo({
          center: [selectedMachine.longitude, selectedMachine.latitude],
          zoom: 15,
          essential: true,
          duration: 900,
        });
      }

      return;
    }

    const bounds = new maplibregl.LngLatBounds(
      [machines[0].longitude, machines[0].latitude],
      [machines[0].longitude, machines[0].latitude],
    );

    machines.slice(1).forEach((machine) => {
      bounds.extend([machine.longitude, machine.latitude]);
    });

    map.fitBounds(bounds, {
      padding: { top: 110, right: 120, bottom: 120, left: 120 },
      maxZoom: 16,
      duration: 1000,
    });
  }, [machines, mapRef, onMarkerSelect, selectedMachineId]);

  useEffect(() => {
    const map = mapRef.current;
    const selectedMachine =
      selectedMachineId !== null
        ? (machines.find((machine) => machine.id === selectedMachineId) ?? null)
        : null;

    if (!map || !selectedMachine || !routeOrigin) {
      if (map?.getLayer(routeLayerId)) {
        map.removeLayer(routeLayerId);
      }

      if (map?.getSource(routeSourceId)) {
        map.removeSource(routeSourceId);
      }

      return;
    }

    const routeCollection = {
      type: "FeatureCollection" as const,
      features: [
        {
          type: "Feature" as const,
          geometry: {
            type: "LineString" as const,
            coordinates: [
              [routeOrigin.longitude, routeOrigin.latitude],
              [selectedMachine.longitude, selectedMachine.latitude],
            ],
          },
          properties: {},
        },
      ],
    };

    const upsertRoute = () => {
      const existingSource = map.getSource(routeSourceId) as
        | maplibregl.GeoJSONSource
        | undefined;

      if (existingSource) {
        existingSource.setData(routeCollection);
      } else {
        map.addSource(routeSourceId, {
          type: "geojson",
          data: routeCollection,
        });
      }

      if (!map.getLayer(routeLayerId)) {
        map.addLayer({
          id: routeLayerId,
          type: "line",
          source: routeSourceId,
          layout: {
            "line-cap": "round",
            "line-join": "round",
          },
          paint: {
            "line-color": "#398e8e",
            "line-width": 3,
            "line-dasharray": [2, 2],
            "line-opacity": 0.85,
          },
        });
      }
    };

    if (map.isStyleLoaded()) {
      upsertRoute();
    } else {
      map.once("load", upsertRoute);
    }

    return () => {
      if (map.getLayer(routeLayerId)) {
        map.removeLayer(routeLayerId);
      }

      if (map.getSource(routeSourceId)) {
        map.removeSource(routeSourceId);
      }
    };
  }, [machines, mapRef, routeOrigin, selectedMachineId]);

  return <div ref={mapContainer} className="h-full w-full outline-none" />;
}
