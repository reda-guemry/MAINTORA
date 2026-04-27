import { useEffect, useState } from "react";
import { Button } from "@/shared/components/ui";
import type { ClientRepairRequest } from "../types/repairRequest";

type UploadPurchaseOrderModalProps = {
  repairRequest: ClientRepairRequest | null;
  isOpen: boolean;
  isUploading: boolean;
  error: string | null;
  onClose: () => void;
  onSubmit: (file: File) => Promise<void>;
};

export function UploadPurchaseOrderModal({
  repairRequest,
  isOpen,
  isUploading,
  error,
  onClose,
  onSubmit,
}: UploadPurchaseOrderModalProps) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [formError, setFormError] = useState<string | null>(null);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    setSelectedFile(null);
    setFormError(null);
  }, [isOpen]);

  if (!isOpen || !repairRequest) {
    return null;
  }

  async function handleSubmit() {
    if (!selectedFile) {
      setFormError("Please choose a purchase order file first.");
      return;
    }

    setFormError(null);
    await onSubmit(selectedFile);
  }

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-[#2d2d2d]/45 p-4">
      <div className="w-full max-w-2xl rounded-[30px] border border-[#ddd5c8] bg-[#fcfaf7] shadow-[0_30px_80px_rgba(0,0,0,0.22)]">
        <div className="border-b border-[#ece6dc] px-6 py-5">
          <h3 className="text-xl font-black tracking-tight text-[#2d241c]">
            Upload Purchase Order
          </h3>
          <p className="mt-1 text-sm text-[#6f6254]">
            Send the purchase order for <strong>{repairRequest.machine.name}</strong>.
          </p>
        </div>

        <div className="space-y-4 px-6 py-5">
          <div className="rounded-2xl border border-[#ece6dc] bg-white px-4 py-4">
            <p className="text-[10px] font-black uppercase tracking-[0.18em] text-[#988a79]">
              Accepted files
            </p>
            <p className="mt-2 text-sm text-[#2d241c]">
              PDF, JPG, JPEG, or PNG up to 5 MB.
            </p>
          </div>

          <label className="flex cursor-pointer flex-col items-center justify-center rounded-[24px] border border-dashed border-[#cfc4b6] bg-white px-6 py-10 text-center">
            <span className="material-symbols-outlined text-[30px] text-[#398e8e]">
              upload_file
            </span>
            <span className="mt-3 text-sm font-bold text-[#2d241c]">
              {selectedFile ? selectedFile.name : "Choose purchase order file"}
            </span>
            <span className="mt-1 text-xs text-[#7f7468]">
              Click here to browse your file.
            </span>
            <input
              type="file"
              accept=".pdf,.jpg,.jpeg,.png"
              className="hidden"
              onChange={(event) =>
                setSelectedFile(event.target.files?.[0] ?? null)
              }
            />
          </label>

          {(formError || error) && (
            <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
              {formError ?? error}
            </div>
          )}

          <div className="flex flex-col-reverse gap-3 pt-2 sm:flex-row sm:justify-end">
            <Button variant="secondary" onClick={onClose} disabled={isUploading}>
              Cancel
            </Button>
            <Button onClick={handleSubmit} isLoading={isUploading}>
              <span className="material-symbols-outlined text-[18px]">
                upload
              </span>
              Send Purchase Order
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
