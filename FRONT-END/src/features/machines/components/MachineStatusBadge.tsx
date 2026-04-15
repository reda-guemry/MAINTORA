import { cn } from "@/shared/utils/cn";
import type { MachineStatus } from "../types/machineComponents";

const statusClasses: Record<MachineStatus, string> = {
  operational: "bg-[#E6F4F1] text-[#388E8E]",
  maintenance: "bg-[#FFF4E5] text-[#E67E22]",
  offline: "bg-[#F2F2F2] text-[#555555]",
};

const dotClasses: Record<MachineStatus, string> = {
  operational: "bg-[#388E8E]",
  maintenance: "bg-[#E67E22]",
  offline: "bg-[#999999]",
};

export function MachineStatusBadge({ status }: { status: MachineStatus }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-[10px] font-black uppercase tracking-widest",
        statusClasses[status]
      )}
    >
      <span className={cn("h-2 w-2 rounded-full", dotClasses[status])} />
      {status}
    </span>
  );
}
