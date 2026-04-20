import { useApi } from "@/shared/hooks/useApi";
import { useState } from "react";
import type { Technician, TechniciansResponse } from "../types/technician";



export function useTechnicians() {
    const [ technicians, setTechnicians] = useState<Technician[]>([]);
    const [ isLoading, setIsLoading ] = useState(false);
    const [ error, setError ] = useState<string | null>(null);
    
    const { callApi } = useApi();

    async function fetchTechnicians() {
        try{
            setIsLoading(true);
            setError(null);

            const reponse = await callApi<TechniciansResponse>(
                'chef-technician/technicians' , 
                {
                    method: "GET",
                }
            )

            setTechnicians(reponse.data);

        }catch(err) {
            const message =
                err instanceof Error ? err.message : "Failed to fetch technicians";
            setError(message);
        } finally {
            setIsLoading(false);
        }


    }

    return { technicians , isLoading, error, fetchTechnicians };

}
