import type { ClientRepairRequest } from "./repairRequest";

export type PaginatedClientRepairRequestsResponse = {
  success: boolean;
  message: string;
  data: {
    data: ClientRepairRequest[];
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
