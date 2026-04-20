import { MaintenancePlanForm } from "./MaintenancePlanForm";
import type { EditMaintenancePlanModalProps } from "../types/maintenancePlan";

function normalizeDateInputValue(date: string) {
  return date.slice(0, 10);
}

export function EditMaintenancePlanModal({
  maintenancePlan,
  technicians,
  onClose,
  onSubmit,
  isLoading = false,
  error = null,
}: EditMaintenancePlanModalProps) {
  if (!maintenancePlan) {
    return null;
  }

  return (
    <MaintenancePlanForm
      title="Edit Maintenance Plan"
      description="Adjust the maintenance frequency, technician assignment, or plan status."
      submitLabel="Save Changes"
      defaultValues={{
        checklist_template_id: maintenancePlan.checklist_template_id.id,
        assigned_to: maintenancePlan.assigned_to.id,
        repeat_every: maintenancePlan.repeat_every,
        repeat_unit: maintenancePlan.repeat_unit,
        start_date: normalizeDateInputValue(maintenancePlan.start_date),
        status: maintenancePlan.status,
      }}
      technicians={technicians}
      templates={[maintenancePlan.checklist_template_id]}
      onClose={onClose}
      onSubmit={onSubmit}
      isLoading={isLoading}
      error={error}
      includeStatus
    />
  );
}
