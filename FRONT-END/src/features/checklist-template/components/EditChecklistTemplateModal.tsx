import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Button, FormField, Input } from "@/shared/components/ui";
import type {
  ChecklistTemplateItem,
  ChecklistTemplatePayload,
  EditChecklistTemplateModalProps,
} from "../types/checklistTemplateComponents";
import { useSearchItems } from "../hooks/useSearchItems";

function normalizeTemplateItems(items: ChecklistTemplateItem[]) {
  return [...items]
    .sort((firstItem, secondItem) => {
      const firstOrder = firstItem.pivot?.order ?? Number.MAX_SAFE_INTEGER;
      const secondOrder = secondItem.pivot?.order ?? Number.MAX_SAFE_INTEGER;

      return firstOrder - secondOrder;
    })
    .map((item, index) => ({
      ...item,
      pivot: {
        id: item.pivot?.id,
        order: index + 1,
      },
    }));
}

export function EditChecklistTemplateModal({
  template,
  onClose,
  onSubmit,
  isLoading = false,
}: EditChecklistTemplateModalProps) {
  const [templateItems, setTemplateItems] = useState<ChecklistTemplateItem[]>(
    [],
  );
  const [itemsSearch, setItemsSearch] = useState("");
  const [searchResults, setSearchResults] = useState<ChecklistTemplateItem[]>(
    [],
  );
  const [isSearching, setIsSearching] = useState(false);
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
    setTemplateItems(normalizeTemplateItems(template.checklist_items ?? []));
    setItemsSearch("");
    setSearchResults([]);
  }, [template, reset]);

  useEffect(() => {
    const normalizedSearch = itemsSearch.trim();

    if (!normalizedSearch) {
      setSearchResults([]);
      setIsSearching(false);
      return;
    }

    const timeoutId = window.setTimeout(async () => {
      setIsSearching(true);

      const items = await searchChecklistItemsCall(normalizedSearch);
      setSearchResults(items);
      setIsSearching(false);
    }, 250);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [itemsSearch]);

  if (!template) {
    return null;
  }

  function handleRemoveItem(itemId: number) {
    setTemplateItems((currentItems) =>
      normalizeTemplateItems(
        currentItems.filter((item) => item.id !== itemId),
      ),
    );
  }

  function handleAddItem(item: ChecklistTemplateItem) {
    setTemplateItems((currentItems) => {
      if (currentItems.some((currentItem) => currentItem.id === item.id)) {
        return currentItems;
      }

      return normalizeTemplateItems([...currentItems, item]);
    });

    setItemsSearch("");
    setSearchResults([]);
  }

  function handleChangeOrder(itemId: number, nextOrder: number) {
    setTemplateItems((currentItems) => {
      if (currentItems.length === 0) {
        return currentItems;
      }

      const currentIndex = currentItems.findIndex((item) => item.id === itemId);

      if (currentIndex === -1) {
        return currentItems;
      }

      const boundedOrder = Math.min(
        Math.max(nextOrder, 1),
        currentItems.length,
      );
      const nextIndex = boundedOrder - 1;

      if (currentIndex === nextIndex) {
        return currentItems;
      }

      const reorderedItems = [...currentItems];
      const [movedItem] = reorderedItems.splice(currentIndex, 1);
      reorderedItems.splice(nextIndex, 0, movedItem);

      return normalizeTemplateItems(reorderedItems);
    });
  }

  const availableSearchResults = searchResults.filter(
    (item) =>
      !templateItems.some((templateItem) => templateItem.id === item.id),
  );

  function handleFormSubmit(values: ChecklistTemplatePayload) {
    const orderedItems = templateItems.map((item, index) => ({
      checklist_item_id: item.id,
      order: item.pivot?.order ?? index + 1,
    }));

    onSubmit({
      ...values,
      items: orderedItems,
      checklist_items: orderedItems,
    });
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
          onSubmit={handleSubmit(handleFormSubmit)}
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
                  Search an item, pick it from the list, and adjust the order
                  before saving the template.
                </p>
              </div>

              <div className="relative w-full md:max-w-sm">
                <span className="material-symbols-outlined pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[#9d9388]">
                  search
                </span>
                <Input
                  value={itemsSearch}
                  onChange={(event) => setItemsSearch(event.target.value)}
                  placeholder="Search and add checklist items..."
                  className="border-[#ddd5c8] bg-[#fcfaf7] pl-10"
                />

                {itemsSearch.trim() && (
                  <div className="absolute left-0 right-0 top-[calc(100%+10px)] z-20 overflow-hidden rounded-2xl border border-[#e7ddd0] bg-white shadow-[0_18px_40px_rgba(62,52,39,0.12)]">
                    {isSearching ? (
                      <div className="px-4 py-4 text-sm text-[#7f7468]">
                        Searching checklist items...
                      </div>
                    ) : availableSearchResults.length === 0 ? (
                      <div className="px-4 py-4 text-sm text-[#7f7468]">
                        No checklist items found for this search.
                      </div>
                    ) : (
                      <div className="max-h-60 overflow-y-auto py-2">
                        {availableSearchResults.map((item) => (
                          <button
                            key={item.id}
                            type="button"
                            onClick={() => handleAddItem(item)}
                            className="flex w-full items-center justify-between px-4 py-3 text-left transition-colors hover:bg-[#fbf8f2]"
                          >
                            <div>
                              <p className="text-sm font-semibold text-[#2d241c]">
                                {item.label}
                              </p>
                              <p className="mt-1 text-[11px] uppercase tracking-[0.2em] text-[#9d9388]">
                                Item #{item.id}
                              </p>
                            </div>
                            <span className="material-symbols-outlined text-[18px] text-[#4b9c99]">
                              add
                            </span>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>

            <div className="mt-4 space-y-3">
              {templateItems.length === 0 ? (
                <div className="rounded-2xl border border-dashed border-[#ddd5c8] bg-[#fbf8f2] px-4 py-5 text-sm text-[#7f7468]">
                  No checklist items attached to this template yet.
                </div>
              ) : (
                templateItems.map((item, index) => (
                  <div
                    key={item.id}
                    className="flex flex-col gap-3 rounded-2xl border border-[#ece6dc] bg-[#fbf8f2] px-4 py-4 md:flex-row md:items-center md:justify-between"
                  >
                    <div className="flex items-start gap-3">
                      <div className="flex h-9 w-9 items-center justify-center rounded-full border border-[#d8d0c3] bg-white text-[11px] font-black text-[#816b55]">
                        {item.pivot?.order ?? index + 1}
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

                    <div className="flex flex-wrap items-center gap-3">
                      <div className="flex items-center gap-2 rounded-full border border-[#e5ddd1] bg-white px-3 py-2">
                        <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#988a79]">
                          Order
                        </span>
                        <select
                          value={item.pivot?.order ?? index + 1}
                          onChange={(event) =>
                            handleChangeOrder(item.id, Number(event.target.value))
                          }
                          className="rounded-full border border-[#ddd5c8] bg-[#fcfaf7] px-3 py-1 text-sm font-semibold text-[#2d241c] outline-none transition-colors focus:border-[#4b9c99]"
                        >
                          {templateItems.map((_, orderIndex) => (
                            <option key={orderIndex + 1} value={orderIndex + 1}>
                              {orderIndex + 1}
                            </option>
                          ))}
                        </select>
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
