import { useState } from "react";
import type { Machine, MachinePayload } from "../types/machineComponents";
import { useApi } from "@/shared/hooks/useApi";




export function useCreateMachine() {

    const { callApi } = useApi();
    const [ error, setError ] = useState<string | null>(null);

    async function createMachineCall(data: MachinePayload) {
        
        try {
            const response = await callApi<{ data: Machine }>(`client/machines`, {
                method: "POST",
                body: data,
            });
            return response;
        } catch (err) {
            if (err instanceof Error) {
                setError(err.message);
            } else {
                setError("Failed to create machine");
            }
        }

    }

    return { createMachineCall , error };
    
}