import type {
  ChefAnomaly,
  CreateRepairRequestPayload,
  RepairRequest,
} from "./anomaly";
import type { ApiResponse, PaginatedResponse } from "@/shared/types/api.types";

export type PaginatedChefAnomaliesResponse = ApiResponse<PaginatedResponse<ChefAnomaly>>;

export type ChefAnomalyResponse = ApiResponse<ChefAnomaly>;

export type CreateRepairRequestResponse = ApiResponse<RepairRequest>;

export type ReviewPurchaseOrderResponse = ApiResponse<RepairRequest>;

export type CreateRepairRequestMutation = (
  anomalyId: number,
  payload: CreateRepairRequestPayload,
) => Promise<CreateRepairRequestResponse | undefined>;
