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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/35 p-4">
      <div className="w-full max-w-md rounded-[24px] bg-white shadow-[0_30px_80px_rgba(15,23,42,0.2)]">
        <div className="px-6 py-5">
          <h3 className="text-lg font-bold text-slate-900">
            Delete Template
          </h3>
          <p className="mt-2 text-sm leading-6 text-slate-600">
            Are you sure you want to delete{" "}
            <span className="font-semibold text-slate-900">{template.name}</span>
            ? This action cannot be undone.
          </p>
        </div>

        <div className="flex justify-end gap-3 border-t border-slate-100 px-6 py-4">
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
