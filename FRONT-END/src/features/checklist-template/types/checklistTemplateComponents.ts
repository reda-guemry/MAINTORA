import type { ReactNode } from "react";
import type { ApiResponse, PaginatedResponse } from "@/shared/types/api.types";

export type ChecklistTemplateItem = {
  id: number;
  label: string;
  pivot?: {
    id?: number;
    order: number;
  };
};


export type ChecklistTemplateItemAssignment = {
  id: number;
  order: number;
};

export type ChecklistTemplate = {
  id: number;
  name: string;
  description: string | null;
  checklist_items?: ChecklistTemplateItem[];
};

export type ChecklistTemplatePayload = {
  name: string;
  description: string;
  checklist_items?: ChecklistTemplateItemAssignment[];
};

export type PaginateChecklistTemplateResponse = ApiResponse<PaginatedResponse<ChecklistTemplate>>;

export type CreateChecklistTemplateResponse = ApiResponse<ChecklistTemplate>;

export type UpdateChecklistTemplateResponse = ApiResponse<ChecklistTemplate>;

export type DeleteChecklistTemplateResponse = ApiResponse<void>;

export type ChecklistTemplatesTableProps = {
  templates: ChecklistTemplate[];
  isLoading: boolean;
  error: string | null;
  onEdit: (template: ChecklistTemplate) => void;
  onDelete: (template: ChecklistTemplate) => void;
  children?: ReactNode;
};

export type ChecklistTemplateRowProps = {
  template: ChecklistTemplate;
  onEdit: (template: ChecklistTemplate) => void;
  onDelete: (template: ChecklistTemplate) => void;
};

export type AddChecklistTemplateModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (payload: ChecklistTemplatePayload) => void;
  isLoading?: boolean;
};

export type EditChecklistTemplateModalProps = {
  template: ChecklistTemplate | null;
  onClose: () => void;
  onSubmit: (payload: ChecklistTemplatePayload) => void;
  isLoading?: boolean;
};

export type DeleteChecklistTemplateDialogProps = {
  template: ChecklistTemplate | null;
  onClose: () => void;
  onConfirm: () => void;
};

export type ChecklistTemplatesPaginationProps = {
  currentPage: number;
  lastPage: number;
  from: number | null;
  to: number | null;
  total: number;
  isLoading: boolean;
  onPageChange: (page: number) => void;
};
