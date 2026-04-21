import { useApi } from "@/shared/hooks/useApi";
import { useState } from "react";

export function useDeleteChecklistTemplate() {
  const { callApi } = useApi();
  const [error, setError] = useState<string | null>(null);

  async function deleteChecklistTemplateCall(templateId: number) {
    try {
      const response = await callApi(`chef-technician/checklist/templates/${templateId}`, {
        method: "DELETE",
      });

      return response;
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Failed to delete checklist template");
      }
    }
  }

  return { deleteChecklistTemplateCall, error };
}
