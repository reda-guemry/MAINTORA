import type { Machine } from "@/features/machines";
import { TechnicianAssetMap } from "@/modules/technician/components/TechnicianAssetMap";

type ClientAssetMapProps = {
  machines: Machine[];
  selectedMachineId?: number | null;
  onMarkerSelect?: (machine: Machine) => void;
  onMapBackgroundClick?: () => void;
};

export function ClientAssetMap(props: ClientAssetMapProps) {
  return <TechnicianAssetMap {...props} />;
}
