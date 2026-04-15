import type { ReactNode } from "react";

export type MachineStatus = "operational" | "maintenance" | "offline";

export type Machine = {
  id: number;
  asset_id: string;
  name: string;
  category: string;
  last_service: string;
  status: MachineStatus;
};

export type MachinePayload = {
  asset_id: string;
  name: string;
  category: string;
  last_service: string;
  status: MachineStatus;
};

export type MachinesTableProps = {
  machines: Machine[];
  isLoading: boolean;
  error: string | null;
  onEdit: (machine: Machine) => void;
  onDelete: (machine: Machine) => void;
  children?: ReactNode;
};

export type MachineTableRowProps = {
  machine: Machine;
  onEdit: (machine: Machine) => void;
  onDelete: (machine: Machine) => void;
};

export type AddMachineModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (payload: MachinePayload) => void;
  isLoading?: boolean;
};

export type EditMachineModalProps = {
  machine: Machine | null;
  onClose: () => void;
  onSubmit: (payload: MachinePayload) => void;
  isLoading?: boolean;
};

export type DeleteMachineDialogProps = {
  machine: Machine | null;
  onClose: () => void;
  onConfirm: () => void;
};

export type MachinesPaginationProps = {
  from: number;
  to: number;
  total: number;
  isLoading: boolean;
  onPrevious: () => void;
  onNext: () => void;
};

export type PaginateMachineResponse = {
  data: {
    data: Machine[];
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

