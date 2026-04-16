import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Button, FormField, Input } from "@/shared/components/ui";
import { cn } from "@/shared/utils/cn";
import type {
  EditMachineModalProps,
  MachinePayload,
} from "../types/machineComponents";

export function EditMachineModal({
  machine,
  onClose,
  onSubmit,
  isLoading = false,
}: EditMachineModalProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<MachinePayload>({
    defaultValues: {
      code: "",
      name: "",
      category: "",
      last_service: "",
      status: "operational",
    },
  });

  useEffect(() => {
    if (!machine) return;

    reset({
      asset_id: machine.asset_id ?? "",
      name: machine.name ?? "",
      category: machine.category ?? "",
      last_service: machine.last_service ?? "",
      status: machine.status ?? "operational",
    });
  }, [machine, reset]);

  if (!machine) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="w-full max-w-lg rounded-xl bg-white shadow-xl">
        <div className="border-b border-gray-200 px-6 py-4">
          <h3 className="text-lg font-bold text-gray-900">Edit Machine</h3>
          <p className="mt-1 text-sm text-gray-500">
            Update asset details and status.
          </p>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-4 px-6 py-5"
        >
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <FormField label="Asset ID" htmlFor="edit_asset_id" required>
              <Input
                id="edit_asset_id"
                {...register("asset_id", {
                  required: "Asset ID is required",
                })}
                hasError={!!errors.asset_id}
              />
              {errors.asset_id && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.asset_id.message}
                </p>
              )}
            </FormField>

            <FormField
              label="Last service"
              htmlFor="edit_last_service"
              required
            >
              <Input
                id="edit_last_service"
                type="date"
                {...register("last_service", {
                  required: "Last service date is required",
                })}
                hasError={!!errors.last_service}
              />
              {errors.last_service && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.last_service.message}
                </p>
              )}
            </FormField>
          </div>

          <FormField label="Machine name" htmlFor="edit_name" required>
            <Input
              id="edit_name"
              {...register("name", {
                required: "Machine name is required",
              })}
              hasError={!!errors.name}
            />
            {errors.name && (
              <p className="mt-1 text-sm text-red-500">
                {errors.name.message}
              </p>
            )}
          </FormField>

          <FormField label="Category/Type" htmlFor="edit_category" required>
            <Input
              id="edit_category"
              {...register("category", {
                required: "Category is required",
              })}
              hasError={!!errors.category}
            />
            {errors.category && (
              <p className="mt-1 text-sm text-red-500">
                {errors.category.message}
              </p>
            )}
          </FormField>

          <FormField label="Status" htmlFor="edit_status" required>
            <select
              id="edit_status"
              {...register("status", {
                required: "Status is required",
              })}
              className={cn(
                "w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm text-text-main outline-none transition-colors",
                "focus:ring-2 focus:ring-primary/20",
                !!errors.status && "border-red-500 focus:border-red-500"
              )}
            >
              <option value="operational">Operational</option>
              <option value="maintenance">Maintenance</option>
              <option value="offline">Offline</option>
            </select>
            {errors.status && (
              <p className="mt-1 text-sm text-red-500">
                {errors.status.message}
              </p>
            )}
          </FormField>

          <div className="flex justify-end gap-3 pt-2">
            <Button type="button" variant="secondary" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" isLoading={isLoading}>
              {isLoading ? "Saving..." : "Save Changes"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
