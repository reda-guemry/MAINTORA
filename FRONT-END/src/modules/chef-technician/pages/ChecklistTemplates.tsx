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

export function ChecklistTemplatesPage() {
  const [search, setSearch] = useState("");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editTemplate, setEditTemplate] = useState<ChecklistTemplate | null>(
    null
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
    if (!editTemplate) return;

    setIsSaving(true);

    try {
      const response = await editChecklistTemplateCall(editTemplate.id, payload);

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
    <div className="space-y-8">
      <section className="rounded-[32px] bg-[linear-gradient(135deg,#0f766e_0%,#115e59_52%,#0f172a_100%)] px-6 py-8 text-white shadow-[0_26px_70px_rgba(15,23,42,0.28)] md:px-8">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <p className="text-[11px] font-bold uppercase tracking-[0.32em] text-white/70">
              Checklist Templates
            </p>
            <h1 className="mt-3 text-4xl font-black tracking-tight md:text-5xl">
              Standardize every preventive inspection.
            </h1>
            <p className="mt-4 max-w-xl text-sm leading-7 text-white/75">
              Build clean reusable templates for your technician team and keep
              every routine check aligned across shifts.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            <div className="rounded-2xl border border-white/15 bg-white/10 px-4 py-4 backdrop-blur">
              <p className="text-[10px] uppercase tracking-[0.24em] text-white/60">
                Live Templates
              </p>
              <p className="mt-3 text-3xl font-black">{paginate?.total ?? 0}</p>
            </div>
            <div className="rounded-2xl border border-white/15 bg-white/10 px-4 py-4 backdrop-blur">
              <p className="text-[10px] uppercase tracking-[0.24em] text-white/60">
                Current Page
              </p>
              <p className="mt-3 text-3xl font-black">{currentPage}</p>
            </div>
            <div className="rounded-2xl border border-white/15 bg-white/10 px-4 py-4 backdrop-blur">
              <p className="text-[10px] uppercase tracking-[0.24em] text-white/60">
                Search View
              </p>
              <p className="mt-3 text-3xl font-black">
                {filteredTemplates.length}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="flex flex-col gap-4 rounded-[28px] border border-white/70 bg-white/85 p-5 shadow-[0_20px_50px_rgba(15,23,42,0.06)] backdrop-blur md:flex-row md:items-center md:justify-between">
        <div className="relative w-full md:max-w-md">
          <span className="material-symbols-outlined pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
            search
          </span>
          <Input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search by template name or description..."
            className="pl-10"
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
