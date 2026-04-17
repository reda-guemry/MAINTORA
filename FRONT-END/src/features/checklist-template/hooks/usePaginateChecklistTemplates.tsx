import { useApi } from "@/shared/hooks/useApi";
import { useEffect, useState } from "react";
import type {
  ChecklistTemplate,
  PaginateChecklistTemplateResponse,
} from "../types/checklistTemplateComponents";

export function usePaginateChecklistTemplates() {
  const [paginate, setPaginate] =
    useState<PaginateChecklistTemplateResponse["data"] | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [error, setError] = useState<string | null>(null);

  const { callApi } = useApi();

  useEffect(() => {
    async function fetchChecklistTemplates() {
      try {
        setIsLoading(true);
        setError(null);

        const response = await callApi<PaginateChecklistTemplateResponse>(
          `chef-technician/checklist?page=${currentPage}`,
          {
            method: "GET",
          }
        );

        setPaginate(response.data);
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

    fetchChecklistTemplates();
  }, [currentPage]);

  function setPage(page: number) {
    if (!paginate) {
      setCurrentPage(page);
      return;
    }

    const boundedPage = Math.max(1, Math.min(page, paginate.last_page));
    setCurrentPage(boundedPage);
  }

  function addTemplateToList(newTemplate: ChecklistTemplate) {
    setPaginate((prev) => {
      if (!prev) return prev;

      return {
        ...prev,
        data: [newTemplate, ...prev.data],
        total: prev.total + 1,
        to: (prev.to ?? prev.data.length) + 1,
      };
    });
  }

  function updateTemplateInList(updatedTemplate: ChecklistTemplate) {
    setPaginate((prev) => {
      if (!prev) return prev;

      return {
        ...prev,
        data: prev.data.map((template) =>
          template.id === updatedTemplate.id ? updatedTemplate : template
        ),
      };
    });
  }

  function removeTemplateFromList(templateId: number) {
    setPaginate((prev) => {
      if (!prev) return prev;

      return {
        ...prev,
        data: prev.data.filter((template) => template.id !== templateId),
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
    addTemplateToList,
    updateTemplateInList,
    removeTemplateFromList,
  };
}
