import { useApi } from "@/shared/hooks/useApi";
import type { PaginateUserResponse } from "../types/paginateUser";
import { usePagination } from "@/shared/hooks/usePagination";

export function usePaginateUser() {
  const { callApi } = useApi();

  const fetchUsers = (page: number) =>
    callApi<PaginateUserResponse>(`admin/users?page=${page}`, {
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
  } = usePagination(fetchUsers);

  return {
    paginate,
    isLoading,
    currentPage,
    setPage,
    error,
    updateUserInList: updateItem,
    removeUserFromList: removeItem,
    addUserToList: addItem,
  };
}
