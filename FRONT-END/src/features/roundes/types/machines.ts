import type { User } from "@/features/auth";
import type { MaintenancePlan } from "@/features/maintenance-plan";
import type { ApiResponse, PaginatedResponse } from "@/shared/types/api.types";

export type MachineStatus = "active" | "anomalous" | "maintenance";

export type MachinesResponse = ApiResponse<Machine[]>;

export type PaginateMachinesResponse = ApiResponse<PaginatedResponse<Machine>>;

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
