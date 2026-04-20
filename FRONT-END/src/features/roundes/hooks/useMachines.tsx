import type { MaintenancePlan } from "@/features/maintenance-plan";
import { useApi } from "@/shared/hooks/useApi";
import { useState } from "react";
import type { Machine, MachinesResponse } from "../types/machines";


export function useMachines() {
    const [ machines, setMachines] = useState<Machine[]>([]);
    const [ isLoading, setIsLoading ] = useState(false);
    const [ error, setError ] = useState<string | null>(null);
    
    const { callApi } = useApi();

    async function fetchMachines() {
        try{
            setIsLoading(true);
            setError(null);

            const reponse = await callApi<MachinesResponse>(
                'chef-technician/machines' , 
                {
                    method: "GET",
                }
            )

            setMachines(reponse.data) ;

        }catch(err) {
            const message =
                err instanceof Error ? err.message : "Failed to fetch machines";
            setError(message);
        } finally {
            setIsLoading(false);
        }


    }

    function addMaintenancePlanToMachine(machineId: number, maintenancePlan: MaintenancePlan) {
        setMachines((currentMachines) =>
            currentMachines.map((machine) =>
                machine.id === machineId
                    ? {
                        ...machine,
                        maintenance_plans: [
                            maintenancePlan,
                            ...(machine.maintenance_plans ?? []),
                        ],
                    }
                    : machine,
            ),
        );
    }

    function updateMaintenancePlanInMachine(
        machineId: number,
        updatedMaintenancePlan: MaintenancePlan,
    ) {
        setMachines((currentMachines) =>
            currentMachines.map((machine) =>
                machine.id === machineId
                    ? {
                        ...machine,
                        maintenance_plans: (machine.maintenance_plans ?? []).map(
                            (maintenancePlan) =>
                                maintenancePlan.id === updatedMaintenancePlan.id
                                    ? updatedMaintenancePlan
                                    : maintenancePlan,
                        ),
                    }
                    : machine,
            ),
        );
    }

    function removeMaintenancePlanFromMachine(machineId: number, maintenancePlanId: number) {
        setMachines((currentMachines) =>
            currentMachines.map((machine) =>
                machine.id === machineId
                    ? {
                        ...machine,
                        maintenance_plans: (machine.maintenance_plans ?? []).filter(
                            (maintenancePlan) => maintenancePlan.id !== maintenancePlanId,
                        ),
                    }
                    : machine,
            ),
        );
    }

    return {
        machines,
        isLoading,
        error,
        fetchMachines,
        addMaintenancePlanToMachine,
        updateMaintenancePlanInMachine,
        removeMaintenancePlanFromMachine,
    };

}
