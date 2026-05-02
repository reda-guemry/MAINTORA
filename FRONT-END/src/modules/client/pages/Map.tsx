import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Alert } from "@/shared/components/feedback";
import { Spinner } from "@/shared/components/ui";
import { ActionButtons, DetailRow, MachineInfoCard, MapSidebar } from "@/shared/components";
import { cn } from "@/shared/utils";
import {
  getMachineStatusClasses,
  getClientMachineStatusLabel,
} from "@/shared/utils/machineStatusHelpers";
import { useClientMachines } from "@/features/machines";
import { ClientAssetMap } from "../components/ClientAssetMap";

export default function ClientMapPage() {
  const navigate = useNavigate();
  const { machines, isLoading, error } = useClientMachines();
  const [selectedMachineId, setSelectedMachineId] = useState<number | null>(null);

  const selectedMachine = useMemo(
    () => machines.find((machine) => machine.id === selectedMachineId) ?? null,
    [machines, selectedMachineId]
  );

  const statusSummary = useMemo(
    () => ({
      active: machines.filter((machine) => machine.status === "active").length,
      anomalous: machines.filter((machine) => machine.status === "anomalous").length,
      maintenance: machines.filter((machine) => machine.status === "maintenance").length,
    }),
    [machines]
  );

  if (isLoading) {
    return (
      <div className="flex min-h-[70vh] w-full flex-col items-center justify-center rounded-3xl border border-slate-200 bg-slate-50">
        <Spinner />
        <p className="mt-4 text-xs font-bold uppercase tracking-widest text-slate-400">
          Loading asset map...
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
    <div className="w-full px-4 pb-6">
      <section className="relative h-[calc(100vh-8rem)] min-h-150 w-full overflow-hidden rounded-3xl border border-slate-200 bg-slate-50 shadow-sm">
        
        {/* Map Layer */}
        <div className="absolute inset-0 z-0">
          <ClientAssetMap
            machines={machines}
            selectedMachineId={selectedMachineId}
            onMarkerSelect={(machine) => setSelectedMachineId(machine.id)}
            onMapBackgroundClick={() => setSelectedMachineId(null)}
          />
        </div>

        <div className="pointer-events-none absolute inset-x-0 top-0 z-10 flex flex-col justify-between gap-6 p-6 sm:flex-row sm:items-start md:p-8">
          
          <div className="pointer-events-auto flex flex-col drop-shadow-md">
            <h1 className="text-2xl font-black tracking-tight text-slate-900">
              Asset Map
            </h1>
            <p className="mt-0.5 text-[11px] font-extrabold uppercase tracking-widest text-slate-600">
              Visual Monitoring
            </p>
          </div>

          <div className="pointer-events-auto flex flex-wrap gap-3">
            {[
              {
                label: "active",
                value: statusSummary.active,
                dotColor: "bg-slate-300",
                textColor: "text-slate-800",
              },
              {
                label: "Alerts",
                value: statusSummary.anomalous,
                dotColor: "bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.6)]",
                textColor: "text-red-600",
              },
              {
                label: "Maint.",
                value: statusSummary.maintenance,
                dotColor: "bg-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.6)]",
                textColor: "text-amber-600",
              },
            ].map((item) => (
              <div
                key={item.label}
                className="flex items-center gap-3 rounded-full border border-white/60 bg-white/80 px-4 py-2.5 shadow-[0_8px_16px_rgba(0,0,0,0.06)] backdrop-blur-md transition-all hover:bg-white/95"
              >
                <span className={cn("h-2.5 w-2.5 rounded-full", item.dotColor)}></span>
                <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500">
                  {item.label}
                </span>
                <span className={cn("text-base font-black leading-none", item.textColor)}>
                  {item.value}
                </span>
              </div>
            ))}
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
                statusClassName={getMachineStatusClasses(selectedMachine.status)}
              />

              <div className="space-y-3">
                <DetailRow
                  icon="location_on"
                  label="Location"
                  value={selectedMachine.location}
                />
                <DetailRow
                  icon="monitor_heart"
                  label="Status"
                  value={getClientMachineStatusLabel(selectedMachine.status)}
                />
              </div>

              {selectedMachine.status === "anomalous" && (
                <div className="rounded-xl border border-red-100 bg-red-50 p-4">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-red-800">
                    Alert State
                  </p>
                  <p className="mt-1 text-xs font-medium text-red-600">
                    Active anomaly detected. Repair flow might be required.
                  </p>
                </div>
              )}

              {selectedMachine.status === "maintenance" && (
                <div className="rounded-xl border border-amber-100 bg-amber-50 p-4">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-amber-800">
                    Maintenance Zone
                  </p>
                  <p className="mt-1 text-xs font-medium text-amber-600">
                    Machine is currently under maintenance follow-up.
                  </p>
                </div>
              )}

              <div className="border-t border-gray-100 pt-4">
                <ActionButtons
                  actions={[
                    {
                      label: "Repair Requests",
                      icon: "construction",
                      onClick: () => navigate("/client/repair-requests"),
                    },
                  ]}
                />
                <div className="mt-3">
                  <ActionButtons
                    columns={2}
                    actions={[
                      {
                        label: "List",
                        icon: "list",
                        variant: "secondary",
                        onClick: () => navigate("/client/machines"),
                      },
                      {
                        label: "History",
                        icon: "history",
                        variant: "outline",
                        onClick: () =>
                          navigate(`/client/machines/${selectedMachine.id}/history`),
                      },
                    ]}
                  />
                </div>
              </div>
            </div>
          )}
        </MapSidebar>
      </section>
    </div>
  );
}