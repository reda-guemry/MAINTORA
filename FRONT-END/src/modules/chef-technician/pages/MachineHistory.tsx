import { useParams } from "react-router-dom";
import { MachineHistoryView } from "@/features/machine-history";

export function MachineHistoryPage() {
  const { machineId } = useParams();

  return (
    <MachineHistoryView
      apiPrefix="chef-technician"
      backPath="/chef-technician/mape"
      machineId={machineId ? Number(machineId) : null}
    />
  );
}
