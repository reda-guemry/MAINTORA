import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import type { ChecklistItem } from "@/features/checklist-item";
import { Button, FormField, Input } from "@/shared/components/ui";
import type {
  ChecklistTemplatePayload,
  EditChecklistTemplateModalProps,
} from "../types/checklistTemplateComponents";
import { useSearchItems } from "../hooks/useSearchItems";

export function EditChecklistTemplateModal({
  template,
  onClose,
  onSubmit,
  isLoading = false,
}: EditChecklistTemplateModalProps) {
  const [templateItems, setTemplateItems] = useState<ChecklistItem[]>([]);
  const [itemsSearch, setItemsSearch] = useState("");
  const { searchChecklistItemsCall } = useSearchItems();

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
    setTemplateItems(template.checklist_items ?? []);
    setItemsSearch("");
  }, [template, reset]);

  const filteredTemplateItems = useMemo(() => {
    const normalizedSearch = itemsSearch.trim().toLowerCase();

    searchChecklistItemsCall(normalizedSearch);

    console.log(normalizedSearch);

    if (!normalizedSearch) {
      return templateItems;
    }

    return templateItems.filter((item) =>
      item.label.toLowerCase().includes(normalizedSearch)
    );
  }, [itemsSearch, templateItems]);

  if (!template) {
    return null;
  }

  function handleRemoveItem(itemId: number) {
    setTemplateItems((currentItems) =>
      currentItems.filter((item) => item.id !== itemId)
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#2d2d2d]/45 p-4">
      <div className="w-full max-w-3xl rounded-3xl border border-[#ddd5c8] bg-[#fcfaf7] shadow-[0_30px_80px_rgba(0,0,0,0.22)]">
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

          <div className="rounded-[20px] border border-[#e7ddd0] bg-white px-5 py-5">
            <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-[#988a79]">
                  Template Checklist Items
                </p>
                <p className="mt-1 text-sm text-[#6f6254]">
                  Items loaded from backend. Remove is visual for now until item
                  update logic is connected.
                </p>
              </div>

              <div className="relative w-full md:max-w-sm">
                <span className="material-symbols-outlined pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[#9d9388]">
                  search
                </span>
                <Input
                  value={itemsSearch}
                  onChange={(event) => setItemsSearch(event.target.value)}
                  placeholder="Search template items..."
                  className="border-[#ddd5c8] bg-[#fcfaf7] pl-10"
                />
              </div>
            </div>

            <div className="mt-4 space-y-3">
              {filteredTemplateItems.length === 0 ? (
                <div className="rounded-2xl border border-dashed border-[#ddd5c8] bg-[#fbf8f2] px-4 py-5 text-sm text-[#7f7468]">
                  No checklist items match this search.
                </div>
              ) : (
                filteredTemplateItems.map((item, index) => (
                  <div
                    key={item.id}
                    className="flex flex-col gap-3 rounded-2xl border border-[#ece6dc] bg-[#fbf8f2] px-4 py-4 md:flex-row md:items-center md:justify-between"
                  >
                    <div className="flex items-start gap-3">
                      <div className="flex h-9 w-9 items-center justify-center rounded-full border border-[#d8d0c3] bg-white text-[11px] font-black text-[#816b55]">
                        {index + 1}
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-[#2d241c]">
                          {item.label}
                        </p>
                        <p className="mt-1 text-[11px] uppercase tracking-[0.2em] text-[#9d9388]">
                          Item #{item.id}
                        </p>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => handleRemoveItem(item.id)}
                      className="flex h-10 w-10 items-center justify-center rounded-full border border-[#ecd6d6] bg-white text-[#a05b5b] transition-colors hover:bg-[#fff1f1]"
                    >
                      <span className="material-symbols-outlined text-[18px]">
                        delete
                      </span>
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>

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
