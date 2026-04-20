import type { User } from "@/features/auth";
import type { MaintenancePlan } from "@/features/maintenance-plan";




export type MachineStatus = "active" | "anomalous" | "maintenance";

export type MachinesResponse = {
    message : string ;
    success : boolean ;
    data : Machine[] ; 
}

export type Machine = {
    id : number ;
    code : string ;
    name : string ;
    location : string ;
    latitude : number ;
    longitude : number ;
    status : MachineStatus;
    created_by : User ;
    maintenance_plans?: MaintenancePlan[];
}
