import { useEffect, useState } from "react";
import { useApi } from "@/shared/hooks/useApi";
import type { Machine, MachineListResponse } from "../types/machineComponents";

export function useClientMachines() {
  const [machines, setMachines] = useState<Machine[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { callApi } = useApi();

  useEffect(() => {
    async function fetchMachines() {
      try {
        setIsLoading(true);
        setError(null);

        const response = await callApi<MachineListResponse>("client/machines/all", {
          method: "GET",
        });

        setMachines(response.data);
      } catch (err) {
        const message =
          err instanceof Error ? err.message : "Failed to load client machines";
        setError(message);
      } finally {
        setIsLoading(false);
      }
    }

    fetchMachines();
  }, []);

  return {
    machines,
    isLoading,
    error,
  };
}
