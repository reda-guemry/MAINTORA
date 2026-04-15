import { useState } from "react";
import {
  AddMachineModal,
  DeleteMachineDialog,
  EditMachineModal,
  MachinesPagination,
  MachinesTable,
  type Machine,
  type MachinePayload,
  type MachineStatus,
} from "@/features/machines";
import { Button, Input } from "@/shared/components/ui";

const initialMachines: Machine[] = [
  {
    id: 1,
    asset_id: "CNC-2824-001",
    name: "Precision Mill Pro V4",
    category: "CNC Milling Machine",
    last_service: "2024-03-12",
    status: "operational",
  },
  {
    id: 2,
    asset_id: "HYD-2824-012",
    name: "Hydraulic Press 50T",
    category: "Fabrication Unit",
    last_service: "2024-02-28",
    status: "maintenance",
  },
  {
    id: 3,
    asset_id: "LSR-2824-005",
    name: "Laser Cutter Alpha-G",
    category: "Precision Cutting",
    last_service: "2024-01-15",
    status: "offline",
  },
];

const statusFilters: Array<MachineStatus | "all"> = [
  "all",
  "operational",
  "maintenance",
  "offline",
];

export default function MachinesManagement() {
  const [machines, setMachines] = useState<Machine[]>(initialMachines);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<MachineStatus | "all">(
    "all"
  );
  const [editMachine, setEditMachine] = useState<Machine | null>(null);
  const [deleteMachine, setDeleteMachine] = useState<Machine | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isSavingMachine, setIsSavingMachine] = useState(false);

  const filteredMachines = machines.filter((machine) => {
    const normalizedSearch = search.trim().toLowerCase();
    const matchesSearch =
      normalizedSearch.length === 0 ||
      machine.name.toLowerCase().includes(normalizedSearch) ||
      machine.asset_id.toLowerCase().includes(normalizedSearch) ||
      machine.category.toLowerCase().includes(normalizedSearch);
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

  async function handleAddSubmit(payload: MachinePayload) {
    setIsSavingMachine(true);

    try {
      // Replace this local update with the create machine API when it is ready.
      setMachines((currentMachines) => [
        {
          id: Date.now(),
          ...payload,
        },
        ...currentMachines,
      ]);
      handleCloseAdd();
    } finally {
      setIsSavingMachine(false);
    }
  }

  async function handleEditSubmit(payload: MachinePayload) {
    if (!editMachine) return;

    setIsSavingMachine(true);

    try {
      // Replace this local update with the update machine API when it is ready.
      setMachines((currentMachines) =>
        currentMachines.map((machine) =>
          machine.id === editMachine.id ? { ...machine, ...payload } : machine
        )
      );
      handleCloseEdit();
    } finally {
      setIsSavingMachine(false);
    }
  }

  function handleDeleteConfirm() {
    if (!deleteMachine) return;

    // Replace this local update with the delete machine API when it is ready.
    setMachines((currentMachines) =>
      currentMachines.filter((machine) => machine.id !== deleteMachine.id)
    );
    handleCloseDelete();
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
            <h1 className="mb-4 text-[44px] font-[900] leading-[0.9] tracking-tighter text-[#1A1A1A] md:text-[54px]">
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
                {statusFilters.map((status) => (
                  <option key={status} value={status}>
                    Status: {status === "all" ? "All Assets" : status}
                  </option>
                ))}
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
          isLoading={false}
          error={null}
          onEdit={handleOpenEdit}
          onDelete={handleOpenDelete}
        >
          <MachinesPagination
            from={filteredMachines.length > 0 ? 1 : 0}
            to={filteredMachines.length}
            total={filteredMachines.length}
            isLoading={false}
            onPrevious={() => undefined}
            onNext={() => undefined}
          />
        </MachinesTable>
      </div>

      <AddMachineModal
        isOpen={isAddModalOpen}
        onClose={handleCloseAdd}
        onSubmit={handleAddSubmit}
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
