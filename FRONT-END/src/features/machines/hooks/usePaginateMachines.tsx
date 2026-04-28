import { useEffect, useState } from "react";
import type { Machine, PaginateMachineResponse } from "../types/machineComponents";
import { useApi } from "@/shared/hooks/useApi";

export function usePaginateMachines() {
  const [paginate, setPaginate] = useState<PaginateMachineResponse["data"] | null>(
    null
  );
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [error, setError] = useState<string | null>(null);

  const { callApi } = useApi();

  useEffect(() => {
    async function fetchMachines() {
      try {
        setIsLoading(true);
        setError(null);

        const response = await callApi<PaginateMachineResponse>(
          `client/machines?page=${currentPage}`,
          {
          method: "GET",
          }
        );

        setPaginate(response.data);
      } catch (err) {
        const message =
          err instanceof Error ? err.message : "Failed to load machines";
        setError(message);
      } finally {
        setIsLoading(false);
      }
    }

    fetchMachines();
  }, [currentPage]);


  function setPage(page: number) {
    if (!paginate) {
      setCurrentPage(page);
      return;
    }

    const boundedPage = Math.max(1, Math.min(page, paginate.last_page));
    setCurrentPage(boundedPage);
  }
  
  function updateMachineInList(updatedMachine: Machine) {
    setPaginate((prev) => {
      if (!prev) return prev;

      return {
        ...prev,
        data: prev.data.map((machine) =>
          machine.id === updatedMachine.id ? updatedMachine : machine
        ),
      };
    });
  }

  function removeMachineFromList(machineId: number) {
    setPaginate((prev) => {
      if (!prev) return prev;

      return {
        ...prev,
        data: prev.data.filter((machine) => machine.id !== machineId),
        total: Math.max(0, prev.total - 1),
        to: prev.to ? Math.max((prev.from ?? 1) - 1, prev.to - 1) : prev.to,
      };
    });
  }

  function addMachineToList(newMachine: Machine) {
    setPaginate((prev) => {
      if (!prev) return prev;

      return {
        ...prev,
        data: [newMachine, ...prev.data],
        total: prev.total + 1,
        to: (prev.to ?? prev.data.length) + 1,
      };
    });
  }

  return {
    paginate,
    isLoading,
    currentPage,
    setPage,
    error,
    updateMachineInList,
    removeMachineFromList,
    addMachineToList,
  };
}
