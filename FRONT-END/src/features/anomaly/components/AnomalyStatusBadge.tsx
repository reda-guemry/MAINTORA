import { getAnomalyStatusClasses, getAnomalySeverityClasses } from "@/shared/utils/statusHelpers";
import type { AnomalySeverity, AnomalyStatus } from "../types/anomaly";

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
          className={`rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-widest ${getAnomalyStatusClasses(status)}`}
        >
          {status.replace("_", " ")}
        </span>
      )}

      {severity && (
        <span
          className={`rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-widest ${getAnomalySeverityClasses(severity)}`}
        >
          {severity} severity
        </span>
      )}
    </div>
  );
}