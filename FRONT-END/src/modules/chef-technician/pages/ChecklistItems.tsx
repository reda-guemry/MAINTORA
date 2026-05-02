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
    <div className="space-y-6">
      <section className="rounded-[26px] border border-[#d9d1c5] bg-[linear-gradient(180deg,#eee7da_0%,#ece2d3_100%)] px-6 py-7 shadow-[0_18px_45px_rgba(62,52,39,0.08)]">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <p className="text-[11px] font-bold uppercase tracking-[0.28em] text-[#948674]">
              Checklist Items
            </p>
            <h1 className="mt-3 text-4xl font-black tracking-tight text-[#2d241c] md:text-[42px]">
              Build the item library your templates will reuse.
            </h1>
            <p className="mt-3 max-w-xl text-sm leading-7 text-[#6f6254]">
              Create labels directly from the page, edit them inline, and keep
              the library lightweight for template building.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            <div className="rounded-2xl border border-white/70 bg-white/70 px-4 py-4">
              <p className="text-[10px] uppercase tracking-[0.24em] text-[#988a79]">
                Total Items
              </p>
              <p className="mt-3 text-3xl font-black text-[#2d241c]">
                {paginate?.total ?? 0}
              </p>
            </div>
            <div className="rounded-2xl border border-white/70 bg-white/70 px-4 py-4">
              <p className="text-[10px] uppercase tracking-[0.24em] text-[#988a79]">
                Current Page
              </p>
              <p className="mt-3 text-3xl font-black text-[#2d241c]">
                {currentPage}
              </p>
            </div>
            <div className="rounded-2xl border border-white/70 bg-white/70 px-4 py-4">
              <p className="text-[10px] uppercase tracking-[0.24em] text-[#988a79]">
                Search View
              </p>
              <p className="mt-3 text-3xl font-black text-[#2d241c]">
                {filteredItems.length}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="rounded-[24px] border border-[#ddd5c8] bg-white p-5 shadow-[0_16px_40px_rgba(62,52,39,0.07)]">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="relative w-full lg:max-w-sm">
            <span className="material-symbols-outlined pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[#9d9388]">
              search
            </span>
            <Input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search item labels..."
              className="border-[#ddd5c8] bg-[#fcfaf7] pl-10"
            />
          </div>

          <div className="flex w-full flex-col gap-3 md:flex-row lg:w-auto">
            <Input
              value={draftLabel}
              onChange={(event) => setDraftLabel(event.target.value)}
              placeholder="Write a checklist item label..."
              className="min-w-[320px] border-[#ddd5c8] bg-[#fcfaf7]"
            />
            <Button onClick={handleCreate} isLoading={isCreating}>
              {isCreating ? "Creating..." : "Add Item"}
            </Button>
          </div>
        </div>
      </section>

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
      </ChecklistItemsList>
    </div>
  );
}
