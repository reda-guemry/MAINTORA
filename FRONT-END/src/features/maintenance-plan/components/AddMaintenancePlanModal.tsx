import { MaintenancePlanForm } from "./MaintenancePlanForm";
import type { AddMaintenancePlanModalProps } from "../types/maintenancePlan";

const defaultValues = {
  checklist_template_id: 0,
  assigned_to: 0,
  repeat_every: 1,
  repeat_unit: "week" as const,
  start_date: "",
  status: "active" as const,
};

export function AddMaintenancePlanModal({
  isOpen,
  machineId,
  technicians,
  templates,
  onClose,
  onSubmit,
  isLoading = false,
  error = null,
}: AddMaintenancePlanModalProps) {
  if (!isOpen || machineId === null) {
    return null;
  }

  return (
    <MaintenancePlanForm
      title="Create Maintenance Plan"
      description="Attach a repeatable maintenance routine to this machine and assign it to a technician."
      submitLabel="Create Plan"
      defaultValues={defaultValues}
      technicians={technicians}
      templates={templates}
      onClose={onClose}
      onSubmit={onSubmit}
      isLoading={isLoading}
      error={error}
      machineId={machineId}
    />
  );
}
