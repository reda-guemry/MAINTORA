import { useCallback, useEffect, useState } from "react";
import type {
  PaginatedData,
  UsePaginationOptions,
  UsePaginationResult,
} from "@/shared/types/pagination.types";

export function usePagination<T>(
  fetchFunction: (page: number) => Promise<PaginatedData<T>>,
  options?: UsePaginationOptions,
): UsePaginationResult<T> {
  
  const [paginate, setPaginate] = useState<PaginatedData<T> | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [error, setError] = useState<string | null>(null);

  const fetch = async (page: number) => {
    try {
      setIsLoading(true);
      setError(null);

      const data = await fetchFunction(page);
      setPaginate(data);
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Failed to load data";
      setError(message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetch(currentPage);
  }, [currentPage, ...(options?.deps ?? [])]);

  const setPage = (page: number) => {
    if (!paginate) {
      setCurrentPage(page);
      return;
    }

    const boundedPage = Math.max(1, Math.min(page, paginate.last_page));
    setCurrentPage(boundedPage);
  };

  const updateItem = <TItem extends { id: number }>(item: TItem) => {
    setPaginate((prev) => {
      if (!prev) return prev;

      return {
        ...prev,
        data: prev.data.map((current) =>
          (current as { id: number }).id === item.id
            ? (item as unknown as T)
            : current,
        ),
      };
    });
  };

  const removeItem = (id: number) => {
    setPaginate((prev) => {
      if (!prev) return prev;

      return {
        ...prev,
        data: prev.data.filter((item) => (item as { id: number }).id !== id),
        total: Math.max(0, prev.total - 1),
        to: prev.to ? Math.max((prev.from ?? 1) - 1, prev.to - 1) : prev.to,
      };
    });
  };

  const addItem = <TItem extends { id: number }>(item: TItem) => {
    setPaginate((prev) => {
      if (!prev) return prev;

      return {
        ...prev,
        data: [item as unknown as T, ...prev.data],
        total: prev.total + 1,
        to: (prev.to ?? prev.data.length) + 1,
      };
    });
  };

  const refresh = useCallback(async () => {
    await fetch(currentPage);
  }, [currentPage]);

  return {
    paginate,
    isLoading,
    currentPage,
    error,
    setPage,
    refresh,
    updateItem,
    removeItem,
    addItem,
  };
}
