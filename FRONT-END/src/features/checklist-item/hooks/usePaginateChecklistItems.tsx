import { useApi } from "@/shared/hooks/useApi";
import type {
  PaginateChecklistItemResponse,
} from "../types/checklistItemComponents";
import { usePagination } from "@/shared/hooks/usePagination";

export function usePaginateChecklistItems() {
  const { callApi } = useApi();

  const fetchItems = 
    (page: number) =>
      callApi<PaginateChecklistItemResponse>(
        `chef-technician/checklist/items?page=${page}`,
        {
          method: "GET",
        }
      ).then((response) => response.data) ; 

  const {
    paginate,
    isLoading,
    currentPage,
    error,
    setPage,
    updateItem,
    removeItem,
    addItem,
  } = usePagination(fetchItems);

  return {
    paginate,
    isLoading,
    currentPage,
    setPage,
    error,
    addChecklistItemToList: addItem,
    updateChecklistItemInList: updateItem,
    removeChecklistItemFromList: removeItem,
  };
}
