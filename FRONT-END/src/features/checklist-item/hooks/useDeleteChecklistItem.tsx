import { useApi } from "@/shared/hooks/useApi";
import { useState } from "react";
import type { DeleteChecklistItemResponse } from "../types/checklistItemResponses";

export function useDeleteChecklistItem() {
  const { callApi } = useApi();
  const [error, setError] = useState<string | null>(null);

  async function deleteChecklistItemCall(itemId: number) {
    try {
      const response = await callApi<DeleteChecklistItemResponse>(`chef-technician/checklist/items/${itemId}`, {
        method: "DELETE",
      });

      return response;
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to delete checklist item"
      );
    }
  }

  return { deleteChecklistItemCall, error };
}
