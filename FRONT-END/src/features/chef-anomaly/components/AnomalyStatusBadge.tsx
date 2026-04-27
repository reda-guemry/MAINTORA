import type { AnomalySeverity, AnomalyStatus } from "../types/anomaly";

function getStatusClasses(status: AnomalyStatus) {
  if (status === "open" || status === "pending") {
    return "border border-[#f4d6b3] bg-[#fff3e4] text-[#b46a1f]";
  }

  if (status === "in_progress") {
    return "border border-[#b9dfdc] bg-[#edf8f7] text-primary";
  }

  if (status === "resolved") {
    return "border border-emerald-200 bg-emerald-50 text-emerald-700";
  }

  return "border border-red-200 bg-red-50 text-red-600";
}

function getSeverityClasses(severity: AnomalySeverity) {
  if (severity === "high") {
    return "border border-red-200 bg-red-50 text-red-600";
  }

  if (severity === "medium") {
    return "border border-[#f4d6b3] bg-[#fff3e4] text-[#b46a1f]";
  }

  return "border border-slate-200 bg-slate-50 text-slate-600";
}

type AnomalyStatusBadgeProps = {
  status?: AnomalyStatus;
  severity?: AnomalySeverity;
};

export function AnomalyStatusBadge({
  status,
  severity,
}: AnomalyStatusBadgeProps) {
  if (!status && !severity) {
    return null;
  }

  return (
    <div className="flex flex-wrap gap-2">
      {status && (
        <span
          className={`rounded-full px-3 py-1 text-[10px] font-black uppercase tracking-[0.16em] ${getStatusClasses(status)}`}
        >
          {status.replace("_", " ")}
        </span>
      )}

      {severity && (
        <span
          className={`rounded-full px-3 py-1 text-[10px] font-black uppercase tracking-[0.16em] ${getSeverityClasses(severity)}`}
        >
          {severity} severity
        </span>
      )}
    </div>
  );
}
