import { Button } from "@/shared/components/ui";
import { MaintenancePlanCard } from "./MaintenancePlanCard";
import type { MachineMaintenancePlansProps } from "../types/maintenancePlan";

export function MachineMaintenancePlans({
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
    <div className="mt-5 rounded-[24px] border border-[#e6dbcd] bg-white p-5 shadow-[0_16px_35px_rgba(62,52,39,0.08)]">
      <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
        <div>
          <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-[#988a79]">
            Maintenance Plans
          </p>
          <h3 className="mt-2 text-lg font-black text-[#2d241c]">
            {machineName}
          </h3>
          <p className="mt-2 text-sm leading-6 text-[#6f6254]">
            Create, update, or remove preventive routines without leaving the
            round workspace.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <span className="rounded-full bg-[#e1efed] px-3 py-1 text-[10px] font-black uppercase tracking-[0.18em] text-[#3b8f88]">
            {maintenancePlans.length} Total
          </span>
          <Button type="button" size="sm" onClick={onAdd}>
            <span className="material-symbols-outlined text-[18px]">add</span>
            New Plan
          </Button>
        </div>
      </div>

      <div className="mt-4 space-y-3">
        {sortedPlans.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-[#ddd5c8] bg-[#fbf8f2] px-4 py-5 text-sm text-[#7f7468]">
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
