import { useState } from "react";
import { useApi } from "@/shared/hooks/useApi";
import type { CreateRepairRequestPayload } from "../types/anomaly";
import type { CreateRepairRequestResponse } from "../types/anomalyResponses";

export function useCreateRepairRequest() {
  const { callApi } = useApi();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function createRepairRequestCall(
    anomalyId: number,
    payload: CreateRepairRequestPayload,
  ) {
    try {
      setIsLoading(true);
      setError(null);

      const response = await callApi<CreateRepairRequestResponse>(
        `chef-technician/anomalies/${anomalyId}/repair-requests`,
        {
          method: "POST",
          body: payload,
        },
      );

      return response;
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Failed to create repair request";
      setError(message);
    } finally {
      setIsLoading(false);
    }
  }

  return {
    createRepairRequestCall,
    isLoading,
    error,
  };
}
