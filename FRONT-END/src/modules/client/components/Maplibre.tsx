import { useEffect, useRef } from "react";
import "maplibre-gl/dist/maplibre-gl.css";
import maplibregl from "maplibre-gl";

export function MapView() {
  const mapContainer = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<maplibregl.Map | null>(null);

  useEffect(() => {
    if (!mapContainer.current || mapRef.current) return;

    if (maplibregl.getRTLTextPluginStatus() === 'unavailable') {
      try {
        maplibregl.setRTLTextPlugin(
          "https://unpkg.com/@mapbox/mapbox-gl-rtl-text@0.3.0/dist/mapbox-gl-rtl-text.js",
          true
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
            "https://basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}.png"
          ],
          tileSize: 256,
          attribution: "&copy; OpenStreetMap"
        }
      },
      layers: [
        {
          id: "carto-layer",
          type: "raster",
          source: "carto-tiles",
          minzoom: 0,
          maxzoom: 20
        }
      ]
    };

    mapRef.current = new maplibregl.Map({
      container: mapContainer.current,
      style: cartoStyle, 
      center: [-6.84, 34.02],
      zoom: 12,
    });

    mapRef.current.on('load', () => {
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
    <div className="w-full h-112.5 rounded-xl overflow-hidden border bg-gray-100 relative shadow-sm">
      <div ref={mapContainer} className="absolute inset-0 w-full h-full" />
    </div>
  );
}