import type { Machine } from "@/features/roundes";
import type { MaintenanceCycleStats } from "../types/maintenancePlan";



export function hasActiveMaintenancePlan(machine: Machine) {
  return (machine.maintenance_plans ?? []).some((plan) => {
    return plan.status === "active";
  });
}

export function getMaintenanceCycleStats(machines: Machine[]): MaintenanceCycleStats {
  const totalAssets = machines.length;
  const automatedAssets = machines.filter(hasActiveMaintenancePlan).length;
  const activeCycles = machines.reduce((total, machine) => {
    return (
      total
      + (machine.maintenance_plans ?? []).filter((plan) => plan.status === "active").length
    );
  }, 0);

  return {
    activeCycles,
    automatedAssets,
    automatedAssetsPercent:
      totalAssets > 0 ? Math.round((automatedAssets / totalAssets) * 100) : 0,
    pendingAssets: Math.max(totalAssets - automatedAssets, 0),
    totalAssets,
  };
}
