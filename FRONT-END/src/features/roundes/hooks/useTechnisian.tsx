import { useApi } from "@/shared/hooks/useApi";
import { useState } from "react";
import type { ReponseTechnicians, Technician } from "../types/technician";



export function useTechnicians() {
    const [ technicians, setTechnicians] = useState<Technician[]>([]);
    
    const { callApi } = useApi();

    async function fetchTechnicians() {
        try{
            const reponse = await callApi<ReponseTechnicians>(
                'chef-technician/technicians' , 
                {
                    method: "GET",
                }
            )

            console.log(reponse) ;
            setTechnicians(reponse.data);

        }catch(err) {
            console.error("Failed to fetch technicians:", err);
        }


    }

    return { technicians , fetchTechnicians };

}