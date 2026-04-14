import { useApi } from "@/shared/hooks/useApi";
import { useState } from "react";
import type { AddUserPayload } from "../types/usersComponents";
import type { User } from "@/features/auth";



export function useCreateUser() {

    const { callApi } = useApi();
    const [ error, setError ] = useState<string | null>(null);

    async function createUserCall(data: AddUserPayload) {
        
        try {
            const response = await callApi<{ data: User }>(`admin/users`, {
                method: "POST",
                body: data,
            });
            return response;
        } catch (err) {
            if (err instanceof Error) {
                setError(err.message);
            } else {
                setError("Failed to create user");
            }
        }

    }

    return { createUserCall , error };
    
}