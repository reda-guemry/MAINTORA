import type { PaginateMachineResponse } from "../types/machineComponents";
import { useApi } from "@/shared/hooks/useApi";
import { usePagination } from "@/shared/hooks/usePagination";

export function usePaginateMachines() {
  const { callApi } = useApi();

  const fetchMachines = (page: number) =>
    callApi<PaginateMachineResponse>(`client/machines?page=${page}`, {
      method: "GET",
    }).then((response) => response.data);

  const {
    paginate,
    isLoading,
    currentPage,
    error,
    setPage,
    updateItem,
    removeItem,
    addItem,
  } = usePagination(fetchMachines);

  return {
    paginate,
    isLoading,
    currentPage,
    setPage,
    error,
    updateMachineInList: updateItem,
    removeMachineFromList: removeItem,
    addMachineToList: addItem,
  };
}
