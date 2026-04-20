import { useEffect, useState } from "react";
import type { ChecklistTemplate } from "@/features/checklist-template";
import { useApi } from "@/shared/hooks/useApi";
import type { ChecklistTemplateOptionsResponse } from "../types/maintenancePlanResponses";

export function useChecklistTemplateOptions() {
  const [templates, setTemplates] = useState<ChecklistTemplate[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { callApi } = useApi();

  useEffect(() => {
    async function fetchChecklistTemplateOptions() {
      try {
        setIsLoading(true);
        setError(null);

        let search = '';

          const response = await callApi<ChecklistTemplateOptionsResponse>(
            `chef-technician/checklist/templates/search?search=&page=${search}`,
            {
              method: "GET",
            },
          );

        setTemplates(response.data);
      } catch (err) {
        const message =
          err instanceof Error
            ? err.message
            : "Failed to load checklist templates";
        setError(message);
      } finally {
        setIsLoading(false);
      }
    }

    fetchChecklistTemplateOptions();
  }, []);

  return { templates, isLoading, error };
}
