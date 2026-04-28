


export function formatFrequency(repeatEvery: number, repeatUnit: string): string {
  const unitLabel = repeatEvery === 1 ? repeatUnit : `${repeatUnit}s`;
  return `Every ${repeatEvery} ${unitLabel}`;
}


export function getMaintenancePlanStatusClasses(
  status: "active" | "inactive"
): string {
  if (status === "active") {
    return "border border-emerald-200 bg-emerald-50 text-emerald-700";
  }

  return "border border-slate-200 bg-slate-100 text-slate-600";
}


export function formatStartDate(startDate: string): string {
  const date = new Date(startDate);

  if (Number.isNaN(date.getTime())) {
    return startDate;
  }

  return date.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}
