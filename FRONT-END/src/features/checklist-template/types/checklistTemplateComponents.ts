import type { ReactNode } from "react";

export type ChecklistTemplate = {
  id: number;
  name: string;
  description: string | null;
  created_by: number;
  checklist_items?: ChecklistItem[];
};

type ChecklistItem = {
  id: number;
  label: string;
  pivot: {
    id: number;
    order: number;
  }
};

export type ChecklistTemplatePayload = {
  name: string;
  description: string;
};

export type PaginateChecklistTemplateResponse = {
  data: {
    data: ChecklistTemplate[];
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
