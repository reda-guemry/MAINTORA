import { useApi } from "@/shared/hooks/useApi";
import type { PaginateChecklistTemplateResponse } from "../types/checklistTemplateComponents";
import { usePagination } from "@/shared/hooks/usePagination";

export function usePaginateChecklistTemplates() {
  const { callApi } = useApi();

  const fetchTemplates = (page: number) =>
    callApi<PaginateChecklistTemplateResponse>(
      `chef-technician/checklist/templates?page=${page}`,
      {
        method: "GET",
      },
    ).then((response) => response.data);

  const {
    paginate,
    isLoading,
    currentPage,
    error,
    setPage,
    updateItem,
    removeItem,
    addItem,
  } = usePagination(fetchTemplates);

  return {
    paginate,
    isLoading,
    currentPage,
    setPage,
    error,
    addTemplateToList: addItem,
    updateTemplateInList: updateItem,
    removeTemplateFromList: removeItem,
  };
}
