import { useApi } from "@/shared/hooks/useApi";
import { useState } from "react";

export function useSearchItems() {
  const { callApi } = useApi();
  const [error, setError] = useState<string | null>(null);

  async function searchChecklistItemsCall($search: string | null) {
    try {
      const response = await callApi(`chef-technician/checklist/search?search=${$search}`, {});

        console.log(response)
      return response;

    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Failed to search checklist items");
      }
    }
  }

  return { searchChecklistItemsCall, error };
}
