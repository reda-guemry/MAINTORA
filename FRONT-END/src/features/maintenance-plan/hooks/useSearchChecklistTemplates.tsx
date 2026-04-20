import { useApi } from "@/shared/hooks/useApi";
import { useCallback, useState } from "react";
import type { MaintenancePlanChecklistTemplate } from "../types/maintenancePlan";
import type { ChecklistTemplateOptionsResponse } from "../types/maintenancePlanResponses";

export function useSearchChecklistTemplates() {
  const { callApi } = useApi();
  const [error, setError] = useState<string | null>(null);

  const searchChecklistTemplatesCall = useCallback(
    async (search: string) => {
      const normalizedSearch = search.trim();

      if (!normalizedSearch) {
        setError(null);
        return [] as MaintenancePlanChecklistTemplate[];
      }

      try {
        const response = await callApi<ChecklistTemplateOptionsResponse>(
          `chef-technician/checklist/templates/search?search=${encodeURIComponent(normalizedSearch)}`,
          {
            method: "GET",
          },
        );

        return response.data ?? [];
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("Failed to search checklist templates");
        }

        return [];
      }
    },
    [],
  );

  return { searchChecklistTemplatesCall, error };
}
