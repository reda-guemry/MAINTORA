import { Button } from "@/shared/components/ui";
import type { DeleteChecklistTemplateDialogProps } from "../types/checklistTemplateComponents";

export function DeleteChecklistTemplateDialog({
  template,
  onClose,
  onConfirm,
}: DeleteChecklistTemplateDialogProps) {
  if (!template) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#2d2d2d]/45 p-4">
      <div className="w-full max-w-md rounded-3xl border border-[#ddd5c8] bg-[#fcfaf7] shadow-[0_30px_80px_rgba(0,0,0,0.22)]">
        <div className="px-6 py-5">
          <h3 className="text-lg font-bold text-[#2d241c]">
            Delete Template
          </h3>
          <p className="mt-2 text-sm leading-6 text-[#6f6254]">
            Are you sure you want to delete{" "}
            <span className="font-semibold text-[#2d241c]">{template.name}</span>
            ? This action cannot be undone.
          </p>
        </div>

        <div className="flex justify-end gap-3 border-t border-[#ece6dc] px-6 py-4">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="danger" onClick={onConfirm}>
            Delete
          </Button>
        </div>
      </div>
    </div>
  );
}
