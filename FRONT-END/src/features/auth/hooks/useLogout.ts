import { useAuth } from "@/context/useAuth";
import { logoutService } from "../services/auth";

export function useLogout() {
    
    const { clearAuth } = useAuth();

    async function logout() {
        try {
            await logoutService();

            // console.log("Logout response:", reponse);
            clearAuth() ;

        }catch (error) {
            console.error("Logout failed:", error);
        }
        
    }

    return {
        logout,
    }

}



