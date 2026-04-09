

import type { AuthState, User } from "../features/auth/types/auth.type";


export type AuthAction =
    | { type: "SET_AUTH", payload: { user: User, access_token: string } }
    | { type: "CLEAR_AUTH" };



export const initialAuthState: AuthState = {
    user: null,
    access_token: null,
    isAuthenticated: false,
}


export function authReducer(
    state: AuthState,
    action: AuthAction
): AuthState {
    switch (action.type) {
        case "SET_AUTH":
            return {
                user: action.payload.user,
                access_token: action.payload.access_token,
                isAuthenticated: true ,
            };
        case "CLEAR_AUTH":
            return {
                user: null,
                access_token: null,
                isAuthenticated: false,
            };
        default:
            return state;
    }

}
