import type { ClientRepairRequest } from "./repairRequest";

export type UploadPurchaseOrderResponse = {
  success: boolean;
  message: string;
  data: ClientRepairRequest;
};
