import type { Machine, ReponseMachines } from "../types/machines";
import { useApi } from "@/shared/hooks/useApi";
import { useState } from "react";


export function useMachines() {
    const [ machines, setMachines] = useState<Machine[]>([]);
    
    const { callApi } = useApi();

    async function fetchMachines() {
        try{
            const reponse = await callApi<ReponseMachines>(
                'chef-technician/machines' , 
                {
                    method: "GET",
                }
            )

            console.log(reponse) ;
            setMachines(reponse.data) ;

        }catch(err) {
            console.error("Failed to fetch machines:", err);
        }


    }

    return { machines , fetchMachines };

}