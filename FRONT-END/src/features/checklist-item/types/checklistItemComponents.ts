import type { ReactNode } from "react";

export type ChecklistItem = {
  id: number;
  label: string;
};

export type ChecklistItemPayload = {
  label: string;
};

export type PaginateChecklistItemResponse = {
  data: {
    data: ChecklistItem[];
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
    from: number | null;
    to: number | null;
    next_page_url: string | null;
    prev_page_url: string | null;
  };
  success: boolean;
  message: string;
};

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
