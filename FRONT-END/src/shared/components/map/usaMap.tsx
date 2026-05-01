import { useEffect, useRef } from "react";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";

export function useMap() {
  const mapContainer = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<maplibregl.Map | null>(null);

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

    mapRef.current = new maplibregl.Map({
      container: mapContainer.current,
      style: {
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
      },
      center: [-7.62, 33.59],
      zoom: 16,
      attributionControl: false,
    });

    return () => {
      mapRef.current?.remove();
      mapRef.current = null;
    };
  }, []);

  return {
    mapContainer,
    mapRef,
  };
}
