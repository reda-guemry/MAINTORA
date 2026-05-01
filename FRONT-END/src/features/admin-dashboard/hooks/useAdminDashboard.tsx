import { useEffect, useState } from "react";
import { useApi } from "@/shared/hooks/useApi";
import type {
  AdminDashboard,
  AdminDashboardResponse,
} from "../types/dashboard";

export function useAdminDashboard() {
  const { callApi } = useApi();
  const [dashboard, setDashboard] = useState<AdminDashboard | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  async function fetchDashboard(showLoading = true) {
    try {
      if (showLoading) {
        setIsLoading(true);
      }

      setError(null);

      const response = await callApi<AdminDashboardResponse>(
        "admin/dashboard",
        {
          method: "GET",
        },
      );

      setDashboard(response.data);
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Failed to load admin dashboard";
      setError(message);
    } finally {
      if (showLoading) {
        setIsLoading(false);
      }
    }
  }

  useEffect(() => {
    fetchDashboard(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    dashboard,
    isLoading,
    error,
    fetchDashboard,
  };
}
