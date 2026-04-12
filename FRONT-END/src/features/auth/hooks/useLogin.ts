import { useState } from "react";
import { ApiError } from "@/shared/types/api.types";
import { login } from "../services/auth";
import type { LoginRequest } from "../types/auth.type";
import { useAuth } from "@/context/useAuth";

 function useLogin() {
  const { setAuth } = useAuth();

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function loginUser(credentials: LoginRequest) {
    try {
      setError(null);
      setIsLoading(true);

      const response = await login(credentials);

      const token = response.data.token;
      const user = response.data.user;

      setAuth(user, token);

      return response;
    } catch (err) {
      if (err instanceof ApiError) {
        setError(err.message);
      } else {
        setError("Something went wrong. Please try again.");
      }

      throw err;
    } finally {
      setIsLoading(false);
    }
  }

  return {
    loginUser,
    isLoading,
    error,
  };
}


export default useLogin;