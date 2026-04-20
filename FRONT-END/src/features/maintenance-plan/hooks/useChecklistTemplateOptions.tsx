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

        const allTemplates: ChecklistTemplate[] = [];
        let currentPage = 1;
        let lastPage = 1;

        do {
          const response = await callApi<ChecklistTemplateOptionsResponse>(
            `chef-technician/checklist?page=${currentPage}`,
            {
              method: "GET",
            },
          );

          allTemplates.push(...response.data.data);
          lastPage = response.data.last_page;
          currentPage += 1;
        } while (currentPage <= lastPage);

        setTemplates(allTemplates);
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
