import { useState } from "react";
import { Button } from "@/shared/components/ui";
import { reverseGeocode } from "../services/reverceGeocode";
import { MapView } from "@/modules/client/components/Maplibre";

type LocationModalProps = {
  location: string;
  latitude: number;
  longitude: number;
  onSave: (location: string, latitude: number, longitude: number) => void;
  onBack: () => void;
};

export function LocationModal({
  location,
  latitude,
  longitude,
  onSave,
  onBack,
}: LocationModalProps) {
  const [selectedLocation, setSelectedLocation] = useState<{
    location: string;
    latitude: number;
    longitude: number;
  } | null>(null);

  async function handleMapClick(lat: number, lng: number) {
    try {
      const { city } = await reverseGeocode(lat, lng);
      const resolvedLocation = city ?? `${lat.toFixed(4)}, ${lng.toFixed(4)}`;

      setSelectedLocation({
        location: resolvedLocation,
        latitude: lat,
        longitude: lng,
      });

      return resolvedLocation;
    } catch (error) {
      console.error("Failed to reverse geocode location:", error);

      setSelectedLocation({
        location: `${lat.toFixed(4)}, ${lng.toFixed(4)}`,
        latitude: lat,
        longitude: lng,
      });
      return "Unknown Location";
    }
  }

  function onSelectLocation() {
    onSave(
      selectedLocation?.location || location || "",
      selectedLocation?.latitude || latitude,
      selectedLocation?.longitude || longitude
    );
  }

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-slate-900/40 p-4 backdrop-blur-sm transition-all sm:p-6">
      <div className="w-full max-w-4xl overflow-hidden rounded-[24px] bg-white shadow-2xl">
        <div className="flex items-center justify-between border-b border-slate-100 bg-slate-50/50 px-8 py-6">
          <div>
            <h3 className="text-xl font-bold text-slate-900">
              Edit Machine Location
            </h3>
            <p className="mt-1.5 text-sm text-slate-500">
              Click anywhere on the map to set new coordinates.
            </p>
          </div>

          {/* L-Badge jdid bhal dyal Create */}
          {selectedLocation ? (
            <div className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white p-3 shadow-sm transition-all">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-teal-50 text-[#43968C]">
                <span className="material-symbols-outlined text-[20px]">location_on</span>
              </div>
              <div className="text-left">
                <p className="text-sm font-bold text-slate-900">
                  {selectedLocation.location || "Location Pinned"}
                </p>
                <div className="mt-0.5 flex items-center gap-2 text-[10px] font-bold tracking-widest text-slate-400">
                  <span>LAT: {selectedLocation.latitude.toFixed(4)}</span>
                  <span className="h-1 w-1 rounded-full bg-slate-300"></span>
                  <span>LNG: {selectedLocation.longitude.toFixed(4)}</span>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white p-3 shadow-sm transition-all">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-slate-50 text-slate-400">
                <span className="material-symbols-outlined text-[20px]">location_on</span>
              </div>
              <div className="text-left">
                <p className="text-sm font-bold text-slate-700">
                  {location || "Current Location"}
                </p>
                <div className="mt-0.5 flex items-center gap-2 text-[10px] font-bold tracking-widest text-slate-400">
                  <span>LAT: {latitude?.toFixed(4) || "0.0000"}</span>
                  <span className="h-1 w-1 rounded-full bg-slate-300"></span>
                  <span>LNG: {longitude?.toFixed(4) || "0.0000"}</span>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="p-6">
          <div className="h-[450px] w-full overflow-hidden rounded-2xl border border-slate-200 shadow-inner">
            <MapView onMapClick={handleMapClick} />
          </div>

          <div className="mt-6 flex items-center justify-between">
            <Button
              type="button"
              variant="secondary"
              onClick={onBack}
              className="flex items-center gap-2 rounded-xl border-slate-200 bg-white px-6 font-medium text-slate-700 hover:bg-slate-50"
            >
              <span className="material-symbols-outlined text-[18px]">
                arrow_back
              </span>
              Back
            </Button>

            <Button
              type="button"
              onClick={onSelectLocation}
              disabled={!selectedLocation}
              className="rounded-xl bg-[#43968C] px-8 font-semibold text-white shadow-sm transition-all hover:bg-[#367971] disabled:opacity-50 disabled:hover:bg-[#43968C]"
            >
              Save New Location
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}