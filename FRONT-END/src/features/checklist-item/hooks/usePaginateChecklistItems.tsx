import { useApi } from "@/shared/hooks/useApi";
import { useEffect, useState } from "react";
import type {
  ChecklistItem,
  PaginateChecklistItemResponse,
} from "../types/checklistItemComponents";

export function usePaginateChecklistItems() {
  const [paginate, setPaginate] =
    useState<PaginateChecklistItemResponse["data"] | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [error, setError] = useState<string | null>(null);
  const { callApi } = useApi();

  useEffect(() => {
    async function fetchChecklistItems() {
      try {
        setIsLoading(true);
        setError(null);

        const response = await callApi<PaginateChecklistItemResponse>(
          `chef-technician/checklist-items?page=${currentPage}`,
          {
            method: "GET",
          }
        );

        setPaginate(response.data);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to load checklist items"
        );
      } finally {
        setIsLoading(false);
      }
    }

    fetchChecklistItems();
  }, [currentPage]);

  function setPage(page: number) {
    if (!paginate) {
      setCurrentPage(page);
      return;
    }

    const boundedPage = Math.max(1, Math.min(page, paginate.last_page));
    setCurrentPage(boundedPage);
  }

  function addChecklistItemToList(newItem: ChecklistItem) {
    setPaginate((prev) => {
      if (!prev) return prev;

      return {
        ...prev,
        data: [newItem, ...prev.data],
        total: prev.total + 1,
        to: (prev.to ?? prev.data.length) + 1,
      };
    });
  }

  function updateChecklistItemInList(updatedItem: ChecklistItem) {
    setPaginate((prev) => {
      if (!prev) return prev;

      return {
        ...prev,
        data: prev.data.map((item) =>
          item.id === updatedItem.id ? updatedItem : item
        ),
      };
    });
  }

  function removeChecklistItemFromList(itemId: number) {
    setPaginate((prev) => {
      if (!prev) return prev;

      return {
        ...prev,
        data: prev.data.filter((item) => item.id !== itemId),
        total: Math.max(0, prev.total - 1),
        to: prev.to ? Math.max((prev.from ?? 1) - 1, prev.to - 1) : prev.to,
      };
    });
  }

  return {
    paginate,
    isLoading,
    currentPage,
    setPage,
    error,
    addChecklistItemToList,
    updateChecklistItemInList,
    removeChecklistItemFromList,
  };
}
