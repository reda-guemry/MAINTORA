import { useState } from "react";
import { useApi } from "@/shared/hooks/useApi";
import type { MaintenancePlanDeleteResponse } from "../types/maintenancePlanResponses";

export function useDeleteMaintenancePlan() {
  const { callApi } = useApi();
  const [error, setError] = useState<string | null>(null);

  async function deleteMaintenancePlanCall(maintenancePlanId: number) {
    try {
      setError(null);

      const response = await callApi<MaintenancePlanDeleteResponse>(
        `chef-technician/maintenance-plans/${maintenancePlanId}`,
        {
          method: "DELETE",
        },
      );

      return response;
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Failed to delete maintenance plan");
      }
    }
  }

  return { deleteMaintenancePlanCall, error };
}
