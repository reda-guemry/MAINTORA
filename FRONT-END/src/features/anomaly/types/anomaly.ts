import type { User } from "@/features/auth";
import type { ChecklistTemplate } from "@/features/checklist-template";
import type { Machine } from "@/features/roundes";

export type AnomalyStatus =
  | "open"
  | "pending"
  | "in_progress"
  | "resolved"
  | "rejected";

export type AnomalySeverity = "low" | "medium" | "high";

export type RepairRequestStatus =
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

export type RepairRequest = {
  id: number;
  title: string;
  description: string;
  status: RepairRequestStatus;
  estimated_cost: number | string;
  created_at: string;
  requested_by?: User | null;
  assigned_to?: User | null;
  purchase_order?: RepairPurchaseOrder | null;
};

export type AnomalyCheckStatus = "ok" | "not_ok" | "anomaly";

export type MaintenanceTaskCheckItem = {
  id: number | null;
  checklist_item_id: number;
  label: string;
  order: number | null;
  status: AnomalyCheckStatus | null;
  comment: string | null;
};

export type MatchedCheckItem = {
  id: number;
  checklist_item_id: number;
  label: string | null;
  status: "anomaly";
  comment: string | null;
};

export type AnomalyMaintenanceTask = {
  id: number;
  scheduled_at: string;
  status: string;
  checklist_template?: ChecklistTemplate | null;
  check_items: MaintenanceTaskCheckItem[];
};

export type ChefAnomaly = {
  id: number;
  title: string;
  description: string;
  severity: AnomalySeverity;
  status: AnomalyStatus;
  created_at: string;
  machine: Machine;
  reported_by: User;
  maintenance_task?: AnomalyMaintenanceTask | null;
  repair_request?: RepairRequest[] | null;
  matched_check_items?: MatchedCheckItem[];
};

export type CreateRepairRequestPayload = {
  title: string;
  description: string;
  estimated_cost: number;
};




export type AnomalyDetailsModalProps = {
  anomaly: ChefAnomaly | null;
  isOpen: boolean;
  isLoading: boolean;
  error: string | null;
  reviewError: string | null;
  isReviewingPurchaseOrder: boolean;
  onClose: () => void;
  onOpenRepairRequest: () => void;
  onApprovePurchaseOrder: (repairRequestId: number) => void;
  onRejectPurchaseOrder: (repairRequestId: number) => void;
};



