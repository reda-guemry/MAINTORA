import { useApi } from "@/shared/hooks/useApi";
import { useEffect, useState } from "react";
import type { ChefAnomaly } from "../types/anomaly";
import type { PaginatedChefAnomaliesResponse } from "../types/anomalyResponses";

export function useChefAnomalies(
  statusFilter: string,
  severityFilter: string,
) {
  const [paginate, setPaginate] =
    useState<PaginatedChefAnomaliesResponse["data"] | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { callApi } = useApi();

  async function fetchAnomalies(page: number) {
    try {
      setIsLoading(true);
      setError(null);

      const params = new URLSearchParams({
        page: String(page),
        per_page: "9",
      });

      if (statusFilter) {
        params.set("status", statusFilter);
      }

      if (severityFilter) {
        params.set("severity", severityFilter);
      }

      const response = await callApi<PaginatedChefAnomaliesResponse>(
        `chef-technician/anomalies?${params.toString()}`,
        {
          method: "GET",
        },
      );

      setPaginate(response.data);
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Failed to load anomalies";
      setError(message);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    setCurrentPage(1);
  }, [statusFilter, severityFilter]);

  useEffect(() => {
    fetchAnomalies(currentPage);
  }, [currentPage, severityFilter, statusFilter]);

  function setPage(page: number) {
    if (!paginate) {
      setCurrentPage(page);
      return;
    }

    const boundedPage = Math.max(1, Math.min(page, paginate.last_page));
    setCurrentPage(boundedPage);
  }

  function updateAnomalyInList(updatedAnomaly: ChefAnomaly) {
    setPaginate((currentPaginate) => {
      if (!currentPaginate) {
        return currentPaginate;
      }

      return {
        ...currentPaginate,
        data: currentPaginate.data.map((anomaly) =>
          anomaly.id === updatedAnomaly.id ? updatedAnomaly : anomaly,
        ),
      };
    });
  }

  return {
    anomalies: paginate?.data ?? [],
    paginate,
    currentPage,
    setPage,
    isLoading,
    error,
    updateAnomalyInList,
    refreshAnomalies: () => fetchAnomalies(currentPage),
  };
}
