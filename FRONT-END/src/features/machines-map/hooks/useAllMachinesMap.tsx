import { useEffect, useState } from "react";
import { useApi } from "@/shared/hooks/useApi";
import type { MachinesMapMachine, MachinesMapResponse } from "../types/machinesMap";

export function useAllMachinesMap(endpoint: string) {
  const { callApi } = useApi();
  const [machines, setMachines] = useState<MachinesMapMachine[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function fetchMachines() {
    try {
      setIsLoading(true);
      setError(null);

      const response = await callApi<MachinesMapResponse>(endpoint, {
        method: "GET",
      });

      setMachines(response.data);
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Failed to load machines";
      setError(message);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchMachines();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [endpoint]);

  return {
    machines,
    isLoading,
    error,
    fetchMachines,
  };
}
