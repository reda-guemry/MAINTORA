import { useApi } from "@/shared/hooks/useApi";
import { useState } from "react";
import type {
  ChecklistTemplate,
  ChecklistTemplatePayload,
} from "../types/checklistTemplateComponents";

export function useEditChecklistTemplate() {
  const { callApi } = useApi();
  const [error, setError] = useState<string | null>(null);

  async function editChecklistTemplateCall(
    templateId: number,
    data: ChecklistTemplatePayload
  ) {
    try {
      const response = await callApi<{ data: ChecklistTemplate }>(
        `chef-technician/checklist/${templateId}`,
        {
          method: "PUT",
          body: data,
        }
      );

      return response;
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Failed to update checklist template");
      }
    }
  }

  return { editChecklistTemplateCall, error };
}
