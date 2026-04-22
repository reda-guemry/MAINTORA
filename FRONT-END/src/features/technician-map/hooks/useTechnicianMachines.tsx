import { useEffect, useState } from "react";
import { useApi } from "@/shared/hooks/useApi";
import type {
  TechnicianMapMachine,
  TechnicianMachinesResponse,
} from "../types/map";

export function useTechnicianMachines() {
  const { callApi } = useApi();
  const [machines, setMachines] = useState<TechnicianMapMachine[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchMachines() {
      try {
        setIsLoading(true);
        setError(null);

        const response = await callApi<TechnicianMachinesResponse>(
          "technician/machines",
          {
            method: "GET",
          },
        );

        setMachines(response.data);
      } catch (err) {
        const message =
          err instanceof Error
            ? err.message
            : "Failed to load technician machines";

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
