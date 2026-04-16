import { MapView } from "@/modules/client/components/Maplibre";
import { Button } from "@/shared/components/ui/button/Button";

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
  async function handleMapClick(lat: number, lng: number) {
    const resolvedLocation = "ded"; // resolve location name from lat, lng using reverse geocoding API

    onSelectLocation({
      location: resolvedLocation,
      latitude: lat,
      longitude: lng,
    });
  }

  mapRef.current.on("click", (e) => {
    const lng = e.lngLat.lng;
    const lat = e.lngLat.lat;

    console.log({ lat, lng });
  });

  return (
    <div className="px-6 py-5">
      <h3 className="text-lg font-bold text-gray-900">Pick machine location</h3>

      <div className="mt-4 h-80 rounded-lg border">
        <MapView />
      </div>

      <div className="mt-4 flex justify-end gap-3">
        <Button type="button" variant="secondary" onClick={onBack}>
          Back
        </Button>
      </div>
    </div>
  );
}
