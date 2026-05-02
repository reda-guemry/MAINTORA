import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMachines } from "@/features/roundes/hooks/useMachines";
import { useTechnicians } from "@/features/roundes/hooks/useTechnisian";
import {
  DeleteMaintenancePlanDialog,
  MachineMaintenancePlans,
  hasActiveMaintenancePlan,
  useDeleteMaintenancePlan,
  type MaintenancePlan,
} from "@/features/maintenance-plan";
import { MachinesAssetMap } from "@/features/machines-map";
import { ActionButtons, MachineInfoCard, MapSidebar } from "@/shared/components";
import { getMachineBadgeClasses } from "@/shared/utils/machineStatusHelpers";
import type { Machine } from "@/features/roundes";


export function Rounde() {
  const navigate = useNavigate();
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [selectedMachineId, setSelectedMachineId] = useState<number | null>(null);
  const [deleteMaintenancePlan, setDeleteMaintenancePlan] = useState<MaintenancePlan | null>(null);
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
  const { deleteMaintenancePlanCall, error: deleteMaintenancePlanError } = useDeleteMaintenancePlan();

  useEffect(() => {
    fetchTechnicians();
    fetchMachines();
  }, []);

  useEffect(() => {
    setDeleteMaintenancePlan(null);
    if (selectedMachineId) setSidebarOpen(true);
  }, [selectedMachineId]);

  const selectedMachine = useMemo(
    () => machines.find((machine) => machine.id === selectedMachineId) ?? null,
    [machines, selectedMachineId],
  );
  const totalMaintenancePlans = useMemo(
    () =>
      machines.reduce(
        (totalPlans, machine) => totalPlans + (machine.maintenance_plans?.length ?? 0),
        0,
      ),
    [machines],
  );

  const sidebarDataError = machinesError ?? techniciansError;
  const selectedMachineHasActivePlan = selectedMachine ? hasActiveMaintenancePlan(selectedMachine) : false;
  const selectedMachinePlans = selectedMachine?.maintenance_plans ?? [];

  function handleMarkerSelect(marker: Machine) {
    setSelectedMachineId(marker.id);
  }

  function handleClearSelection() {
    setSelectedMachineId(null);
  }

  function handleCreateMaintenancePlanClick() {
    if (!selectedMachine || hasActiveMaintenancePlan(selectedMachine)) return;
    navigate(`/chef-technician/maintenance-cycles?mode=create&machineId=${selectedMachine.id}`);
  }

  function handleEditMaintenancePlanClick(maintenancePlan: MaintenancePlan) {
    navigate(`/chef-technician/maintenance-cycles?mode=edit&planId=${maintenancePlan.id}`);
  }

  async function handleDeleteMaintenancePlanConfirm() {
    if (!selectedMachine || !deleteMaintenancePlan) return;
    setIsSavingMaintenancePlan(true);

    try {
      const response = await deleteMaintenancePlanCall(deleteMaintenancePlan.id);
      if (response !== undefined) {
        removeMaintenancePlanFromMachine(selectedMachine.id, deleteMaintenancePlan.id);
        setDeleteMaintenancePlan(null);
      }
    } finally {
      setIsSavingMaintenancePlan(false);
    }
  }

  return (
    <div className="relative flex h-[calc(100vh-6rem)] w-full overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
      <MapSidebar
        isOpen={isSidebarOpen}
        title={selectedMachine ? "Machine Details" : "Technicians"}
        subtitle={selectedMachine ? selectedMachine.location : "Available for assignment"}
        showToggle
        onToggle={() => setSidebarOpen((prev) => !prev)}
        onClose={selectedMachine ? handleClearSelection : undefined}
        closeLabel="Back"
      >
          {selectedMachine ? (
            <div className="animate-in fade-in slide-in-from-left-4 duration-300">
              <MachineInfoCard
                machineData={selectedMachine}
                statusClassName={getMachineBadgeClasses(selectedMachine.status)}
              >
                <ActionButtons
                  actions={[
                    {
                      label: "View History",
                      icon: "history",
                      variant: "secondary",
                      onClick: () =>
                        navigate(`/chef-technician/machines/${selectedMachine.id}/history`),
                    },
                  ]}
                />
              </MachineInfoCard>

              <div className="mt-4">
                <MachineMaintenancePlans
                  hasActivePlan={selectedMachineHasActivePlan}
                  machineName={selectedMachine.name}
                  maintenancePlans={selectedMachinePlans}
                  onAdd={handleCreateMaintenancePlanClick}
                  onEdit={handleEditMaintenancePlanClick}
                  onDelete={setDeleteMaintenancePlan}
                />
              </div>
            </div>
          ) : (
            <div className="animate-in fade-in duration-300 space-y-3">
              {sidebarDataError ? (
                <div className="rounded-xl border border-red-100 bg-red-50 p-4 text-[13px] text-red-600">
                  {sidebarDataError}
                </div>
              ) : isLoadingMachines || isLoadingTechnicians ? (
                <div className="text-center text-[13px] text-gray-500 py-6">Loading data...</div>
              ) : technicians.length === 0 ? (
                <div className="text-center text-[13px] text-gray-500 py-6">No technicians available.</div>
              ) : (
                technicians.map((technician) => (
                  <div
                    key={technician.id}
                    className="flex cursor-pointer flex-col rounded-xl border border-gray-200 bg-white p-4 shadow-sm transition-all hover:border-[#388E8E]/40 hover:shadow-md"
                  >
                    <div className="mb-2 flex items-center justify-between">
                       <span className="rounded bg-[#eef7f6] px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-[#388E8E]">
                         Ready
                       </span>
                       <span className="text-[11px] text-gray-400">Available</span>
                    </div>
                    <h3 className="text-[14px] font-bold text-[#1A1A1A]">
                      {technician.first_name} {technician.last_name}
                    </h3>
                    <p className="mt-0.5 text-[12px] text-gray-500">{technician.email}</p>
                  </div>
                ))
              )}
            </div>
          )}
      </MapSidebar>

      <main className="relative flex-1 bg-[#F0F2F5]">
        <div className="absolute inset-0 z-0">
          <MachinesAssetMap
            machines={machines}
            selectedMachineId={selectedMachineId}
            onMarkerSelect={handleMarkerSelect}
            onMapBackgroundClick={handleClearSelection}
          />
        </div>

        <div className="pointer-events-auto absolute bottom-6 left-6 z-10 hidden w-60 rounded-xl border border-gray-100 bg-white p-4 shadow-lg sm:block">
          <p className="mb-3 text-[10px] font-bold uppercase tracking-wider text-gray-400">
            Live Feed Status
          </p>
          <div className="space-y-3">
            <div className="flex items-center gap-3 text-[12px] font-medium text-gray-700">
              <span className="material-symbols-outlined text-[16px] text-red-500">warning</span>
              Machines Total ({machines.length})
            </div>
            <div className="flex items-center gap-3 text-[12px] font-medium text-gray-700">
              <span className="material-symbols-outlined text-[16px] text-[#388E8E]">engineering</span>
              Technicians Active ({technicians.length})
            </div>
            <div className="flex items-center gap-3 text-[12px] font-medium text-gray-700">
              <span className="material-symbols-outlined text-[16px] text-gray-400">assignment</span>
              Total Plans ({totalMaintenancePlans})
            </div>
          </div>
        </div>

        <div className="pointer-events-auto absolute bottom-6 right-6 z-10 hidden w-55 rounded-xl border border-gray-100 bg-white p-4 shadow-lg sm:block">
          <p className="mb-3 text-[10px] font-bold uppercase tracking-wider text-gray-400">
            Map Legend
          </p>
          <div className="space-y-2.5 text-[12px] font-medium text-gray-600">
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-[#388E8E]" />
              Operational
            </div>
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-amber-500" />
              Warning / Maint.
            </div>
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-red-500" />
              Critical
            </div>
          </div>
        </div>
      </main>

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
