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
      id: item.id,
      order: item.pivot?.order ?? index + 1,
    }));

    onSubmit({
      ...values,
      checklist_items: orderedItems,
    });
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4 backdrop-blur-sm">
      <div className="flex w-full max-w-3xl max-h-[90vh] flex-col rounded-2xl border border-gray-200 bg-white shadow-xl">
        {/* Header - Fixed */}
        <div className="shrink-0 border-b border-gray-100 px-6 py-5">
          <h3 className="text-[18px] font-bold text-[#1A1A1A]">
            Edit Checklist Template
          </h3>
          <p className="mt-1 text-[13px] text-gray-500">
            Refine the checklist title, description, and configure its items.
          </p>
        </div>

        {/* Body - Scrollable */}
        <div className="overflow-y-auto px-6 py-6">
          <form
            id="edit-template-form"
            onSubmit={handleSubmit(handleFormSubmit)}
            className="space-y-6"
          >
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
              <div className="col-span-1 md:col-span-2">
                <FormField label="Template name" htmlFor="edit_template_name" required>
                  <Input
                    id="edit_template_name"
                    {...register("name", {
                      required: "Template name is required",
                    })}
                    hasError={!!errors.name}
                    className="border-gray-200 bg-gray-50 text-[13px] text-[#1A1A1A] focus:border-[#388E8E] focus:bg-white focus:ring-1 focus:ring-[#388E8E]"
                  />
                  {errors.name && (
                    <p className="mt-1 text-[12px] text-red-500">{errors.name.message}</p>
                  )}
                </FormField>
              </div>

              <div className="col-span-1 md:col-span-2">
                <FormField label="Description" htmlFor="edit_template_description">
                  <textarea
                    id="edit_template_description"
                    {...register("description")}
                    rows={4}
                    className="w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 text-[13px] text-[#1A1A1A] outline-none transition-all placeholder:text-gray-400 focus:border-[#388E8E] focus:bg-white focus:ring-1 focus:ring-[#388E8E]"
                  />
                </FormField>
              </div>
            </div>

            {/* Checklist Items Management Area */}
            <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
              <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between border-b border-gray-100 pb-4">
                <div>
                  <h4 className="text-[13px] font-bold text-[#1A1A1A]">
                    Template Items
                  </h4>
                  <p className="mt-1 text-[12px] text-gray-500">
                    Search and append tasks. Adjust the execution order below.
                  </p>
                </div>

                <div className="relative w-full lg:max-w-sm">
                  <span className="material-symbols-outlined pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[18px] text-gray-400">
                    search
                  </span>
                  <Input
                    value={itemsSearch}
                    onChange={(event) => setItemsSearch(event.target.value)}
                    placeholder="Search and add items..."
                    className="w-full border-gray-200 bg-gray-50 pl-10 text-[13px] focus:border-[#388E8E] focus:bg-white focus:ring-1 focus:ring-[#388E8E]"
                  />

                  {/* Dropdown Results */}
                  {itemsSearch.trim() && (
                    <div className="absolute left-0 right-0 top-[calc(100%+8px)] z-20 overflow-hidden rounded-xl border border-gray-200 bg-white shadow-lg">
                      {isSearching ? (
                        <div className="flex items-center gap-2 px-4 py-4 text-[13px] text-gray-500">
                          <span className="material-symbols-outlined animate-spin text-[18px] text-[#388E8E]">
                            progress_activity
                          </span>
                          Searching...
                        </div>
                      ) : availableSearchResults.length === 0 ? (
                        <div className="px-4 py-4 text-[13px] text-gray-500">
                          No matching items found.
                        </div>
                      ) : (
                        <div className="max-h-60 overflow-y-auto py-2">
                          {availableSearchResults.map((item) => (
                            <button
                              key={item.id}
                              type="button"
                              onClick={() => handleAddItem(item)}
                              className="group flex w-full items-center justify-between px-4 py-3 text-left transition-colors hover:bg-gray-50"
                            >
                              <div>
                                <p className="text-[13px] font-semibold text-[#1A1A1A]">
                                  {item.label}
                                </p>
                                <p className="mt-0.5 text-[10px] font-bold uppercase tracking-[0.15em] text-gray-400">
                                  Item #{item.id}
                                </p>
                              </div>
                              <div className="flex h-7 w-7 items-center justify-center rounded-md bg-[#eef7f6] text-[#388E8E] transition-colors group-hover:bg-[#388E8E] group-hover:text-white">
                                <span className="material-symbols-outlined text-[16px]">
                                  add
                                </span>
                              </div>
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>

              {/* Selected Items List */}
              <div className="mt-4 flex flex-col gap-3">
                {templateItems.length === 0 ? (
                  <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-gray-300 bg-gray-50 py-8 text-center">
                    <span className="material-symbols-outlined mb-2 text-[28px] text-gray-400">
                      assignment_add
                    </span>
                    <p className="text-[13px] font-medium text-gray-500">
                      No items attached to this template yet.
                    </p>
                    <p className="text-[12px] text-gray-400">
                      Use the search bar above to find and add tasks.
                    </p>
                  </div>
                ) : (
                  templateItems.map((item, index) => (
                    <div
                      key={item.id}
                      className="flex flex-col gap-4 rounded-xl border border-gray-100 bg-white p-4 shadow-sm transition-all hover:border-gray-200 hover:shadow-md md:flex-row md:items-center md:justify-between"
                    >
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#eef7f6] text-[13px] font-bold text-[#388E8E]">
                          {item.pivot?.order ?? index + 1}
                        </div>
                        <div>
                          <p className="text-[13px] font-bold text-[#1A1A1A]">
                            {item.label}
                          </p>
                          <p className="mt-0.5 text-[10px] font-bold uppercase tracking-[0.15em] text-gray-400">
                            Item #{item.id}
                          </p>
                        </div>
                      </div>

                      <div className="flex flex-wrap items-center gap-3">
                        <div className="flex items-center gap-2 rounded-lg border border-gray-200 bg-gray-50 px-3 py-1.5">
                          <span className="text-[10px] font-bold uppercase tracking-[0.1em] text-gray-500">
                            Order
                          </span>
                          <select
                            value={item.pivot?.order ?? index + 1}
                            onChange={(event) =>
                              handleChangeOrder(item.id, Number(event.target.value))
                            }
                            className="rounded-md border border-gray-200 bg-white px-2 py-1 text-[13px] font-semibold text-[#1A1A1A] outline-none transition-all focus:border-[#388E8E] focus:ring-1 focus:ring-[#388E8E]"
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
                          className="flex h-8 w-8 items-center justify-center rounded-md border border-gray-200 bg-white text-gray-400 transition-colors hover:border-red-200 hover:bg-red-50 hover:text-red-600"
                          title="Remove item"
                        >
                          <span className="material-symbols-outlined text-[16px]">
                            delete
                          </span>
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </form>
        </div>

        <div className="shrink-0 border-t border-gray-100 bg-gray-50 px-6 py-4">
          <div className="flex justify-end gap-3">
            <Button 
              type="button" 
              variant="secondary" 
              onClick={onClose}
              className="border-gray-200 bg-white text-gray-600 hover:bg-gray-100"
            >
              Cancel
            </Button>
            <Button 
              form="edit-template-form" 
              type="submit" 
              isLoading={isLoading}
              className="bg-[#388E8E] text-white hover:bg-[#2c7a7a]"
            >
              {isLoading ? "Saving..." : "Save Changes"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}