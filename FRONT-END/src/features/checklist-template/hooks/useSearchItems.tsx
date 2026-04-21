import { useApi } from "@/shared/hooks/useApi";
import { useCallback, useState } from "react";
import type { ChecklistTemplateItem } from "../types/checklistTemplateComponents";

type SearchChecklistItemsResponse = {
  success: boolean;
  message: string;
  data: ChecklistTemplateItem[];
};

export function useSearchItems() {
  const { callApi } = useApi();
  const [error, setError] = useState<string | null>(null);

  const searchChecklistItemsCall = useCallback(async (search: string) => {
    const normalizedSearch = search.trim();

    if (!normalizedSearch) {
      setError(null);
      return [];
    }

    try {
      const response = await callApi<SearchChecklistItemsResponse>(
        `chef-technician/checklist/items/search?search=${encodeURIComponent(normalizedSearch)}`,
        {}
      );

      return response.data ?? [];

    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Failed to search checklist items");
      }

      return [];
    }
  }, [callApi]);

  return { searchChecklistItemsCall, error };
}
