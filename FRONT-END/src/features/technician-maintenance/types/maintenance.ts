import type { TechnicianMapMachine } from "@/features/technician-map";
import type { ApiResponse, PaginatedResponse } from "@/shared/types/api.types";

export type TechnicianTaskStatus = "pending" | "in_progress" | "completed";
export type TechnicianCheckStatus = "ok" | "not_ok" | "anomaly";
export type AnomalySeverity = "low" | "medium" | "high";

export type TechnicianTaskSummary = {
  id: number;
  scheduled_at: string;
  status: TechnicianTaskStatus;
  machine: TechnicianMapMachine;
};

 
 
export type TechnicianChecklistItem = {
  id: number | null;
  checklist_item_id: number;
  label: string;
  order: number | null;
  status: TechnicianCheckStatus | null;
  comment: string | null;
};

export type TechnicianTaskDetails = {
  id: number;
  scheduled_at: string;
  status: TechnicianTaskStatus;
  completed_at: string | null;
  machine: TechnicianMapMachine;
  check_items: TechnicianChecklistItem[];
};

export type TechnicianTasksResponse = ApiResponse<PaginatedResponse<TechnicianTaskSummary>>;

export type TechnicianTaskDetailsResponse = ApiResponse<TechnicianTaskDetails>;

export type SubmitMaintenanceCheck = {
  checklist_item_id: number;
  status: TechnicianCheckStatus;
  comment?: string;
  anomaly?: {
    title: string;
    description: string;
    severity: AnomalySeverity;
  };
};

export type SubmitMaintenancePayload = {
  checks: SubmitMaintenanceCheck[];
};

export type SubmitMaintenanceResponse = ApiResponse<TechnicianTaskDetails>;

export type MaintenanceCheckDraft = {
  status: TechnicianCheckStatus | null;
  comment: string;
  anomalyTitle: string;
  anomalyDescription: string;
  anomalySeverity: AnomalySeverity;
};

export type MaintenanceDraft = Record<number, MaintenanceCheckDraft>;



