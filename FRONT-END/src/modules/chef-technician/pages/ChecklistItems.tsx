import { useState } from "react";
import {
  ChecklistItemsList,
  useCreateChecklistItem,
  useDeleteChecklistItem,
  useEditChecklistItem,
  usePaginateChecklistItems,
  type ChecklistItem,
} from "@/features/checklist-item";
import { AppPagination } from "@/shared/components";
import { Button, Input } from "@/shared/components/ui";

export function ChecklistItemsPage() {
  const [draftLabel, setDraftLabel] = useState("");
  const [isCreating, setIsCreating] = useState(false);
  const [editingItemId, setEditingItemId] = useState<number | null>(null);
  const [editingValue, setEditingValue] = useState("");
  const [search, setSearch] = useState("");

  const {
    paginate,
    isLoading,
    currentPage,
    setPage,
    error,
    addChecklistItemToList,
    updateChecklistItemInList,
    removeChecklistItemFromList,
  } = usePaginateChecklistItems();
  const { createChecklistItemCall } = useCreateChecklistItem();
  const { editChecklistItemCall } = useEditChecklistItem();
  const { deleteChecklistItemCall } = useDeleteChecklistItem();

  const items = paginate?.data ?? [];
  const filteredItems = items.filter((item) =>
    item.label.toLowerCase().includes(search.trim().toLowerCase())
  );

  async function handleCreate() {
    if (!draftLabel.trim()) return;

    setIsCreating(true);

    try {
      const response = await createChecklistItemCall({ label: draftLabel.trim() });

      if (response?.data) {
        addChecklistItemToList(response.data);
        setDraftLabel("");
      }
    } finally {
      setIsCreating(false);
    }
  }

  function handleEditStart(item: ChecklistItem) {
    setEditingItemId(item.id);
    setEditingValue(item.label);
  }

  function handleEditCancel() {
    setEditingItemId(null);
    setEditingValue("");
  }

  async function handleEditSubmit(itemId: number) {
    if (!editingValue.trim()) return;

    const response = await editChecklistItemCall(itemId, {
      label: editingValue.trim(),
    });

    if (response?.data) {
      updateChecklistItemInList(response.data);
      handleEditCancel();
    }
  }

  async function handleDelete(item: ChecklistItem) {
    const response = await deleteChecklistItemCall(item.id);

    if (response !== undefined) {
      removeChecklistItemFromList(item.id);
    }
  }

  return (
    <div className="mx-auto flex w-full max-w-300 flex-col gap-8 pb-10">
      
      <div>
        <h1 className="text-[26px] font-bold tracking-tight text-[#111827] md:text-[30px]">
          Checklist Items
        </h1>
        <p className="mt-2 max-w-2xl text-[14px] leading-relaxed text-gray-500">
          Build and manage the core item library your templates will reuse. Create labels, edit them inline, and keep your maintenance tasks organized.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 ">
        <div className="flex items-center gap-4 rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-[#eef7f6] text-[#388E8E]">
            <span className="material-symbols-outlined text-[24px]">dataset</span>
          </div>
          <div>
            <p className="text-[12px] font-semibold text-gray-500">Total Items</p>
            <p className="mt-0.5 text-[22px] font-bold text-[#111827]">
              {paginate?.total ?? 0}
            </p>
          </div>
        </div>

      </div>

      <div className="flex flex-col overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
        
        <div className="flex flex-col gap-4 border-b border-gray-100 bg-gray-50/50 p-5 lg:flex-row lg:items-center lg:justify-between">
          <div className="relative w-full lg:max-w-xs">
            <span className="material-symbols-outlined pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[18px] text-gray-400">
              search
            </span>
            <Input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search items..."
              className="w-full border-gray-200 bg-white pl-9 text-[13px] text-[#111827] placeholder:text-gray-400 focus:border-[#388E8E] focus:ring-1 focus:ring-[#388E8E]"
            />
          </div>

          <div className="flex w-full flex-col gap-3 sm:flex-row sm:items-center lg:w-auto">
            <Input
              value={draftLabel}
              onChange={(event) => setDraftLabel(event.target.value)}
              placeholder="E.g., Check hydraulic fluid level..."
              className="w-full border-gray-200 bg-white text-[13px] text-[#111827] placeholder:text-gray-400 focus:border-[#388E8E] focus:ring-1 focus:ring-[#388E8E] sm:min-w-[300px]"
              onKeyDown={(e) => {
                if (e.key === "Enter") handleCreate();
              }}
            />
            <Button 
              onClick={handleCreate} 
              isLoading={isCreating}
              className="flex h-10 shrink-0 items-center justify-center gap-1.5 rounded-lg bg-[#388E8E] px-4 text-[13px] font-semibold text-white transition-colors hover:bg-[#2c7a7a]"
            >
              {isCreating ? (
                <span>Creating...</span>
              ) : (
                <>
                  <span className="material-symbols-outlined relative top-px text-[18px]">add</span>
                  <span>Add Item</span>
                </>
              )}
            </Button>
          </div>
        </div>

        <div className="p-5">
          <ChecklistItemsList
            items={filteredItems}
            isLoading={isLoading}
            error={error}
            editingItemId={editingItemId}
            editingValue={editingValue}
            onEditStart={handleEditStart}
            onEditCancel={handleEditCancel}
            onEditChange={setEditingValue}
            onEditSubmit={handleEditSubmit}
            onDelete={handleDelete}
          >
            <div className="mt-6 border-t border-gray-100 pt-6">
              <AppPagination
                currentPage={currentPage}
                lastPage={paginate?.last_page ?? 1}
                from={paginate?.from ?? 0}
                to={paginate?.to ?? 0}
                total={paginate?.total ?? 0}
                isLoading={isLoading}
                label="checklist items"
                onPageChange={setPage}
              />
            </div>
          </ChecklistItemsList>
        </div>
      </div>
      
    </div>
  );
}