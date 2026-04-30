import type { ClientDashboardAnomalySeverity, ClientDashboardAnomalyStatus, ClientDashboardRepairRequestStatus } from "../types/dashboard";

export function getHealthScore(totalMachines: number, activeAnomalies: number) {
  if (totalMachines === 0) {
    return 100;
  }

  return Math.max(
    0,
    Math.round(((totalMachines - activeAnomalies) / totalMachines) * 100),
  );
}

export function getHealthLabel(score: number) {
  if (score >= 80) {
    return "Good Standing";
  }

  if (score >= 50) {
    return "Needs Attention";
  }

  return "Critical";
}

export function getSeverityClasses(severity: ClientDashboardAnomalySeverity) {
  if (severity === "high") {
    return "bg-red-100 text-red-700";
  }

  if (severity === "medium") {
    return "bg-amber-100 text-amber-700";
  }

  return "bg-emerald-100 text-emerald-700";
}

export function getAnomalyStatusClasses(status: ClientDashboardAnomalyStatus) {
  if (status === "open") {
    return "bg-red-100 text-red-700";
  }

  if (status === "in_progress") {
    return "bg-amber-100 text-amber-700";
  }

  if (status === "resolved") {
    return "bg-emerald-100 text-emerald-700";
  }

  return "bg-slate-100 text-slate-600";
}

export function getRepairStatusClasses(status: ClientDashboardRepairRequestStatus) {
  if (status === "open") {
    return "bg-amber-100 text-amber-700";
  }

  if (status === "in_progress") {
    return "bg-[#eaf3f3] text-primary";
  }

  if (status === "completed") {
    return "bg-emerald-100 text-emerald-700";
  }

  return "bg-slate-100 text-slate-600";
}

export function formatStatus(value: string) {
  return value.replace("_", " ");
}

export function formatCost(value: number | string) {
  const amount = Number(value);

  if (Number.isNaN(amount)) {
    return String(value);
  }

  return amount.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
  });
}