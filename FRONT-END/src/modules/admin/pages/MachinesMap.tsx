import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Alert } from "@/shared/components/feedback";
import { Spinner } from "@/shared/components/ui";
import { ActionButtons, DetailRow, MachineInfoCard, MapSidebar } from "@/shared/components";
import { cn } from "@/shared/utils";
import { getMachineBadgeClasses } from "@/shared/utils/machineStatusHelpers";
import {
  MachinesAssetMap,
  useAllMachinesMap,
  type MachinesMapMachine,
} from "@/features/machines-map";

function hasValidCoordinates(machine: MachinesMapMachine) {
  const latitude = Number(machine.latitude);
  const longitude = Number(machine.longitude);
  return (
    Number.isFinite(latitude) &&
    Number.isFinite(longitude) &&
    latitude >= -90 && latitude <= 90 &&
    longitude >= -180 && longitude <= 180
  );
}

function normalizeCoordinates(machine: MachinesMapMachine): MachinesMapMachine {
  return {
    ...machine,
    latitude: Number(machine.latitude),
    longitude: Number(machine.longitude),
  };
}

export default function MachinesMapPage() {
  const navigate = useNavigate();
  const { machines, isLoading, error } = useAllMachinesMap("admin/machines");
  const [selectedMachineId, setSelectedMachineId] = useState<number | null>(null);

  const mappedMachines = useMemo(
    () => machines.filter(hasValidCoordinates).map(normalizeCoordinates),
    [machines],
  );

  const unmappedMachines = useMemo(
    () => machines.filter((machine) => !hasValidCoordinates(machine)),
    [machines],
  );

  const selectedMachine = useMemo(
    () => mappedMachines.find((machine) => machine.id === selectedMachineId) ?? null,
    [mappedMachines, selectedMachineId],
  );

  const statusSummary = useMemo(
    () => ({
      active: machines.filter((machine) => machine.status === "active").length,
      anomalous: machines.filter((machine) => machine.status === "anomalous").length,
    }),
    [machines],
  );

  if (isLoading) {
    return (
      <div className="flex min-h-[70vh] flex-col items-center justify-center rounded-[32px] border border-slate-100 bg-white">
        <Spinner className="text-[#43968C]" size="lg" />
        <span className="mt-4 text-[11px] font-bold uppercase tracking-widest text-slate-400">
          Loading Admin Map...
        </span>
      </div>
    );
  }

  if (error) {
    return <Alert variant="error" title="Map Sync Error">{error}</Alert>;
  }

  return (
    <div className="space-y-6 pb-4">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <h1 className="text-3xl font-black tracking-tight text-slate-900">
            Fleet Intelligence Map
          </h1>
          <p className="mt-1 text-sm font-medium text-slate-500">
            Global monitoring of assets and operational status.
          </p>
        </div>
      </div>

      <section className="relative h-[calc(100vh-12rem)] min-h-[600px] overflow-hidden rounded-[40px] border-4 border-white bg-slate-100 shadow-[0_20px_50px_rgba(0,0,0,0.05)]">
        <div className="absolute inset-0 z-0">
          <MachinesAssetMap
            machines={mappedMachines}
            selectedMachineId={selectedMachineId}
            onMarkerSelect={(machine) => setSelectedMachineId(machine.id)}
            onMapBackgroundClick={() => setSelectedMachineId(null)}
          />
        </div>

        <div className="pointer-events-none absolute left-8 right-8 top-8 z-10 flex flex-col items-end justify-between gap-4 md:flex-row md:items-start">
          <div className="pointer-events-auto max-w-[340px] rounded-3xl border border-slate-200/50 bg-white/90 p-6 shadow-xl backdrop-blur-md">
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[#43968C]">
              Admin Control
            </p>
            <h2 className="mt-2 text-xl font-bold leading-tight text-slate-900">
              Complete Asset Distribution
            </h2>
          </div>

          <div className="pointer-events-auto flex flex-wrap justify-end gap-3">
            <SummaryTile label="Total Fleet" value={machines.length} />
            <SummaryTile label="Alerts" value={statusSummary.anomalous} variant="danger" />
          </div>
        </div>

        <div className="pointer-events-none absolute bottom-8 left-8 z-10 flex flex-col items-start gap-4">
          <div className="pointer-events-auto rounded-2xl border border-slate-200/50 bg-white/90 p-4 shadow-lg backdrop-blur-md">
            <div className="space-y-2.5 text-[11px] font-bold text-slate-600 uppercase tracking-wide">
              <LegendItem color="bg-[#43968C]" label="Operational" />
              <LegendItem color="bg-amber-500" label="In Maintenance" />
              <LegendItem color="bg-red-500" label="Fault Detected" />
            </div>
          </div>

          {unmappedMachines.length > 0 && (
            <div className="pointer-events-auto rounded-xl bg-slate-900 px-4 py-2 text-[10px] font-black uppercase tracking-widest text-white shadow-2xl">
              {unmappedMachines.length} Missing Coordinates
            </div>
          )}
        </div>

        <MapSidebar
          isOpen={!!selectedMachine}
          title="Asset Details"
          subtitle={selectedMachine?.location}
          onClose={() => setSelectedMachineId(null)}
        >
          {selectedMachine && (
            <div className="space-y-6">
              <MachineInfoCard
                machineData={selectedMachine}
                statusClassName={getMachineBadgeClasses(selectedMachine.status)}
              >
                <div className="mt-3 rounded-xl bg-slate-50 p-3 border border-slate-100 flex items-center justify-between">
                  <span className="text-[10px] font-black text-slate-400 uppercase">Anomalies</span>
                  <span className={cn(
                    "text-xs font-black px-2 py-0.5 rounded-lg",
                    (selectedMachine.active_anomalies_count ?? 0) > 0 ? "bg-red-100 text-red-600" : "bg-teal-100 text-teal-600"
                  )}>
                    {selectedMachine.active_anomalies_count ?? 0} Active
                  </span>
                </div>
              </MachineInfoCard>

              <div className="space-y-1">
                <DetailRow icon="location_on" label="Address" value={selectedMachine.location || "Not Set"} />
                <DetailRow icon="fingerprint" label="Asset Code" value={`#${selectedMachine.code}`} />
                <DetailRow icon="person" label="Client" value={selectedMachine.created_by ? `${selectedMachine.created_by.first_name} ${selectedMachine.created_by.last_name}` : "System"} />
              </div>

              <div className="pt-4">
               <ActionButtons
                actions={[
                  {
                    label: "History",
                    icon: "history",
                    variant: "outline",
                    onClick: () =>
                      navigate(`/admin/machines/${selectedMachine.id}/history`),
                  },
                ]}
              />
              </div>
            </div>
          )}
        </MapSidebar>
      </section>
    </div>
  );
}

function SummaryTile({ label, value, variant = "default" }: any) {
  const isDanger = variant === "danger";
  return (
    <div className={cn(
      "flex flex-col items-center justify-center rounded-[20px] border px-6 py-3 shadow-xl backdrop-blur-md",
      isDanger ? "bg-red-500 border-red-400 text-white" : "bg-white/90 border-slate-200 text-slate-900"
    )}>
      <p className="text-[10px] font-black uppercase tracking-widest opacity-80">{label}</p>
      <p className="mt-0.5 text-2xl font-black">{value}</p>
    </div>
  );
}

function LegendItem({ color, label }: { color: string; label: string }) {
  return (
    <div className="flex items-center gap-3">
      <span className={cn("h-2.5 w-2.5 rounded-full shadow-sm ring-2 ring-white", color)} />
      <span>{label}</span>
    </div>
  );
}