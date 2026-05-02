

export type MachineStatus = "active" | "anomalous" | "maintenance";

export function getMachineStatusClasses(
  status: MachineStatus
): string {
  if (status === "anomalous") {
    return "border-[#f7c79f] bg-[#fff2e8] text-[#d8711f]";
  }

  if (status === "maintenance") {
    return "border-[#b9dfdc] bg-[#edf8f7] text-[#398e8e]";
  }

  return "border-[#b9dfdc] bg-[#edf8f7] text-[#398e8e]";
}


export function getMachineStatusLabel(
  status: MachineStatus
): string {
  if (status === "anomalous") {
    return "Critical alarm";
  }

  if (status === "maintenance") {
    return "Maintenance zone";
  }

  return "Operational";
}


export function getMachineBadgeClasses(
  status: MachineStatus
): string {
  if (status === "anomalous") {
    return "border border-red-200 bg-red-50 text-red-600";
  }

  if (status === "maintenance") {
    return "border border-amber-200 bg-amber-50 text-amber-700";
  }

  return "border border-emerald-200 bg-emerald-50 text-emerald-700";
}


export function getClientMachineStatusLabel(
  status: MachineStatus
): string {
  if (status === "anomalous") {
    return "Anomaly reported";
  }

  if (status === "maintenance") {
    return "Maintenance in progress";
  }

  return "Active";
}
