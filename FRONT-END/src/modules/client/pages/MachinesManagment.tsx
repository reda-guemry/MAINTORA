import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  DeleteMachineDialog,
  EditMachineModal,
  MachinesTable,
  useDeleteMachine,
  useEditMachine,
  usePaginateMachines,
  type Machine,
  type MachinePayload,
} from "@/features/machines";
import { AppPagination } from "@/shared/components";
import { Input } from "@/shared/components/ui";
import { AddMachineFlow } from "../components/AddMachineFlow";
import { useFiltering, useModalState } from "@/shared";

export default function MachinesManagement() {
  const navigate = useNavigate();
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isSavingMachine, setIsSavingMachine] = useState(false);

  const { editMachineCall } = useEditMachine();
  const { deleteMachineCall } = useDeleteMachine();
  const {
    paginate,
    isLoading,
    currentPage,
    setPage,
    error,
    addMachineToList,
    updateMachineInList,
    removeMachineFromList,
  } = usePaginateMachines();

  const machines = paginate?.data ?? [];

  const { filtered: filteredMachines, search, setSearch, filters, setFilter } = useFiltering(
    machines,
    (machine, searchTerm) =>
      machine.name.toLowerCase().includes(searchTerm) ||
      machine.code.toLowerCase().includes(searchTerm) ||
      machine.location.toLowerCase().includes(searchTerm),
    { status: "all" },
  );

  const editModal = useModalState<Machine>(null);
  const deleteModal = useModalState<Machine>(null);

  async function handleEditSubmit(payload: MachinePayload) {
    if (!editModal.item) return;

    setIsSavingMachine(true);

    try {
      const response = await editMachineCall(editModal.item.id, payload);

      if (response?.data) {
        updateMachineInList(response.data);
        editModal.close();
      }
    } finally {
      setIsSavingMachine(false);
    }
  }

  async function handleDeleteConfirm() {
    if (!deleteModal.item) return;

    setIsSavingMachine(true);

    try {
      const response = await deleteMachineCall(deleteModal.item.id);

      if (response !== undefined) {
        removeMachineFromList(deleteModal.item.id);
        deleteModal.close();
      }
    } finally {
      setIsSavingMachine(false);
    }
  }

  return (
    <div className="min-h-screen w-full bg-slate-50 p-6 md:p-10">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-slate-900">
              My Asset Fleet
            </h1>
            <p className="mt-1 text-sm text-slate-500">
              Manage and monitor your registered machines and their statuses.
            </p>
            <div className="mt-3 inline-flex items-center rounded-md bg-teal-50 px-2.5 py-1 border border-teal-100">
              <span className="text-[10px] font-bold uppercase tracking-widest text-teal-700">
                {machines.length} Registered Machines
              </span>
            </div>
          </div>

          <div className="flex flex-col gap-4 lg:items-end">
            <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:items-center">
              <div className="relative w-full sm:w-72">
                <div className="pointer-events-none absolute inset-y-0 left-3 flex items-center text-slate-400">
                  <span className="material-symbols-outlined text-[18px]">
                    search
                  </span>
                </div>
                <Input
                  type="text"
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  placeholder="Search by asset name or ID..."
                  className="h-11 w-full rounded-xl border-slate-200 bg-white pl-10 text-sm text-slate-900 shadow-sm placeholder:text-slate-400 focus:border-[#43968C] focus:ring-2 focus:ring-[#43968C]/20"
                />
              </div>

              <select
                value={filters.status}
                onChange={(event) =>
                  setFilter("status", event.target.value)
                }
                className="h-11 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 shadow-sm outline-none transition-colors hover:bg-slate-50 focus:border-[#43968C] focus:ring-2 focus:ring-[#43968C]/20"
              >
                <option value="all">All Assets</option>
                <option value="active">Active</option>
                <option value="maintenance">Maintenance</option>
                <option value="anomalous">Anomalous</option>
              </select>

              <button
                type="button"
                onClick={() => setIsAddModalOpen(true)}
                className="flex h-11 items-center justify-center gap-2 rounded-xl bg-[#43968C] px-5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-[#367971]"
              >
                <span className="material-symbols-outlined text-[18px]">add</span>
                Register New Machine
              </button>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden">
          <MachinesTable
            machines={filteredMachines}
            isLoading={isLoading}
            error={error}
            onEdit={editModal.open}
            onDelete={deleteModal.open}
            onHistory={(machine) => navigate(`/client/machines/${machine.id}/history`)}
          >
            <div className="border-t border-slate-100 bg-white px-6 py-4">
              <AppPagination
                currentPage={currentPage}
                lastPage={paginate?.last_page ?? 1}
                from={paginate?.from ?? 0}
                to={paginate?.to ?? 0}
                total={paginate?.total ?? 0}
                isLoading={isLoading}
                label="assets"
                onPageChange={setPage}
              />
            </div>
          </MachinesTable>
        </div>
      </div>

      <AddMachineFlow
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onCreated={addMachineToList}
        isLoading={isSavingMachine}
      />

      <EditMachineModal
        machine={editModal.item}
        onClose={editModal.close}
        onSubmit={handleEditSubmit}
        isLoading={isSavingMachine}
      />

      <DeleteMachineDialog
        machine={deleteModal.item}
        onClose={deleteModal.close}
        onConfirm={handleDeleteConfirm}
      />
    </div>
  );
}