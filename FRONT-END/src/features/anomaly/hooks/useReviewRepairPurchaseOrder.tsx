import { useState } from "react";
import { useApi } from "@/shared/hooks/useApi";
import type { ReviewPurchaseOrderResponse } from "../types/anomalyResponses";

export function useReviewRepairPurchaseOrder() {
  const { callApi } = useApi();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function reviewPurchaseOrderCall(
    repairRequestId: number,
    decision: "approve" | "reject",
  ) {
    try {
      setIsLoading(true);
      setError(null);

      const response = await callApi<ReviewPurchaseOrderResponse>(
        `chef-technician/repair-requests/${repairRequestId}/purchase-order/review`,
        {
          method: "PATCH",
          body: {
            decision,
          },
        },
      );

      return response;
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Failed to review purchase order";
      setError(message);
    } finally {
      setIsLoading(false);
    }
  }

  return {
    reviewPurchaseOrderCall,
    isLoading,
    error,
  };
}
