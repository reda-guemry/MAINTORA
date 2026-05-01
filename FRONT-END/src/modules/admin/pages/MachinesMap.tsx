import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Alert } from "@/shared/components/feedback";
import { Spinner } from "@/shared/components/ui";
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
    latitude >= -90 &&
    latitude <= 90 &&
    longitude >= -180 &&
    longitude <= 180
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
    () =>
      mappedMachines.find((machine) => machine.id === selectedMachineId) ??
      null,
    [mappedMachines, selectedMachineId],
  );

  const statusSummary = useMemo(
    () => ({
      active: machines.filter((machine) => machine.status === "active").length,
      anomalous: machines.filter((machine) => machine.status === "anomalous")
        .length,
      maintenance: machines.filter(
        (machine) => machine.status === "maintenance",
      ).length,
    }),
    [machines],
  );

  if (isLoading) {
    return (
      <div className="flex min-h-[70vh] flex-col items-center justify-center rounded-2xl border border-gray-100 bg-white shadow-sm">
        <Spinner size="lg" />
        <span className="mt-4 text-[10px] font-bold uppercase tracking-widest text-gray-400">
          Loading machines map
        </span>
      </div>
    );
  }

  if (error) {
    return (
      <Alert variant="error" title="Machines map unavailable">
        {error}
      </Alert>
    );
  }

  return (
    <div className="space-y-6 pb-4">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-gray-900">
            Machines Map
          </h1>
          <p className="mt-1.5 text-sm text-gray-500">
            Monitor every registered machine and inspect ownership, status, and
            location details.
          </p>
        </div>
      </div>

      <section className="relative h-[calc(100vh-12rem)] min-h-162 overflow-hidden rounded-[32px] border-4 border-white bg-[#ebe4d8] shadow-[0_20px_60px_rgba(62,52,39,0.15)]">
        <div className="absolute inset-0 z-0">
          <MachinesAssetMap
            machines={mappedMachines}
            selectedMachineId={selectedMachineId}
            onMarkerSelect={(machine) => setSelectedMachineId(machine.id)}
            onMapBackgroundClick={() => setSelectedMachineId(null)}
          />
        </div>

        <div className="pointer-events-none absolute left-6 right-6 top-6 z-10 flex flex-col items-end justify-between gap-4 md:flex-row md:items-start">
          <div className="pointer-events-auto max-w-[360px] rounded-[24px] border border-white/60 bg-white/95 p-5 shadow-lg backdrop-blur-md">
            <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-[#948674]">
              Admin Fleet
            </p>
            <h2 className="mt-2 text-xl font-black leading-tight tracking-tight text-[#2d241c]">
              All machines across every client workspace.
            </h2>
          </div>

          <div className="pointer-events-auto flex flex-wrap justify-end gap-3">
            <SummaryTile label="Machines" value={machines.length} />
            <SummaryTile label="Mapped" value={mappedMachines.length} />
            <SummaryTile label="Alerts" value={statusSummary.anomalous} alert />
          </div>
        </div>

        <div className="pointer-events-none absolute bottom-6 right-6 z-10 flex flex-col items-end gap-3">
          <div className="pointer-events-auto rounded-[20px] border border-white/80 bg-white/95 px-4 py-3 shadow-[0_14px_30px_rgba(62,52,39,0.1)] backdrop-blur-md">
            <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-[#988a79]">
              Map Legend
            </p>
            <div className="mt-2 space-y-1.5 text-xs font-medium text-[#6f6254]">
              <LegendItem color="bg-[#3b8f88]" label="Operational machine" />
              <LegendItem color="bg-[#d58a1d]" label="Maintenance machine" />
              <LegendItem color="bg-[#d9534f]" label="Anomalous machine" />
            </div>
          </div>

          {unmappedMachines.length > 0 && (
            <div className="pointer-events-auto max-w-78 rounded-[20px] border border-[#f0dfc4] bg-white/95 px-4 py-3 text-[11px] leading-5 text-[#6f6254] shadow-[0_14px_30px_rgba(62,52,39,0.1)] backdrop-blur-md">
              {unmappedMachines.length} machine
              {unmappedMachines.length > 1 ? "s are" : " is"} hidden because
              coordinates are missing or invalid.
            </div>
          )}
        </div>

        <aside
          className={cn(
            "pointer-events-auto absolute top-40 z-20 flex max-h-[calc(100%-11rem)] flex-col overflow-hidden rounded-3xl border border-white/60 bg-white/95 shadow-[0_24px_48px_rgba(62,52,39,0.15)] backdrop-blur-xl transition-all duration-300",
            selectedMachine
              ? "left-6 w-105 opacity-100"
              : "-left-full w-105 opacity-0",
          )}
        >
          {selectedMachine && (
            <>
              <div className="shrink-0 border-b border-[#ece3d7] bg-white/50 px-5 py-4">
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-[10px] font-bold uppercase tracking-[0.22em] text-[#988a79]">
                      {selectedMachine.code}
                    </p>
                    <h2 className="mt-1 truncate text-lg font-black text-[#2d241c]">
                      {selectedMachine.name}
                    </h2>
                  </div>
                  <button
                    type="button"
                    onClick={() => setSelectedMachineId(null)}
                    className="shrink-0 rounded-full border border-[#ddd5c8] bg-white px-3 py-1.5 text-[9px] font-bold uppercase tracking-[0.18em] text-[#6f6254] transition-colors hover:border-[#cfc4b4] hover:bg-[#f8f2e8]"
                  >
                    Clear
                  </button>
                </div>

                <div className="mt-3 flex flex-wrap gap-2">
                  <span
                    className={cn(
                      "rounded-full px-2.5 py-1 text-[9px] font-black uppercase tracking-[0.16em]",
                      getMachineBadgeClasses(selectedMachine.status),
                    )}
                  >
                    {selectedMachine.status}
                  </span>
                  <span className="rounded-full bg-[#f7f3ec] px-2.5 py-1 text-[9px] font-black uppercase tracking-[0.16em] text-[#816b55]">
                    {selectedMachine.active_anomalies_count ?? 0} active
                    anomalies
                  </span>
                </div>
              </div>

              <div className="flex-1 space-y-4 overflow-y-auto px-5 py-4">
                <DetailRow
                  icon="location_on"
                  label="Location"
                  value={selectedMachine.location || "Not provided"}
                />
                <DetailRow
                  icon="my_location"
                  label="Coordinates"
                  value={`${selectedMachine.latitude.toFixed(6)}, ${selectedMachine.longitude.toFixed(6)}`}
                />
                <DetailRow
                  icon="business_center"
                  label="Owner"
                  value={
                    selectedMachine.created_by
                      ? `${selectedMachine.created_by.first_name} ${selectedMachine.created_by.last_name}`
                      : "Not available"
                  }
                />

                <button
                  type="button"
                  onClick={() =>
                    navigate(`/admin/machines/${selectedMachine.id}/history`)
                  }
                  className="mt-2 flex w-full items-center justify-center gap-2 rounded-[14px] border border-[#d5eee9] bg-white px-3 py-3 text-[10px] font-black uppercase tracking-[0.18em] text-primary transition-colors hover:bg-[#edf8f7]"
                >
                  <span className="material-symbols-outlined text-[16px]">
                    history
                  </span>
                  History
                </button>
              </div>
            </>
          )}
        </aside>
      </section>
    </div>
  );
}

function SummaryTile({
  label,
  value,
  alert = false,
}: {
  label: string;
  value: number;
  alert?: boolean;
}) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center rounded-[20px] border border-white/60 px-5 py-3 shadow-lg backdrop-blur-md",
        alert ? "bg-[#d9534f] text-white" : "bg-white/95 text-[#2d241c]",
      )}
    >
      <p className="text-[9px] font-bold uppercase tracking-[0.24em] opacity-70">
        {label}
      </p>
      <p className="mt-1 text-xl font-black">{value}</p>
    </div>
  );
}

function LegendItem({ color, label }: { color: string; label: string }) {
  return (
    <div className="flex items-center gap-2">
      <span className={cn("h-2 w-2 rounded-full", color)} />
      {label}
    </div>
  );
}

function DetailRow({
  icon,
  label,
  value,
}: {
  icon: string;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center gap-4 rounded-[18px] border border-[#e7ddd0] bg-white p-4">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#f0f4f3] text-[#3b8f88]">
        <span className="material-symbols-outlined text-[20px]">{icon}</span>
      </div>
      <div className="min-w-0">
        <p className="text-[9px] font-black uppercase tracking-widest text-[#9d9388]">
          {label}
        </p>
        <p className="truncate text-[13px] font-bold text-[#2d241c]">
          {value}
        </p>
      </div>
    </div>
  );
}
