import { useApi } from "@/shared/hooks/useApi";
import { useEffect, useState } from "react";
import type { ChefAnomaly } from "../types/anomaly";
import type { ChefAnomalyResponse } from "../types/anomalyResponses";

export function useChefAnomalyDetails(anomalyId: number | null) {
  const [anomaly, setAnomaly] = useState<ChefAnomaly | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { callApi } = useApi();

  async function fetchAnomalyDetails(targetId: number) {
    try {
      setIsLoading(true);
      setError(null);

      const response = await callApi<ChefAnomalyResponse>(
        `chef-technician/anomalies/${targetId}`,
        {
          method: "GET",
        },
      );

      setAnomaly(response.data);

      return response.data;
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Failed to load anomaly details";
      setError(message);
      setAnomaly(null);

      return null;
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    if (!anomalyId) {
      setAnomaly(null);
      setError(null);
      return;
    }

    fetchAnomalyDetails(anomalyId);
  }, [anomalyId]);

  async function refreshAnomaly() {
    if (!anomalyId) {
      return null;
    }

    return fetchAnomalyDetails(anomalyId);
  }

  return {
    anomaly,
    isLoading,
    error,
    refreshAnomaly,
  };
}
