import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Button, FormField, Input } from "@/shared/components/ui";
import type {
  ChecklistTemplatePayload,
  EditChecklistTemplateModalProps,
} from "../types/checklistTemplateComponents";

export function EditChecklistTemplateModal({
  template,
  onClose,
  onSubmit,
  isLoading = false,
}: EditChecklistTemplateModalProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ChecklistTemplatePayload>({
    defaultValues: {
      name: "",
      description: "",
    },
  });

  useEffect(() => {
    if (!template) return;

    reset({
      name: template.name ?? "",
      description: template.description ?? "",
    });
  }, [template, reset]);

  if (!template) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#2d2d2d]/45 p-4">
      <div className="w-full max-w-xl rounded-3xl border border-[#ddd5c8] bg-[#fcfaf7] shadow-[0_30px_80px_rgba(0,0,0,0.22)]">
        <div className="border-b border-[#ece6dc] px-6 py-5">
          <h3 className="text-lg font-bold text-[#2d241c]">
            Edit Checklist Template
          </h3>
          <p className="mt-1 text-sm text-[#6f6254]">
            Refine the checklist title and description.
          </p>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-4 px-6 py-5"
        >
          <FormField label="Template name" htmlFor="edit_template_name" required>
            <Input
              id="edit_template_name"
              {...register("name", {
                required: "Template name is required",
              })}
              hasError={!!errors.name}
            />
            {errors.name && (
              <p className="mt-1 text-sm text-red-500">{errors.name.message}</p>
            )}
          </FormField>

          <FormField label="Description" htmlFor="edit_template_description">
            <textarea
              id="edit_template_description"
              {...register("description")}
              rows={5}
              className="w-full rounded-lg border border-[#ddd5c8] bg-white px-4 py-3 text-sm text-text-main outline-none transition-colors placeholder:text-text-muted/60 focus:border-primary focus:ring-2 focus:ring-primary/20"
            />
          </FormField>

          <div className="flex justify-end gap-3 pt-2">
            <Button type="button" variant="secondary" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" isLoading={isLoading}>
              {isLoading ? "Saving..." : "Save Changes"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
