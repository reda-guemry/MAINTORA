import type { User } from "@/features/auth";
import type { ApiResponse } from "@/shared/types/api.types";

export type ProfilePayload = {
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
};

export type PasswordPayload = {
  current_password: string;
  new_password: string;
  new_password_confirmation: string;
};

export type ProfileResponse = ApiResponse<User>;

export type PasswordResponse = ApiResponse<null>;
