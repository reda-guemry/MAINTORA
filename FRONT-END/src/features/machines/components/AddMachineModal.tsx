import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Button, FormField, Input } from "@/shared/components/ui";
import { cn } from "@/shared/utils/cn";
import type {
  AddMachineModalProps,
  MachinePayload,
} from "../types/machineComponents";

const defaultValues: MachinePayload = {
  asset_id: "",
  name: "",
  category: "",
  last_service: "",
  status: "operational",
};

export function AddMachineModal({
  isOpen,
  onClose,
  onSubmit,
  isLoading = false,
}: AddMachineModalProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<MachinePayload>({ defaultValues });

  useEffect(() => {
    if (!isOpen) {
      reset(defaultValues);
    }
  }, [isOpen, reset]);

  if (!isOpen) {
    return null;
  }

  function handleClose() {
    reset(defaultValues);
    onClose();
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="w-full max-w-lg rounded-xl bg-white shadow-xl">
        <div className="border-b border-gray-200 px-6 py-4">
          <h3 className="text-lg font-bold text-gray-900">
            Register New Machine
          </h3>
          <p className="mt-1 text-sm text-gray-500">
            Add a machine to the asset fleet.
          </p>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-4 px-6 py-5"
        >
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <FormField label="Asset ID" htmlFor="asset_id" required>
              <Input
                id="asset_id"
                {...register("asset_id", {
                  required: "Asset ID is required",
                })}
                hasError={!!errors.asset_id}
                placeholder="CNC-2824-001"
              />
              {errors.asset_id && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.asset_id.message}
                </p>
              )}
            </FormField>

            <FormField label="Last service" htmlFor="last_service" required>
              <Input
                id="last_service"
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

          <FormField label="Machine name" htmlFor="name" required>
            <Input
              id="name"
              {...register("name", {
                required: "Machine name is required",
              })}
              hasError={!!errors.name}
              placeholder="Precision Mill Pro V4"
            />
            {errors.name && (
              <p className="mt-1 text-sm text-red-500">
                {errors.name.message}
              </p>
            )}
          </FormField>

          <FormField label="Category/Type" htmlFor="category" required>
            <Input
              id="category"
              {...register("category", {
                required: "Category is required",
              })}
              hasError={!!errors.category}
              placeholder="CNC Milling Machine"
            />
            {errors.category && (
              <p className="mt-1 text-sm text-red-500">
                {errors.category.message}
              </p>
            )}
          </FormField>

          <FormField label="Status" htmlFor="status" required>
            <select
              id="status"
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
            <Button type="button" variant="secondary" onClick={handleClose}>
              Cancel
            </Button>
            <Button type="submit" isLoading={isLoading}>
              {isLoading ? "Saving..." : "Register Machine"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
