import { createContext, useReducer, type ReactNode } from "react";
import type { User } from "@/features/auth/types/auth.type";




type AuthContextType = {
    access_token: string | null ;
    user: User | null ;
    isAuthenticated: boolean ;
    setAuth : (user: User, access_token: string) => void ;
    clearAuth : () => void ;
}

type AuthProviderProps = {
    children: ReactNode ;
}   


export const AuthContext = createContext<AuthContextType | null>(null) ; 


export function AuthProvider({ children }: AuthProviderProps) {
    const [state : setState] = useReducer(authReducer, initialAuthState) ;

}


    
