
export type RepairRequestStatus = "open" | "in_progress" | "completed" | "rejected";
export type AnomalyStatus = "open" | "pending" | "in_progress" | "resolved" | "rejected";
export type AnomalySeverity = "high" | "medium" | "low";

export function getRepairStatusClasses(status: RepairRequestStatus | string): string {
  if (status === "open") {
    return "border border-[#f4d6b3] bg-[#fff3e4] text-[#b46a1f]";
  }

  if (status === "in_progress") {
    return "border border-[#b9dfdc] bg-[#edf8f7] text-[#398e8e]";
  }

  if (status === "completed") {
    return "border border-emerald-200 bg-emerald-50 text-emerald-700";
  }

  return "border border-red-200 bg-red-50 text-red-600";
}


export function getAnomalyStatusClasses(status: AnomalyStatus | string): string {
  if (status === "open" || status === "pending") {
    return "border border-[#f4d6b3] bg-[#fff3e4] text-[#b46a1f]";
  }

  if (status === "in_progress") {
    return "border border-[#b9dfdc] bg-[#edf8f7] text-[#398e8e]";
  }

  if (status === "resolved") {
    return "border border-emerald-200 bg-emerald-50 text-emerald-700";
  }

  return "border border-red-200 bg-red-50 text-red-600";
}

export function getAnomalySeverityClasses(severity: AnomalySeverity | string): string {
  if (severity === "high") {
    return "border border-red-200 bg-red-50 text-red-600";
  }

  if (severity === "medium") {
    return "border border-[#f4d6b3] bg-[#fff3e4] text-[#b46a1f]";
  }

  return "border border-slate-200 bg-slate-50 text-slate-600";
}


export function getCheckStatusClasses(
  currentStatus: string | null,
  targetStatus: "ok" | "not_ok" | "anomaly"
): string {
  if (currentStatus !== targetStatus) {
    if (targetStatus === "ok") {
      return "border border-[#b9dfdc] bg-[#edf8f7] text-[#398e8e]";
    }

    if (targetStatus === "not_ok") {
      return "border border-[#f2d7b4] bg-[#fff3e5] text-[#c77422]";
    }

    return "border border-red-200 bg-red-50 text-red-600";
  }

  if (targetStatus === "ok") {
    return "bg-[#398e8e] text-white";
  }

  if (targetStatus === "not_ok") {
    return "bg-[#d97706] text-white";
  }

  return "bg-red-600 text-white";
}


export function getChecklistItemClasses(
  status: "ok" | "not_ok" | "anomaly" | string
): string {
  if (status === "anomaly") {
    return "border-red-200 bg-red-50";
  }

  if (status === "not_ok") {
    return "border-[#f4d6b3] bg-[#fff3e4]";
  }

  if (status === "ok") {
    return "border-[#b9dfdc] bg-[#edf8f7]";
  }

  return "border-[#e6ddd2] bg-[#fcfaf7]";
}
