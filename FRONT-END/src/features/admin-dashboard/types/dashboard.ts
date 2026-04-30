import type { ApiResponse } from "@/shared/types/api.types";

export type AdminDashboardRole = {
  id: number;
  name: string;
};

export type AdminDashboardStats = {
  total_users: number;
  total_clients: number;
  total_technicians: number;
  total_machines: number;
  active_anomalies: number;
  open_repair_requests: number;
  completed_maintenance_tasks: number;
};

export type AdminDashboardUser = {
  id: number;
  first_name: string;
  last_name: string;
  status: string;
  created_at: string;
  roles: AdminDashboardRole[];
};

export type AdminDashboard = {
  stats: AdminDashboardStats;
  recent_users: AdminDashboardUser[];
};

export type AdminDashboardResponse = ApiResponse<AdminDashboard>;
