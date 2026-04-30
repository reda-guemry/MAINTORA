import type { MachineHistoryAnomalySeverity, MachineHistoryCheckStatus, MachineHistoryRepairRequestStatus, MachineHistoryTaskStatus } from "../types/machineHistory";


export function formatStatus(value: string | boolean | null | undefined) {
  if (value === true) return "ok";
  if (value === false) return "not ok";
  if (!value) return "not checked";

  return value.replace("_", " ");
}

export function getTaskStatusClasses(status: MachineHistoryTaskStatus) {
  if (status === "completed") return "bg-emerald-100 text-emerald-700";
  if (status === "in_progress") return "bg-[#eaf3f3] text-primary";
  return "bg-amber-100 text-amber-700";
}

export function getCheckStatusClasses(status: MachineHistoryCheckStatus) {
  if (status === "anomaly") return "border-red-200 bg-red-50 text-red-700";
  if (status === "not_ok" || status === false) {
    return "border-amber-200 bg-amber-50 text-amber-700";
  }
  if (status === "ok" || status === true) {
    return "border-emerald-200 bg-emerald-50 text-emerald-700";
  }
  return "border-slate-200 bg-slate-50 text-slate-500";
}

export      function getSeverityClasses(severity: MachineHistoryAnomalySeverity) {
  if (severity === "high") return "bg-red-100 text-red-700";
  if (severity === "medium") return "bg-amber-100 text-amber-700";
  return "bg-emerald-100 text-emerald-700";
}

export function getRepairStatusClasses(status: MachineHistoryRepairRequestStatus) {
  if (status === "completed") return "bg-emerald-100 text-emerald-700";
  if (status === "in_progress") return "bg-[#eaf3f3] text-primary";
  if (status === "open") return "bg-amber-100 text-amber-700";
  return "bg-slate-100 text-slate-600";
}

export function formatCost(value: string | number) {
  const amount = Number(value);

  if (Number.isNaN(amount)) return String(value);

  return amount.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
  });
}