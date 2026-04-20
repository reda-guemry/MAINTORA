import type { ChecklistTemplate } from "@/features/checklist-template";
import type { Technician } from "@/features/roundes";

export type MaintenancePlanStatus = "active" | "inactive";

export type MaintenancePlanRepeatUnit = "day" | "week" | "month";

export type MaintenancePlanChecklistTemplate = Pick<
  ChecklistTemplate,
  "id" | "name" | "description"
>;

export type MaintenancePlanMachine = {
  id: number;
  code: string;
  name: string;
  location: string;
  latitude: number;
  longitude: number;
  status: "active" | "anomalous" | "maintenance";
};

export type MaintenancePlan = {
  id: number;
  assigned_to: Technician;
  checklist_template_id: MaintenancePlanChecklistTemplate;
  machine_id?: MaintenancePlanMachine;
  repeat_every: number;
  repeat_unit: MaintenancePlanRepeatUnit;
  start_date: string;
  status: MaintenancePlanStatus;
};

export type MaintenancePlanFormValues = {
  checklist_template_id: number;
  assigned_to: number;
  repeat_every: number;
  repeat_unit: MaintenancePlanRepeatUnit;
  start_date: string;
  status: MaintenancePlanStatus;
};

export type CreateMaintenancePlanPayload = Omit<
  MaintenancePlanFormValues,
  "status"
> & {
  machine_id: number;
};

export type UpdateMaintenancePlanPayload = MaintenancePlanFormValues;

export type MaintenancePlanCardProps = {
  maintenancePlan: MaintenancePlan;
  onEdit: (maintenancePlan: MaintenancePlan) => void;
  onDelete: (maintenancePlan: MaintenancePlan) => void;
};

export type MachineMaintenancePlansProps = {
  machineName: string;
  maintenancePlans: MaintenancePlan[];
  onAdd: () => void;
  onEdit: (maintenancePlan: MaintenancePlan) => void;
  onDelete: (maintenancePlan: MaintenancePlan) => void;
};

type MaintenancePlanBaseFormProps = {
  title: string;
  description: string;
  submitLabel: string;
  defaultValues: MaintenancePlanFormValues;
  technicians: Technician[];
  templates: MaintenancePlanChecklistTemplate[];
  onClose: () => void;
  isLoading?: boolean;
  error?: string | null;
};

type CreateMaintenancePlanFormProps = MaintenancePlanBaseFormProps & {
  machineId: number;
  includeStatus?: false;
  onSubmit: (values: CreateMaintenancePlanPayload) => void;
};

type UpdateMaintenancePlanFormProps = MaintenancePlanBaseFormProps & {
  machineId?: undefined;
  includeStatus: true;
  onSubmit: (values: UpdateMaintenancePlanPayload) => void;
};

export type MaintenancePlanFormProps =
  | CreateMaintenancePlanFormProps
  | UpdateMaintenancePlanFormProps;

export type AddMaintenancePlanModalProps = {
  isOpen: boolean;
  machineId: number | null;
  technicians: Technician[];
  templates: MaintenancePlanChecklistTemplate[];
  onClose: () => void;
  onSubmit: (payload: CreateMaintenancePlanPayload) => void;
  isLoading?: boolean;
  error?: string | null;
};

export type EditMaintenancePlanModalProps = {
  maintenancePlan: MaintenancePlan | null;
  technicians: Technician[];
  templates: MaintenancePlanChecklistTemplate[];
  onClose: () => void;
  onSubmit: (payload: UpdateMaintenancePlanPayload) => void;
  isLoading?: boolean;
  error?: string | null;
};

export type DeleteMaintenancePlanDialogProps = {
  maintenancePlan: MaintenancePlan | null;
  onClose: () => void;
  onConfirm: () => void;
  isLoading?: boolean;
  error?: string | null;
};
