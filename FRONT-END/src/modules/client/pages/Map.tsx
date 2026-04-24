import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Alert } from "@/shared/components/feedback";
import { Button, Spinner } from "@/shared/components/ui";
import { cn } from "@/shared/utils";
import { useClientMachines } from "@/features/machines";
import { ClientAssetMap } from "../components/ClientAssetMap";

function getStatusClasses(status: "active" | "anomalous" | "maintenance") {
  if (status === "anomalous") {
    return "border-[#f7c79f] bg-[#fff2e8] text-[#d8711f]";
  }

  if (status === "maintenance") {
    return "border-[#b9dfdc] bg-[#edf8f7] text-[#398e8e]";
  }

  return "border-[#b9dfdc] bg-[#edf8f7] text-[#398e8e]";
}

function getStatusLabel(status: "active" | "anomalous" | "maintenance") {
  if (status === "anomalous") {
    return "Anomaly reported";
  }

  if (status === "maintenance") {
    return "Maintenance in progress";
  }

  return "Operational";
}

export default function ClientMapPage() {
  const navigate = useNavigate();
  const { machines, isLoading, error } = useClientMachines();
  const [selectedMachineId, setSelectedMachineId] = useState<number | null>(null);

  const selectedMachine = useMemo(
    () => machines.find((machine) => machine.id === selectedMachineId) ?? null,
    [machines, selectedMachineId],
  );

  const statusSummary = useMemo(
    () => ({
      active: machines.filter((machine) => machine.status === "active").length,
      anomalous: machines.filter((machine) => machine.status === "anomalous").length,
      maintenance: machines.filter((machine) => machine.status === "maintenance").length,
    }),
    [machines],
  );

  if (isLoading) {
    return (
      <div className="flex min-h-[70vh] w-full flex-col items-center justify-center rounded-[40px] border border-[#dce5e2] bg-[#f8faf9]">
        <Spinner />
        <p className="mt-4 text-[10px] font-black uppercase tracking-[0.3em] text-[#6ba5a5]">
          Loading asset map
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <Alert variant="error" title="Map unavailable">
        {error}
      </Alert>
    );
  }

  return (
    <div className="w-full px-2 pb-6">
      <section className="relative h-[calc(100vh-9rem)] min-h-162 overflow-hidden rounded-[38px] border-4 border-white bg-[#edf0ec] shadow-[0_40px_90px_-20px_rgba(35,53,53,0.2)]">
        <div className="absolute inset-0 z-0">
          <ClientAssetMap
            machines={machines}
            selectedMachineId={selectedMachineId}
            onMarkerSelect={(machine) => setSelectedMachineId(machine.id)}
            onMapBackgroundClick={() => setSelectedMachineId(null)}
          />
        </div>

        <div className="pointer-events-none absolute inset-x-0 top-0 z-10 flex items-start justify-between p-6 md:p-8">
          <div className="pointer-events-auto flex flex-col gap-1">
            <div className="flex items-center gap-3">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#2d241c] text-white shadow-lg">
                <span className="material-symbols-outlined text-[18px]">
                  location_on
                </span>
              </span>
              <h1 className="text-2xl font-black tracking-tighter text-[#2d241c]">
                Client Asset Map
              </h1>
            </div>
            <p className="ml-11 text-[11px] font-bold uppercase tracking-[0.15em] text-[#648080]">
              Visual monitoring of your machines
            </p>
          </div>

          <div className="pointer-events-auto flex gap-2">
            {[
              { label: "Fleet", value: machines.length, bg: "bg-white" },
              { label: "Alerts", value: statusSummary.anomalous, bg: "bg-[#d9534f]", text: "text-white" },
              { label: "Maintenance", value: statusSummary.maintenance, bg: "bg-white" },
            ].map((item) => (
              <div
                key={item.label}
                className={cn(
                  "flex flex-col items-end rounded-2xl border border-[#dce5e2] px-4 py-2 shadow-sm backdrop-blur-md",
                  item.bg,
                )}
              >
                <span
                  className={cn(
                    "text-[9px] font-black uppercase tracking-widest opacity-60",
                    item.text || "text-[#2d241c]",
                  )}
                >
                  {item.label}
                </span>
                <span
                  className={cn(
                    "text-lg font-black leading-tight",
                    item.text || "text-[#2d241c]",
                  )}
                >
                  {item.value}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="pointer-events-none absolute inset-y-0 left-0 z-20 flex items-center px-6 md:px-8">
          <div
            className={cn(
              "pointer-events-auto w-85 overflow-hidden rounded-4xl border border-white/40 bg-white/80 p-1 shadow-[0_32px_64px_rgba(0,0,0,0.12)] backdrop-blur-2xl transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)]",
              selectedMachine ? "translate-x-0 opacity-100" : "-translate-x-100 opacity-0",
            )}
          >
            {selectedMachine && (
              <div className="rounded-[28px] bg-white p-6 shadow-inner">
                <div className="mb-6 flex items-center justify-between">
                  <div className="h-2 w-12 rounded-full bg-[#3b8f88]/20"></div>
                  <span
                    className={cn(
                      "rounded-lg px-2.5 py-1 text-[9px] font-black uppercase tracking-widest",
                      getStatusClasses(selectedMachine.status),
                    )}
                  >
                    {selectedMachine.status}
                  </span>
                </div>

                <h2 className="text-2xl font-black leading-none text-[#2d241c]">
                  {selectedMachine.name}
                </h2>
                <p className="mt-2 font-mono text-[11px] font-bold uppercase text-[#6ba5a5]">
                  {selectedMachine.code}
                </p>

                <div className="mt-8 space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#f0f4f3] text-[#3b8f88]">
                      <span className="material-symbols-outlined text-[20px]">
                        location_on
                      </span>
                    </div>
                    <div>
                      <p className="text-[9px] font-black uppercase tracking-widest text-[#9d9388]">
                        Location
                      </p>
                      <p className="text-[13px] font-bold text-[#2d241c]">
                        {selectedMachine.location}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#f0f4f3] text-[#3b8f88]">
                      <span className="material-symbols-outlined text-[20px]">
                        monitor_heart
                      </span>
                    </div>
                    <div>
                      <p className="text-[9px] font-black uppercase tracking-widest text-[#9d9388]">
                        Status
                      </p>
                      <p className="text-[13px] font-bold text-[#2d241c]">
                        {getStatusLabel(selectedMachine.status)}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-8 grid grid-cols-2 gap-3">
                  <Button
                    className="h-auto rounded-2xl py-4 text-[10px] uppercase tracking-widest"
                    onClick={() => navigate("/client/repair-requests")}
                  >
                    Repair Requests
                  </Button>
                  <Button
                    variant="secondary"
                    className="h-auto rounded-2xl py-4 text-[10px] uppercase tracking-widest"
                    onClick={() => navigate("/client/machines")}
                  >
                    Machine List
                  </Button>
                </div>

                {selectedMachine.status === "anomalous" && (
                  <div className="mt-4 rounded-2xl border border-[#f7c79f] bg-[#fff2e8] px-4 py-3">
                    <p className="text-[10px] font-black uppercase tracking-[0.18em] text-[#d8711f]">
                      Alert state
                    </p>
                    <p className="mt-1 text-sm font-semibold text-[#2d241c]">
                      This machine has an active anomaly linked to a repair flow.
                    </p>
                  </div>
                )}

                {selectedMachine.status === "maintenance" && (
                  <div className="mt-4 rounded-2xl border border-[#b9dfdc] bg-[#edf8f7] px-4 py-3">
                    <p className="text-[10px] font-black uppercase tracking-[0.18em] text-[#398e8e]">
                      Maintenance zone
                    </p>
                    <p className="mt-1 text-sm font-semibold text-[#2d241c]">
                      This machine is currently in maintenance follow-up.
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
