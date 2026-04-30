import type { ApiResponse } from "@/shared/types/api.types";

export type ClientDashboardMachineSummary = {
  id: number;
  code: string;
  name: string;
};

export type ClientDashboardAnomalyStatus =
  | "open"
  | "in_progress"
  | "resolved"
  | "rejected";

export type ClientDashboardAnomalySeverity = "low" | "medium" | "high";

export type ClientDashboardRepairRequestStatus =
  | "open"
  | "in_progress"
  | "completed"
  | "rejected";

export type ClientDashboardStats = {
  total_machines: number;
  active_anomalies: number;
  pending_repair_requests: number;
  completed_tasks: number;
};

export type ClientDashboardAnomaly = {
  id: number;
  title: string;
  severity: ClientDashboardAnomalySeverity;
  status: ClientDashboardAnomalyStatus;
  created_at: string;
  machine: ClientDashboardMachineSummary;
};

export type ClientDashboardRepairRequest = {
  id: number;
  title: string;
  status: ClientDashboardRepairRequestStatus;
  estimated_cost: number | string;
  created_at: string;
  machine: ClientDashboardMachineSummary;
};

export type ClientDashboard = {
  stats: ClientDashboardStats;
  recent_anomalies: ClientDashboardAnomaly[];
  recent_repair_requests: ClientDashboardRepairRequest[];
};

export type ClientDashboardResponse = ApiResponse<ClientDashboard>;
