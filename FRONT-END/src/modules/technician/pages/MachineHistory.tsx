import { useParams } from "react-router-dom";
import { MachineHistoryView } from "@/features/machine-history";

export default function MachineHistoryPage() {
  const { machineId } = useParams();

  return (
    <MachineHistoryView
      apiPrefix="technician"
      backPath="/technician/map"
      machineId={machineId ? Number(machineId) : null}
    />
  );
}
