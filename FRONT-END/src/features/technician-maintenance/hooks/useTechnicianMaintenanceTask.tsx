import { useEffect, useState } from "react";
import { useApi } from "@/shared/hooks/useApi";
import type {
  TechnicianTaskDetails,
  TechnicianTaskDetailsResponse,
} from "../types/maintenance";

export function useTechnicianMaintenanceTask(taskId: number | null) {
  const { callApi } = useApi();
  const [task, setTask] = useState<TechnicianTaskDetails | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!taskId) {
      setTask(null);
      setIsLoading(false);
      return;
    }

    async function fetchTask() {
      try {
        setIsLoading(true);
        setError(null);

        const response = await callApi<TechnicianTaskDetailsResponse>(
          `technician/tasks/${taskId}`,
          {
            method: "GET",
          },
        );

        setTask(response.data);
      } catch (err) {
        const message =
          err instanceof Error ? err.message : "Failed to load maintenance task";
        setError(message);
      } finally {
        setIsLoading(false);
      }
    }

    fetchTask();
  }, [taskId]);

  return {
    task,
    isLoading,
    error,
  };
}
