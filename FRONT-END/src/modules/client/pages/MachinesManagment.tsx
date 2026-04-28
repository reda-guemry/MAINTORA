import { useState } from "react";
import {
  DeleteMachineDialog,
  EditMachineModal,
  MachinesPagination,
  MachinesTable,
  useDeleteMachine,
  useEditMachine,
  usePaginateMachines,
  type Machine,
  type MachinePayload,
  type MachineStatus,
} from "@/features/machines";
import { Button, Input } from "@/shared/components/ui";
import { AddMachineFlow } from "../components/AddMachineFlow";

export default function MachinesManagement() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<MachineStatus | "all">(
    "all"
  );
  const [editMachine, setEditMachine] = useState<Machine | null>(null);
  const [deleteMachine, setDeleteMachine] = useState<Machine | null>(null);
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
  const filteredMachines = machines.filter((machine) => {
    const normalizedSearch = search.trim().toLowerCase();
    const matchesSearch =
      normalizedSearch.length === 0 ||
      machine.name.toLowerCase().includes(normalizedSearch) ||
      machine.code.toLowerCase().includes(normalizedSearch) ||
      machine.location.toLowerCase().includes(normalizedSearch);
    const matchesStatus =
      statusFilter === "all" || machine.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  function handleOpenAdd() {
    setIsAddModalOpen(true);
  }

  function handleCloseAdd() {
    setIsAddModalOpen(false);
  }

  function handleOpenEdit(machine: Machine) {
    setEditMachine(machine);
  }

  function handleCloseEdit() {
    setEditMachine(null);
  }

  function handleOpenDelete(machine: Machine) {
    setDeleteMachine(machine);
  }

  function handleCloseDelete() {
    setDeleteMachine(null);
  }

  async function handleEditSubmit(payload: MachinePayload) {
    if (!editMachine) return;

    setIsSavingMachine(true);

    try {
      const response = await editMachineCall(editMachine.id, payload);

      if (response?.data) {
        updateMachineInList(response.data);
        handleCloseEdit();
      }
    } finally {
      setIsSavingMachine(false);
    }
  }

  async function handleDeleteConfirm() {
    if (!deleteMachine) return;

    setIsSavingMachine(true);

    try {
      const response = await deleteMachineCall(deleteMachine.id);

      if (response !== undefined) {
        removeMachineFromList(deleteMachine.id);
        handleCloseDelete();
      }
    } finally {
      setIsSavingMachine(false);
    }
  }

  return (
    <div
      className="min-h-screen w-full p-6 md:p-10"
      style={{
        backgroundColor: "#F8F6F0",
        backgroundImage: "radial-gradient(#d1d1d1 1px, transparent 1px)",
        backgroundSize: "24px 24px",
      }}
    >
      <div className="max-w-7xl mx-auto">
        <div className="mb-10 flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <h1 className="mb-4 text-[44px] font-black  leading-[0.9] tracking-tighter text-[#1A1A1A] md:text-[54px]">
              My Asset <br /> Fleet
            </h1>
            <div className="inline-flex items-center rounded bg-[#DDEEEB] px-3 py-1">
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#388E8E]">
                {machines.length} Registered Machines
              </span>
            </div>
          </div>

          <div className="flex flex-col gap-5 lg:items-end">
            <div className="flex flex-col gap-3 sm:flex-row">
              <div className="relative w-full sm:w-80">
                <div className="pointer-events-none absolute inset-y-0 left-3 flex items-center text-gray-400">
                  <span className="material-symbols-outlined text-[18px]">
                    search
                  </span>
                </div>
                <Input
                  type="text"
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  placeholder="Search by asset name or ID..."
                  className="pl-10 shadow-sm"
                />
              </div>

              <select
                value={statusFilter}
                onChange={(event) =>
                  setStatusFilter(event.target.value as MachineStatus | "all")
                }
                className="rounded-lg border border-gray-200 bg-white px-4 py-3 text-sm font-bold text-gray-700 shadow-sm outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/20"
              >
                <option value="all">All Assets</option>
                <option value="active">Active</option>
                <option value="maintenance">Maintenance</option>
                <option value="anomalous">Anomalous</option>
              </select>
            </div>

            <Button
              type="button"
              onClick={handleOpenAdd}
              className="px-8"
            >
              <span className="material-symbols-outlined text-[18px]">add</span>
              Register New Machine
            </Button>
          </div>
        </div>

        <MachinesTable
          machines={filteredMachines}
          isLoading={isLoading}
          error={error}
          onEdit={handleOpenEdit}
          onDelete={handleOpenDelete}
        >
          <MachinesPagination
            from={paginate?.from ?? 0}
            to={paginate?.to ?? 0}
            total={paginate?.total ?? 0}
            isLoading={isLoading}
            onPrevious={() => setPage(currentPage - 1)}
            onNext={() => setPage(currentPage + 1)}
          />
        </MachinesTable>
      </div>

      <AddMachineFlow
        isOpen={isAddModalOpen}
        onClose={handleCloseAdd}
        onCreated={addMachineToList}
        isLoading={isSavingMachine}
      />

      <EditMachineModal
        machine={editMachine}
        onClose={handleCloseEdit}
        onSubmit={handleEditSubmit}
        isLoading={isSavingMachine}
      />

      <DeleteMachineDialog
        machine={deleteMachine}
        onClose={handleCloseDelete}
        onConfirm={handleDeleteConfirm}
      />
    </div>
  );
}
