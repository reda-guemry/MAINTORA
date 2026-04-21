import { useApi } from "@/shared/hooks/useApi";
import { useState } from "react";
import type {
  ChecklistTemplate,
  ChecklistTemplatePayload,
} from "../types/checklistTemplateComponents";

export function useCreateChecklistTemplate() {
  const { callApi } = useApi();
  const [error, setError] = useState<string | null>(null);

  async function createChecklistTemplateCall(data: ChecklistTemplatePayload) {
    try {
      const response = await callApi<{ data: ChecklistTemplate }>(
        "chef-technician/checklist/templates",
        {
          method: "POST",
          body: data,
        }
      );

      return response;
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Failed to create checklist template");
      }
    }
  }

  return { createChecklistTemplateCall, error };
}
