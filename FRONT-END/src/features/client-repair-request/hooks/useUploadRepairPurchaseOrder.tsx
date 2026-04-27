import { useState } from "react";
import { useApi } from "@/shared/hooks/useApi";
import type { UploadPurchaseOrderResponse } from "../types/uploadPurchaseOrderResponses";

export function useUploadRepairPurchaseOrder() {
  const { callApi } = useApi();
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function uploadPurchaseOrderCall(repairRequestId: number, file: File) {
    try {
      setIsUploading(true);
      setError(null);

      const formData = new FormData();
      formData.append("purchase_order", file);

      const response = await callApi<UploadPurchaseOrderResponse>(
        `client/repair-requests/${repairRequestId}/purchase-orders`,
        {
          method: "POST",
          body: formData,
        },
      );

      return response;
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Failed to upload purchase order";
      setError(message);
    } finally {
      setIsUploading(false);
    }
  }

  return {
    uploadPurchaseOrderCall,
    isUploading,
    error,
  };
}
