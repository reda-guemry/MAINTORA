import { useParams } from "react-router-dom";
import { MachineHistoryView } from "@/features/machine-history";

export default function MachineHistoryPage() {
  const { machineId } = useParams();

  return (
    <MachineHistoryView
      apiPrefix="client"
      backPath="/client/machines"
      machineId={machineId ? Number(machineId) : null}
    />
  );
}
