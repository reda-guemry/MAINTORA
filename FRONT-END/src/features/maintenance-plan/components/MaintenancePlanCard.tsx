import { Button } from "@/shared/components/ui";
import { cn } from "@/shared/utils";
import {
  getMaintenancePlanStatusClasses,
  formatFrequency,
  formatStartDate,
} from "@/shared/utils/maintenancePlanHelpers";
import type { MaintenancePlanCardProps } from "../types/maintenancePlan";

export function MaintenancePlanCard({
  maintenancePlan,
  onEdit,
  onDelete,
}: MaintenancePlanCardProps) {
  return (
    <div className="rounded-[22px] border border-[#e7ddd0] bg-white px-4 py-4 shadow-[0_10px_24px_rgba(62,52,39,0.05)]">
      <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <p className="text-sm font-bold text-[#2d241c]">
              {maintenancePlan.checklist_template_id.name}
            </p>
            <span
              className={cn(
                "rounded-full px-3 py-1 text-[10px] font-black uppercase tracking-[0.16em]",
                getMaintenancePlanStatusClasses(maintenancePlan.status),
              )}
            >
              {maintenancePlan.status}
            </span>
          </div>

          <p className="mt-2 text-sm leading-6 text-[#6f6254]">
            {maintenancePlan.checklist_template_id.description ||
              "No description available for this template."}
          </p>

          <div className="mt-4 grid gap-3 text-sm text-[#6f6254] sm:grid-cols-3">
            <div className="rounded-2xl bg-[#f7f3ec] px-4 py-3">
              <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#988a79]">
                Assigned
              </p>
              <p className="mt-2 font-semibold text-[#2d241c]">
                {maintenancePlan.assigned_to.first_name}{" "}
                {maintenancePlan.assigned_to.last_name}
              </p>
            </div>

            <div className="rounded-2xl bg-[#f7f3ec] px-4 py-3">
              <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#988a79]">
                Frequency
              </p>
              <p className="mt-2 font-semibold text-[#2d241c]">
                {formatFrequency(
                  maintenancePlan.repeat_every,
                  maintenancePlan.repeat_unit,
                )}
              </p>
            </div>

            <div className="rounded-2xl bg-[#f7f3ec] px-4 py-3">
              <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#988a79]">
                Starts
              </p>
              <p className="mt-2 font-semibold text-[#2d241c]">
                {formatStartDate(maintenancePlan.start_date)}
              </p>
            </div>
          </div>
        </div>

        <div className="flex shrink-0 gap-2">
          <Button variant="outline" size="sm" onClick={() => onEdit(maintenancePlan)}>
            <span className="material-symbols-outlined text-[16px]">edit</span>
            Edit
          </Button>
          <Button variant="danger" size="sm" onClick={() => onDelete(maintenancePlan)}>
            <span className="material-symbols-outlined text-[16px]">delete</span>
            Delete
          </Button>
        </div>
      </div>
    </div>
  );
}
