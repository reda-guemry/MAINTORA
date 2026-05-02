import type { User } from "@/features/auth";
import type { ReactNode } from "react";

export type UserRole = string;

export type UserRoleFilterValue =
  | "all"
  | "admin"
  | "chef_technician"
  | "technician"
  | "client";

export type UserRoleFilterOption = {
  label: string;
  value: UserRoleFilterValue;
  apiValue?: string;
};


export type EditUserPayload = {
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  role: number | string ;
};

export type AddUserPayload = {
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  role: number | string;
  password: string;
  password_confirmation: string;
};

export type DeleteUserDialogProps = {
  user: User | null;
  onClose: () => void;
  onConfirm: () => void;
};

export type UsersTableProps = {
  users: User[];
  isLoading: boolean;
  error: string | null;
  emptyMessage?: string;
  onEdit: (user: User) => void;
  onDelete: (user: User) => void;
  children?: ReactNode;
};

export type UserTableRowProps = {
  user: User;
  onEdit: (user: User) => void;
  onDelete: (user: User) => void;
};

export type EditUserModalProps = {
  user: User | null;
  onClose: () => void;
  onSubmit: (payload: EditUserPayload) => void;
  isLoading?: boolean;
  editError?: string | null;
};

export type AddUserModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (payload: AddUserPayload) => void;
  isLoading?: boolean;
};

export type RoleOption = {
  id: number;
  name: string;
};
