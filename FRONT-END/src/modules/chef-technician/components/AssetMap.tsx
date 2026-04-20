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
  Machine["status"] ,
  {
    accent: string;
    glow: string;
    ring: string;
  } 
> = {
  active: {
    accent: "#3b8f88",
    glow: "rgba(59, 143, 136, 0.24)",
    ring: "#b7ded8",
  },
  anomalous: {
    accent: "#d9534f",
    glow: "rgba(217, 83, 79, 0.26)",
    ring: "#f4c4c2",
  },
  maintenance: {
    accent: "#d58a1d",
    glow: "rgba(213, 138, 29, 0.24)",
    ring: "#f1d2a0",
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
      new maplibregl.NavigationControl(),
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
      const markerElement = document.createElement("button");

      markerElement.type = "button";
      markerElement.setAttribute("aria-label", machine.name);
      markerElement.style.background = "transparent";
      markerElement.style.border = "none";
      markerElement.style.padding = "0";
      markerElement.style.cursor = "pointer";
      markerElement.innerHTML = `
        <div style="display:flex; flex-direction:column; align-items:center; gap:8px;">
          <div style="padding:6px 10px; border-radius:999px; background:rgba(255,255,255,0.96); border:1px solid ${isSelected ? palette.ring : "#e2d8ca"}; box-shadow:${isSelected ? `0 12px 28px ${palette.glow}` : "0 8px 18px rgba(59,45,31,0.12)"}; color:#2d241c; font-size:11px; font-weight:800; letter-spacing:0.08em; text-transform:uppercase; white-space:nowrap;">
            ${machine.code}
          </div>
          <div style="position:relative; display:flex; align-items:center; justify-content:center; width:${isSelected ? 62 : 54}px; height:${isSelected ? 62 : 54}px; border-radius:18px; background:${isSelected ? "#fffaf2" : "rgba(255,255,255,0.96)"}; border:2px solid ${isSelected ? palette.accent : "#eadfce"}; box-shadow:${isSelected ? `0 20px 34px ${palette.glow}` : "0 10px 22px rgba(59,45,31,0.14)"};">
            <span class="material-symbols-outlined" style="font-size:28px; color:${palette.accent};">precision_manufacturing</span>
            <span style="position:absolute; right:-2px; top:-2px; width:14px; height:14px; border-radius:999px; background:${palette.accent}; border:2px solid #fff;"></span>
          </div>
        </div>
      `;

      markerElement.addEventListener("click", (event) => {
        event.stopPropagation();
        map.flyTo({
          center: [machine.longitude, machine.latitude],
          zoom: map.getZoom(),
          essential: true,
        });
        onMarkerSelect?.(machine);
      });

      const markerInstance = new maplibregl.Marker({
        element: markerElement,
        anchor: "bottom",
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
          zoom: Math.max(map.getZoom(), 15.5),
          essential: true,
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
      padding: 90,
      maxZoom: 15,
      duration: 900,
    });
  }, [machines, onMarkerSelect, selectedMarkerId]);

  return <div ref={mapContainer} className="h-full w-full" />;
}
