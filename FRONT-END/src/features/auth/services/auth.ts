


import { api } from "@/shared/services/api";
import type { LoginRequest, LoginResponse, RefreshTokenResponse } from "../types/auth.type";

export async function login (credentials: LoginRequest): Promise<LoginResponse> {
    return api<LoginResponse>("login" , {
        method: "POST",
        body: credentials
    });
}

export async function refreshAccessToken(): Promise<RefreshTokenResponse> {
  return api<RefreshTokenResponse>("refresh", {
    method: "POST",
  });
}


export async function logout(): Promise<void> {
  return api<void>("logout", {
    method: "POST",
  });
}




