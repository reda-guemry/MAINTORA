import type { User } from "@/features/auth";
import type { ReactNode } from "react";

export type UserRole = string;


export type EditUserPayload = {
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  role: number | string ;
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

export type RoleOption = {
  id: number;
  name: string;
};


export type UsersPaginationProps = {
  currentPage: number;
  lastPage: number;
  from: number | null;
  to: number | null;
  total: number;
  isLoading: boolean;
  onPageChange: (page: number) => void;
};
