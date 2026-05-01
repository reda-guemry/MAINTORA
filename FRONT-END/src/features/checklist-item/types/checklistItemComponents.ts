import type { ReactNode } from "react";
import type { ApiResponse, PaginatedResponse } from "@/shared/types/api.types";

export type ChecklistItem = {
  id: number;
  label: string;
};


export type ChecklistItemPayload = {
  label: string;
};

export type PaginateChecklistItemResponse = ApiResponse<PaginatedResponse<ChecklistItem>>;

export type ChecklistItemsPaginationProps = {
  currentPage: number;
  lastPage: number;
  from: number | null;
  to: number | null;
  total: number;
  isLoading: boolean;
  onPageChange: (page: number) => void;
};

export type ChecklistItemsListProps = {
  items: ChecklistItem[];
  isLoading: boolean;
  error: string | null;
  editingItemId: number | null;
  editingValue: string;
  onEditStart: (item: ChecklistItem) => void;
  onEditCancel: () => void;
  onEditChange: (value: string) => void;
  onEditSubmit: (itemId: number) => void;
  onDelete: (item: ChecklistItem) => void;
  children?: ReactNode;
};
