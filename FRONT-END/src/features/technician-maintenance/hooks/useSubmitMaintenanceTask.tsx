import { useState } from "react";
import { useApi } from "@/shared/hooks/useApi";
import type {
  SubmitMaintenancePayload,
  SubmitMaintenanceResponse,
} from "../types/maintenance";

export function useSubmitMaintenanceTask() {
  const { callApi } = useApi();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function submitMaintenanceTask(
    taskId: number,
    payload: SubmitMaintenancePayload,
  ) {
    try {
      setIsSubmitting(true);
      setError(null);

      return await callApi<SubmitMaintenanceResponse>(
        `technician/tasks/${taskId}`,
        {
          method: "POST",
          body: payload,
        },
      );
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Failed to submit maintenance";
      setError(message);
    } finally {
      setIsSubmitting(false);
    }
  }

  return {
    submitMaintenanceTask,
    isSubmitting,
    error,
  };
}
