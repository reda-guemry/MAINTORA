import { useEffect, useState } from "react";
import { useApi } from "@/shared/hooks/useApi";
import type {
  ClientDashboard,
  ClientDashboardResponse,
} from "../types/dashboard";

export function useClientDashboard() {
  const { callApi } = useApi();
  const [dashboard, setDashboard] = useState<ClientDashboard | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  async function fetchDashboard(showLoading = true) {
    try {
      if (showLoading) {
        setIsLoading(true);
      }

      setError(null);

      const response = await callApi<ClientDashboardResponse>(
        "client/dashboard",
        {
          method: "GET",
        },
      );

      setDashboard(response.data);
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Failed to load client dashboard";
      setError(message);
    } finally {
      if (showLoading) {
        setIsLoading(false);
      }
    }
  }

  useEffect(() => {
    fetchDashboard(true);
  }, []);

  return {
    dashboard,
    isLoading,
    error,
    fetchDashboard,
  };
}
