import type { ReactNode } from "react";
import type { ApiResponse } from "@/shared/types/api.types";


type role = {
    id: number;
    name: string;
} 


export interface User {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
    roles?: role[];
    phone: string;
}

export interface LoginRequest {
    email: string;
    password: string;
}

export type LoginResponse = ApiResponse<{
    user: User;
    token: string;
}>;

export type RefreshTokenResponse = ApiResponse<{
    user: User;
    access_token: string;
}>;


export type onSuccess = {
    onSuccess: (roles: NonNullable<User["roles"]>) => void;
}


export type AuthState = {
    user: User | null;
    access_token: string | null;
    isAuthenticated: boolean;
    authStatus: AuthStatus;
}








export type AuthStatus = "idle" | "loading" | "authenticated" | "unauthenticated";

export type AuthContextType = {
    access_token: string | null;
    user: User | null;
    isAuthenticated: boolean;
    authStatus: AuthStatus;
    setAuth: (user: User, access_token: string) => void;
    clearAuth: () => void;
    startAuthCheck: () => void;
};

export type AuthProviderProps = {
    children: ReactNode;
};
