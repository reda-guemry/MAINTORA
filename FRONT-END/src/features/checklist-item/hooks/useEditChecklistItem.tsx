import { useApi } from "@/shared/hooks/useApi";
import { useState } from "react";
import type {
  ChecklistItem,
  ChecklistItemPayload,
} from "../types/checklistItemComponents";

export function useEditChecklistItem() {
  const { callApi } = useApi();
  const [error, setError] = useState<string | null>(null);

  async function editChecklistItemCall(
    itemId: number,
    data: ChecklistItemPayload
  ) {
    try {
      const response = await callApi<{ data: ChecklistItem }>(
        `chef-technician/checklist/items/${itemId}`,
        {
          method: "PUT",
          body: data,
        }
      );

      return response;
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to update checklist item"
      );
    }
  }

  return { editChecklistItemCall, error };
}
