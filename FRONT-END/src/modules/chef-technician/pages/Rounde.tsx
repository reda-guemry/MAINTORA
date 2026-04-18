import { useEffect, useMemo, useState } from "react";
import { useMachines } from "@/features/roundes/hooks/useMachines";
import { useTechnicians } from "@/features/roundes/hooks/useTechnisian";
import type { Technician } from "@/features/roundes/types/technician";
import { AssetMap  } from "../components/AssetMap";
import { cn } from "@/shared/utils";
import type { Machine } from "@/features/roundes" ;

function getInitials(technician: Technician) {
  return `${technician.first_name[0] ?? ""}${technician.last_name[0] ?? ""}`.toUpperCase();
}

function getMachineBadgeClasses(status: Machine["status"]) {
  if (status === "anomalous") {
    return "border border-red-200 bg-red-50 text-red-600";
  }

  if (status === "maintenance") {
    return "border border-amber-200 bg-amber-50 text-amber-700";
  }

  return "border border-emerald-200 bg-emerald-50 text-emerald-700";
}

export function Rounde() {
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [selectedMachineId, setSelectedMachineId] = useState<number | null>(
    null,
  );

  const { technicians, fetchTechnicians } = useTechnicians();
  const { machines, fetchMachines } = useMachines();

  useEffect(() => {
    fetchTechnicians();
    fetchMachines();
  }, []);

  const selectedMachine = useMemo(
    () => machines.find((machine) => machine.id === selectedMachineId) ?? null,
    [machines, selectedMachineId],
  );

  const sidebarTechnicians = technicians;
  const sidebarTitle = selectedMachine ? "Machine Focus" : "Technician Roster";
  const sidebarSubtitle = selectedMachine
    ? "Review this machine and the available technicians below."
    : "Select a machine marker on the map to inspect it and keep the technicians list in view.";

  function handleMarkerSelect(marker: Machine) {
    setSelectedMachineId(marker.id);
    setSidebarOpen(true);
  }

  function handleClearSelection() {
    setSelectedMachineId(null);
  }

  return (
    <div className="space-y-6">
      <section className="rounded-[26px] border border-[#d9d1c5] bg-[linear-gradient(180deg,#eee7da_0%,#ece2d3_100%)] px-6 py-7 shadow-[0_18px_45px_rgba(62,52,39,0.08)]">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <p className="text-[11px] font-bold uppercase tracking-[0.28em] text-[#948674]">
              Round Map
            </p>
            <h1 className="mt-3 text-4xl font-black tracking-tight text-[#2d241c] md:text-[42px]">
              Visualize every machine and keep technicians ready nearby.
            </h1>
            <p className="mt-4 max-w-xl text-sm leading-7 text-[#6f6254]">
              Click any machine on the map to zoom into it and inspect the
              technician roster without leaving the round workspace.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            <div className="rounded-2xl border border-white/70 bg-white/70 px-4 py-4">
              <p className="text-[10px] uppercase tracking-[0.24em] text-[#988a79]">
                Machines
              </p>
              <p className="mt-3 text-3xl font-black text-[#2d241c]">
                {machines.length}
              </p>
            </div>
            <div className="rounded-2xl border border-white/70 bg-white/70 px-4 py-4">
              <p className="text-[10px] uppercase tracking-[0.24em] text-[#988a79]">
                Technicians
              </p>
              <p className="mt-3 text-3xl font-black text-[#2d241c]">
                {technicians.length}
              </p>
            </div>
            <div className="rounded-2xl border border-white/70 bg-white/70 px-4 py-4">
              <p className="text-[10px] uppercase tracking-[0.24em] text-[#988a79]">
                Focus
              </p>
              <p className="mt-3 truncate text-lg font-black text-[#2d241c]">
                {selectedMachine?.code ?? "All Techs"}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden rounded-[28px] border border-[#ddd5c8] bg-[#f7f3ec] shadow-[0_20px_55px_rgba(62,52,39,0.1)]">
        <div className="flex h-[calc(100vh-265px)] min-h-[620px] w-full overflow-hidden">
          <aside
            className={`relative z-20 flex shrink-0 flex-col border-r border-[#e4dbcf] bg-[linear-gradient(180deg,#fcfaf7_0%,#f5efe4_100%)] transition-all duration-300 ${
              isSidebarOpen ? "w-[340px]" : "w-0 overflow-hidden border-r-0"
            }`}
          >
            <div className="border-b border-[#ece3d7] px-6 py-6">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-[11px] font-bold uppercase tracking-[0.24em] text-[#988a79]">
                    {sidebarTitle}
                  </p>
                  <h2 className="mt-2 text-2xl font-black text-[#2d241c]">
                    {selectedMachine
                      ? selectedMachine.name
                      : "All Available Technicians"}
                  </h2>
                  <p className="mt-3 text-sm leading-6 text-[#6f6254]">
                    {sidebarSubtitle}
                  </p>
                </div>

                {selectedMachine && (
                  <button
                    type="button"
                    onClick={handleClearSelection}
                    className="rounded-full border border-[#ddd5c8] bg-white px-3 py-2 text-[11px] font-bold uppercase tracking-[0.18em] text-[#6f6254] transition-colors hover:border-[#cfc4b4] hover:bg-[#f8f2e8]"
                  >
                    Clear
                  </button>
                )}
              </div>

              {selectedMachine && (
                <div className="mt-5 rounded-[24px] border border-[#e6dbcd] bg-white p-5 shadow-[0_16px_35px_rgba(62,52,39,0.08)]">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-[#988a79]">
                        {selectedMachine.code}
                      </p>
                      <p className="mt-2 text-lg font-black text-[#2d241c]">
                        {selectedMachine.location}
                      </p>
                    </div>
                    <span
                      className={cn(
                        'rounded-full px-3 py-1 text-[10px] font-black uppercase tracking-[0.16em]' , 

                      )}
                    >
                      {selectedMachine.status}
                    </span>
                  </div>

                  <div className="mt-5 grid grid-cols-2 gap-3 text-sm text-[#6f6254]">
                    <div className="rounded-2xl bg-[#f7f3ec] px-4 py-3">
                      <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#988a79]">
                        Latitude
                      </p>
                      <p className="mt-2 font-semibold text-[#2d241c]">
                        {Number(selectedMachine.latitude).toFixed(5)}
                      </p>
                    </div>
                    <div className="rounded-2xl bg-[#f7f3ec] px-4 py-3">
                      <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#988a79]">
                        Longitude
                      </p>
                      <p className="mt-2 font-semibold text-[#2d241c]">
                        {Number(selectedMachine.longitude).toFixed(5)}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="flex-1 overflow-y-auto px-4 py-4">
              <div className="mb-3 flex items-center justify-between px-2">
                <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-[#988a79]">
                  Technicians
                </p>
                <span className="rounded-full bg-[#e1efed] px-3 py-1 text-[10px] font-black uppercase tracking-[0.18em] text-[#3b8f88]">
                  {sidebarTechnicians.length} Ready
                </span>
              </div>

              <div className="space-y-3">
                {sidebarTechnicians.length === 0 ? (
                  <div className="rounded-2xl border border-dashed border-[#ddd5c8] bg-white px-4 py-5 text-sm text-[#7f7468]">
                    No technicians available right now.
                  </div>
                ) : (
                  sidebarTechnicians.map((technician, index) => (
                    <div
                      key={technician.id}
                      className="rounded-[22px] border border-[#e7ddd0] bg-white px-4 py-4 shadow-[0_10px_24px_rgba(62,52,39,0.05)] transition-transform hover:-translate-y-0.5"
                    >
                      <div className="flex items-start gap-3">
                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#dff1ef] text-sm font-black text-[#3b8f88]">
                          {getInitials(technician)}
                        </div>

                        <div className="min-w-0 flex-1">
                          <div className="flex items-center justify-between gap-3">
                            <p className="truncate text-sm font-bold text-[#2d241c]">
                              {technician.first_name} {technician.last_name}
                            </p>
                            <span className="rounded-full bg-[#f7f3ec] px-2.5 py-1 text-[10px] font-black uppercase tracking-[0.18em] text-[#816b55]">
                              #{index + 1}
                            </span>
                          </div>

                          <p className="mt-2 text-sm text-[#6f6254]">
                            {technician.email}
                          </p>
                          <p className="mt-1 text-xs font-semibold uppercase tracking-[0.12em] text-[#9d9388]">
                            {technician.phone || "No phone provided"}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </aside>

          <div className="relative flex-1 bg-[#ebe4d8]">
            <button
              type="button"
              onClick={() => setSidebarOpen((currentValue) => !currentValue)}
              className="absolute left-4 top-4 z-30 flex h-12 w-12 items-center justify-center rounded-2xl border border-[#e2d7c7] bg-white text-[#6f6254] shadow-[0_12px_26px_rgba(62,52,39,0.12)] transition-colors hover:bg-[#f9f4ec]"
            >
              <span className="material-symbols-outlined text-[20px]">
                {isSidebarOpen ? "left_panel_close" : "left_panel_open"}
              </span>
            </button>

            <div className="absolute inset-0">
              <AssetMap
                machines={machines}
                selectedMarkerId={selectedMachineId}
                onMarkerSelect={handleMarkerSelect}
                onMapBackgroundClick={handleClearSelection}
              />
            </div>

            <div className="pointer-events-none absolute right-5 top-5 z-20 flex flex-col gap-3">
              <div className="pointer-events-auto rounded-2xl border border-white/80 bg-white/90 px-4 py-3 shadow-[0_14px_30px_rgba(62,52,39,0.1)] backdrop-blur">
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#988a79]">
                  Map Legend
                </p>
                <div className="mt-3 space-y-2 text-sm text-[#6f6254]">
                  <div className="flex items-center gap-2">
                    <span className="h-3 w-3 rounded-full bg-[#3b8f88]" />
                    Operational machine
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="h-3 w-3 rounded-full bg-[#d58a1d]" />
                    Warning or maintenance
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="h-3 w-3 rounded-full bg-[#d9534f]" />
                    Critical machine
                  </div>
                </div>
              </div>

              <div className="pointer-events-auto max-w-xs rounded-2xl border border-white/80 bg-white/90 px-4 py-3 text-sm leading-6 text-[#6f6254] shadow-[0_14px_30px_rgba(62,52,39,0.1)] backdrop-blur">
                Click a machine marker to zoom into it. Click anywhere on the
                map to go back to the full technician roster.
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
