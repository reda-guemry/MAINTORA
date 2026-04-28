
import type { ApiResponse } from "@/shared/types/api.types";

export type UpcomingRound = {
  id: number;
  machine_id: number;
  maintenance_plan_id: number;
  scheduled_at: string;
  status: string;
};

export type TechnicianStatistics = {
  next_round_date: string | null;
  pending_tasks_count: number;
  total_completed_tasks: number;
  five_next_rounde: UpcomingRound[];
};

export type TechnicianStatisticsResponse = ApiResponse<TechnicianStatistics>;
