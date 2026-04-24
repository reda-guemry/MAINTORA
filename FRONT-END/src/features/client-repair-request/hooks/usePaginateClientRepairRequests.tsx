import { useEffect, useState } from "react";
import { useApi } from "@/shared/hooks/useApi";
import type { PaginatedClientRepairRequestsResponse } from "../types/repairRequestResponses";

export function usePaginateClientRepairRequests(statusFilter: string) {
  const [paginate, setPaginate] =
    useState<PaginatedClientRepairRequestsResponse["data"] | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { callApi } = useApi();

  useEffect(() => {
    setCurrentPage(1);
  }, [statusFilter]);

  useEffect(() => {
    async function fetchRepairRequests() {
      try {
        setIsLoading(true);
        setError(null);

        const params = new URLSearchParams({
          page: String(currentPage),
          per_page: "8",
        });

        if (statusFilter) {
          params.set("status", statusFilter);
        }

        const response = await callApi<PaginatedClientRepairRequestsResponse>(
          `client/repair-requests?${params.toString()}`,
          {
            method: "GET",
          },
        );

        console.log("Fetched repair requests:", response);

        setPaginate(response.data);
      } catch (err) {
        const message =
          err instanceof Error
            ? err.message
            : "Failed to load repair requests";
        setError(message);
      } finally {
        setIsLoading(false);
      }
    }

    fetchRepairRequests();
  }, [currentPage, statusFilter]);

  function setPage(page: number) {
    if (!paginate) {
      setCurrentPage(page);
      return;
    }

    const boundedPage = Math.max(1, Math.min(page, paginate.last_page));
    setCurrentPage(boundedPage);
  }

  return {
    repairRequests: paginate?.data ?? [],
    paginate,
    currentPage,
    setPage,
    isLoading,
    error,
  };
}
