import type { ClientRepairRequest } from "./repairRequest";
import type { ApiResponse, PaginatedResponse } from "@/shared/types/api.types";

export type PaginatedClientRepairRequestsResponse = ApiResponse<PaginatedResponse<ClientRepairRequest>>;

export type ClientRepairRequestResponse = ApiResponse<ClientRepairRequest>;
