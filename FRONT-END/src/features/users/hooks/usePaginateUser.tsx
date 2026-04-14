import { useApi } from "@/shared/hooks/useApi";
import { useEffect, useState } from "react";
import type { PaginateUserResponse } from "../types/paginateUser";
import type { User } from "@/features/auth/types/auth.type";

function usePaginateUser() {

    const [ paginate, setPaginate ] = useState<PaginateUserResponse['data'] | null>(null);
    const [ isLoading, setIsLoading ] = useState<boolean>(false);
    const [ currentPage, setCurrentPage ] = useState<number>(1);
    const [ error, setError ] = useState<string | null>(null);

  const { callApi } = useApi();

  useEffect(() => {
    async function fetchUsers() {
      try {
        setIsLoading(true);
        setError(null);

        const response = await callApi<PaginateUserResponse>(`admin/users?page=${currentPage}`, {
          method: "GET",
        });

        
        setPaginate(response.data);

      } catch (err) {
        const message = err instanceof Error ? err.message : "Failed to load users";
        setError(message);
      } finally {
        setIsLoading(false);
      }
    }

    fetchUsers();
  }, [currentPage]);


  function setPage(page: number) {
    if (!paginate) {
      setCurrentPage(page);
      return;
    }

    const boundedPage = Math.max(1, Math.min(page, paginate.last_page));
    setCurrentPage(boundedPage);
  }

  function updateUserInList(updatedUser: User) {
    setPaginate((prev) => {
      if (!prev) return prev;

      return {
        ...prev,
        data: prev.data.map((user) =>
          user.id === updatedUser.id ? updatedUser : user
        ),
      };
    });
  }

  function removeUserFromList(userId: number) {
    setPaginate((prev) => {
      if (!prev) return prev;

      return {
        ...prev,
        data: prev.data.filter((user) => user.id !== userId),
      };
    });
  }

  function addUserToList(newUser: User) {
    setPaginate((prev) => {
      if (!prev) return prev;
      
      return {
        ...prev,
        data: [newUser, ...prev.data],
      };
    });
  }

  return { paginate, isLoading, currentPage, setPage, error , updateUserInList, removeUserFromList, addUserToList };

}


export default usePaginateUser;

