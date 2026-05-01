export function formatStatus(value: string) {
  return value.replace("_", " ");
}

export function formatNumber(value: number) {
  return value.toLocaleString("en-US");
}

export function getSystemHealthScore(totalMachines: number, activeAnomalies: number) {
  if (totalMachines === 0) {
    return 100;
  }

  return Math.max(
    0,
    Math.round(((totalMachines - activeAnomalies) / totalMachines) * 100),
  );
}

export function getUserStatusClasses(status: string) {
  if (status === "active") {
    return "bg-emerald-50 text-emerald-700";
  }

  if (status === "suspended") {
    return "bg-amber-50 text-amber-700";
  }

  return "bg-slate-100 text-slate-600";
}
