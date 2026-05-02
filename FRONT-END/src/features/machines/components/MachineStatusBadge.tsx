import { cn } from "@/shared/utils/cn";
import type { MachineStatus } from "../types/machineComponents";

const statusClasses: Record<MachineStatus, string> = {
  active: "border-emerald-200 bg-emerald-50 text-emerald-700",
  maintenance: "border-amber-200 bg-amber-50 text-amber-700",
  anomalous: "border-slate-200 bg-slate-50 text-slate-600",
};

const dotClasses: Record<MachineStatus, string> = {
  active: "bg-emerald-500",
  maintenance: "bg-amber-500",
  anomalous: "bg-slate-400",
};

export function MachineStatusBadge({ status }: { status: MachineStatus }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[10px] font-bold uppercase tracking-widest shadow-sm",
        statusClasses[status]
      )}
    >
      <span className={cn("h-1.5 w-1.5 rounded-full", dotClasses[status])} />
      {status}
    </span>
  );
}