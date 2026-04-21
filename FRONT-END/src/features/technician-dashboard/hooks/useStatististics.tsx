import { useEffect, useState } from "react";
import type {
  TechnicianStatistics,
  TechnicianStatisticsResponse,
} from "../types/dashboard";
import { useApi } from "@/shared/hooks/useApi";

export function useTechnicianStatistics() {
  const { callApi } = useApi();
  const [statistics, setStatistics] = useState<TechnicianStatistics | null>(
    null,
  );
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchStatistics() {
      try {
        setIsLoading(true);
        setError(null);

        const response = await callApi<TechnicianStatisticsResponse>(
          "technician/technician/statistics",
          {
            method: "GET",
          },
        );

        setStatistics(response.data);
      } catch (err) {
        const message =
          err instanceof Error
            ? err.message
            : "Failed to load technician dashboard";

        setError(message);
      } finally {
        setIsLoading(false);
      }
    }

    fetchStatistics();
  }, []);

  return { statistics, isLoading, error };
}
