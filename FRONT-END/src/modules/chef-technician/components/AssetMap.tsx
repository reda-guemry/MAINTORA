import { useEffect, useRef } from "react";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";

interface MapProps {
  markers?: {
    lng: number;
    lat: number;
    status: "critical" | "optimal" | "warning";
  }[];
}

export function AssetMap({ markers = [] }: MapProps) {
  const mapContainer = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<maplibregl.Map | null>(null);

  useEffect(() => {
    if (!mapContainer.current || mapRef.current) return;

    if (maplibregl.getRTLTextPluginStatus() === "unavailable") {
      try {
        maplibregl.setRTLTextPlugin(
          "https://unpkg.com/@mapbox/mapbox-gl-rtl-text@0.3.0/dist/mapbox-gl-rtl-text.js",
          true,
        );
      } catch (e) {
        console.error("RTL Plugin error:", e);
      }
    }

    const cartoStyle: any = {
      version: 8,
      sources: {
        "carto-titles": {
          type: "raster",
          tiles: [
            "https://basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}.png",
          ],
          tileSize: 256,
          attribution: "&copy; OpenStreetMap",
        },
      },
      layers: [
        {
          id: "carto-layer",
          type: "raster",
          source: "carto-titles",
          minzoom: 0,
          maxzoom: 20,
        },
      ],
    };

    mapRef.current = new maplibregl.Map({
      container: mapContainer.current,
      style: cartoStyle,
      center: [-7.5898, 33.5731],
      zoom: 20,
    });

    markers.forEach((m) => {
      const el = document.createElement("div");
      el.className = "custom-marker";
      const color =
        m.status === "critical"
          ? "#EF4444"
          : m.status === "warning"
            ? "#F59E0B"
            : "#388E8E";
      el.innerHTML = `
        <div style="background-color: ${color}; width: 12px; height: 12px; border-radius: 50%; border: 2px solid white; box-shadow: 0 0 10px rgba(0,0,0,0.2);">
          <div style="position: absolute; width: 100%; height: 100%; border-radius: 50%; background-color: ${color}; opacity: 0.4; animation: pulse 2s infinite;"></div>
        </div>
      `;

      new maplibregl.Marker({ element: el })
        .setLngLat([m.lng, m.lat])
        .addTo(mapRef.current!);
    });

    // return () => mapRef.current?.remove();
  }, [markers]);

  return <div ref={mapContainer} className="w-full h-full" />;
}
