import { useMemo, useState } from "react";
import { Alert } from "@/shared/components/feedback";
import { Spinner } from "@/shared/components/ui";
import { ActionButtons, DetailRow, MachineInfoCard, MapSidebar } from "@/shared/components";
import { useTechnicianMachines } from "@/features/technician-map";
import { useTodayMaintenanceTasks } from "@/features/technician-maintenance";
import { TechnicianAssetMap } from "../components/TechnicianAssetMap";
import { getStatusClasses, getStatusLabel } from "../utils/getStatus";
import { useNavigate } from "react-router-dom";

function MapPage() {
  const navigate = useNavigate();
  const { machines, isLoading, error } = useTechnicianMachines();
  const { tasks } = useTodayMaintenanceTasks();
  const [selectedMachineId, setSelectedMachineId] = useState<number | null>(null);

  const selectedMachine = useMemo(
    () => machines.find((m) => m.id === selectedMachineId) ?? null,
    [machines, selectedMachineId]
  );

  const statusSummary = useMemo(() => ({
    active: machines.filter((m) => m.status === "active").length,
    anomalous: machines.filter((m) => m.status === "anomalous").length,
    maintenance: machines.filter((m) => m.status === "maintenance").length,
  }), [machines]);

  const selectedTodayTask = useMemo(() => {
    if (!selectedMachine || selectedMachine.status !== "maintenance") {
      return null;
    }

    return (
      tasks.find((task) => {
        return (
          task.machine.id === selectedMachine.id &&
          task.status == "pending"
        );
      }) ?? null
    );
  }, [selectedMachine, tasks]);

  if (isLoading) {
    return (
      <div className="flex min-h-[70vh] w-full flex-col items-center justify-center rounded-4xl border border-[#dce5e2] bg-[#f8faf9] md:rounded-[40px]">
        <Spinner />
        <p className="mt-4 text-[10px] font-black uppercase tracking-[0.3em] text-[#6ba5a5]">System Initializing</p>
      </div>
    );
  }

  if (error) return <Alert variant="error" title="Connection Error">{error}</Alert>;

  return (
    <div className="w-full px-4 pb-4 md:px-6 md:pb-6">
      <section className="relative h-[calc(100vh-6rem)] min-h-137 w-full overflow-hidden rounded-[28px] border-[6px] border-white bg-[#e8eae9] shadow-[0_12px_40px_-10px_rgba(0,0,0,0.1)] md:h-[calc(100vh-8rem)] md:min-h-150 md:rounded-[40px] md:border-8 md:shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)]">
        
        <div className="absolute inset-0 z-0">
          <TechnicianAssetMap
            machines={machines}
            selectedMachineId={selectedMachineId}
            onMarkerSelect={(m) => setSelectedMachineId(m.id)}
            onMapBackgroundClick={() => setSelectedMachineId(null)}
          />
        </div>

        <div className="pointer-events-none absolute inset-x-0 top-0 z-10 flex flex-col items-start justify-between gap-4 p-5 sm:flex-row md:p-8">
          <div className="pointer-events-auto">
            <div className="flex items-center gap-3 md:gap-4">
              <h1 className="text-[26px] font-black tracking-tight text-[#2d241c] md:text-[32px]">Asset Radar</h1>
            </div>
            <p className="ml-13 mt-0.5 text-[9px] font-black uppercase tracking-[0.2em] text-[#648080] md:ml-16 md:mt-1 md:text-[11px]">Precision Monitoring</p>
          </div>

          <div className="pointer-events-auto flex gap-2 md:gap-3">
            <div className="flex min-w-20 flex-col items-end rounded-2xl bg-white px-4 py-2.5 shadow-sm md:min-w-25 md:px-5 md:py-3">
              <span className="text-[9px] font-black uppercase tracking-[0.2em] text-[#9d9388] md:text-[10px]">Fleet</span>
              <span className="mt-1 text-xl font-black leading-none text-[#2d241c] md:text-2xl">{machines.length}</span>
            </div>
            <div className="flex min-w-20 flex-col items-end rounded-2xl bg-[#d9534f] px-4 py-2.5 text-white shadow-sm md:min-w-25 md:px-5 md:py-3">
              <span className="text-[9px] font-black uppercase tracking-[0.2em] opacity-80 md:text-[10px]">Alerts</span>
              <span className="mt-1 text-xl font-black leading-none md:text-2xl">{statusSummary.anomalous}</span>
            </div>
          </div>
        </div>

        <MapSidebar
          isOpen={!!selectedMachine}
          title="Machine Details"
          subtitle={selectedMachine?.location}
          onClose={() => setSelectedMachineId(null)}
        >
          {selectedMachine && (
            <div className="space-y-4">
              <MachineInfoCard
                machineData={selectedMachine}
                statusClassName={getStatusClasses(selectedMachine.status)}
              />

              <div className="space-y-3">
                <DetailRow
                  icon="location_on"
                  label="Zone / Floor"
                  value={selectedMachine.location}
                />
                <DetailRow
                  icon="sensors"
                  label="Health Status"
                  value={getStatusLabel(selectedMachine.status)}
                />
              </div>

              {selectedMachine.status === "maintenance" && (
                <div className="rounded-xl border border-[#b9dfdc] bg-[#edf8f7] px-4 py-3">
                  <div className="flex items-center gap-2 text-[#3b8f88]">
                    <span className="material-symbols-outlined text-[18px]">build_circle</span>
                    <p className="text-[10px] font-black uppercase tracking-[0.18em]">Maintenance today</p>
                  </div>
                  <p className="mt-2 text-[13px] font-semibold leading-tight text-[#2d241c]">
                    Cette machine est en maintenance aujourd'hui.
                  </p>
                </div>
              )}

              <ActionButtons
                columns={selectedMachine.status === "maintenance" ? 2 : 1}
                actions={[
                  ...(selectedMachine.status === "maintenance"
                    ? [
                        {
                          label: "Submit",
                          icon: "task_alt",
                          disabled: !selectedTodayTask,
                          onClick: () =>
                            selectedTodayTask &&
                            navigate(`/technician/maintenance/${selectedTodayTask.id}`),
                        },
                      ]
                    : []),
                  {
                    label: "History",
                    icon: "history",
                    variant: "outline",
                    onClick: () =>
                      navigate(`/technician/machines/${selectedMachine.id}/history`),
                  },
                ]}
              />
            </div>
          )}
        </MapSidebar>

      </section>
    </div>
  );
}

export default MapPage;
