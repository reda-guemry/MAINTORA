import type { ReactNode } from "react";
import type { ApiResponse, PaginatedResponse } from "@/shared/types/api.types";

export type MachineStatus = "active" | "anomalous" | "maintenance" ;

export type Machine = {
  id: number;
  code: string;
  name: string;
  location: string;
  latitude: number;
  longitude: number;
  status: MachineStatus;  
};

export type MachinePayload = {
  code: string;
  name: string;
  location: string;
  latitude: number;
  longitude: number;
};

export type MachinesTableProps = {
  machines: Machine[];
  isLoading: boolean;
  error: string | null;
  onEdit: (machine: Machine) => void;
  onDelete: (machine: Machine) => void;
  onHistory?: (machine: Machine) => void;
  children?: ReactNode;
};

export type MachineTableRowProps = {
  machine: Machine;
  onEdit: (machine: Machine) => void;
  onDelete: (machine: Machine) => void;
  onHistory?: (machine: Machine) => void;
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

export type PaginateMachineResponse = ApiResponse<PaginatedResponse<Machine>>;

export type PaginateMachineData = PaginateMachineResponse["data"];

export type MachineListResponse = ApiResponse<Machine[]>;
