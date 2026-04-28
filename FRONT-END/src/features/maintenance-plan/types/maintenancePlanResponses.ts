import type { ChecklistTemplate } from "@/features/checklist-template";
import type { MaintenancePlan } from "./maintenancePlan";
import type { ApiResponse } from "@/shared/types/api.types";

export type MaintenancePlanMutationResponse = ApiResponse<MaintenancePlan>;

export type MaintenancePlanDeleteResponse = ApiResponse<void>;

export type ChecklistTemplateOptionsResponse = ApiResponse<ChecklistTemplate[]>;
