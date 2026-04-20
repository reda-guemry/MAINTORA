import { useState } from "react";
import { useApi } from "@/shared/hooks/useApi";
import type { UpdateMaintenancePlanPayload } from "../types/maintenancePlan";
import type { MaintenancePlanMutationResponse } from "../types/maintenancePlanResponses";

export function useEditMaintenancePlan() {
  const { callApi } = useApi();
  const [error, setError] = useState<string | null>(null);

  async function editMaintenancePlanCall(
    maintenancePlanId: number,
    data: UpdateMaintenancePlanPayload,
  ) {
    try {
      setError(null);

      const response = await callApi<MaintenancePlanMutationResponse>(
        `chef-technician/maintenance-plans/${maintenancePlanId}`,
        {
          method: "PUT",
          body: data,
        },
      );

      return response;
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Failed to update maintenance plan");
      }
    }
  }

  return { editMaintenancePlanCall, error };
}
