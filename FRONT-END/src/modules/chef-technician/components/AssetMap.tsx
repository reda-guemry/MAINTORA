import { useEffect, useRef } from "react";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import type { Machine } from "@/features/roundes";

interface MapProps {
  machines: Machine[];
  selectedMarkerId?: number | null;
  onMarkerSelect?: (marker: Machine) => void;
  onMapBackgroundClick?: () => void;
}

const markerColors: Record<
  Machine["status"],
  {
    accent: string;
    glow: string;
    bg: string;
  }
> = {
  active: {
    accent: "#3b8f88",
    glow: "rgba(59, 143, 136, 0.35)",
    bg: "#f0f7f6",
  },
  anomalous: {
    accent: "#d9534f",
    glow: "rgba(217, 83, 79, 0.35)",
    bg: "#fdf3f2",
  },
  maintenance: {
    accent: "#d58a1d",
    glow: "rgba(213, 138, 29, 0.35)",
    bg: "#fcf6ec",
  },
};

export function AssetMap({
  machines = [],
  selectedMarkerId = null,
  onMarkerSelect,
  onMapBackgroundClick,
}: MapProps) {
  const mapContainer = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<maplibregl.Map | null>(null);
  const markerRefs = useRef<maplibregl.Marker[]>([]);

  useEffect(() => {
    if (!mapContainer.current || mapRef.current) {
      return;
    }

    if (maplibregl.getRTLTextPluginStatus() === "unavailable") {
      try {
        maplibregl.setRTLTextPlugin(
          "https://unpkg.com/@mapbox/mapbox-gl-rtl-text@0.3.0/dist/mapbox-gl-rtl-text.js",
          true,
        );
      } catch (error) {
        console.error("RTL Plugin error:", error);
      }
    }

    const cartoStyle: maplibregl.StyleSpecification = {
      version: 8,
      sources: {
        "carto-tiles": {
          type: "raster",
          tiles: ["https://basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"],
          tileSize: 256,
          attribution: "&copy; OpenStreetMap &copy; CARTO",
        },
      },
      layers: [
        {
          id: "carto-layer",
          type: "raster",
          source: "carto-tiles",
          minzoom: 0,
          maxzoom: 22,
        },
      ],
    };

    mapRef.current = new maplibregl.Map({
      container: mapContainer.current,
      style: cartoStyle,
      center: [-7.62, 33.59],
      zoom: 16,
      attributionControl: false,
    });

    mapRef.current.addControl(
      new maplibregl.NavigationControl({ showCompass: false }),
      "bottom-right",
    );

    return () => {
      markerRefs.current.forEach((marker) => marker.remove());
      markerRefs.current = [];
      mapRef.current?.remove();
      mapRef.current = null;
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
  }, [onMapBackgroundClick]);

  useEffect(() => {
    const map = mapRef.current;

    if (!map) {
      return;
    }

    markerRefs.current.forEach((marker) => marker.remove());
    markerRefs.current = [];

    machines.forEach((machine) => {
      const palette = markerColors[machine.status];
      const isSelected = machine.id === selectedMarkerId;
      
      // The outer wrapper given to Maplibre (No transforms here!)
      const markerWrapper = document.createElement("button");
      markerWrapper.type = "button";
      markerWrapper.setAttribute("aria-label", machine.name);
      markerWrapper.className = "outline-none group bg-transparent border-none p-0 cursor-pointer block";
      markerWrapper.style.zIndex = isSelected ? "50" : "1";

      // The inner wrapper holds the animation, anchored strictly to the bottom center
      markerWrapper.innerHTML = `
        <div class="relative flex flex-col items-center pb-1.5 transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)]" 
             style="transform-origin: bottom center; transform: ${isSelected ? 'scale(1.25)' : 'scale(1)'};">
          
          <div class="absolute bottom-[100%] mb-2 whitespace-nowrap rounded-xl border border-white/80 bg-white/95 px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.2em] shadow-[0_8px_16px_rgba(62,52,39,0.08)] backdrop-blur-md transition-all duration-300 ${
            isSelected 
              ? "opacity-100 translate-y-0" 
              : "opacity-0 translate-y-2 pointer-events-none group-hover:opacity-100 group-hover:translate-y-0"
          }" style="color: ${isSelected ? palette.accent : '#2d241c'};">
            ${machine.code}
          </div>

          <div class="relative flex h-10 w-10 items-center justify-center rounded-full border-2 bg-white shadow-md transition-colors duration-300" 
               style="border-color: ${palette.accent}; background-color: ${isSelected ? palette.bg : 'white'}; box-shadow: ${isSelected ? `0 0 24px ${palette.glow}, 0 4px 12px rgba(0,0,0,0.1)` : '0 4px 10px rgba(0,0,0,0.08)'};">
            <span class="material-symbols-outlined text-[20px]" style="color: ${palette.accent};">
              memory
            </span>
            
            <span class="absolute -right-1 -top-1 h-3.5 w-3.5 rounded-full border-2 border-white" style="background-color: ${palette.accent};"></span>
          </div>

          <div class="h-2 w-0.5 mt-0.5 rounded-full opacity-80" style="background-color: ${palette.accent};"></div>
          
          <div class="absolute bottom-0 h-1.5 w-5 rounded-[100%] bg-[#2d241c]/30 blur-[2.5px] transition-all duration-300" style="transform: ${isSelected ? 'scale(1.2)' : 'scale(1)'};"></div>
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
        anchor: "bottom", // Anchors the bottom center of the whole div to the coordinates
      })
        .setLngLat([machine.longitude, machine.latitude])
        .addTo(map);

      markerRefs.current.push(markerInstance);
    });

    if (machines.length === 0) {
      return;
    }

    if (selectedMarkerId !== null) {
      const selectedMarker = machines.find(
        (machine) => machine.id === selectedMarkerId,
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

    // Padding m9ad m3a sidebar jdida
    map.fitBounds(bounds, {
      padding: { top: 120, bottom: 120, left: 450, right: 120 },
      maxZoom: 15,
      duration: 1000,
    });
  }, [machines, onMarkerSelect, selectedMarkerId]);

  return <div ref={mapContainer} className="h-full w-full outline-none" />;
}