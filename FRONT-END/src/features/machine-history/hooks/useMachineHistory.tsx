import { useEffect, useState } from "react";
import { useApi } from "@/shared/hooks/useApi";
import type { MachineHistory, MachineHistoryResponse } from "../types/machineHistory";

export function useMachineHistory(apiPrefix: string, machineId: number | null) {
  const { callApi } = useApi();
  const [history, setHistory] = useState<MachineHistory | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setCurrentPage(1);
  }, [machineId]);

  useEffect(() => {
    if (!machineId) {
      setHistory(null);
      setIsLoading(false);
      return;
    }

    async function fetchHistory() {
      try {
        setIsLoading(true);
        setError(null);

        const params = new URLSearchParams({
          page: String(currentPage),
          per_page: "10",
        });

        const response = await callApi<MachineHistoryResponse>(
          `${apiPrefix}/machines/${machineId}/history?${params.toString()}`,
          {
            method: "GET",
          },
        );

        setHistory(response.data);
      } catch (err) {
        const message =
          err instanceof Error ? err.message : "Failed to load machine history";
        setError(message);
      } finally {
        setIsLoading(false);
      }
    }

    fetchHistory();
  }, [apiPrefix, currentPage, machineId]);

  function setPage(page: number) {
    if (!history) {
      setCurrentPage(page);
      return;
    }

    setCurrentPage(Math.max(1, Math.min(page, history.tasks.last_page)));
  }

  return {
    history,
    currentPage,
    setPage,
    isLoading,
    error,
  };
}
