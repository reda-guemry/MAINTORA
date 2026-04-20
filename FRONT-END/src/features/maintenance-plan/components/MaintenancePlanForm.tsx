import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Button, FormField, Input } from "@/shared/components/ui";
import type {
  CreateMaintenancePlanPayload,
  MaintenancePlanFormProps,
  MaintenancePlanFormValues,
  UpdateMaintenancePlanPayload,
} from "../types/maintenancePlan";

export function MaintenancePlanForm({
  ...props
}: MaintenancePlanFormProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<MaintenancePlanFormValues>({
    defaultValues: props.defaultValues,
  });

  useEffect(() => {
    reset(props.defaultValues);
  }, [props.defaultValues, reset]);

  const isSubmitDisabled =
    props.technicians.length === 0 || props.templates.length === 0;

  function handleFormSubmit(values: MaintenancePlanFormValues) {
    if (props.machineId !== undefined) {
      const payload: CreateMaintenancePlanPayload = {
        machine_id: props.machineId,
        checklist_template_id: values.checklist_template_id,
        assigned_to: values.assigned_to,
        repeat_every: values.repeat_every,
        repeat_unit: values.repeat_unit,
        start_date: values.start_date,
      };

      props.onSubmit(payload);
      return;
    }

    const payload: UpdateMaintenancePlanPayload = values;
    props.onSubmit(payload);
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#2d2d2d]/45 p-4">
      <div className="w-full max-w-2xl rounded-3xl border border-[#ddd5c8] bg-[#fcfaf7] shadow-[0_30px_80px_rgba(0,0,0,0.22)]">
        <div className="border-b border-[#ece6dc] px-6 py-5">
          <h3 className="text-lg font-bold text-[#2d241c]">{props.title}</h3>
          <p className="mt-1 text-sm text-[#6f6254]">{props.description}</p>
        </div>

        <form
          onSubmit={handleSubmit(handleFormSubmit)}
          className="space-y-5 px-6 py-5"
        >
          <div className="grid gap-4 md:grid-cols-2">
            <FormField
              label="Checklist template"
              htmlFor="maintenance_plan_template"
              required
              error={errors.checklist_template_id?.message}
            >
              <select
                id="maintenance_plan_template"
                {...register("checklist_template_id", {
                  required: "Checklist template is required",
                  setValueAs: (value) => Number(value),
                  validate: (value) =>
                    value > 0 || "Checklist template is required",
                })}
                className="w-full rounded-lg border border-[#ddd5c8] bg-white px-4 py-3 text-sm text-[#2d241c] outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/20"
              >
                <option value={0}>Select a checklist template</option>
                {props.templates.map((template) => (
                  <option key={template.id} value={template.id}>
                    {template.name}
                  </option>
                ))}
              </select>
            </FormField>

            <FormField
              label="Assigned technician"
              htmlFor="maintenance_plan_assigned_to"
              required
              error={errors.assigned_to?.message}
            >
              <select
                id="maintenance_plan_assigned_to"
                {...register("assigned_to", {
                  required: "Assigned technician is required",
                  setValueAs: (value) => Number(value),
                  validate: (value) =>
                    value > 0 || "Assigned technician is required",
                })}
                className="w-full rounded-lg border border-[#ddd5c8] bg-white px-4 py-3 text-sm text-[#2d241c] outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/20"
              >
                <option value={0}>Select a technician</option>
                {props.technicians.map((technician) => (
                  <option key={technician.id} value={technician.id}>
                    {technician.first_name} {technician.last_name}
                  </option>
                ))}
              </select>
            </FormField>

            <FormField
              label="Repeat every"
              htmlFor="maintenance_plan_repeat_every"
              required
              error={errors.repeat_every?.message}
            >
              <Input
                id="maintenance_plan_repeat_every"
                type="number"
                min={1}
                {...register("repeat_every", {
                  required: "Repeat frequency is required",
                  valueAsNumber: true,
                  min: {
                    value: 1,
                    message: "Repeat frequency must be at least 1",
                  },
                })}
                hasError={!!errors.repeat_every}
              />
            </FormField>

            <FormField
              label="Repeat unit"
              htmlFor="maintenance_plan_repeat_unit"
              required
              error={errors.repeat_unit?.message}
            >
              <select
                id="maintenance_plan_repeat_unit"
                {...register("repeat_unit", {
                  required: "Repeat unit is required",
                })}
                className="w-full rounded-lg border border-[#ddd5c8] bg-white px-4 py-3 text-sm text-[#2d241c] outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/20"
              >
                <option value="day">Day</option>
                <option value="week">Week</option>
                <option value="month">Month</option>
              </select>
            </FormField>

            <FormField
              label="Start date"
              htmlFor="maintenance_plan_start_date"
              required
              error={errors.start_date?.message}
            >
              <Input
                id="maintenance_plan_start_date"
                type="date"
                {...register("start_date", {
                  required: "Start date is required",
                })}
                hasError={!!errors.start_date}
              />
            </FormField>

            {props.includeStatus && (
              <FormField
                label="Plan status"
                htmlFor="maintenance_plan_status"
                required
                error={errors.status?.message}
              >
                <select
                  id="maintenance_plan_status"
                  {...register("status", {
                    required: "Plan status is required",
                  })}
                  className="w-full rounded-lg border border-[#ddd5c8] bg-white px-4 py-3 text-sm text-[#2d241c] outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/20"
                >
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </FormField>
            )}
          </div>

          {(props.error || isSubmitDisabled) && (
            <div className="rounded-2xl border border-[#ecd6d6] bg-[#fff5f5] px-4 py-3 text-sm text-[#8a4f4f]">
              {props.error ??
                "You need at least one checklist template and one technician before creating a maintenance plan."}
            </div>
          )}

          <div className="flex justify-end gap-3 pt-2">
            <Button type="button" variant="secondary" onClick={props.onClose}>
              Cancel
            </Button>
            <Button
              type="submit"
              isLoading={props.isLoading}
              disabled={isSubmitDisabled}
            >
              {props.isLoading ? "Saving..." : props.submitLabel}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
