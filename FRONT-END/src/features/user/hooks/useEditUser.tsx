import { useApi } from "@/shared/hooks/useApi";
import type { EditUserModalProps, EditUserPayload } from "../types/usersComponents";
import { useState } from "react";



export function useEditUser() {
    const { callApi } = useApi();
    const [ error, setError ] = useState<string | null>(null);

    async function editUserCall(userId: number, data: EditUserPayload) {
        
        try {
            const response = await callApi(`admin/users/${userId}`, {
                method: "PUT",
                body: data,
            });
            return response;
        } catch (err) {
            if (err instanceof Error) {
                setError(err.message);
            } else {
                setError("Failed to update user");
            }
        }

    }

    return { editUserCall, error };
    
}