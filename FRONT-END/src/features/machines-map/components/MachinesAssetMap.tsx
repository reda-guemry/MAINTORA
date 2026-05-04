import { useEffect, useRef } from "react";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import { useMap } from "@/shared/components/map/usaMap";
import type {
  MachinesAssetMapProps,
  MachinesMapMachine,
} from "../types/machinesMap";
import { machineMarkerColors } from "../utils/markerColors";

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

export function MachinesAssetMap<TMachine extends MachinesMapMachine>({
  machines = [],
  selectedMachineId = null,
  onMarkerSelect,
  onMapBackgroundClick,
}: MachinesAssetMapProps<TMachine>) {
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
      const palette = machineMarkerColors[machine.status];
      const isSelected = machine.id === selectedMachineId;
      const escapedMachineCode = escapeHtml(machine.code);

      const markerWrapper = document.createElement("button");
      markerWrapper.type = "button";
      markerWrapper.setAttribute("aria-label", machine.name);
      markerWrapper.className =
        "outline-none group bg-transparent border-none p-0 cursor-pointer block";
      markerWrapper.style.zIndex = isSelected ? "50" : "1";

      markerWrapper.innerHTML = `
        <div class="relative flex flex-col items-center pb-1.5 transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)]"
             style="transform-origin: bottom center; transform: ${isSelected ? "scale(1.25)" : "scale(1)"};">

          <div class="absolute bottom-full mb-2 whitespace-nowrap rounded-xl border border-white/80 bg-white/95 px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.2em] shadow-[0_8px_16px_rgba(62,52,39,0.08)] backdrop-blur-md transition-all duration-300 ${
            isSelected
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-2 pointer-events-none group-hover:opacity-100 group-hover:translate-y-0"
          }" style="color: ${isSelected ? palette.accent : "#2d241c"};">
            ${escapedMachineCode}
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
        map.flyTo({
          center: [machine.longitude, machine.latitude],
          zoom: Math.max(map.getZoom(), 16),
          essential: true,
          duration: 800,
        });
        onMarkerSelect?.(machine);
      });

      const markerInstance = new maplibregl.Marker({
        element: markerWrapper,
        anchor: "bottom",
      })
        .setLngLat([machine.longitude, machine.latitude])
        .addTo(map);

      markerRefs.current.push(markerInstance);
    });

    if (machines.length === 0) {
      return;
    }

    if (selectedMachineId !== null) {
      const selectedMarker = machines.find(
        (machine) => machine.id === selectedMachineId,
      );

      if (selectedMarker) {
        map.flyTo({
          center: [selectedMarker.longitude, selectedMarker.latitude],
          zoom: Math.max(map.getZoom(), 16),
          essential: true,
          duration: 800,
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
      padding: { top: 120, bottom: 120, left: 450, right: 120 },
      maxZoom: 15,
      duration: 1000,
    });
  }, [machines, mapRef, onMarkerSelect, selectedMachineId]);

  return <div ref={mapContainer} className="h-full w-full outline-none" />;
}
