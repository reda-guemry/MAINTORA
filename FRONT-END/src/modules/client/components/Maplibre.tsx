import { useEffect, useRef } from "react";
import "maplibre-gl/dist/maplibre-gl.css";
import maplibregl from "maplibre-gl";

type MapViewProps = {
  onMapClick?: (lat: number, lng: number) => void;
};

export function MapView({ onMapClick }: MapViewProps) {
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
        "carto-tiles": {
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
          source: "carto-tiles",
          minzoom: 0,
          maxzoom: 20,
        },
      ],
    };

    mapRef.current = new maplibregl.Map({
      container: mapContainer.current,
      style: cartoStyle,
      center: [-7.5898, 33.5731],
      zoom: 12,
    });

    new maplibregl.Marker().setLngLat([-6.84, 34.02]).addTo(mapRef.current);

    const handleClick = (e: maplibregl.MapMouseEvent) => {
      const lng = e.lngLat.lng;
      const lat = e.lngLat.lat;

      onMapClick?.(lat, lng);
    };

    mapRef.current.on("click", handleClick);

    mapRef.current.on("load", () => {
      mapRef.current?.resize();
    });

    mapRef.current.addControl(new maplibregl.NavigationControl(), "top-right");

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, []);

  return (
    <div className="w-full h-full rounded-xl overflow-hidden border bg-gray-100 relative shadow-sm">
      <div ref={mapContainer} className="absolute inset-0 w-full h-full" />
    </div>
  );
}
