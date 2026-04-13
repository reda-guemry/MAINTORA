import type { User } from "@/features/auth";
import type { ReactNode } from "react";

export type UserRole = string;


export type EditUserPayload = {
  first_name: string;
  last_name: string;
  email: string;
  number: string;
  role: string;
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
};



