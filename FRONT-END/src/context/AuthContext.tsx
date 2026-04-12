import { createContext, useMemo, useReducer, type ReactNode } from "react";
import type { User } from "@/features/auth/types/auth.type";
import { authReducer, initialAuthState } from "./authReducer";

type AuthContextType = {
  access_token: string | null;
  user: User | null;
  isAuthenticated: boolean;
  setAuth: (user: User, access_token: string) => void;
  clearAuth: () => void;
};

type AuthProviderProps = {
  children: ReactNode;
};

export const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: AuthProviderProps) {
  const [state, dispatch] = useReducer(authReducer, initialAuthState);

  function setAuth(user: User , access_token: string) {
    dispatch({
      type: "SET_AUTH",
      payload: { user, access_token },
    });
  }

  function clearAuth() {
    dispatch({ type: "CLEAR_AUTH" });
  }

  const value = useMemo( () => ({
    access_token: state.access_token,
    user: state.user,
    isAuthenticated: state.isAuthenticated,
    setAuth,
    clearAuth,
  }) , [state.access_token , state.user , state.isAuthenticated] )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;


}
