import type { Machine, MachinePayload } from "@/features/machines";
import { AddMachineForm } from "@/features/machines/components/AddMachineForm";
import { PickLocationStep } from "@/features/machines/components/PickLocationStep";
import { useCreateMachine } from "@/features/machines/hooks/useCreateMachine";
import { useState } from "react";
import { useForm, FormProvider } from "react-hook-form";


const defaultValues: MachinePayload = {
  code: "",
  name: "",
  location: "",
  latitude: 0,
  longitude: 0,
};

type Step = "form" | "map";


export function AddMachineFlow({
  isOpen,
  onClose,
  onCreated,
  isLoading = false,
}: {
  isOpen: boolean;
  onClose: () => void;
  onCreated?: (machine: Machine) => void;
  isLoading?: boolean;
}) {

  const methods = useForm<MachinePayload>({ defaultValues });
  const [step, setStep] = useState<Step>("form");
  const { createMachineCall } = useCreateMachine();

  function handleClose() {
    methods.reset(defaultValues);
    setStep("form");
    onClose();
  }

  function goToMap() {
    setStep("map");
  }

  function handleLocationSelected(payload: {
    location: string;
    latitude: number;
    longitude: number;
  }) {
    methods.setValue("location", payload.location, { shouldValidate: true });
    methods.setValue("latitude", payload.latitude, { shouldValidate: true });
    methods.setValue("longitude", payload.longitude, { shouldValidate: true });
    
    setStep("form");
  }

  async function submitForm(data: MachinePayload) {
    const response = await createMachineCall(data);

    if (response?.data) {
      onCreated?.(response.data);
      handleClose();
    }
  }

  if (!isOpen) return null;

  return (
    <FormProvider {...methods}>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
        <div className="w-full max-w-lg rounded-xl bg-white shadow-xl">
          {step === "form" ? (
            <AddMachineForm
              onClose={handleClose}
              onOpenMap={goToMap}
              onSubmit={submitForm}
              isLoading={isLoading}
            />
          ) : (
            <PickLocationStep
              onBack={() => setStep("form")}
              onSelectLocation={handleLocationSelected}
            />
          )}
        </div>
      </div>
    </FormProvider>
  );
}
