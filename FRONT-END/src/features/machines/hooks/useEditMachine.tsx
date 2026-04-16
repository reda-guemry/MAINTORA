import { useApi } from "@/shared/hooks/useApi";
import { useState } from "react";
import type { Machine, MachinePayload } from "../types/machineComponents";

export function useEditMachine() {
  const { callApi } = useApi();
  const [error, setError] = useState<string | null>(null);

  async function editMachineCall(machineId: number, data: MachinePayload) {
    try {
      const response = await callApi<{ data: Machine }>(
        `client/machines/${machineId}`,
        {
          method: "PUT",
          body: data,
        }
      );
      return response;
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Failed to update machine");
      }
    }
  }

  return { editMachineCall, error };
}
