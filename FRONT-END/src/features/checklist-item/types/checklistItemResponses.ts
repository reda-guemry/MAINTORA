import type { ApiResponse } from "@/shared/types/api.types";
import type {
  ChecklistItem,
  PaginateChecklistItemResponse,
} from "./checklistItemComponents";

export type CreateChecklistItemResponse = ApiResponse<ChecklistItem>;

export type UpdateChecklistItemResponse = ApiResponse<ChecklistItem>;

export type DeleteChecklistItemResponse = ApiResponse<void>;

// Re-export the paginated type for consistency
export type GetChecklistItemsResponse = PaginateChecklistItemResponse;
