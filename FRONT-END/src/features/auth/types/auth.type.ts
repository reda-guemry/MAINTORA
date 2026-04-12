import type { ReactNode } from "react";




export interface User {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
    roles: string[];
    number: string;
}

export interface LoginRequest {
    email: string;
    password: string;
}

export type LoginResponse = {
    success: boolean;
    message: string;
    data: {
        user: User;
        token: string;
    }
}

export type RefreshTokenResponse = {
    success: boolean;
    message: string;
    data: {
        user: User;
        token: string;
    }
}


export type onSuccess = {
    onSuccess: (roles: string[]) => void;
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

