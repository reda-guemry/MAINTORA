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
    <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm transition-all hover:border-[#388E8E]/40 hover:shadow-md">
      <div className="flex flex-col gap-4">
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-start justify-between gap-2">
            <p className="text-[14px] font-bold text-[#1A1A1A] line-clamp-1 flex-1">
              {maintenancePlan.checklist_template_id.name}
            </p>
            <span
              className={cn(
                "shrink-0 rounded-md px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider",
                getMaintenancePlanStatusClasses(maintenancePlan.status)
              )}
            >
              {maintenancePlan.status}
            </span>
          </div>

          <p className="mt-1.5 text-[12px] leading-relaxed text-gray-500 line-clamp-2">
            {maintenancePlan.checklist_template_id.description ||
              "No description available for this template."}
          </p>

          <div className="mt-4 grid grid-cols-2 gap-2">
            <div className="rounded-lg border border-gray-100 bg-gray-50 p-2.5">
              <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400">
                Assigned
              </p>
              <p className="mt-1 truncate text-[12px] font-semibold text-gray-700">
                {maintenancePlan.assigned_to.first_name}{" "}
                {maintenancePlan.assigned_to.last_name}
              </p>
            </div>

            <div className="rounded-lg border border-gray-100 bg-gray-50 p-2.5">
              <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400">
                Frequency
              </p>
              <p className="mt-1 truncate text-[12px] font-semibold text-gray-700">
                {formatFrequency(
                  maintenancePlan.repeat_every,
                  maintenancePlan.repeat_unit,
                )}
              </p>
            </div>

            <div className="col-span-2 rounded-lg border border-gray-100 bg-gray-50 p-2.5">
              <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400">
                Starts
              </p>
              <p className="mt-1 truncate text-[12px] font-semibold text-gray-700">
                {formatStartDate(maintenancePlan.start_date)}
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 pt-1">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onEdit(maintenancePlan)}
            className="flex h-9 flex-1 items-center justify-center gap-1.5 text-[12px] font-medium"
          >
            <span className="material-symbols-outlined text-[16px]">edit</span>
            Edit
          </Button>
          <Button
            variant="danger"
            size="sm"
            onClick={() => onDelete(maintenancePlan)}
            className="flex h-9 flex-1 items-center justify-center gap-1.5 text-[12px] font-medium"
          >
            <span className="material-symbols-outlined text-[16px]">delete</span>
            Delete
          </Button>
        </div>
      </div>
    </div>
  );
}