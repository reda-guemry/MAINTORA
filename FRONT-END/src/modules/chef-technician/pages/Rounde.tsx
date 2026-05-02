import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMachines } from "@/features/roundes/hooks/useMachines";
import { useTechnicians } from "@/features/roundes/hooks/useTechnisian";
import type { Technician } from "@/features/roundes/types/technician";
import {
  DeleteMaintenancePlanDialog,
  MachineMaintenancePlans,
  hasActiveMaintenancePlan,
  useDeleteMaintenancePlan,
  type MaintenancePlan,
} from "@/features/maintenance-plan";
import { MachinesAssetMap } from "@/features/machines-map";
import { cn } from "@/shared/utils";
import { getMachineBadgeClasses } from "@/shared/utils/machineStatusHelpers";
import type { Machine } from "@/features/roundes";

function getInitials(technician: Technician) {
  return `${technician.first_name[0] ?? ""}${technician.last_name[0] ?? ""}`.toUpperCase();
}

export function Rounde() {
  const navigate = useNavigate();
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [selectedMachineId, setSelectedMachineId] = useState<number | null>(
    null,
  );

  const [deleteMaintenancePlan, setDeleteMaintenancePlan] =
    useState<MaintenancePlan | null>(null);
  const [isSavingMaintenancePlan, setIsSavingMaintenancePlan] = useState(false);

  const {
    technicians,
    isLoading: isLoadingTechnicians,
    error: techniciansError,
    fetchTechnicians,
  } = useTechnicians();
  const {
    machines,
    isLoading: isLoadingMachines,
    error: machinesError,
    fetchMachines,
    removeMaintenancePlanFromMachine,
  } = useMachines();
  const { deleteMaintenancePlanCall, error: deleteMaintenancePlanError } =
    useDeleteMaintenancePlan();

  useEffect(() => {
    fetchTechnicians();
    fetchMachines();
  }, []);

  useEffect(() => {
    setDeleteMaintenancePlan(null);
  }, [selectedMachineId]);

  const selectedMachine = useMemo(
    () => machines.find((machine) => machine.id === selectedMachineId) ?? null,
    [machines, selectedMachineId],
  );
  const totalMaintenancePlans = useMemo(
    () =>
      machines.reduce(
        (totalPlans, machine) =>
          totalPlans + (machine.maintenance_plans?.length ?? 0),
        0,
      ),
    [machines],
  );

  const sidebarTechnicians = technicians;
  const sidebarTitle = selectedMachine ? "Machine Focus" : "Technician Roster";
  const sidebarSubtitle = selectedMachine
    ? "Review this machine, manage its maintenance plans, and keep the available technicians nearby."
    : "Select a machine marker on the map to inspect it and keep the technicians list in view.";
  const selectedMachinePlans = selectedMachine?.maintenance_plans ?? [];
  const sidebarDataError = machinesError ?? techniciansError;
  const selectedMachineHasActivePlan = selectedMachine
    ? hasActiveMaintenancePlan(selectedMachine)
    : false;

  function handleMarkerSelect(marker: Machine) {
    setSelectedMachineId(marker.id);
    setSidebarOpen(true);
  }

  function handleClearSelection() {
    setSelectedMachineId(null);
  }

  function handleCreateMaintenancePlanClick() {
    if (!selectedMachine) {
      return;
    }

    if (hasActiveMaintenancePlan(selectedMachine)) {
      return;
    }

    navigate(`/chef-technician/maintenance-cycles?mode=create&machineId=${selectedMachine.id}`);
  }

  function handleEditMaintenancePlanClick(maintenancePlan: MaintenancePlan) {
    navigate(`/chef-technician/maintenance-cycles?mode=edit&planId=${maintenancePlan.id}`);
  }


  async function handleDeleteMaintenancePlanConfirm() {
    if (!selectedMachine || !deleteMaintenancePlan) {
      return;
    }

    setIsSavingMaintenancePlan(true);

    try {
      const response = await deleteMaintenancePlanCall(
        deleteMaintenancePlan.id,
      );

      if (response !== undefined) {
        removeMaintenancePlanFromMachine(
          selectedMachine.id,
          deleteMaintenancePlan.id,
        );
        setDeleteMaintenancePlan(null);
      }
    } finally {
      setIsSavingMaintenancePlan(false);
    }
  }

  return (
    <div className="relative h-[calc(100vh-8rem)] w-full overflow-hidden rounded-[32px] bg-[#ebe4d8] shadow-[0_20px_60px_rgba(62,52,39,0.15)]">
      <div className="absolute inset-0 z-0">
        <MachinesAssetMap
          machines={machines}
          selectedMachineId={selectedMachineId}
          onMarkerSelect={handleMarkerSelect}
          onMapBackgroundClick={handleClearSelection}
        />
      </div>

      <div className="pointer-events-none absolute left-6 right-6 top-6 z-10 flex flex-col items-end justify-between gap-4 md:flex-row md:items-start">
        <div className="pointer-events-auto flex items-start gap-3">
          <div
            className={cn(
              "max-w-[340px] rounded-[24px] border border-white/60 bg-white/95 p-5 shadow-lg backdrop-blur-md transition-opacity duration-300",
              isSidebarOpen ? "opacity-0 md:opacity-100" : "opacity-100",
            )}
          >
            <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-[#948674]">
              Round Map
            </p>
            <h1 className="mt-2 text-xl font-black leading-tight tracking-tight text-[#2d241c]">
              Visualize every machine and keep technicians ready nearby.
            </h1>
          </div>

          <button
            type="button"
            onClick={() => setSidebarOpen((currentValue) => !currentValue)}
            className={cn(
              "flex h-10 w-10 shrink-0 items-center justify-center rounded-[14px] border border-white/60 bg-white/95 text-[#6f6254] shadow-lg backdrop-blur-md transition-all hover:bg-white",
              !isSidebarOpen && "md:hidden",
            )}
          >
            <span className="material-symbols-outlined text-[20px]">
              {isSidebarOpen ? "left_panel_close" : "left_panel_open"}
            </span>
          </button>
        </div>

        <div className="pointer-events-auto flex flex-wrap gap-3">
          <div className="flex flex-col items-center justify-center rounded-[20px] border border-white/60 bg-white/95 px-5 py-3 shadow-lg backdrop-blur-md">
            <p className="text-[9px] font-bold uppercase tracking-[0.24em] text-[#988a79]">
              Machines
            </p>
            <p className="mt-1 text-xl font-black text-[#2d241c]">
              {machines.length}
            </p>
          </div>
          <div className="flex flex-col items-center justify-center rounded-[20px] border border-white/60 bg-white/95 px-5 py-3 shadow-lg backdrop-blur-md">
            <p className="text-[9px] font-bold uppercase tracking-[0.24em] text-[#988a79]">
              Technicians
            </p>
            <p className="mt-1 text-xl font-black text-[#2d241c]">
              {technicians.length}
            </p>
          </div>
          <div className="flex flex-col items-center justify-center rounded-[20px] border border-white/60 bg-white/95 px-5 py-3 shadow-lg backdrop-blur-md">
            <p className="text-[9px] font-bold uppercase tracking-[0.24em] text-[#988a79]">
              Plans
            </p>
            <p className="mt-1 text-xl font-black text-[#2d241c]">
              {selectedMachine
                ? selectedMachinePlans.length
                : totalMaintenancePlans}
            </p>
          </div>
        </div>
      </div>

      <div className="pointer-events-none absolute bottom-6 right-6 z-10 flex flex-col items-end gap-3">
        <div className="pointer-events-auto rounded-[20px] border border-white/80 bg-white/95 px-4 py-3 shadow-[0_14px_30px_rgba(62,52,39,0.1)] backdrop-blur-md">
          <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-[#988a79]">
            Map Legend
          </p>
          <div className="mt-2 space-y-1.5 text-xs font-medium text-[#6f6254]">
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-[#3b8f88]" />
              Operational machine
            </div>
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-[#d58a1d]" />
              Warning or maintenance
            </div>
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-[#d9534f]" />
              Critical machine
            </div>
          </div>
        </div>

        <div className="pointer-events-auto max-w-70 rounded-[20px] border border-white/80 bg-white/95 px-4 py-3 text-[11px] leading-5 text-[#6f6254] shadow-[0_14px_30px_rgba(62,52,39,0.1)] backdrop-blur-md">
          Click a machine marker to zoom into it. Click anywhere on the map to
          go back to the full technician roster.
        </div>
      </div>

      <aside
        className={cn(
          "pointer-events-auto absolute bottom-6 top-40 z-20 flex w-[min(26rem,calc(100%-3rem))] flex-col overflow-hidden rounded-3xl border border-white/60 bg-white/95 shadow-[0_24px_48px_rgba(62,52,39,0.15)] backdrop-blur-xl transition-all duration-300",
          isSidebarOpen
            ? "left-6 opacity-100"
            : "-left-full opacity-0",
        )}
      >
        <div className="shrink-0 border-b border-[#ece3d7] bg-white/50 px-5 py-4">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0 flex-1">
              <p className="text-[9px] font-bold uppercase tracking-[0.24em] text-[#988a79]">
                {sidebarTitle}
              </p>
              <h2 className="mt-1 truncate text-lg font-black text-[#2d241c]">
                {selectedMachine
                  ? selectedMachine.name
                  : "All Available Technicians"}
              </h2>
            </div>
            {selectedMachine && (
              <button
                type="button"
                onClick={handleClearSelection}
                className="shrink-0 rounded-full border border-[#ddd5c8] bg-white px-3 py-1.5 text-[9px] font-bold uppercase tracking-[0.18em] text-[#6f6254] transition-colors hover:border-[#cfc4b4] hover:bg-[#f8f2e8]"
              >
                Clear
              </button>
            )}
          </div>

          {!selectedMachine && (
            <p className="mt-1.5 text-xs leading-5 text-[#6f6254]">
              {sidebarSubtitle}
            </p>
          )}

          {selectedMachine && (
            <div className="mt-3 rounded-[16px] border border-[#e6dbcd] bg-[#fbfaf8] p-3 shadow-sm">
              <div className="flex items-center justify-between gap-2">
                <div className="min-w-0 flex-1">
                  <p className="truncate text-[10px] font-bold uppercase tracking-[0.22em] text-[#988a79]">
                    {selectedMachine.code}
                  </p>
                  <p className="truncate text-sm font-black text-[#2d241c]">
                    {selectedMachine.location}
                  </p>
                </div>
                <span
                  className={cn(
                    "shrink-0 rounded-full px-2.5 py-1 text-[9px] font-black uppercase tracking-[0.16em]",
                    getMachineBadgeClasses(selectedMachine.status),
                  )}
                >
                  {selectedMachine.status}
                </span>
              </div>
              <button
                type="button"
                onClick={() =>
                  navigate(`/chef-technician/machines/${selectedMachine.id}/history`)
                }
                className="mt-3 flex w-full items-center justify-center gap-2 rounded-[14px] border border-[#d5eee9] bg-white px-3 py-2 text-[10px] font-black uppercase tracking-[0.18em] text-primary transition-colors hover:bg-[#edf8f7]"
              >
                <span className="material-symbols-outlined text-[16px]">
                  history
                </span>
                History
              </button>
            </div>
          )}
        </div>

        <div className="flex-1 overflow-y-auto px-5 py-4 custom-scrollbar">
          {selectedMachine && (
            <div className="mb-5">
              <MachineMaintenancePlans
                hasActivePlan={selectedMachineHasActivePlan}
                machineName={selectedMachine.name}
                maintenancePlans={selectedMachinePlans}
                onAdd={handleCreateMaintenancePlanClick}
                onEdit={handleEditMaintenancePlanClick}
                onDelete={setDeleteMaintenancePlan}
              />
            </div>
          )}

          <div className="mb-3 flex items-center justify-between">
            <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#988a79]">
              Technicians
            </p>
            <span className="rounded-full bg-[#e1efed] px-2.5 py-1 text-[9px] font-black uppercase tracking-[0.18em] text-[#3b8f88]">
              {sidebarTechnicians.length} Ready
            </span>
          </div>

          <div className="space-y-2">
            {sidebarDataError ? (
              <div className="rounded-[16px] border border-dashed border-[#ecd6d6] bg-white/50 px-3 py-4 text-xs text-[#8a4f4f]">
                {sidebarDataError}
              </div>
            ) : isLoadingMachines || isLoadingTechnicians ? (
              <div className="rounded-[16px] border border-dashed border-[#ddd5c8] bg-white/50 px-3 py-4 text-xs text-[#7f7468]">
                Loading workspace data...
              </div>
            ) : sidebarTechnicians.length === 0 ? (
              <div className="rounded-[16px] border border-dashed border-[#ddd5c8] bg-white/50 px-3 py-4 text-xs text-[#7f7468]">
                No technicians available right now.
              </div>
            ) : (
              sidebarTechnicians.map((technician, index) => (
                <div
                  key={technician.id}
                  className="rounded-[16px] border border-[#e7ddd0] bg-white p-3 shadow-[0_2px_8px_rgba(62,52,39,0.04)] transition-transform hover:-translate-y-0.5"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[10px] bg-[#dff1ef] text-xs font-black text-[#3b8f88]">
                      {getInitials(technician)}
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between gap-2">
                        <p className="truncate text-xs font-bold text-[#2d241c]">
                          {technician.first_name} {technician.last_name}
                        </p>
                        <span className="shrink-0 rounded-full bg-[#f7f3ec] px-2 py-0.5 text-[9px] font-black uppercase tracking-[0.18em] text-[#816b55]">
                          #{index + 1}
                        </span>
                      </div>

                      <div className="mt-0.5 flex items-center justify-between gap-2">
                        <p className="truncate text-[11px] text-[#6f6254]">
                          {technician.email}
                        </p>
                        <p className="shrink-0 text-[9px] font-semibold uppercase tracking-[0.12em] text-[#9d9388]">
                          {technician.phone || "N/A"}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </aside>

      <DeleteMaintenancePlanDialog
        maintenancePlan={deleteMaintenancePlan}
        onClose={() => setDeleteMaintenancePlan(null)}
        onConfirm={handleDeleteMaintenancePlanConfirm}
        isLoading={isSavingMaintenancePlan}
        error={deleteMaintenancePlanError}
      />
    </div>
  );
}
