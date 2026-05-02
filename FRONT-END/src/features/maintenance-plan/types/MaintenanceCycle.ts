import type { Machine } from "@/features/roundes";
import type {
  CreateMaintenancePlanPayload,
  MaintenancePlanChecklistTemplate,
  MaintenancePlanRepeatUnit,
  MaintenancePlanStatus,
  UpdateMaintenancePlanPayload,
} from "./maintenancePlan";
import type { Technician } from "@/features/roundes/types/technician";

export type MaintenanceCycleMode = "create" | "edit";

export type MaintenanceCycleFormProps = {
  disableMachineSelect?: boolean;
  error?: string | null;
  initialTemplate?: MaintenancePlanChecklistTemplate | null;
  initialValues?: Partial<MaintenanceCycleFormState>;
  isLoading?: boolean;
  mode: MaintenanceCycleMode;
  machines: Machine[];
  onSubmit: (
    payload: CreateMaintenancePlanPayload | UpdateMaintenancePlanPayload,
  ) => Promise<void> | void;
  submitLabel: string;
  title: string;
  technicians: Technician[];
};

export type MaintenanceCycleFormState = {
  assigned_to: number;
  checklist_template_id: number;
  machine_id: number;
  repeat_every: number;
  repeat_unit: MaintenancePlanRepeatUnit;
  start_date: string;
  status: MaintenancePlanStatus;
};
