import { useState } from "react";
import {
  AddChecklistTemplateModal,
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
import { AppPagination } from "@/shared/components";
import { Button, Input } from "@/shared/components/ui";
import { NavElement } from "../components/NavElement";

export function ChecklistTemplatesPage() {
  const [search, setSearch] = useState("");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editTemplate, setEditTemplate] = useState<ChecklistTemplate | null>(null);
  const [deleteTemplate, setDeleteTemplate] = useState<ChecklistTemplate | null>(null);
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
    <div className="w-full space-y-6">
      <section className="flex flex-col gap-6 overflow-hidden rounded-2xl border border-gray-200 border-t-4 border-t-[#388E8E] bg-white p-6 shadow-sm md:p-8 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex max-w-2xl flex-col items-start">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#eef7f6] text-[#388E8E]">
              <span className="material-symbols-outlined text-[26px]">rule_folder</span>
            </div>
            <div>
              <h1 className="text-[22px] font-bold tracking-tight text-[#1A1A1A] md:text-[28px]">
                Checklist Templates
              </h1>
              <p className="mt-1 text-[13px] text-gray-500 md:text-[14px]">
                Build reusable templates for your technician team to keep routine checks aligned.
              </p>
            </div>
          </div>
          <div className="mt-5 pl-16">
            <NavElement to="/chef-technician/checklist/items" label="View all checklists item" end />
          </div>
        </div>

        <div className="flex w-full items-center divide-x divide-gray-100 rounded-xl border border-gray-100 bg-gray-50/50 py-4 lg:w-auto">
          <div className="flex flex-1 flex-col items-center px-4 md:px-6 lg:flex-none">
            <p className="text-[10px] font-bold uppercase tracking-widest text-gray-500">Live Templates</p>
            <p className="mt-1 text-[24px] font-black text-[#1A1A1A] md:text-[28px]">{paginate?.total ?? 0}</p>
          </div>
          <div className="flex flex-1 flex-col items-center px-4 md:px-6 lg:flex-none">
            <p className="text-[10px] font-bold uppercase tracking-widest text-gray-500">Current Page</p>
            <p className="mt-1 text-[24px] font-black text-[#1A1A1A] md:text-[28px]">{currentPage}</p>
          </div>
          <div className="flex flex-1 flex-col items-center px-4 md:px-6 lg:flex-none">
            <p className="text-[10px] font-bold uppercase tracking-widest text-gray-500">Search Matches</p>
            <p className="mt-1 text-[24px] font-black text-[#388E8E] md:text-[28px]">{filteredTemplates.length}</p>
          </div>
        </div>
      </section>

      <section className="flex flex-col gap-4 rounded-xl border border-gray-200 bg-white p-4 shadow-sm md:flex-row md:items-center md:justify-between">
        <div className="relative w-full md:max-w-md">
          <span className="material-symbols-outlined pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[20px] text-gray-400">
            search
          </span>
          <Input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search templates..."
            className="w-full border-gray-200 bg-gray-50 pl-10 text-[13px] text-[#1A1A1A] placeholder:text-gray-400 focus:border-[#388E8E] focus:bg-white focus:ring-1 focus:ring-[#388E8E] md:text-[14px]"
          />
        </div>

        <Button
          type="button"
          onClick={() => setIsAddModalOpen(true)}
          className="flex h-10 items-center justify-center gap-1.5 rounded-lg bg-[#388E8E] px-4 text-[13px] font-semibold text-white transition-colors hover:bg-[#2c7a7a] md:text-[14px]"
        >
          <div className="flex gap-1.5 items-center">
            <span className="material-symbols-outlined text-[20px]">add</span>
            <span>New Template</span>
          </div>
        </Button>
      </section>

      <ChecklistTemplatesTable
        templates={filteredTemplates}
        isLoading={isLoading}
        error={error}
        onEdit={setEditTemplate}
        onDelete={setDeleteTemplate}
      >
        <div className="border-t border-gray-100 bg-white p-4 md:px-6 md:py-4 rounded-b-xl">
          <AppPagination
            currentPage={currentPage}
            lastPage={paginate?.last_page ?? 1}
            from={paginate?.from ?? 0}
            to={paginate?.to ?? 0}
            total={paginate?.total ?? 0}
            isLoading={isLoading}
            label="templates"
            onPageChange={setPage}
          />
        </div>
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