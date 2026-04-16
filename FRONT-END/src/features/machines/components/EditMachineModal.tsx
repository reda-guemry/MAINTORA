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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="w-full max-w-lg rounded-2xl bg-white shadow-xl">
        <div className="border-b border-gray-200 px-6 py-4">
          <h3 className="text-lg font-bold text-gray-900">Edit Machine</h3>
          <p className="mt-1 text-sm text-gray-500">
            Update machine details.
          </p>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-4 px-6 py-5"
        >
          <div className="grid grid-cols-1 gap-4">
            <FormField label="Machine Code" htmlFor="edit_code">
              <Input
                id="edit_code"
                {...register("code", {
                  required: "Machine code is required",
                })}
                disabled
                hasError={!!errors.code}
              />
              {errors.code && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.code.message}
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

          <FormField label="Location" htmlFor="edit_location">
            <Input
              id="edit_location"
              {...register("location")}
              readOnly
              placeholder="Location selected from map"
            />
            <input
              type="hidden"
              {...register("latitude", { valueAsNumber: true })}
            />
            <input
              type="hidden"
              {...register("longitude", { valueAsNumber: true })}
            />

            {location && (
              <p className="mt-1 text-sm text-gray-500">
                Selected: {location} ({latitude}, {longitude})
              </p>
            )}
          </FormField>

          <div className="flex items-center justify-between pt-2">
            <Button
              type="button"
              variant="secondary"
              onClick={onChangeLocation}
            >
              Edit Location
            </Button>

            <div className="flex gap-3">
              <Button type="button" variant="secondary" onClick={onClose}>
                Cancel
              </Button>
              <Button type="submit" isLoading={isLoading}>
                {isLoading ? "Saving..." : "Save Changes"}
              </Button>
            </div>
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