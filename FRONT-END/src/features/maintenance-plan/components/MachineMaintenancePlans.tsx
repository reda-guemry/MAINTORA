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

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
      <div className="flex flex-col gap-3">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0 flex-1">
            <p className="text-[11px] font-bold uppercase tracking-wider text-gray-400">
              Maintenance Plans
            </p>
            <h3 className="mt-1 truncate text-[15px] font-bold text-[#1A1A1A]">
              {machineName}
            </h3>
          </div>
          <span className="shrink-0 rounded-md bg-[#eef7f6] px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-[#388E8E]">
            {maintenancePlans.length} Total
          </span>
        </div>

        <p className="text-[12px] text-gray-500">
          Create, update, or remove preventive routines for this machine.
        </p>

        <div className="mt-2">
          {hasActivePlan ? (
            <div className="flex items-start gap-2 rounded-lg border border-[#388E8E]/20 bg-[#eef7f6] p-3 text-[12px] font-medium text-[#2c7a7a]">
              <span className="material-symbols-outlined mt-0.5 text-[16px] text-[#388E8E]">
                verified
              </span>
              <span>This machine already has an active maintenance plan.</span>
            </div>
          ) : (
            <Button
              type="button"
              size="sm"
              onClick={onAdd}
              className="group flex w-full items-center justify-center gap-1.5 rounded-lg bg-[#388E8E] text-[13px] text-white transition-colors hover:bg-[#2c7a7a]"
            >
              <div className="flex items-center gap-1.5 rounded-lg text-[13px] text-white transition-colors">
                <span className="material-symbols-outlined text-[18px]">
                  add
                </span>
                <span >New Plan</span>
              </div>
            </Button>
          )}
        </div>
      </div>

      <div className="mt-4 space-y-3">
        {sortedPlans.length === 0 ? (
          <div className="rounded-lg border border-dashed border-gray-200 bg-gray-50 p-4 text-center text-[12px] text-gray-500">
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
    </div>
  );
}
