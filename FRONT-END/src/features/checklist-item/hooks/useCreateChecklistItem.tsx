import { useApi } from "@/shared/hooks/useApi";
import { useState } from "react";
import type {
  ChecklistItemPayload,
} from "../types/checklistItemComponents";
import type { CreateChecklistItemResponse } from "../types/checklistItemResponses";

export function useCreateChecklistItem() {
  const { callApi } = useApi();
  const [error, setError] = useState<string | null>(null);

  async function createChecklistItemCall(data: ChecklistItemPayload) {
    try {
      const response = await callApi<CreateChecklistItemResponse>(
        "chef-technician/checklist/items",
        {
          method: "POST",
          body: data,
        }
      );

      return response;
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to create checklist item"
      );
    }
  }

  return { createChecklistItemCall, error };
}
