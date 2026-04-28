import type { User } from "@/features/auth";
import type { ApiResponse, PaginatedResponse } from "@/shared/types/api.types";

export type PaginateUserResponse = ApiResponse<PaginatedResponse<User>>;

export type CreateUserResponse = ApiResponse<User>;

export type UpdateUserResponse = ApiResponse<User>;

export type DeleteUserResponse = ApiResponse<void>;

export type RoleOption = {
  id: number;
  name: string;
};

export type GetRolesResponse = ApiResponse<RoleOption[]>;
