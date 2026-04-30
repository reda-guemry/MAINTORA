import type { ApiResponse, PaginatedResponse } from "@/shared/types/api.types";
import type { Machine, MachineStatus } from "@/features/machines";

export type MachineHistoryTaskStatus = "pending" | "in_progress" | "completed";
export type MachineHistoryCheckStatus = "ok" | "not_ok" | "anomaly" | boolean | null;
export type MachineHistoryAnomalySeverity = "low" | "medium" | "high";
export type MachineHistoryAnomalyStatus =
  | "open"
  | "in_progress"
  | "resolved"
  | "rejected";
export type MachineHistoryRepairRequestStatus =
  | "open"
  | "in_progress"
  | "completed"
  | "rejected";

export type MachineHistoryMachine = Pick<
  Machine,
  "id" | "code" | "name" | "location"
> & {
  status: MachineStatus;
};

export type MachineHistoryMaintenancePlan = {
  id: number;
  repeat_every: number;
  repeat_unit: string;
  start_date: string;
  status: string;
};

export type MachineHistoryChecklistTemplate = {
  id: number;
  name: string;
  description: string | null;
};

export type MachineHistoryChecklistItem = {
  id: number | null;
  checklist_item_id: number;
  label: string;
  order: number | null;
  status: MachineHistoryCheckStatus;
  comment: string | null;
};

export type MachineHistoryRepairRequest = {
  id: number;
  title: string;
  description: string;
  status: MachineHistoryRepairRequestStatus;
  estimated_cost: number | string;
  created_at: string;
};

export type MachineHistoryAnomaly = {
  id: number;
  title: string;
  description: string;
  status: MachineHistoryAnomalyStatus;
  severity: MachineHistoryAnomalySeverity;
  created_at: string;
  repair_requests: MachineHistoryRepairRequest[];
};

export type MachineHistoryTaskSummary = {
  id: number;
  scheduled_at: string;
  completed_at: string | null;
  status: MachineHistoryTaskStatus;
  anomalies_count?: number;
};

export type MachineHistoryTaskDetails = MachineHistoryTaskSummary & {
  machine: MachineHistoryMachine;
  maintenance_plan?: MachineHistoryMaintenancePlan | null;
  checklist_template?: MachineHistoryChecklistTemplate | null;
  check_items?: MachineHistoryChecklistItem[];
  anomalies?: MachineHistoryAnomaly[];
};

export type MachineHistory = {
  machine: MachineHistoryMachine;
  tasks: PaginatedResponse<MachineHistoryTaskSummary>;
};

export type MachineHistoryTaskModalProps = {
  task: MachineHistoryTaskDetails | null;
  isLoading: boolean;
  error: string | null;
  onClose: () => void;
};

export type MachineHistoryViewProps = {
  apiPrefix: string;
  backPath: string;
  machineId: number | null;
};


export type MachineHistoryResponse = ApiResponse<MachineHistory>;
export type MachineHistoryTaskResponse = ApiResponse<MachineHistoryTaskDetails>;
