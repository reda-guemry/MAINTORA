import { useEffect, useRef } from "react";
import "maplibre-gl/dist/maplibre-gl.css";
import maplibregl from "maplibre-gl";
import { useMap } from "@/shared/components/map/usaMap";

type MapViewProps = {
  onMapClick?: (lat: number, lng: number) => string | Promise<string>;
};

export function MapView({ onMapClick }: MapViewProps) {
  const { mapContainer, mapRef } = useMap();
  
  const currentMarker = useRef<maplibregl.Marker | null>(null);
  const currentPopup = useRef<maplibregl.Popup | null>(null);

  useEffect(() => {
    const map = mapRef.current;

    if (!map) {
      return;
    }

    const handleClick = async (e: maplibregl.MapMouseEvent) => {
      const lng = e.lngLat.lng;
      const lat = e.lngLat.lat;
      
      if (currentMarker.current) currentMarker.current.remove();
      if (currentPopup.current) currentPopup.current.remove();

      currentMarker.current = new maplibregl.Marker({ color: "#43968C" })
        .setLngLat([lng, lat])
        .addTo(map);

      const city = await onMapClick?.(lat, lng);

      currentPopup.current = new maplibregl.Popup({
        closeButton: false, 
        closeOnClick: false,
        offset: 30, 
      })
        .setLngLat([lng, lat])
        .setHTML(
          `<div class="flex flex-col items-center px-1 py-0.5 font-sans">
            <span class="text-xs font-bold text-slate-900">${city || "Location Pinned"}</span>
            <span class="mt-0.5 text-[10px] font-medium text-slate-500">${lat.toFixed(4)}, ${lng.toFixed(4)}</span>
          </div>`
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
    <div className="relative h-full w-full overflow-hidden rounded-2xl border border-slate-200 bg-slate-50 shadow-inner">
      <div ref={mapContainer} className="absolute inset-0 h-full w-full" />
    </div>
  );
}