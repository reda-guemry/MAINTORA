import { useState } from "react";
import { Button } from "@/shared/components/ui";
import { reverseGeocode } from "../services/reverceGeocode";
import { MapView } from "@/modules/client/components/Maplibre";

type PickLocationStepProps = {
  location: string;
  latitude: number;
  longitude: number;
  onSave: (
    location: string,
    latitude: number,
    longitude: number
  ) => void;
  onBack: () => void;
};

export function LocationModal({
  location,
  latitude,
  longitude,
  onSave,
  onBack,
}: PickLocationStepProps) {
  const [selectedLocation, setSelectedLocation] = useState<{
    location: string;
    latitude: number;
    longitude: number;
  } | null>(null);

  async function handleMapClick(lat: number, lng: number) {
    try {
      const { city } = await reverseGeocode(lat, lng);

      const resolvedLocation = city ?? `${lat}, ${lng}`;

      setSelectedLocation({
        location: resolvedLocation,
        latitude: lat,
        longitude: lng,
      });

      return resolvedLocation;
    } catch (error) {
      console.error("Failed to reverse geocode location:", error);

      setSelectedLocation({
        location: `${lat}, ${lng}`,
        latitude: lat,
        longitude: lng,
      });
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
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/50 p-4">
      <div className="w-full max-w-3xl rounded-2xl bg-white shadow-2xl">
        <div className="border-b border-gray-200 px-6 py-4">
          <h3 className="text-lg font-bold text-gray-900">
            Pick machine location
          </h3>
          <p className="mt-1 text-sm text-gray-500">
            Click on the map to select a new location.
          </p>
        </div>

        <div className="px-6 py-5">
          <div className="h-80 overflow-hidden rounded-xl border border-gray-200">
            <MapView onMapClick={handleMapClick} />
          </div>

          <div className="mt-4 rounded-lg bg-gray-50 px-4 py-3 text-sm text-gray-600">
            {selectedLocation ? (
              <span>
                Selected: <strong>{selectedLocation.location}</strong> (
                {selectedLocation.latitude}, {selectedLocation.longitude})
              </span>
            ) : (
              <span>
                Current: <strong>{location || "No location selected"}</strong> (
                {latitude}, {longitude})
              </span>
            )}
          </div>

          <div className="mt-5 flex items-center justify-end gap-3">
            <Button type="button" variant="secondary" onClick={onBack}>
              Back
            </Button>

            <Button
              type="button"
              onClick={onSelectLocation}
              disabled={!selectedLocation}
            >
              Save Location
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}