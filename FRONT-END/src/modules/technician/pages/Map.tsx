import { useMemo, useState } from "react";
import { Alert } from "@/shared/components/feedback";
import { Spinner } from "@/shared/components/ui";
import { cn } from "@/shared/utils";
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

        <div
          className={cn(
            "pointer-events-auto absolute bottom-0 left-0 z-20 w-full overflow-y-auto rounded-t-4xl bg-white/95 p-6 shadow-[0_-10px_40px_rgba(0,0,0,0.1)] backdrop-blur-xl transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] md:bottom-auto md:top-1/2 md:w-96 md:-translate-y-1/2 md:rounded-4xl md:p-8 md:shadow-[0_32px_64px_rgba(0,0,0,0.12)]",
            selectedMachine
              ? "max-h-[85vh] translate-y-0 opacity-100 md:left-8 md:translate-x-0"
              : "translate-y-full opacity-0 md:left-0 md:translate-y-0 md:-translate-x-full"
          )}
        >
          {selectedMachine && (
            <div className="flex h-full flex-col">
              <div className="mb-5 flex items-center justify-between md:mb-6">
                <div className="h-1.5 w-10 rounded-full bg-[#3b8f88]/20 md:w-12"></div>
                <span
                  className={cn(
                    "rounded-lg px-2.5 py-1 text-[9px] font-black uppercase tracking-widest md:px-3 md:py-1.5 md:text-[10px]",
                    getStatusClasses(selectedMachine.status)
                  )}
                >
                  {selectedMachine.status}
                </span>
              </div>

              <h2 className="text-[24px] font-black leading-none text-[#2d241c] md:text-[28px]">{selectedMachine.name}</h2>
              <p className="mt-2 font-mono text-[11px] font-bold uppercase tracking-wider text-[#6ba5a5] md:text-[12px]">{selectedMachine.code}</p>

              <div className="mt-6 space-y-3 md:mt-8 md:space-y-4">
                <div className="flex items-center gap-3 rounded-2xl border border-[#edf2f1] bg-[#f8faf9] p-3 md:gap-4 md:p-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-[#3b8f88] shadow-sm md:h-12 md:w-12">
                    <span className="material-symbols-outlined text-[20px] md:text-[24px]">location_on</span>
                  </div>
                  <div>
                    <p className="text-[9px] font-black uppercase tracking-widest text-[#9d9388] md:text-[10px]">Zone / Floor</p>
                    <p className="mt-0.5 text-[13px] font-bold text-[#2d241c] md:text-[14px]">{selectedMachine.location}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 rounded-2xl border border-[#edf2f1] bg-[#f8faf9] p-3 md:gap-4 md:p-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-[#3b8f88] shadow-sm md:h-12 md:w-12">
                    <span className="material-symbols-outlined text-[20px] md:text-[24px]">sensors</span>
                  </div>
                  <div>
                    <p className="text-[9px] font-black uppercase tracking-widest text-[#9d9388] md:text-[10px]">Health Status</p>
                    <p className="mt-0.5 text-[13px] font-bold text-[#2d241c] md:text-[14px]">{getStatusLabel(selectedMachine.status)}</p>
                  </div>
                </div>
              </div>

              {selectedMachine.status === "maintenance" && (
                <div className="mt-5 rounded-2xl border border-[#b9dfdc] bg-[#edf8f7] px-4 py-3 md:mt-6 md:px-5 md:py-4">
                  <div className="flex items-center gap-2 text-[#3b8f88]">
                    <span className="material-symbols-outlined text-[16px] md:text-[18px]">build_circle</span>
                    <p className="text-[9px] font-black uppercase tracking-[0.18em] md:text-[10px]">Maintenance today</p>
                  </div>
                  <p className="mt-1.5 text-[12px] font-semibold leading-tight text-[#2d241c] md:mt-2 md:text-[13px]">
                    Cette machine est en maintenance aujourd'hui.
                  </p>
                </div>
              )}

              <div className="mt-6 grid grid-cols-2 gap-2 md:mt-8 md:gap-3">
                {selectedMachine.status === "maintenance" && (
                  <button
                    type="button"
                    onClick={() => selectedTodayTask && navigate(`/technician/maintenance/${selectedTodayTask.id}`)}
                    disabled={!selectedTodayTask}
                    className="flex items-center justify-center gap-2 rounded-2xl bg-[#2d241c] py-3 text-[10px] font-black uppercase tracking-widest text-white shadow-lg transition-transform active:scale-95 disabled:cursor-not-allowed disabled:opacity-50 md:py-4 md:text-[11px]"
                  >
                    Submit
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => navigate(`/technician/machines/${selectedMachine.id}/history`)}
                  className={cn(
                    "flex items-center justify-center gap-2 rounded-2xl border-2 py-3 text-[10px] font-black uppercase tracking-widest transition-all hover:bg-gray-50 md:py-4 md:text-[11px]",
                    selectedMachine.status === "maintenance" ? "col-span-1 border-[#e6dbcd] text-[#2d241c]" : "col-span-2 border-[#e6dbcd] text-[#2d241c]"
                  )}
                >
                  History
                </button>
              </div>
            </div>
          )}
        </div>

      </section>
    </div>
  );
}

export default MapPage;