import { useCallback, useEffect, useRef, useState } from "react";
import { useApi } from "@/shared/hooks/useApi";
import type { PaginateUserResponse } from "../types/paginateUser";
import type { UserRoleFilterValue } from "../types/usersComponents";
import type { PaginatedData } from "@/shared/types/pagination.types";
import type { User } from "@/features/auth";

type UsePaginateUserOptions = {
  role?: UserRoleFilterValue;
  page?: number;
};

const roleApiValues: Record<UserRoleFilterValue, string | null> = {
  all: null,
  admin: "admin",
  chef_technician: "chef_technician",
  technician: "technician",
  client: "client",
};

export function usePaginateUser({
  role = "all",
  page = 1,
}: UsePaginateUserOptions = {}) {
  const { callApi } = useApi();
  const callApiRef = useRef(callApi);
  const [paginate, setPaginate] = useState<PaginatedData<User> | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const roleApiValue = roleApiValues[role] ?? null;

  useEffect(() => {
    callApiRef.current = callApi;
  }, [callApi]);

  const fetchUsers = useCallback(async () => {
    const params = new URLSearchParams({ page: String(page) });

    if (roleApiValue) {
      params.set("role", roleApiValue);
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await callApiRef.current<PaginateUserResponse>(
        `admin/users?${params.toString()}`,
        {
          method: "GET",
        },
      );

      setPaginate(response.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load users");
    } finally {
      setIsLoading(false);
    }
  }, [page, roleApiValue]);

  useEffect(() => {
    let cancelled = false;

    async function loadUsers() {
      const params = new URLSearchParams({ page: String(page) });

      if (roleApiValue) {
        params.set("role", roleApiValue);
      }

      setIsLoading(true);
      setError(null);

      try {
        const response = await callApiRef.current<PaginateUserResponse>(
          `admin/users?${params.toString()}`,
          {
            method: "GET",
          },
        );

        if (!cancelled) {
          setPaginate(response.data);
        }
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : "Failed to load users");
        }
      } finally {
        if (!cancelled) {
          setIsLoading(false);
        }
      }
    }

    loadUsers();

    return () => {
      cancelled = true;
    };
  }, [page, roleApiValue]);

  return {
    paginate,
    isLoading,
    error,
    refreshUsers: fetchUsers,
  };
}
