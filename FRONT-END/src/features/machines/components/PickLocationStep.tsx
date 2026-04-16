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

      const resolvedLocation = city; // resolve location name from lat, lng using reverse geocoding API
      // console.log(resolvedLocation);

      setSelectedLocation({
        location: resolvedLocation,
        latitude: lat,
        longitude: lng,
      });

      return resolvedLocation ;

    } catch (error) {
      console.error("Failed to reverse geocode location:", error);
      // Optionally, you can still call onSelectLocation with lat/lng even if reverse geocoding fails
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
    <div className="px-6 py-5">
      <h3 className="text-lg font-bold text-gray-900">Pick machine location</h3>

      <div className="mt-4 h-80 rounded-lg border">
        <MapView onMapClick={handleMapClick} />
      </div>

      <div className="flex justify-end gap-3 mt-4">
        <div className="mt-4 flex justify-end gap-3 ">
          <Button
            type="button"
            variant="secondary"
            onClick={onSave}
            className="bg-primary rounded-lg px-4 py-3"
            disabled={!selectedLocation}
          >
            Save
          </Button>
        </div>

        <div className="mt-4 flex justify-end gap-3">
          <Button type="button" variant="secondary" onClick={onBack}>
            Back
          </Button>
        </div>
      </div>
    </div>
  );
}
