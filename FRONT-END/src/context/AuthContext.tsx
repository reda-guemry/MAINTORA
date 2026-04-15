import { createContext, useEffect, useMemo, useReducer } from "react";
import type {
  AuthContextType,
  AuthProviderProps,
  User,
} from "@/features/auth";

import { authReducer, initialAuthState } from "./authReducer";
import { refreshAccessToken } from "@/features/auth";

export const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: AuthProviderProps) {

  const [state, dispatch] = useReducer(authReducer, initialAuthState);

  function setAuth(user: User, access_token: string) {
    dispatch({
      type: "SET_AUTH",
      payload: { user, access_token },
    });
  }

  function clearAuth() {
    dispatch({ type: "CLEAR_AUTH" });
  }

  function startAuthCheck() {
    dispatch({ type: "START_AUTH_CHECK" });
  }

  useEffect(() => {
    let cancelled = false;

    async function initializeAuth() {
      startAuthCheck();

      try {
        const response = await refreshAccessToken();


        if (cancelled) return;

        const newToken = response.data.access_token;
        const user = response.data.user;


        setAuth(user, newToken);
      } catch (error) {
        if (cancelled) return;

        clearAuth();
      }
    }

    initializeAuth();

    return () => {
      cancelled = true;
    };
    
  }, []);

  const value = useMemo(
    () => ({
      access_token: state.access_token,
      user: state.user,
      isAuthenticated: state.isAuthenticated,
      authStatus: state.authStatus,
      setAuth,
      clearAuth,
      startAuthCheck,
    }),
    [state.access_token, state.user, state.isAuthenticated, state.authStatus],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
