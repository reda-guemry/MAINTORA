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
      <div className="flex min-h-[70vh] w-full flex-col items-center justify-center rounded-[40px] border border-[#dce5e2] bg-[#f8faf9]">
        <Spinner />
        <p className="mt-4 text-[10px] font-black uppercase tracking-[0.3em] text-[#6ba5a5]">System Initializing</p>
      </div>
    );
  }

  if (error) return <Alert variant="error" title="Connection Error">{error}</Alert>;

  return (
    <div className="w-full px-2 pb-6">
      <section className="relative h-[calc(100vh-9rem)] min-h-162 overflow-hidden rounded-[38px] border-4 border-white bg-[#edf0ec] shadow-[0_40px_90px_-20px_rgba(35,53,53,0.2)]">
        
        {/* MAP BACKGROUND */}
        <div className="absolute inset-0 z-0">
          <TechnicianAssetMap
            machines={machines}
            selectedMachineId={selectedMachineId}
            onMarkerSelect={(m) => setSelectedMachineId(m.id)}
            onMapBackgroundClick={() => setSelectedMachineId(null)}
          />
        </div>

        {/* TOP BAR: Title & Summary */}
        <div className="pointer-events-none absolute inset-x-0 top-0 z-10 flex items-start justify-between p-6 md:p-8">
          <div className="pointer-events-auto flex flex-col gap-1">
            <div className="flex items-center gap-3">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#2d241c] text-white shadow-lg">
                <span className="material-symbols-outlined text-[18px]"></span>
              </span>
              <h1 className="text-2xl font-black tracking-tighter text-[#2d241c]">Asset Radar</h1>
            </div>
            <p className="ml-11 text-[11px] font-bold uppercase tracking-[0.15em] text-[#648080]">Precision Monitoring</p>
          </div>

          <div className="pointer-events-auto flex gap-2">
            {[
              { label: "Fleet", val: machines.length, bg: "bg-white" },
              { label: "Alerts", val: statusSummary.anomalous, bg: "bg-[#d9534f]", text: "text-white" }
            ].map((s, i) => (
              <div key={i} className={cn("flex flex-col items-end rounded-2xl border border-[#dce5e2] px-4 py-2 shadow-sm backdrop-blur-md", s.bg)}>
                <span className={cn("text-[9px] font-black uppercase tracking-widest opacity-60", s.text || "text-[#2d241c]")}>{s.label}</span>
                <span className={cn("text-lg font-black leading-tight", s.text || "text-[#2d241c]")}>{s.val}</span>
              </div>
            ))}
          </div>
        </div>

        {/* SIDE CARD: Selected Machine Details */}
        <div className="pointer-events-none absolute inset-y-0 left-0 z-20 flex items-center px-6 md:px-8">
          <div className={cn(
            "pointer-events-auto w-85 overflow-hidden rounded-4xl border border-white/40 bg-white/80 p-1 shadow-[0_32px_64px_rgba(0,0,0,0.12)] backdrop-blur-2xl transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)]",
            selectedMachine ? "translate-x-0 opacity-100" : "-translate-x-100 opacity-0"
          )}>
            {selectedMachine && (
              <div className="rounded-[28px] bg-white p-6 shadow-inner">
                <div className="mb-6 flex items-center justify-between">
                  <div className="h-2 w-12 rounded-full bg-[#3b8f88]/20"></div>
                  <span className={cn(
                    "rounded-lg px-2.5 py-1 text-[9px] font-black uppercase tracking-widest",
                    getStatusClasses(selectedMachine.status)
                  )}>
                    {selectedMachine.status}
                  </span>
                </div>

                <h2 className="text-2xl font-black leading-none text-[#2d241c]">{selectedMachine.name}</h2>
                <p className="mt-2 font-mono text-[11px] font-bold text-[#6ba5a5] uppercase">{selectedMachine.code}</p>

                <div className="mt-8 space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#f0f4f3] text-[#3b8f88]">
                      <span className="material-symbols-outlined text-[20px]">location_on</span>
                    </div>
                    <div>
                      <p className="text-[9px] font-black uppercase tracking-widest text-[#9d9388]">Zone / Floor</p>
                      <p className="text-[13px] font-bold text-[#2d241c]">{selectedMachine.location}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#f0f4f3] text-[#3b8f88]">
                      <span className="material-symbols-outlined text-[20px]">sensors</span>
                    </div>
                    <div>
                      <p className="text-[9px] font-black uppercase tracking-widest text-[#9d9388]">Health Status</p>
                      <p className="text-[13px] font-bold text-[#2d241c]">{getStatusLabel(selectedMachine.status)}</p>
                    </div>
                  </div>
                </div>

                <div className="mt-8 grid grid-cols-2 gap-3">
                  {selectedMachine.status === "maintenance" ? (
                    <button
                      type="button"
                      onClick={() =>
                        selectedTodayTask &&
                        navigate(`/technician/maintenance/${selectedTodayTask.id}`)
                      }
                      disabled={!selectedTodayTask}
                      className="flex items-center p-2 justify-center gap-2 rounded-2xl bg-[#2d241c] py-4 text-[10px] font-black uppercase tracking-widest text-white shadow-lg transition-transform active:scale-95 disabled:cursor-not-allowed disabled:opacity-40"
                    >
                      Submit Maintenance
                    </button>
                  ) : (
                    <button className="flex items-center justify-center gap-2 rounded-2xl bg-[#2d241c] py-4 text-[10px] font-black uppercase tracking-widest text-white transition-transform active:scale-95 shadow-lg">
                      Manage
                    </button>
                  )}
                  <button className="flex items-center justify-center gap-2 rounded-2xl border-2 border-[#e6dbcd] py-4 text-[10px] font-black uppercase tracking-widest text-[#2d241c] transition-all hover:bg-[#fcfaf7]">
                    History
                  </button>
                </div>

                {selectedMachine.status === "maintenance" && (
                  <div className="mt-4 rounded-2xl border border-[#b9dfdc] bg-[#edf8f7] px-4 py-3">
                    <p className="text-[10px] font-black uppercase tracking-[0.18em] text-[#398e8e]">
                      Maintenance today
                    </p>
                    <p className="mt-1 text-sm font-semibold text-[#2d241c]">
                      Cette machine est en maintenance aujourd'hui.
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* BOTTOM RIGHT: Legend & Controls */}
        <div className="pointer-events-none absolute bottom-8 right-8 z-10 flex flex-col items-end gap-4">
          <div className="pointer-events-auto rounded-3xl border border-white/60 bg-white/80 p-4 shadow-xl backdrop-blur-xl">
             <div className="flex items-center gap-6">
                {[
                  { color: "bg-[#3b8f88]", label: "Normal" },
                  { color: "bg-[#d9534f]", label: "Alert" },
                  { color: "bg-[#d58a1d]", label: "Service" }
                ].map((l, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <span className={cn("h-2 w-2 rounded-full", l.color)}></span>
                    <span className="text-[10px] font-black uppercase tracking-tighter text-[#2d241c]">{l.label}</span>
                  </div>
                ))}
             </div>
          </div>
        </div>

      </section>
    </div>
  );
}

export default MapPage;
