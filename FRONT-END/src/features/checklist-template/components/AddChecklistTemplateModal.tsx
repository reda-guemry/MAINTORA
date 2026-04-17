import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Button, FormField, Input } from "@/shared/components/ui";
import type {
  AddChecklistTemplateModalProps,
  ChecklistTemplatePayload,
} from "../types/checklistTemplateComponents";

const defaultValues: ChecklistTemplatePayload = {
  name: "",
  description: "",
};

export function AddChecklistTemplateModal({
  isOpen,
  onClose,
  onSubmit,
  isLoading = false,
}: AddChecklistTemplateModalProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ChecklistTemplatePayload>({ defaultValues });

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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/35 p-4">
      <div className="w-full max-w-xl rounded-[28px] bg-white shadow-[0_30px_80px_rgba(15,23,42,0.2)]">
        <div className="border-b border-slate-100 px-6 py-5">
          <h3 className="text-lg font-bold text-slate-900">
            Create Checklist Template
          </h3>
          <p className="mt-1 text-sm text-slate-500">
            Start a reusable inspection template for your team.
          </p>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-4 px-6 py-5"
        >
          <FormField label="Template name" htmlFor="template_name" required>
            <Input
              id="template_name"
              {...register("name", {
                required: "Template name is required",
              })}
              hasError={!!errors.name}
              placeholder="Weekly compressor inspection"
            />
            {errors.name && (
              <p className="mt-1 text-sm text-red-500">{errors.name.message}</p>
            )}
          </FormField>

          <FormField label="Description" htmlFor="template_description">
            <textarea
              id="template_description"
              {...register("description")}
              rows={5}
              className="w-full rounded-lg border border-neutral-gray bg-white px-4 py-3 text-sm text-text-main outline-none transition-colors placeholder:text-text-muted/60 focus:border-primary focus:ring-2 focus:ring-primary/20"
              placeholder="Add a short note about how and when this template is used..."
            />
          </FormField>

          <div className="flex justify-end gap-3 pt-2">
            <Button type="button" variant="secondary" onClick={handleClose}>
              Cancel
            </Button>
            <Button type="submit" isLoading={isLoading}>
              {isLoading ? "Saving..." : "Create Template"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
