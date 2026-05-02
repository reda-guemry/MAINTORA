import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Button, FormField, Input } from "@/shared/components/ui";
import type {
  EditMachineModalProps,
  MachinePayload,
} from "../types/machineComponents";
import { LocationModal } from "./LocationModal";

export function EditMachineModal({
  machine,
  onClose,
  onSubmit,
  isLoading = false,
}: EditMachineModalProps) {
  const [changeLocation, setChangeLocation] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm<MachinePayload>({
    defaultValues: {
      code: "",
      name: "",
      location: "",
      latitude: 0,
      longitude: 0,
    },
  });

  useEffect(() => {
    if (!machine) return;

    reset({
      code: machine.code ?? "",
      name: machine.name ?? "",
      location: machine.location ?? "",
      latitude: machine.latitude ?? 0,
      longitude: machine.longitude ?? 0,
    });
  }, [machine, reset]);

  const location = watch("location");
  const latitude = watch("latitude");
  const longitude = watch("longitude");

  function onChangeLocation() {
    setChangeLocation(true);
  }

  if (!machine) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 p-4 backdrop-blur-sm transition-all sm:p-6">
      <div className="w-full max-w-4xl overflow-hidden rounded-[24px] bg-white shadow-2xl">
        <div className="border-b border-slate-100 bg-slate-50/50 px-8 py-6">
          <h3 className="text-xl font-bold text-slate-900">Edit Machine</h3>
          <p className="mt-1.5 text-sm text-slate-500">
            Update the details of the selected machine.
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="px-8 py-8">
          <div className="space-y-6">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <FormField label="Machine Code" htmlFor="edit_code">
                <Input
                  id="edit_code"
                  {...register("code", {
                    required: "Machine code is required",
                  })}
                  disabled
                  hasError={!!errors.code}
                  className="cursor-not-allowed rounded-xl bg-slate-50 text-slate-500 shadow-sm"
                />
                {errors.code && (
                  <p className="mt-1.5 text-xs font-medium text-red-500">
                    {errors.code.message}
                  </p>
                )}
              </FormField>

              <FormField label="Machine Name" htmlFor="edit_name" required>
                <Input
                  id="edit_name"
                  {...register("name", {
                    required: "Machine name is required",
                  })}
                  hasError={!!errors.name}
                  className="rounded-xl shadow-sm focus:border-[#43968C] focus:ring-[#43968C]/20"
                />
                {errors.name && (
                  <p className="mt-1.5 text-xs font-medium text-red-500">
                    {errors.name.message}
                  </p>
                )}
              </FormField>
            </div>

            <FormField label="Machine Location" htmlFor="edit_location">
              <div className="space-y-3">
                <div className="flex flex-col gap-3 sm:flex-row">
                  <div className="flex-1">
                    <Input
                      id="edit_location"
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
                    onClick={onChangeLocation}
                    className="flex h-11 shrink-0 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-5 text-sm font-semibold text-slate-700 shadow-sm transition-all hover:border-[#43968C]/30 hover:bg-slate-50 hover:text-[#43968C]"
                  >
                    <span className="material-symbols-outlined text-[18px]">
                    map
                  </span>
                    Edit Location
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
              {isLoading ? "Saving..." : "Save Changes"}
            </Button>
          </div>
        </form>
      </div>

      {changeLocation && (
        <LocationModal
          location={location}
          latitude={latitude}
          longitude={longitude}
          onSave={(newLocation, newLatitude, newLongitude) => {
            setChangeLocation(false);
            reset({
              ...watch(),
              location: newLocation,
              latitude: newLatitude,
              longitude: newLongitude,
            });
          }}
          onBack={() => setChangeLocation(false)}
        />
      )}
    </div>
  );
}