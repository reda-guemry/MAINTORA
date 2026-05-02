import { MapView } from "@/modules/client/components/Maplibre";
import { Button } from "@/shared/components/ui/button/Button";
import { reverseGeocode } from "../services/reverceGeocode";
import { useState } from "react";

type PickLocationStepProps = {
  onBack: () => void;
  onSelectLocation: (payload: {
    location: string;
    latitude: number;
    longitude: number;
  }) => void;
};

export function PickLocationStep({
  onBack,
  onSelectLocation,
}: PickLocationStepProps) {
  const [selectedLocation, setSelectedLocation] = useState<{
    location: string;
    latitude: number;
    longitude: number;
  } | null>(null);

  async function handleMapClick(lat: number, lng: number) {
    try {
      const { city } = await reverseGeocode(lat, lng);
      const resolvedLocation = city;

      setSelectedLocation({
        location: resolvedLocation,
        latitude: lat,
        longitude: lng,
      });

      return resolvedLocation;
    } catch (error) {
      console.error("Failed to reverse geocode location:", error);
      onSelectLocation({
        location: "",
        latitude: lat,
        longitude: lng,
      });
    }
  }

  function onSave() {
    onSelectLocation({
      location: selectedLocation?.location || "",
      latitude: selectedLocation?.latitude || 0,
      longitude: selectedLocation?.longitude || 0,
    });
  }

  return (
    <div className="flex h-full flex-col">
      <div className="border-b border-slate-100 bg-slate-50/50 px-8 py-6 flex items-center justify-between">
        <div>
          <h3 className="text-xl font-bold text-slate-900">Pin Machine Location</h3>
          <p className="mt-1 text-sm text-slate-500">
            Click anywhere on the map to set the exact coordinates.
          </p>
        </div>
        {selectedLocation && (
          <div className="rounded-lg bg-teal-50 px-4 py-2 border border-teal-100 text-right">
             <p className="text-sm font-bold text-teal-800">{selectedLocation.location || "Location Found"}</p>
             <p className="text-[10px] font-medium text-teal-600 tracking-wider">
               LAT: {selectedLocation.latitude.toFixed(4)} | LNG: {selectedLocation.longitude.toFixed(4)}
             </p>
          </div>
        )}
      </div>

      <div className="p-6">
        <div className="h-112.5 w-full overflow-hidden rounded-2xl border border-slate-200 shadow-inner">
          <MapView onMapClick={handleMapClick} />
        </div>

        <div className="mt-6 flex justify-between items-center">
          <Button 
            type="button" 
            variant="secondary" 
            onClick={onBack}
            className="flex items-center gap-2 rounded-xl px-6 font-medium bg-white border-slate-200 text-slate-700 hover:bg-slate-50"
          >
            <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[18px]">arrow_back</span>
            <span> Back to Form </span>

            </div>
          </Button>

          <Button
            type="button"
            onClick={onSave}
            disabled={!selectedLocation}
            className="rounded-xl bg-[#43968C] px-8 font-semibold text-white shadow-sm transition-all hover:bg-[#367971] disabled:opacity-50 disabled:hover:bg-[#43968C]"
          >
            Confirm Location
          </Button>
        </div>
      </div>
    </div>
  );
}