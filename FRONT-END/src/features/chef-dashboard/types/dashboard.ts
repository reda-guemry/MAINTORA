import type { ApiResponse } from "@/shared/types/api.types";

export type ChefDashboardStats = {
  total_machines: number;
  active_machines: number;
  inactive_machines: number;
  total_technicians: number;
  total_checklist_templates: number;
  total_maintenance_plans: number;
  active_maintenance_plans: number;
  inactive_maintenance_plans: number;
  total_anomalies: number;
  open_anomalies: number;
  critical_anomalies: number;
  pending_rounds: number;
  completed_rounds: number;
  overdue_rounds: number;
};

export type ChefDashboardMachineSummary = {
  id: number | null;
  code: string | null;
  name: string | null;
};

export type ChefDashboardUserSummary = {
  id: number | null;
  first_name: string | null;
  last_name: string | null;
};

export type ChefDashboardChecklistTemplateSummary = {
  id: number | null;
  name: string | null;
};

export type ChefDashboardRecentAnomaly = {
  id: number;
  title: string;
  severity: string;
  status: string;
  created_at: string;
  machine: ChefDashboardMachineSummary;
};

export type ChefDashboardRecentMaintenancePlan = {
  id: number;
  status: string;
  repeat_every: number;
  repeat_unit: string;
  start_date: string;
  machine: ChefDashboardMachineSummary;
  assigned_to: ChefDashboardUserSummary;
  checklist_template: ChefDashboardChecklistTemplateSummary;
};

export type ChefDashboardRecentRound = {
  id: number;
  status: string;
  scheduled_at: string;
  completed_at: string | null;
  machine: ChefDashboardMachineSummary;
  assigned_to: ChefDashboardUserSummary;
};

export type ChefDashboard = {
  stats: ChefDashboardStats;
  recent_anomalies: ChefDashboardRecentAnomaly[];
  recent_maintenance_plans: ChefDashboardRecentMaintenancePlan[];
  recent_rounds: ChefDashboardRecentRound[];
};

export type ChefDashboardResponse = ApiResponse<ChefDashboard>;
