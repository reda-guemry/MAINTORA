import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Button, FormField, Input } from "@/shared/components/ui";
import type {
  CreateMaintenancePlanPayload,
  MaintenancePlanChecklistTemplate,
  MaintenancePlanFormProps,
  MaintenancePlanFormValues,
  UpdateMaintenancePlanPayload,
} from "../types/maintenancePlan";
import { useSearchChecklistTemplates } from "../hooks/useSearchChecklistTemplates";

export function MaintenancePlanForm({ ...props }: MaintenancePlanFormProps) {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<MaintenancePlanFormValues>({
    defaultValues: props.defaultValues,
  });

  const [templateSearch, setTemplateSearch] = useState("");
  const [searchResults, setSearchResults] = useState<
    MaintenancePlanChecklistTemplate[]
  >([]);
  const [selectedTemplate, setSelectedTemplate] =
    useState<MaintenancePlanChecklistTemplate | null>(null);
  const [isSearching, setIsSearching] = useState(false);
  const { searchChecklistTemplatesCall, error: templateSearchError } =
    useSearchChecklistTemplates();

  useEffect(() => {
    reset(props.defaultValues);

    const currentTemplate =
      props.templates.find(
        (template) => template.id === props.defaultValues.checklist_template_id,
      ) ?? null;

    setSelectedTemplate(currentTemplate);
    setTemplateSearch("");
    setSearchResults([]);
  }, [props.defaultValues, props.templates, reset]);

  useEffect(() => {
    const normalizedSearch = templateSearch.trim();

    if (!normalizedSearch) {
      setSearchResults([]);
      setIsSearching(false);
      return;
    }

    const timeoutId = window.setTimeout(async () => {
      setIsSearching(true);

      const templates = await searchChecklistTemplatesCall(normalizedSearch);
      setSearchResults(templates);
      setIsSearching(false);
    }, 250);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [searchChecklistTemplatesCall, templateSearch]);

  const availableSearchResults = searchResults.filter(
    (template) => template.id !== selectedTemplate?.id,
  );
  const isSubmitDisabled =
    props.technicians.length === 0 || selectedTemplate === null;

  function handleSelectTemplate(template: MaintenancePlanChecklistTemplate) {
    setSelectedTemplate(template);
    setValue("checklist_template_id", template.id, {
      shouldDirty: true,
      shouldValidate: true,
    });
    setTemplateSearch("");
    setSearchResults([]);
  }

  function handleClearTemplateSelection() {
    setSelectedTemplate(null);
    setValue("checklist_template_id", 0, {
      shouldDirty: true,
      shouldValidate: true,
    });
  }

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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#2d241c]/40 p-4 backdrop-blur-sm transition-opacity">
      <div className="w-full max-w-170 overflow-hidden rounded-4xl border border-[#e6dbcd] bg-[#fcfaf7] shadow-[0_24px_60px_rgba(62,52,39,0.2)]">
        {/* Header */}
        <div className="border-b border-[#ece3d7] bg-white/50 px-6 py-5 sm:px-8">
          <h3 className="text-xl font-black text-[#2d241c]">{props.title}</h3>
          <p className="mt-1.5 text-sm text-[#6f6254]">{props.description}</p>
        </div>

        <form
          onSubmit={handleSubmit(handleFormSubmit)}
          className="px-6 py-6 sm:px-8 sm:py-7"
        >
          <input
            type="hidden"
            {...register("checklist_template_id", {
              required: "Checklist template is required",
              valueAsNumber: true,
              validate: (value) =>
                value > 0 || "Checklist template is required",
            })}
          />

          <div className="flex flex-col gap-6">
            <div className="rounded-[24px] border border-[#e7ddd0] bg-white p-5 shadow-[0_2px_8px_rgba(62,52,39,0.04)]">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="min-w-0 flex-1">
                  <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-[#988a79]">
                    Checklist Template
                  </p>
                  <p className="mt-1 text-xs leading-5 text-[#6f6254]">
                    Search a template by name, then pick it before saving.
                  </p>
                </div>

                <div className="relative w-full sm:max-w-65">
                  <span className="material-symbols-outlined pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[18px] text-[#9d9388]">
                    search
                  </span>
                  <Input
                    value={templateSearch}
                    onChange={(event) => setTemplateSearch(event.target.value)}
                    placeholder="Search templates..."
                    className="h-10 w-full rounded-[14px] border-[#ddd5c8] bg-[#fbfaf8] pl-9 text-sm transition-colors hover:border-[#cfc4b4]"
                  />

                  {templateSearch.trim() && (
                    <div className="absolute left-0 right-0 top-[calc(100%+8px)] z-20 overflow-hidden rounded-2xl border border-[#e6dbcd] bg-white/95 shadow-[0_16px_32px_rgba(62,52,39,0.12)] backdrop-blur-md">
                      {isSearching ? (
                        <div className="px-4 py-4 text-xs text-[#7f7468]">
                          Searching checklist templates...
                        </div>
                      ) : availableSearchResults.length === 0 ? (
                        <div className="px-4 py-4 text-xs text-[#7f7468]">
                          No checklist templates found.
                        </div>
                      ) : (
                        <div className="max-h-52 overflow-y-auto py-2 custom-scrollbar">
                          {availableSearchResults.map((template) => (
                            <button
                              key={template.id}
                              type="button"
                              onClick={() => handleSelectTemplate(template)}
                              className="flex w-full items-center justify-between px-4 py-2.5 text-left transition-colors hover:bg-[#fbf8f2]"
                            >
                              <div className="min-w-0 flex-1 pr-3">
                                <p className="truncate text-sm font-bold text-[#2d241c]">
                                  {template.name}
                                </p>
                                <p className="mt-0.5 text-[10px] uppercase tracking-[0.16em] text-[#9d9388]">
                                  Template #{template.id}
                                </p>
                              </div>
                              <span className="material-symbols-outlined shrink-0 text-[18px] text-[#3b8f88]">
                                add_circle
                              </span>
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>

              {templateSearchError && (
                <p className="mt-3 text-xs font-medium text-[#d9534f]">
                  {templateSearchError}
                </p>
              )}

              {errors.checklist_template_id && (
                <p className="mt-3 text-xs font-medium text-[#d9534f]">
                  {errors.checklist_template_id.message}
                </p>
              )}

              {selectedTemplate && (
                <div className="mt-4 flex flex-col gap-3 rounded-[16px] border border-[#e6dbcd] bg-[#fbfaf8] p-4 sm:flex-row sm:items-start sm:justify-between">
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-black text-[#2d241c]">
                      {selectedTemplate.name}
                    </p>
                    <p className="mt-1 text-xs leading-5 text-[#6f6254]">
                      {selectedTemplate.description ||
                        "No description available for this template."}
                    </p>
                  </div>

                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={handleClearTemplateSelection}
                    className="shrink-0 text-xs"
                  >
                    Clear
                  </Button>
                </div>
              )}
            </div>

            {/* Form Fields Grid */}
            <div className="grid gap-5 sm:grid-cols-2">
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
                  className="w-full rounded-[14px] border border-[#ddd5c8] bg-white px-4 py-3 text-sm text-[#2d241c] outline-none transition-all hover:border-[#cfc4b4] focus:border-[#3b8f88] focus:ring-4 focus:ring-[#3b8f88]/10"
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
                  className="w-full rounded-[14px] border-[#ddd5c8] py-3 text-sm"
                />
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
                  className="w-full rounded-[14px] border-[#ddd5c8] py-3 text-sm"
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
                  className="w-full rounded-[14px] border border-[#ddd5c8] bg-white px-4 py-3 text-sm text-[#2d241c] outline-none transition-all hover:border-[#cfc4b4] focus:border-[#3b8f88] focus:ring-4 focus:ring-[#3b8f88]/10"
                >
                  <option value="day">Day</option>
                  <option value="week">Week</option>
                  <option value="month">Month</option>
                </select>
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
                    className="w-full rounded-[14px] border border-[#ddd5c8] bg-white px-4 py-3 text-sm text-[#2d241c] outline-none transition-all hover:border-[#cfc4b4] focus:border-[#3b8f88] focus:ring-4 focus:ring-[#3b8f88]/10"
                  >
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                  </select>
                </FormField>
              )}
            </div>

            {/* Error State */}
            {(props.error || isSubmitDisabled) && (
              <div className="rounded-[16px] border border-dashed border-[#ecd6d6] bg-white/50 px-4 py-3 text-xs text-[#8a4f4f]">
                {props.error ??
                  "You need to select a checklist template and a technician before creating a maintenance plan."}
              </div>
            )}

            {/* Actions */}
            <div className="flex items-center justify-end gap-3 pt-2">
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
          </div>
        </form>
      </div>
    </div>
  );
}
