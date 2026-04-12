import { refreshAccessToken } from "@/features/auth/services/auth";
import { api } from "../services/api";
import { ApiError, type ApiRequestOptions } from "../types/api.types";
import { useAuth } from "@/context/useAuth";


export function useApi() {
  const { access_token, setAuth, clearAuth } = useAuth();

  async function callApi<T>(
    endpoint: string,
    options: ApiRequestOptions = {}
  ): Promise<T> {
    try {
      return await api<T>(endpoint, {
        ...options,
        headers: {
          ...options.headers,
          ...(access_token
            ? { Authorization: `Bearer ${access_token}` }
            : {}),
        },
      });
    } catch (error) {
      if (!(error instanceof ApiError) || error.status !== 401) {
        throw error;
      }

      try {

        
        const refreshResponse = await refreshAccessToken() ; 

        const newToken = refreshResponse.data.token;
        const user = refreshResponse.data.user;

        setAuth(user, newToken);

        return await api<T>(endpoint, {
          ...options,
          headers: {
            ...options.headers,
            Authorization: `Bearer ${newToken}`,
          },
        });
      } catch (refreshError) {
        clearAuth();
        throw refreshError;
      }
    }
  }

  return { callApi };
}