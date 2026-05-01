import { useEffect, useState } from "react";
import { useApi } from "@/shared/hooks/useApi";
import type {
  MachineHistoryTaskDetails,
  MachineHistoryTaskResponse,
} from "../types/machineHistory";

export function useMachineHistoryTask(
  apiPrefix: string,
  machineId: number | null,
  taskId: number | null,
) {
  const { callApi } = useApi();
  const [task, setTask] = useState<MachineHistoryTaskDetails | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!machineId || !taskId) {
      setTask(null);
      setError(null);
      setIsLoading(false);
      return;
    }

    async function fetchTask() {
      try {
        setIsLoading(true);
        setError(null);

        const response = await callApi<MachineHistoryTaskResponse>(
          `${apiPrefix}/machines/${machineId}/history/${taskId}`,
          {
            method: "GET",
          },
        );

        setTask(response.data);
      } catch (err) {
        const message =
          err instanceof Error ? err.message : "Failed to load task details";
        setError(message);
      } finally {
        setIsLoading(false);
      }
    }

    fetchTask();
  }, [apiPrefix, machineId, taskId]);

  return {
    task,
    isLoading,
    error,
  };
}
