import type { User } from "@/features/auth";
import type { ApiResponse, PaginatedResponse } from "@/shared/types/api.types";

export type PaginateUserResponse = ApiResponse<PaginatedResponse<User>>;


