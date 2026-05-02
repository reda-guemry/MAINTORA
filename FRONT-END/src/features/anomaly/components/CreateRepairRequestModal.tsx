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
    <div className="fixed inset-0 z-60 flex items-center justify-center bg-slate-900/40 backdrop-blur-sm p-4">
      <div className="w-full max-w-2xl rounded-3xl border border-slate-200 bg-white shadow-2xl">
        <div className="border-b border-slate-100 px-8 py-6">
          <h3 className="text-xl font-bold tracking-tight text-slate-900">
            Send Repair Request
          </h3>
          <p className="mt-1 text-sm text-slate-500">
            Create the repair request that will be sent to the client for this
            anomaly.
          </p>
        </div>

        <div className="space-y-5 px-8 py-6">
          <FormField label="Title" htmlFor="repair_request_title" required>
            <Input
              id="repair_request_title"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              placeholder="Repair request title"
              className="h-11 rounded-xl border-slate-200 bg-slate-50 text-slate-900  focus:bg-white  "
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
              rows={5}
              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition-colors placeholder:text-slate-400  focus:bg-white focus:ring-2 "
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
              className="h-11 rounded-xl border-slate-200 bg-slate-50 text-slate-900  focus:bg-white focus:ring-2 "
            />
          </FormField>

          {(formError || error) && (
            <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-600">
              {formError ?? error}
            </div>
          )}

          <div className="flex flex-col-reverse gap-3 pt-4 sm:flex-row sm:justify-end">
            <Button
              variant="secondary"
              onClick={onClose}
              disabled={isLoading}
              className="h-11 rounded-xl"
            >
              Cancel
            </Button>
            <Button
              onClick={handleSubmit}
              isLoading={isLoading}
              className="h-11 rounded-xl bg-[#43968C] text-white hover:bg-[#367971]"
            >
              <div className="flex gap-1 items-center">
                <span className="material-symbols-outlined text-[18px]">
                  send
                </span>
                <span>Save Repair Request</span>
              </div>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
