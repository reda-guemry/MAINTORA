import { useAuth } from "@/context/useAuth";

export function useLogout() {
    
    const { clearAuth } = useAuth();

    async function logout() {
        try {
            await logout();
            clearAuth() ;

        }catch (error) {
            console.error("Logout failed:", error);
        }
        
    }

    return {
        logout,
    }

}



