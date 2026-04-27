import type {
  ChefAnomaly,
  CreateRepairRequestPayload,
  RepairRequest,
} from "./anomaly";

export type PaginatedChefAnomaliesResponse = {
  success: boolean;
  message: string;
  data: {
    data: ChefAnomaly[];
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
    from: number | null;
    to: number | null;
    next_page_url: string | null;
    prev_page_url: string | null;
  };
};

export type ChefAnomalyResponse = {
  success: boolean;
  message: string;
  data: ChefAnomaly;
};

export type CreateRepairRequestResponse = {
  success: boolean;
  message: string;
  data: RepairRequest;
};

export type ReviewPurchaseOrderResponse = {
  success: boolean;
  message: string;
  data: RepairRequest;
};

export type CreateRepairRequestMutation = (
  anomalyId: number,
  payload: CreateRepairRequestPayload,
) => Promise<CreateRepairRequestResponse | undefined>;
