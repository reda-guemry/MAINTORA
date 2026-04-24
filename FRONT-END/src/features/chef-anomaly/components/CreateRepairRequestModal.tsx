import { useEffect, useState } from "react";
import { Button, FormField, Input } from "@/shared/components/ui";
import type { CreateRepairRequestPayload } from "../types/anomaly";

type CreateRepairRequestModalProps = {
  isOpen: boolean;
  anomalyTitle?: string;
  isLoading: boolean;
  error: string | null;
  onClose: () => void;
  onSubmit: (payload: CreateRepairRequestPayload) => Promise<void>;
};

export function CreateRepairRequestModal({
  isOpen,
  anomalyTitle,
  isLoading,
  error,
  onClose,
  onSubmit,
}: CreateRepairRequestModalProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [estimatedCost, setEstimatedCost] = useState("");
  const [formError, setFormError] = useState<string | null>(null);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    setTitle(anomalyTitle ? `Repair request - ${anomalyTitle}` : "");
    setDescription("");
    setEstimatedCost("");
    setFormError(null);
  }, [anomalyTitle, isOpen]);

  if (!isOpen) {
    return null;
  }

  async function handleSubmit() {
    const parsedEstimatedCost = Number(estimatedCost);

    if (!title.trim() || !description.trim()) {
      setFormError("Please fill title and description.");
      return;
    }

    if (Number.isNaN(parsedEstimatedCost) || parsedEstimatedCost < 0) {
      setFormError("Please enter a valid estimated cost.");
      return;
    }

    setFormError(null);

    await onSubmit({
      title: title.trim(),
      description: description.trim(),
      estimated_cost: parsedEstimatedCost,
    });
  }

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-[#2d2d2d]/45 p-4">
      <div className="w-full max-w-2xl rounded-[30px] border border-[#ddd5c8] bg-[#fcfaf7] shadow-[0_30px_80px_rgba(0,0,0,0.22)]">
        <div className="border-b border-[#ece6dc] px-6 py-5">
          <h3 className="text-xl font-black tracking-tight text-[#2d241c]">
            Send Repair Request
          </h3>
          <p className="mt-1 text-sm text-[#6f6254]">
            Create the repair request that will be sent to the client for this anomaly.
          </p>
        </div>

        <div className="space-y-4 px-6 py-5">
          <FormField label="Title" htmlFor="repair_request_title" required>
            <Input
              id="repair_request_title"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              placeholder="Repair request title"
            />
          </FormField>

          <FormField
            label="Description"
            htmlFor="repair_request_description"
            required
          >
            <textarea
              id="repair_request_description"
              value={description}
              onChange={(event) => setDescription(event.target.value)}
              rows={6}
              className="w-full rounded-lg border border-[#ddd5c8] bg-white px-4 py-3 text-sm text-[#2d241c] outline-none transition-colors placeholder:text-[#9d9388] focus:border-primary focus:ring-2 focus:ring-primary/20"
              placeholder="Describe the repair request for the client..."
            />
          </FormField>

          <FormField
            label="Estimated Cost"
            htmlFor="repair_request_estimated_cost"
            required
          >
            <Input
              id="repair_request_estimated_cost"
              type="number"
              min="0"
              step="0.01"
              value={estimatedCost}
              onChange={(event) => setEstimatedCost(event.target.value)}
              placeholder="0.00"
            />
          </FormField>

          {(formError || error) && (
            <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
              {formError ?? error}
            </div>
          )}

          <div className="flex flex-col-reverse gap-3 pt-2 sm:flex-row sm:justify-end">
            <Button variant="secondary" onClick={onClose} disabled={isLoading}>
              Cancel
            </Button>
            <Button onClick={handleSubmit} isLoading={isLoading}>
              <span className="material-symbols-outlined text-[18px]">
                send
              </span>
              Save Repair Request
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
