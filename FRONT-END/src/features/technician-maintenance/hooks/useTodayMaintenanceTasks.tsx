import { useEffect, useState } from "react";
import { useApi } from "@/shared/hooks/useApi";
import type {
  TechnicianTaskSummary,
  TechnicianTasksResponse,
} from "../types/maintenance";

function getTodayDate() {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

export function useTodayMaintenanceTasks() {
  const { callApi } = useApi();
  const [tasks, setTasks] = useState<TechnicianTaskSummary[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchTasks() {
      try {
        setIsLoading(true);
        setError(null);

        const response = await callApi<TechnicianTasksResponse>(
          `technician/tasks?scheduled_date=${getTodayDate()}&per_page=100`,
          {
            method: "GET",
          },
        );

        setTasks(response.data.data);
      } catch (err) {
        const message =
          err instanceof Error ? err.message : "Failed to load today's tasks";
        setError(message);
      } finally {
        setIsLoading(false);
      }
    }

    fetchTasks();
  }, []);

  return {
    tasks,
    isLoading,
    error,
  };
}
