import { useState } from "react";
import { useApi } from "@/shared/hooks/useApi";
import type { CreateMaintenancePlanPayload } from "../types/maintenancePlan";
import type { MaintenancePlanMutationResponse } from "../types/maintenancePlanResponses";

export function useCreateMaintenancePlan() {
  const { callApi } = useApi();
  const [error, setError] = useState<string | null>(null);

  async function createMaintenancePlanCall(data: CreateMaintenancePlanPayload) {
    try {
      setError(null);

      const response = await callApi<MaintenancePlanMutationResponse>(
        "chef-technician/maintenance-plans",
        {
          method: "POST",
          body: data,
        },
      );

      return response;
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Failed to create maintenance plan");
      }
    }
  }

  return { createMaintenancePlanCall, error };
}
