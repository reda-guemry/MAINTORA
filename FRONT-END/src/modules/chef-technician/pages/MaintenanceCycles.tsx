import { useEffect, useMemo, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
  MaintenanceCycleForm,
  MaintenanceCycleSidebar,
  getMaintenanceCycleStats,
  hasActiveMaintenancePlan,
  useCreateMaintenancePlan,
  useEditMaintenancePlan,
  type CreateMaintenancePlanPayload,
  type UpdateMaintenancePlanPayload,
} from "@/features/maintenance-plan";
import { useMachines } from "@/features/roundes/hooks/useMachines";
import { useTechnicians } from "@/features/roundes/hooks/useTechnisian";
import { Alert } from "@/shared/components/feedback";
import { Button, Spinner } from "@/shared/components/ui";

export function MaintenanceCyclesPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [isSaving, setIsSaving] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [submitGuardError, setSubmitGuardError] = useState<string | null>(null);
  const {
    machines,
    isLoading: isLoadingMachines,
    error: machinesError,
    fetchMachines,
    addMaintenancePlanToMachine,
    updateMaintenancePlanInMachine,
  } = useMachines();

  const {
    technicians,
    isLoading: isLoadingTechnicians,
    error: techniciansError,
    fetchTechnicians,
  } = useTechnicians();

  const { createMaintenancePlanCall, error: createMaintenancePlanError } =
    useCreateMaintenancePlan();
  const { editMaintenancePlanCall, error: editMaintenancePlanError } =
    useEditMaintenancePlan();

  useEffect(() => {
    fetchMachines();
    fetchTechnicians();
  }, []);

  const stats = () => {
    return getMaintenanceCycleStats(machines);
  };

  const mode = searchParams.get("mode") === "edit" ? "edit" : "create";

  function parsePositiveInteger(value: string | null) {
    if (!value) {
      return null;
    }

    const parsedValue = Number(value);

    return Number.isInteger(parsedValue) && parsedValue > 0 ? parsedValue : null;
  }

  function normalizeDateInputValue(date: string) {
    return date.slice(0, 10);
  }

  const requestedMachineId = parsePositiveInteger(searchParams.get("machineId"));
  const requestedPlanId = parsePositiveInteger(searchParams.get("planId"));

  const editContext = useMemo(() => {
    if (mode !== "edit" || !requestedPlanId) {
      return null;
    }

    for (const machine of machines) {
      const maintenancePlan = (machine.maintenance_plans ?? []).find((plan) => {
        return plan.id === requestedPlanId;
      });

      if (maintenancePlan) {
        return {
          machine,
          maintenancePlan,
        };
      }
    }

    return null;
  }, [machines, mode, requestedPlanId]);

  const requestedMachine = useMemo(() => {
    if (!requestedMachineId) {
      return null;
    }

    return (
      machines.find((machine) => machine.id === requestedMachineId) ?? null
    );
  }, [machines, requestedMachineId]);

  const requestedMachineHasActivePlan = requestedMachine
    ? hasActiveMaintenancePlan(requestedMachine)
    : false;
  const initialMachineId =
    mode === "create" && requestedMachine && !requestedMachineHasActivePlan
      ? requestedMachine.id
      : null;
  const selectableMachines = useMemo(() => {
    if (mode === "edit") {
      return editContext ? [editContext.machine] : [];
    }

    return machines.filter((machine) => !hasActiveMaintenancePlan(machine));
  }, [editContext, machines, mode]);
  const formInitialValues =
    mode === "edit" && editContext
      ? {
          assigned_to: editContext.maintenancePlan.assigned_to.id,
          checklist_template_id: editContext.maintenancePlan.checklist_template_id.id,
          machine_id: editContext.machine.id,
          repeat_every: editContext.maintenancePlan.repeat_every,
          repeat_unit: editContext.maintenancePlan.repeat_unit,
          start_date: normalizeDateInputValue(editContext.maintenancePlan.start_date),
          status: editContext.maintenancePlan.status,
        }
      : {
          machine_id: initialMachineId ?? 0,
        };
  const formInitialTemplate =
    mode === "edit" && editContext
      ? editContext.maintenancePlan.checklist_template_id
      : null;
  const mutationError =
    mode === "edit" ? editMaintenancePlanError : createMaintenancePlanError;
  const isInvalidEditRequest =
    mode === "edit" && (!requestedPlanId || editContext === null);

  async function handleCycleSubmit(
    payload: CreateMaintenancePlanPayload | UpdateMaintenancePlanPayload,
  ) {
    if (mode === "edit") {
      if (!editContext) {
        setSubmitGuardError("The selected maintenance plan could not be found.");
        return;
      }

      setIsSaving(true);
      setSuccessMessage(null);
      setSubmitGuardError(null);

      try {
        const response = await editMaintenancePlanCall(
          editContext.maintenancePlan.id,
          payload as UpdateMaintenancePlanPayload,
        );

        if (response?.data) {
          updateMaintenancePlanInMachine(editContext.machine.id, response.data);
          setSuccessMessage("Maintenance cycle updated successfully.");
        }
      } finally {
        setIsSaving(false);
      }

      return;
    }

    const createPayload = payload as CreateMaintenancePlanPayload;
    const selectedMachine = machines.find((machine) => {
      return machine.id === createPayload.machine_id;
    });

    if (selectedMachine && hasActiveMaintenancePlan(selectedMachine)) {
      setSubmitGuardError(
        "This machine already has an active maintenance plan. Choose another machine before activating a cycle.",
      );
      return;
    }

    setIsSaving(true);
    setSuccessMessage(null);
    setSubmitGuardError(null);

    try {
      const response = await createMaintenancePlanCall(createPayload);

      if (response?.data) {
        addMaintenancePlanToMachine(createPayload.machine_id, response.data);
        setSuccessMessage("Maintenance cycle activated successfully.");
      }
    } finally {
      setIsSaving(false);
    }
  }

  const isLoading = isLoadingMachines || isLoadingTechnicians;
  const loadingError = machinesError ?? techniciansError;
  const pageTitle =
    mode === "edit" ? "Edit Maintenance Cycle" : "Manage Maintenance Cycles";
  const pageDescription =
    mode === "edit"
      ? "Adjust the technician, checklist, status, and schedule for an existing preventive cycle."
      : "Configure automated preventive schedules to minimize downtime and ensure asset longevity.";
  const formTitle =
    mode === "edit" ? "Edit Maintenance Cycle" : "Automation Configuration";
  const submitLabel = mode === "edit" ? "Update Cycle" : "Activate Cycle";

  return (
    <div className="min-h-[calc(100vh-8rem)] text-[#172033]">
      <header className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <h1 className="text-3xl font-black tracking-tight text-[#172033] md:text-4xl">
            {pageTitle}
          </h1>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-[#53657a] md:text-base">
            {pageDescription}
          </p>
        </div>

        <Button
          type="button"
          variant="secondary"
          onClick={() => navigate("/chef-technician/mape")}
          className="w-fit rounded-xl"
        >
          <div className="flex gap-2 items-center">

          <span className="material-symbols-outlined text-[18px]">map</span>
          <span>Back to Map</span>
          </div>
        </Button>
      </header>

      {isLoading ? (
        <div className="flex min-h-80 flex-col items-center justify-center rounded-xl border border-[#dfe8e6] bg-white">
          <Spinner />
          <p className="mt-4 text-[11px] font-black uppercase tracking-[0.24em] text-[#388E8E]">
            Loading automation workspace
          </p>
        </div>
      ) : loadingError ? (
        <Alert variant="error" title="Automation workspace unavailable">
          {loadingError}
        </Alert>
      ) : (
        <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_380px]">
          <div className="space-y-4">
            {successMessage && (
              <Alert
                variant="success"
                title={mode === "edit" ? "Cycle updated" : "Cycle activated"}
              >
                {successMessage}
              </Alert>
            )}

            {mode === "create" && requestedMachine && !requestedMachineHasActivePlan && (
              <div className="flex flex-wrap items-center gap-3 rounded-xl border border-[#d5eee9] bg-[#edf8f7] px-4 py-3 text-sm text-[#315f5b]">
                <span className="material-symbols-outlined text-[20px] text-[#388E8E]">
                  precision_manufacturing
                </span>
                <span className="font-semibold">
                  Creating plan for:{" "}
                  <span className="font-black">
                    {requestedMachine.code} - {requestedMachine.name}
                  </span>
                </span>
              </div>
            )}

            {mode === "edit" && editContext && (
              <div className="flex flex-wrap items-center gap-3 rounded-xl border border-[#d5eee9] bg-[#edf8f7] px-4 py-3 text-sm text-[#315f5b]">
                <span className="material-symbols-outlined text-[20px] text-[#388E8E]">
                  edit_calendar
                </span>
                <span className="font-semibold">
                  Editing plan:{" "}
                  <span className="font-black">
                    {editContext.maintenancePlan.checklist_template_id.name} for{" "}
                    {editContext.machine.name}
                  </span>
                </span>
              </div>
            )}

            {mode === "edit" && isInvalidEditRequest && (
              <Alert variant="error" title="Maintenance cycle not found">
                The requested maintenance plan does not exist or is not available
                from the current machines data.
              </Alert>
            )}

            {mode === "create" && requestedMachineHasActivePlan && requestedMachine && (
              <Alert variant="warning" title="Active cycle already exists">
                {requestedMachine.code} - {requestedMachine.name} already has an
                active maintenance plan. Choose another machine to activate a
                new cycle.
              </Alert>
            )}

            {submitGuardError && (
              <Alert variant="error" title="Cycle creation blocked">
                {submitGuardError}
              </Alert>
            )}

            {mode === "create" && machines.length > 0 && selectableMachines.length === 0 && (
              <Alert variant="warning" title="All machines are automated">
                Every machine already has an active maintenance cycle. Only
                machines without an active plan can receive a new cycle.
              </Alert>
            )}

            {!isInvalidEditRequest && (
              <MaintenanceCycleForm
                key={`${mode}-${requestedPlanId ?? initialMachineId ?? "new"}`}
                disableMachineSelect={mode === "edit"}
                initialTemplate={formInitialTemplate}
                initialValues={formInitialValues}
                machines={selectableMachines}
                mode={mode}
                technicians={technicians}
                onSubmit={handleCycleSubmit}
                isLoading={isSaving}
                error={mutationError}
                submitLabel={submitLabel}
                title={formTitle}
              />
            )}
          </div>

          <MaintenanceCycleSidebar stats={stats()} />
        </div>
      )}
    </div>
  );
}
