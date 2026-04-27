import { useEffect } from "react";
import "maplibre-gl/dist/maplibre-gl.css";
import maplibregl from "maplibre-gl";
import { useMap } from "@/shared/components/map/usaMap";

type MapViewProps = {
  onMapClick?: (lat: number, lng: number) => string | Promise<string>;
};

export function MapView({ onMapClick }: MapViewProps) {
  const { mapContainer, mapRef } = useMap();

  useEffect(() => {
    const map = mapRef.current;

    if (!map) {
      return;
    }

    new maplibregl.Marker().setLngLat([-6.84, 34.02]).addTo(map);

    const handleClick = async (e: maplibregl.MapMouseEvent) => {
      const lng = e.lngLat.lng;
      const lat = e.lngLat.lat;
      const city = await onMapClick?.(lat, lng);

      new maplibregl.Popup()
        .setLngLat([lng, lat])
        .setHTML(
          `Selected Location ${city || "Unknown"}:<br/>Lat: ${lat.toFixed(4)}, Lng: ${lng.toFixed(4)}`,
        )
        .addTo(map);
    };

    map.on("click", handleClick);

    map.on("load", () => {
      map.resize();
    });

    return () => {
      map.off("click", handleClick);
    };
  }, [mapRef, onMapClick]);

  return (
    <div className="relative h-full w-full overflow-hidden rounded-xl border bg-gray-100 shadow-sm">
      <div ref={mapContainer} className="absolute inset-0 h-full w-full" />
    </div>
  );
}
