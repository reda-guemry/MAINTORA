

import type { AuthState, User } from "../features/auth/types/auth.type";


export type AuthAction =
    | { type: "SET_AUTH", payload: { user: User, access_token: string } }
    | { type: "CLEAR_AUTH" }
    | { type: "START_AUTH_CHECK" }
    ;




export const initialAuthState: AuthState = {
    user: null,
    access_token: null,
    isAuthenticated: false,
    authStatus: "idle",
}


export function authReducer(
    state: AuthState,
    action: AuthAction
): AuthState {
    switch (action.type) {
        case "START_AUTH_CHECK":
            return {
                ...state,
                authStatus: "loading",
            };


        case "SET_AUTH":
            return {
                user: action.payload.user,
                access_token: action.payload.access_token,
                isAuthenticated: true ,
                authStatus: "authenticated",
            };
        case "CLEAR_AUTH":
            return {
                user: null,
                access_token: null,
                isAuthenticated: false,
                authStatus: "unauthenticated",
            };
        default:
            return state;
    }

}
