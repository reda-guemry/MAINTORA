export type RepairRequestStatus = "open" | "in_progress" | "completed" | "rejected";
export type AnomalyStatus = "open" | "pending" | "in_progress" | "resolved" | "rejected";
export type AnomalySeverity = "high" | "medium" | "low";

export function getRepairStatusClasses(status: RepairRequestStatus | string): string {
  if (status === "open") {
    return "border border-amber-200 bg-amber-50 text-amber-700";
  }

  if (status === "in_progress") {
    return "border border-teal-200 bg-teal-50 text-teal-700";
  }

  if (status === "completed") {
    return "border border-emerald-200 bg-emerald-50 text-emerald-700";
  }

  return "border border-red-200 bg-red-50 text-red-600";
}

export function getAnomalyStatusClasses(status: AnomalyStatus | string): string {
  if (status === "open" || status === "pending") {
    return "border border-amber-200 bg-amber-50 text-amber-700";
  }

  if (status === "in_progress") {
    return "border border-teal-200 bg-teal-50 text-teal-700";
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
    return "border border-amber-200 bg-amber-50 text-amber-700";
  }

  return "border border-slate-200 bg-slate-50 text-slate-600";
}

export function getCheckStatusClasses(
  currentStatus: string | null,
  targetStatus: "ok" | "not_ok" | "anomaly"
): string {
  if (currentStatus !== targetStatus) {
    if (targetStatus === "ok") {
      return "border border-teal-200 bg-teal-50 text-teal-700";
    }

    if (targetStatus === "not_ok") {
      return "border border-amber-200 bg-amber-50 text-amber-700";
    }

    return "border border-red-200 bg-red-50 text-red-600";
  }

  if (targetStatus === "ok") {
    return "bg-teal-600 text-white";
  }

  if (targetStatus === "not_ok") {
    return "bg-amber-500 text-white";
  }

  return "bg-red-600 text-white";
}

export function getChecklistItemClasses(
  status: "ok" | "not_ok" | "anomaly" | string
): string {
  if (status === "anomaly") {
    return "border-red-200 bg-red-50 text-red-700";
  }

  if (status === "not_ok") {
    return "border-amber-200 bg-amber-50 text-amber-700";
  }

  if (status === "ok") {
    return "border-teal-200 bg-teal-50 text-teal-700";
  }

  return "border-slate-200 bg-slate-50 text-slate-700";
}