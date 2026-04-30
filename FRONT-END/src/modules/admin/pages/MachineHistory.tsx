import { useParams } from "react-router-dom";
import { MachineHistoryView } from "@/features/machine-history";

export default function MachineHistoryPage() {
  const { machineId } = useParams();

  return (
    <MachineHistoryView
      apiPrefix="admin"
      backPath="/admin"
      machineId={machineId ? Number(machineId) : null}
    />
  );
}
