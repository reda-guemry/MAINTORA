import { useCallback, useEffect, useState } from "react";
import { useApi } from "@/shared/hooks/useApi";
import type { ChefDashboard, ChefDashboardResponse } from "../types/dashboard";

export function useChefTechnicianDashboard() {
  const { callApi } = useApi();
  const [dashboard, setDashboard] = useState<ChefDashboard | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchDashboard = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);

      const response = await callApi<ChefDashboardResponse>(
        "chef-technician/dashboard/statistics",
        {
          method: "GET",
        },
      );

      setDashboard(response.data);
    } catch (err) {
      const message =
        err instanceof Error
          ? err.message
          : "Failed to load chef technician dashboard";

      setError(message);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    void fetchDashboard();
  }, [fetchDashboard]);

  return {
    dashboard,
    error,
    fetchDashboard,
    isLoading,
  };
}
