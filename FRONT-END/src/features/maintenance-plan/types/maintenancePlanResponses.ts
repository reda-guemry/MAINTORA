import type { ChecklistTemplate } from "@/features/checklist-template";
import type { MaintenancePlan } from "./maintenancePlan";

export type MaintenancePlanMutationResponse = {
  success: boolean;
  message: string;
  data: MaintenancePlan;
};

export type MaintenancePlanDeleteResponse = {
  success: boolean;
  message: string;
};

export type ChecklistTemplateOptionsResponse = {
  success: boolean;
  message: string;
  data: {
    data: ChecklistTemplate[];
    current_page: number;
    last_page: number;
  };
};
