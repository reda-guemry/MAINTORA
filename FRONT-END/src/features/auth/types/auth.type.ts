



export interface User {
    id: number ; 
    first_name: string ;
    last_name: string ;
    email: string ;
    roles: string[] ;
    number : string ;
}

export interface LoginRequest {
    email: string ;
    password: string ;
}

export type LoginResponse = {
    success: boolean ;
    message: string ;
    data : {
        user: User ;
        token: string ;
    }
}

export type RefreshTokenResponse = {
    success: boolean ;
    message: string ;
    data : {
        user: User ;
        token: string ;
    }
}

export type AuthState = {
    user : User | null ;
    access_token : string | null ;
    isAuthenticated : boolean ;
}

export type onSuccess = {
    onSuccess : (roles: string[]) => void ;
}

