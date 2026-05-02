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
      <div className="border-b border-slate-100 bg-slate-50/50 px-8 py-6">
        <h3 className="text-xl font-bold text-slate-900">
          Register New Machine
        </h3>
        <p className="mt-1.5 text-sm text-slate-500">
          Fill in the details to add a new machine to your asset fleet.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="px-8 py-8">
        <div className="space-y-6">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <FormField label="Machine Code" htmlFor="code" required>
              <Input
                id="code"
                {...register("code", {
                  required: "Machine code is required",
                })}
                hasError={!!errors.code}
                placeholder="e.g. CNC-2824-001"
                className="rounded-xl shadow-sm focus:border-[#43968C] focus:ring-[#43968C]/20"
              />
              {errors.code && (
                <p className="mt-1.5 text-xs font-medium text-red-500">
                  {errors.code.message}
                </p>
              )}
            </FormField>

            <FormField label="Machine Name" htmlFor="name" required>
              <Input
                id="name"
                {...register("name", {
                  required: "Machine name is required",
                })}
                hasError={!!errors.name}
                placeholder="e.g. Precision Mill Pro V4"
                className="rounded-xl shadow-sm focus:border-[#43968C] focus:ring-[#43968C]/20"
              />
              {errors.name && (
                <p className="mt-1.5 text-xs font-medium text-red-500">
                  {errors.name.message}
                </p>
              )}
            </FormField>
          </div>

          <FormField label="Machine Location" htmlFor="location">
            <div className="space-y-3">
              <div className="flex flex-col gap-3 sm:flex-row">
                <div className="flex-1">
                  <Input
                    id="location"
                    {...register("location")}
                    readOnly
                    placeholder="No location selected"
                    className="w-full cursor-not-allowed rounded-xl bg-slate-50 text-slate-500 shadow-sm"
                  />
                  <input
                    type="hidden"
                    {...register("latitude", { valueAsNumber: true })}
                  />
                  <input
                    type="hidden"
                    {...register("longitude", { valueAsNumber: true })}
                  />
                </div>

                <button
                  type="button"
                  onClick={onOpenMap}
                  className="flex h-11 shrink-0 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-5 text-sm font-semibold text-slate-700 shadow-sm transition-all hover:border-[#43968C]/30 hover:bg-slate-50 hover:text-[#43968C]"
                >
                  <span className="material-symbols-outlined text-[18px]">
                    map
                  </span>
                  Pick on Map
                </button>
              </div>

              {location && (
                <div className="inline-flex items-center gap-2 rounded-lg border border-teal-100 bg-teal-50 px-3 py-2">
                  <span className="material-symbols-outlined text-[16px] text-teal-600">
                    location_on
                  </span>
                  <p className="text-xs font-medium text-teal-700">
                    {latitude?.toFixed(4)}, {longitude?.toFixed(4)}
                  </p>
                </div>
              )}
            </div>
          </FormField>
        </div>

        <div className="mt-10 flex justify-end gap-3 border-t border-slate-100 pt-6">
          <Button
            type="button"
            variant="secondary"
            onClick={onClose}
            className="rounded-xl border-slate-200 bg-white px-6 font-medium text-slate-700 hover:bg-slate-50"
          >
            Cancel
          </Button>
          <Button
            type="submit"
            isLoading={isLoading}
            className="rounded-xl bg-[#43968C] px-8 font-semibold text-white hover:bg-[#367971]"
          >
            {isLoading ? "Saving..." : "Register Machine"}
          </Button>
        </div>
      </form>
    </>
  );
}