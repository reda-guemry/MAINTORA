import { useApi } from "@/shared/hooks/useApi";
import { useState } from "react";

export function useDeleteMachine() {
  const { callApi } = useApi();
  const [error, setError] = useState<string | null>(null);

  async function deleteMachineCall(machineId: number) {
    try {
      const response = await callApi(`client/machines/${machineId}`, {
        method: "DELETE",
      });
      return response;
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Failed to delete machine");
      }
    }
  }

  return { deleteMachineCall, error };
}
