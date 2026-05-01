import { useApi } from "@/shared/hooks/useApi";
import type { PaginatedChefAnomaliesResponse } from "../types/anomalyResponses";
import { usePagination } from "@/shared/hooks/usePagination";

export function useChefAnomalies(statusFilter: string, severityFilter: string) {
  const { callApi } = useApi();

  const fetchAnomalies = (page: number) => {
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

    return callApi<PaginatedChefAnomaliesResponse>(
      `chef-technician/anomalies?${params.toString()}`,
      {
        method: "GET",
      },
    ).then((response) => response.data);
  };

  const {
    paginate,
    currentPage,
    setPage,
    isLoading,
    error,
    updateItem,
    refresh,
  } = usePagination(fetchAnomalies, {
    deps: [statusFilter, severityFilter],
  });

  return {
    anomalies: paginate?.data ?? [],
    paginate,
    currentPage,
    setPage,
    isLoading,
    error,
    updateAnomalyInList: updateItem,
    refreshAnomalies: refresh,
  };
}
