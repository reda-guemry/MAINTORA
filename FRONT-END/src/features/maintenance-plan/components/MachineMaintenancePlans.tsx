import { Button } from "@/shared/components/ui";
import { MaintenancePlanCard } from "./MaintenancePlanCard";
import type { MachineMaintenancePlansProps } from "../types/maintenancePlan";

export function MachineMaintenancePlans({
  hasActivePlan = false,
  machineName,
  maintenancePlans,
  onAdd,
  onEdit,
  onDelete,
}: MachineMaintenancePlansProps) {
  const sortedPlans = [...maintenancePlans].sort((firstPlan, secondPlan) => {
    if (firstPlan.status !== secondPlan.status) {
      return firstPlan.status === "active" ? -1 : 1;
    }

    return firstPlan.start_date.localeCompare(secondPlan.start_date);
  });

  return (<div className="rounded-[20px] border border-[#e6dbcd] bg-[#fcfaf7] p-4 shadow-sm">
      <div className="flex flex-col gap-3">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0 flex-1">
            <p className="text-[9px] font-bold uppercase tracking-[0.24em] text-[#988a79]">
              Maintenance Plans
            </p>
            <h3 className="mt-1 truncate text-base font-black text-[#2d241c]">
              {machineName}
            </h3>
          </div>
          <span className="shrink-0 rounded-full bg-[#e1efed] px-2.5 py-1 text-[9px] font-black uppercase tracking-[0.18em] text-[#3b8f88]">
            {maintenancePlans.length} Total
          </span>
        </div>

        <p className="text-[11px] leading-5 text-[#6f6254]">
          Create, update, or remove preventive routines without leaving the
          round workspace.
        </p>

        <div className="mt-1">
          {hasActivePlan ? (
            <div className="flex items-start gap-2 rounded-[14px] border border-[#d5eee9] bg-[#edf8f7] px-3 py-3 text-[11px] font-semibold leading-5 text-[#3b7772]">
              <span className="material-symbols-outlined mt-0.5 text-[18px] text-[#388E8E]">
                verified
              </span>
              <span>This machine already has an active maintenance plan.</span>
            </div>
          ) : (
            <Button
              type="button"
              size="sm"
              onClick={onAdd}
              className="flex w-full items-center justify-center gap-1.5"
            >
              <span className="material-symbols-outlined text-[18px]">add</span>
              New Plan
            </Button>
          )}
        </div>
      </div>

      <div className="mt-4 space-y-2.5">
        {sortedPlans.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-[#ddd5c8] bg-white/50 px-3 py-4 text-center text-xs text-[#7f7468]">
            No maintenance plans are linked to this machine yet.
          </div>
        ) : (
          sortedPlans.map((maintenancePlan) => (
            <MaintenancePlanCard
              key={maintenancePlan.id}
              maintenancePlan={maintenancePlan}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          ))
        )}
      </div>
    </div>);
}
