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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4 backdrop-blur-sm">
      <div className="w-full max-w-xl rounded-2xl border border-gray-200 bg-white shadow-xl">
        <div className="border-b border-gray-100 px-6 py-5">
          <h3 className="text-[18px] font-bold text-[#1A1A1A]">
            Create Checklist Template
          </h3>
          <p className="mt-1 text-[13px] text-gray-500">
            Start a reusable inspection template for your team.
          </p>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-5 px-6 py-6"
        >
          <FormField label="Template name" htmlFor="template_name" required>
            <Input
              id="template_name"
              {...register("name", {
                required: "Template name is required",
              })}
              hasError={!!errors.name}
              placeholder="Weekly compressor inspection"
              className="border-gray-200 bg-gray-50 text-[13px] text-[#1A1A1A] focus:border-[#388E8E] focus:bg-white focus:ring-1 focus:ring-[#388E8E]"
            />
            {errors.name && (
              <p className="mt-1 text-[12px] text-red-500">{errors.name.message}</p>
            )}
          </FormField>

          <FormField label="Description" htmlFor="template_description">
            <textarea
              id="template_description"
              {...register("description")}
              rows={4}
              className="w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 text-[13px] text-[#1A1A1A] outline-none transition-all placeholder:text-gray-400 focus:border-[#388E8E] focus:bg-white focus:ring-1 focus:ring-[#388E8E]"
              placeholder="Add a short note about how and when this template is used..."
            />
          </FormField>

          <div className="flex justify-end gap-3 pt-2">
            <Button 
              type="button" 
              variant="secondary" 
              onClick={handleClose}
              className="border-gray-200 text-gray-600 hover:bg-gray-50"
            >
              Cancel
            </Button>
            <Button 
              type="submit" 
              isLoading={isLoading}
              className="bg-[#388E8E] text-white hover:bg-[#2c7a7a]"
            >
              {isLoading ? "Saving..." : "Create Template"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}