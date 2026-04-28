import { useEffect, useState } from "react";
import { useApi } from "@/shared/hooks/useApi";
import type { RoleOption } from "../types/usersComponents";



export function useUserRoles() {

  const { callApi } = useApi();
  const [roles, setRoles] = useState<RoleOption[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadRoles() {
      try {
        const response = await callApi<{ data: RoleOption[] }>("admin/roles");
        setRoles(response.data);
      } catch (err) {
        setError("Failed to load roles");
      }
    }

    loadRoles();
  }, []);

  return { roles, error };
}