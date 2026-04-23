import type { TechnicianMapMachine } from "@/features/technician-map";

export type TechnicianTaskStatus = "pending" | "in_progress" | "completed";

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
  status: boolean | null;
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

export type TechnicianTasksResponse = {
  success: boolean;
  message: string;
  data: {
    data: TechnicianTaskSummary[];
  };
};

export type TechnicianTaskDetailsResponse = {
  success: boolean;
  message: string;
  data: TechnicianTaskDetails;
};

export type SubmitMaintenanceCheck = {
  checklist_item_id: number;
  status: boolean;
  comment?: string;
};

export type SubmitMaintenancePayload = {
  checks: SubmitMaintenanceCheck[];
};

export type SubmitMaintenanceResponse = {
  success: boolean;
  message: string;
  data: TechnicianTaskDetails;
};
