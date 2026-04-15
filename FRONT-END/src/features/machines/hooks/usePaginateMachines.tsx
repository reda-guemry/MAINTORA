import { useEffect, useState } from "react";
import type { PaginateMachineResponse } from "../types/machineComponents";
import { useApi } from "@/shared/hooks/useApi";




export function usePaginateMachines() {

    const [ paginate, setPaginate ] = useState<PaginateMachineResponse['data'] | null>(null);
    const [ isLoading, setIsLoading ] = useState<boolean>(false);
    const [ currentPage, setCurrentPage ] = useState<number>(1);
    const [ error, setError ] = useState<string | null>(null);

  const { callApi } = useApi();

  useEffect(() => {
    async function fetchMachines() {
      try {
        setIsLoading(true);
        setError(null);

        const response = await callApi<PaginateMachineResponse>(`client/machines?page=${currentPage}`, {
          method: "GET",
        });

        console.log(response);
        
        setPaginate(response.data);

      } catch (err) {
        const message = err instanceof Error ? err.message : "Failed to load machines";
        setError(message);
      } finally {
        setIsLoading(false);
      }
    }

    fetchMachines();
  }, [currentPage]);


  function setPage(page: number) {
    if (!paginate) {
      setCurrentPage(page);
      return;
    }

    const boundedPage = Math.max(1, Math.min(page, paginate.last_page));
    setCurrentPage(boundedPage);
  }

  // function updateUserInList(updatedUser: User) {
  //   setPaginate((prev) => {
  //     if (!prev) return prev;

  //     return {
  //       ...prev,
  //       data: prev.data.map((user) =>
  //         user.id === updatedUser.id ? updatedUser : user
  //       ),
  //     };
  //   });
  // }

  // function removeUserFromList(userId: number) {
  //   setPaginate((prev) => {
  //     if (!prev) return prev;

  //     return {
  //       ...prev,
  //       data: prev.data.filter((user) => user.id !== userId),
  //     };
  //   });
  // }

  // function addUserToList(newUser: User) {
  //   setPaginate((prev) => {
  //     if (!prev) return prev;
      
  //     return {
  //       ...prev,
  //       data: [newUser, ...prev.data],
  //     };
  //   });
  // }

  return { paginate, isLoading, currentPage, setPage, error  };

}

