import { useState } from "react";
import {
  AddChecklistTemplateModal,
  ChecklistTemplatesPagination,
  ChecklistTemplatesTable,
  DeleteChecklistTemplateDialog,
  EditChecklistTemplateModal,
  useCreateChecklistTemplate,
  useDeleteChecklistTemplate,
  useEditChecklistTemplate,
  usePaginateChecklistTemplates,
  type ChecklistTemplate,
  type ChecklistTemplatePayload,
} from "@/features/checklist-template";
import { Button, Input } from "@/shared/components/ui";
import { NavElement } from "../components/NavElement";

export function ChecklistTemplatesPage() {
  const [search, setSearch] = useState("");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editTemplate, setEditTemplate] = useState<ChecklistTemplate | null>(
    null,
  );
  const [deleteTemplate, setDeleteTemplate] =
    useState<ChecklistTemplate | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  const {
    paginate,
    isLoading,
    currentPage,
    setPage,
    error,
    addTemplateToList,
    updateTemplateInList,
    removeTemplateFromList,
  } = usePaginateChecklistTemplates();
  const { createChecklistTemplateCall } = useCreateChecklistTemplate();
  const { editChecklistTemplateCall } = useEditChecklistTemplate();
  const { deleteChecklistTemplateCall } = useDeleteChecklistTemplate();

  const templates = paginate?.data ?? [];
  const filteredTemplates = templates.filter((template) => {
    const normalizedSearch = search.trim().toLowerCase();

    return (
      normalizedSearch.length === 0 ||
      template.name.toLowerCase().includes(normalizedSearch) ||
      (template.description ?? "").toLowerCase().includes(normalizedSearch)
    );
  });

  async function handleAddSubmit(payload: ChecklistTemplatePayload) {
    setIsSaving(true);

    try {
      const response = await createChecklistTemplateCall(payload);

      if (response?.data) {
        addTemplateToList(response.data);
        setIsAddModalOpen(false);
      }
    } finally {
      setIsSaving(false);
    }
  }

  async function handleEditSubmit(payload: ChecklistTemplatePayload) {
    // console.log(payload);
    if (!editTemplate) return;

    setIsSaving(true);

    try {
      const response = await editChecklistTemplateCall(
        editTemplate.id,
        payload,
      );

      console.log(response);

      if (response?.data) {
        updateTemplateInList(response.data);
        setEditTemplate(null);
      }
    } finally {
      setIsSaving(false);
    }
  }

  async function handleDeleteConfirm() {
    if (!deleteTemplate) return;

    setIsSaving(true);

    try {
      const response = await deleteChecklistTemplateCall(deleteTemplate.id);

      if (response !== undefined) {
        removeTemplateFromList(deleteTemplate.id);
        setDeleteTemplate(null);
      }
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <div className="space-y-6">
      <section className="rounded-[26px] border border-[#d9d1c5] bg-[linear-gradient(180deg,#eee7da_0%,#ece2d3_100%)] px-6 py-7 shadow-[0_18px_45px_rgba(62,52,39,0.08)]">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <p className="text-[11px] font-bold uppercase tracking-[0.28em] text-[#948674]">
              Checklist Templates
            </p>
            <h1 className="mt-3 text-4xl font-black tracking-tight text-[#2d241c] md:text-[42px]">
              Standardize every preventive inspection.
            </h1>
            <p className="mt-4 max-w-xl text-sm leading-7 text-[#6f6254]">
              Build clean reusable templates for your technician team and keep
              every routine check aligned across shifts.
            </p>
          </div>

          <div>
            <div className="flex gap-6">
              <NavElement to="/chef-technician/checklist/items" label="Checklists" end />
              
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            <div className="rounded-2xl border border-white/70 bg-white/70 px-4 py-4">
              <p className="text-[10px] uppercase tracking-[0.24em] text-[#988a79]">
                Live Templates
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
                {filteredTemplates.length}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="flex flex-col gap-4 rounded-[24px] border border-[#ddd5c8] bg-white p-5 shadow-[0_16px_40px_rgba(62,52,39,0.07)] md:flex-row md:items-center md:justify-between">
        <div className="relative w-full md:max-w-md">
          <span className="material-symbols-outlined pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[#9d9388]">
            search
          </span>
          <Input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search by template name or description..."
            className="border-[#ddd5c8] bg-[#fcfaf7] pl-10"
          />
        </div>

        <Button type="button" onClick={() => setIsAddModalOpen(true)}>
          <span className="material-symbols-outlined text-[18px]">add</span>
          New Template
        </Button>
      </section>

      <ChecklistTemplatesTable
        templates={filteredTemplates}
        isLoading={isLoading}
        error={error}
        onEdit={setEditTemplate}
        onDelete={setDeleteTemplate}
      >
        <ChecklistTemplatesPagination
          currentPage={currentPage}
          lastPage={paginate?.last_page ?? 1}
          from={paginate?.from ?? 0}
          to={paginate?.to ?? 0}
          total={paginate?.total ?? 0}
          isLoading={isLoading}
          onPageChange={setPage}
        />
      </ChecklistTemplatesTable>

      <AddChecklistTemplateModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSubmit={handleAddSubmit}
        isLoading={isSaving}
      />

      <EditChecklistTemplateModal
        template={editTemplate}
        onClose={() => setEditTemplate(null)}
        onSubmit={handleEditSubmit}
        isLoading={isSaving}
      />

      <DeleteChecklistTemplateDialog
        template={deleteTemplate}
        onClose={() => setDeleteTemplate(null)}
        onConfirm={handleDeleteConfirm}
      />
    </div>
  );
}
