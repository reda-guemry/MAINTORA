import type { User } from "@/features/auth";
import type { Machine } from "@/features/machines";

export type ClientRepairRequestStatus =
  | "open"
  | "in_progress"
  | "completed"
  | "rejected";

export type RepairPurchaseOrderStatus = "uploaded" | "approved" | "rejected";

export type RepairPurchaseOrder = {
  id: number;
  file_path: string;
  file_url: string;
  original_file_name: string;
  status: RepairPurchaseOrderStatus;
  created_at: string;
  uploaded_by?: User | null;
};

export type ClientRepairRequestAnomaly = {
  id: number;
  title: string;
  description: string;
  severity: "low" | "medium" | "high";
  status: "pending" | "in_progress" | "resolved" | "rejected";
  created_at: string;
  reported_by?: User | null;
};

export type ClientRepairRequest = {
  id: number;
  title: string;
  description: string;
  status: ClientRepairRequestStatus;
  estimated_cost: number | string;
  created_at: string;
  machine: Machine;
  anomaly?: ClientRepairRequestAnomaly | null;
  requested_by?: User | null;
  assigned_to?: User | null;
  purchase_order?: RepairPurchaseOrder | null;
};
