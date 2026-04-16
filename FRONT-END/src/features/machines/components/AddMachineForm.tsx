import { useFormContext } from "react-hook-form";
import { Button, FormField, Input } from "@/shared/components/ui";
import type { MachinePayload } from "../types/machineComponents";

type AddMachineFormProps = {
  onClose: () => void;
  onOpenMap: () => void;
  onSubmit: (data: MachinePayload) => void;
  isLoading?: boolean;
};

export function AddMachineForm({
  onClose,
  onOpenMap,
  onSubmit,
  isLoading = false,
}: AddMachineFormProps) {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useFormContext<MachinePayload>();

  const location = watch("location");
  const latitude = watch("latitude");
  const longitude = watch("longitude");

  return (
    <>
      <div className="border-b border-gray-200 px-6 py-4">
        <h3 className="text-lg font-bold text-gray-900">
          Register New Machine
        </h3>
        <p className="mt-1 text-sm text-gray-500">
          Add a machine to the asset fleet.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 px-6 py-5">
        <div className="grid grid-cols-1 gap-4">
          <FormField label="Machine Code" htmlFor="code" required>
            <Input
              id="code"
              {...register("code", {
                required: "Machine code is required",
              })}
              hasError={!!errors.code}
              placeholder="CNC-2824-001"
            />
            {errors.code && (
              <p className="mt-1 text-sm text-red-500">{errors.code.message}</p>
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
            <p className="mt-1 text-sm text-red-500">{errors.name.message}</p>
          )}
        </FormField>

        <FormField label="Location" htmlFor="location">
          <div className="space-y-2">
            <Input
              id="location"
              {...register("location")}
              readOnly
              placeholder="Choose from map"
            />

            <input type="hidden" {...register("latitude", { valueAsNumber: true })} />
            <input type="hidden" {...register("longitude", { valueAsNumber: true })} />

            <Button type="button" variant="secondary" onClick={onOpenMap}>
              Pick on map
            </Button>

            {location && (
              <p className="text-sm text-gray-500">
                Selected: {location} ({latitude}, {longitude})
              </p>
            )}
          </div>
        </FormField>

        <div className="flex justify-end gap-3 pt-2">
          <Button type="button" variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" isLoading={isLoading}>
            {isLoading ? "Saving..." : "Register Machine"}
          </Button>
        </div>
      </form>
    </>
  );
}