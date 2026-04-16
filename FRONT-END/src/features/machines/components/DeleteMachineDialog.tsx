import { Button } from "@/shared/components/ui";
import type { DeleteMachineDialogProps } from "../types/machineComponents";

export function DeleteMachineDialog({
  machine,
  onClose,
  onConfirm,
}: DeleteMachineDialogProps) {
  if (!machine) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="w-full max-w-md rounded-xl bg-white shadow-xl">
        <div className="px-6 py-5">
          <h3 className="text-lg font-bold text-gray-900">Delete Machine</h3>
          <p className="mt-2 text-sm text-gray-600">
            Are you sure you want to delete{" "}
            <span className="font-semibold text-gray-900">{machine.name}</span>{" "}
            ({machine.code})?
          </p>
        </div>

        <div className="flex justify-end gap-3 border-t border-gray-200 px-6 py-4">
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
