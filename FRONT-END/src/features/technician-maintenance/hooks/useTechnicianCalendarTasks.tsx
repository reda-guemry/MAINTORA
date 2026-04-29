import { useEffect, useState } from "react";
import { useApi } from "@/shared/hooks/useApi";
import type {
  TechnicianTaskSummary,
  TechnicianTasksResponse,
} from "../types/maintenance";

export function useTechnicianCalendarTasks(weekStart: string) {
  const { callApi } = useApi();
  const [tasks, setTasks] = useState<TechnicianTaskSummary[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchTasks() {
      try {
        setIsLoading(true);
        setError(null);

        const params = new URLSearchParams({
          week_start: weekStart,
          per_page: "100",
        });

        const response = await callApi<TechnicianTasksResponse>(
          `technician/tasks?${params.toString()}`,
          {
            method: "GET",
          },
        );

        setTasks(response.data.data);
      } catch (err) {
        const message =
          err instanceof Error ? err.message : "Failed to load calendar tasks";
        setError(message);
      } finally {
        setIsLoading(false);
      }
    }

    fetchTasks();
  }, [weekStart]);

  return {
    tasks,
    isLoading,
    error,
  };
}
