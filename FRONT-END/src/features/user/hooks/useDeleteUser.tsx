import { useApi } from "@/shared/hooks/useApi";
import type { DeleteUserResponse } from "../types/userResponses";
import { useState } from "react";



export function useDeleteUser() {
    const { callApi } = useApi();
    const [ error, setError ] = useState<string | null>(null);

    async function deleteUserCall(userId: number) {
        
        try {
            const response = await callApi<DeleteUserResponse>(`admin/users/${userId}`, {
                method: "DELETE",
            });
            return response;
        } catch (err) {
            if (err instanceof Error) {
                setError(err.message);
            } else {
                setError("Failed to delete user");
            }
        }

    }

    return { deleteUserCall , error };
    
}
