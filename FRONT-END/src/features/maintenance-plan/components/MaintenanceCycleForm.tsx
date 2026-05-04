import { useState } from "react";
import { Alert } from "@/shared/components/feedback";
import { Button, Input } from "@/shared/components/ui";
import { cn } from "@/shared/utils";
import { useSearchChecklistTemplates } from "../hooks/useSearchChecklistTemplates";
import type {
  CreateMaintenancePlanPayload,
  MaintenancePlanChecklistTemplate,
  UpdateMaintenancePlanPayload,
} from "../types/maintenancePlan";
import type {
  MaintenanceCycleFormProps,
  MaintenanceCycleFormState,
} from "../types/MaintenanceCycle";
import {
  formatRecurrenceDay,
  frequencyOptions,
  validateForm,
} from "../utils/MaintenanceCycle";

const initialFormState: MaintenanceCycleFormState = {
  assigned_to: 0,
  checklist_template_id: 0,
  machine_id: 0,
  repeat_every: 1,
  repeat_unit: "week",
  start_date: "",
  status: "active",
};

export function MaintenanceCycleForm({
  disableMachineSelect = false,
  error,
  initialTemplate = null,
  initialValues,
  isLoading = false,
  machines,
  mode,
  onSubmit,
  submitLabel,
  title,
  technicians,
}: MaintenanceCycleFormProps) {
  const [values, setValues] = useState<MaintenanceCycleFormState>({
    ...initialFormState,
    ...initialValues,
  });
  const [templateQuery, setTemplateQuery] = useState("");
  const [templateResults, setTemplateResults] = useState<
    MaintenancePlanChecklistTemplate[]
  >([]);
  const [selectedTemplate, setSelectedTemplate] =
    useState<MaintenancePlanChecklistTemplate | null>(initialTemplate);
  const [isSearchingTemplates, setIsSearchingTemplates] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const { searchChecklistTemplatesCall, error: templateSearchError } =
    useSearchChecklistTemplates();
  const [isTyping, setIsTyping] = useState(false);

  const recurrenceDay = () => {
    return formatRecurrenceDay(
      values.start_date,
      values.repeat_every,
      values.repeat_unit,
    );
  };

  function updateField<Key extends keyof MaintenanceCycleFormState>(
    key: Key,
    value: MaintenanceCycleFormState[Key],
  ) {
    setValues((currentValues) => ({
      ...currentValues,
      [key]: value,
    }));
    setFormError(null);
  }

  async function handleTemplateQueryChange(value: string) {
    setTemplateQuery(value);
    setFormError(null);

    const normalizedValue = value.trim();

    if (normalizedValue.length < 2) {
      setTemplateResults([]);
      return;
    }

    setIsSearchingTemplates(true);
    const templates = await searchChecklistTemplatesCall(normalizedValue);
    setTemplateResults(templates);
    setIsSearchingTemplates(false);
  }

  function handleTemplateSelect(template: MaintenancePlanChecklistTemplate) {
    setSelectedTemplate(template);
    updateField("checklist_template_id", template.id);
    setTemplateQuery(template.name);
    setTemplateResults([]);
    setIsTyping(false);
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const validationError = validateForm(values);

    if (validationError) {
      setFormError(validationError);
      return;
    }

    if (mode === "edit") {
      const payload: UpdateMaintenancePlanPayload = {
        assigned_to: values.assigned_to,
        checklist_template_id: values.checklist_template_id,
        repeat_every: values.repeat_every,
        repeat_unit: values.repeat_unit,
        start_date: values.start_date,
        status: values.status,
      };

      await onSubmit(payload);
      return;
    }

    const payload: CreateMaintenancePlanPayload = {
      assigned_to: values.assigned_to,
      checklist_template_id: values.checklist_template_id,
      machine_id: values.machine_id,
      repeat_every: values.repeat_every,
      repeat_unit: values.repeat_unit,
      start_date: values.start_date,
    };

    await onSubmit(payload);
  }

  return (
    <section className="rounded-xl border border-[#dfe8e6] bg-white shadow-[0_18px_48px_rgba(17,24,39,0.08)]">
      <div className="flex flex-col gap-4 border-b border-[#eef2f1] px-6 py-6 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <span className="material-symbols-outlined text-[22px] text-[#388E8E]">
            settings_suggest
          </span>
          <h2 className="text-xl font-black text-[#172033]">{title}</h2>
        </div>
        <span className="w-fit rounded-full bg-[#e6f4f1] px-4 py-1.5 text-[10px] font-black uppercase tracking-[0.16em] text-[#388E8E]">
          Step 1: Define Parameters
        </span>
      </div>

      <form onSubmit={handleSubmit} className="px-6 py-7">
        <div className="grid gap-6 md:grid-cols-2">
          <div>
            <label
              htmlFor="maintenance_cycle_machine"
              className="text-[11px] font-black uppercase tracking-[0.14em] text-[#465364]"
            >
              Industrial Asset
            </label>
            <div className="relative mt-2">
              <span className="material-symbols-outlined pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[20px] text-[#8aa0a6]">
                precision_manufacturing
              </span>
              <select
                id="maintenance_cycle_machine"
                value={values.machine_id}
                disabled={disableMachineSelect}
                onChange={(event) => {
                  updateField("machine_id", Number(event.target.value));
                }}
                className="h-12 w-full appearance-none rounded-xl border border-slate-200 bg-slate-50 px-12 text-sm font-medium text-slate-900 outline-none transition-all focus:border-[#43968C] focus:bg-white focus:ring-4 focus:ring-[#43968C]/10 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <option value={0}>Choose machine...</option>
                {machines.map((machine) => (
                  <option key={machine.id} value={machine.id}>
                    {machine.code} - {machine.name}
                  </option>
                ))}
              </select>
              <span className="material-symbols-outlined pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[20px] text-[#8aa0a6]">
                expand_more
              </span>
            </div>
          </div>

          <div>
            <label
              htmlFor="maintenance_cycle_template"
              className="text-[11px] font-black uppercase tracking-[0.14em] text-[#465364]"
            >
              Checklist Template
            </label>
            <div className="relative mt-2">
              <span className="material-symbols-outlined pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[20px] text-[#8aa0a6]">
                checklist
              </span>
              <Input
                id="maintenance_cycle_template"
                value={templateQuery}
                onChange={(event) => {
                  setIsTyping(true) ; 
                  void handleTemplateQueryChange(event.target.value);
                }}
                placeholder="Select standard protocol..."
                className="h-12 rounded-xl border-[#d6e1e8] bg-[#f8fafb] pl-12 pr-12 font-semibold"
              />
              <span className="material-symbols-outlined pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[20px] text-[#8aa0a6]">
                expand_more
              </span>

              {(!selectedTemplate || mode === "edit") && (
                <>
                  {isTyping && (templateQuery.trim().length >= 2 ||
                    isSearchingTemplates) && (
                    <div className="absolute left-0 right-0 top-[calc(100%+8px)] z-20 overflow-hidden rounded-xl border border-[#d6e1e8] bg-white shadow-[0_16px_32px_rgba(17,24,39,0.12)]">
                      {isSearchingTemplates ? (
                        <div className="px-4 py-4 text-sm text-[#64748b]">
                          Searching protocols...
                        </div>
                      ) : templateResults.length === 0 ? (
                        <div className="px-4 py-4 text-sm text-[#64748b]">
                          No checklist templates found.
                        </div>
                      ) : (
                        <div className="max-h-56 overflow-y-auto py-2">
                          {templateResults.map((template) => (
                            <button
                              key={template.id}
                              type="button"
                              onClick={() => handleTemplateSelect(template)}
                              className="flex w-full items-center justify-between px-4 py-3 text-left transition hover:bg-[#f2f7f7]"
                            >
                              <span>
                                <span className="block text-sm font-black text-[#172033]">
                                  {template.name}
                                </span>
                                <span className="mt-1 block text-xs text-[#728293]">
                                  {template.description ||
                                    `Protocol #${template.id}`}
                                </span>
                              </span>
                              <span className="material-symbols-outlined text-[20px] text-[#388E8E]">
                                add_circle
                              </span>
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                </>
              )}
            </div>
            {selectedTemplate && (
              <p className="mt-2 text-xs font-semibold text-[#388E8E]">
                Selected: {selectedTemplate.name}
              </p>
            )}
          </div>

          {mode === "edit" && (
            <div>
              <label
                htmlFor="maintenance_cycle_status"
                className="text-[11px] font-black uppercase tracking-[0.14em] text-[#465364]"
              >
                Plan Status
              </label>
              <div className="relative mt-2">
                <span className="material-symbols-outlined pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[20px] text-[#8aa0a6]">
                  toggle_on
                </span>
                <select
                  id="maintenance_cycle_status"
                  value={values.status}
                  onChange={(event) => {
                    updateField(
                      "status",
                      event.target.value as MaintenanceCycleFormState["status"],
                    );
                  }}
                  className="h-12 w-full appearance-none rounded-xl border border-slate-200 bg-slate-50 px-12 text-sm font-medium text-slate-900 outline-none transition-all focus:border-[#43968C] focus:bg-white focus:ring-4 focus:ring-[#43968C]/10 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
                <span className="material-symbols-outlined pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[20px] text-[#8aa0a6]">
                  expand_more
                </span>
              </div>
            </div>
          )}

          <div>
            <label
              htmlFor="maintenance_cycle_technician"
              className="text-[11px] font-black uppercase tracking-[0.14em] text-[#465364]"
            >
              Assigned Technician
            </label>
            <div className="relative mt-2">
              <span className="material-symbols-outlined pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[20px] text-[#8aa0a6]">
                engineering
              </span>
              <select
                id="maintenance_cycle_technician"
                value={values.assigned_to}
                onChange={(event) => {
                  updateField("assigned_to", Number(event.target.value));
                }}
                className="h-12 w-full appearance-none rounded-xl border border-slate-200 bg-slate-50 px-12 text-sm font-medium text-slate-900 outline-none transition-all focus:border-[#43968C] focus:bg-white focus:ring-4 focus:ring-[#43968C]/10 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <option value={0}>Assign technician...</option>
                {technicians.map((technician) => (
                  <option key={technician.id} value={technician.id}>
                    {technician.first_name} {technician.last_name}
                  </option>
                ))}
              </select>
              <span className="material-symbols-outlined pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[20px] text-[#8aa0a6]">
                expand_more
              </span>
            </div>
          </div>

          <div>
            <p className="text-[11px] font-black uppercase tracking-[0.14em] text-[#465364]">
              Periodicity & Frequency
            </p>
            <div className="mt-2 grid max-w-md grid-cols-3 rounded-xl bg-[#eef3f7] p-1">
              {frequencyOptions.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => updateField("repeat_unit", option.value)}
                  className={cn(
                    "flex h-10 items-center justify-center gap-2 rounded-lg text-sm font-black transition",
                    values.repeat_unit === option.value
                      ? "bg-white text-[#388E8E] shadow-sm"
                      : "text-[#6f7f8f] hover:text-[#172033]",
                  )}
                >
                  <span className="material-symbols-outlined text-[16px]">
                    {option.icon}
                  </span>
                  {option.label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label
              htmlFor="maintenance_cycle_repeat_every"
              className="text-[11px] font-black uppercase tracking-[0.14em] text-[#465364]"
            >
              Repeat Every
            </label>
            <div className="relative mt-2">
              <span className="material-symbols-outlined pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[20px] text-[#8aa0a6]">
                repeat
              </span>
              <Input
                id="maintenance_cycle_repeat_every"
                type="number"
                min={1}
                value={values.repeat_every}
                onChange={(event) => {
                  updateField("repeat_every", Number(event.target.value));
                }}
                className="h-12 rounded-xl border-[#d6e1e8] bg-[#f8fafb] pl-12 font-semibold"
              />
            </div>
          </div>

          {mode === "create" && (
            <div>
              <label
                htmlFor="maintenance_cycle_start_date"
                className="text-[11px] font-black uppercase tracking-[0.14em] text-[#465364]"
              >
                Effective From
              </label>
              <div className="relative mt-2">
                <span className="material-symbols-outlined pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[20px] text-[#8aa0a6]">
                  event
                </span>
                <Input
                  id="maintenance_cycle_start_date"
                  type="date"
                  value={values.start_date}
                  onChange={(event) =>
                    updateField("start_date", event.target.value)
                  }
                  className="h-12 rounded-xl border-[#d6e1e8] bg-[#f8fafb] pl-12 font-semibold"
                />
              </div>
            </div>
          )}

          <div>
            <p className="text-[11px] font-black uppercase tracking-[0.14em] text-[#465364]">
              Recurrence Day
            </p>
            <div className="mt-2 flex h-12 items-center gap-3 rounded-xl border border-[#d6e1e8] bg-[#f8fafb] px-4 text-sm font-semibold text-[#172033]">
              <span className="material-symbols-outlined text-[20px] text-[#8aa0a6]">
                schedule
              </span>
              <span>{recurrenceDay()}</span>
            </div>
          </div>
        </div>

        {(formError || error || templateSearchError) && (
          <div className="mt-6">
            <Alert
              variant={error ? "error" : "warning"}
              title={error ? "Cycle save failed" : "Configuration incomplete"}
            >
              {error ?? formError ?? templateSearchError}
            </Alert>
          </div>
        )}

        <div className="mt-8 flex flex-col gap-3 border-t border-[#eef2f1] pt-6 sm:flex-row">
          <Button
            type="submit"
            isLoading={isLoading}
            className="h-14 flex-1 rounded-xl bg-[#388E8E] text-white shadow-lg shadow-[#388E8E]/20 hover:bg-[#2f7b7b]"
          >
            <div className="flex gap-1.5 items-center">
              <span className="material-symbols-outlined text-[18px]">
                bolt
              </span>
              <span> {submitLabel}</span>
            </div>
          </Button>
          <Button
            type="button"
            variant="secondary"
            disabled
            className="h-14 rounded-xl px-8"
          >
            Save Draft
          </Button>
        </div>
      </form>
    </section>
  );
}
