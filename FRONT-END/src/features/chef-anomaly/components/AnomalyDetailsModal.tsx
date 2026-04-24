import { Alert } from "@/shared/components/feedback";
import { Button, Spinner } from "@/shared/components/ui";
import type { ChefAnomaly, MaintenanceTaskCheckItem } from "../types/anomaly";
import { AnomalyStatusBadge } from "./AnomalyStatusBadge";

function formatDate(value?: string) {
  if (!value) {
    return "Not available";
  }

  return new Date(value).toLocaleString();
}

function getChecklistItemClasses(item: MaintenanceTaskCheckItem) {
  if (item.status === "anomaly") {
    return "border-red-200 bg-red-50";
  }

  if (item.status === "not_ok") {
    return "border-[#f4d6b3] bg-[#fff3e4]";
  }

  if (item.status === "ok") {
    return "border-[#b9dfdc] bg-[#edf8f7]";
  }

  return "border-[#e6ddd2] bg-[#fcfaf7]";
}

type AnomalyDetailsModalProps = {
  anomaly: ChefAnomaly | null;
  isOpen: boolean;
  isLoading: boolean;
  error: string | null;
  onClose: () => void;
  onOpenRepairRequest: () => void;
};

export function AnomalyDetailsModal({
  anomaly,
  isOpen,
  isLoading,
  error,
  onClose,
  onOpenRepairRequest,
}: AnomalyDetailsModalProps) {
  if (!isOpen) {
    return null;
  }

  const canCreateRepairRequest =
    anomaly?.status === "pending" && !anomaly.repair_request;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#2d2d2d]/45 p-4">
      <div className="max-h-[92vh] w-full max-w-5xl overflow-hidden rounded-[30px] border border-[#ddd5c8] bg-[#fcfaf7] shadow-[0_30px_80px_rgba(0,0,0,0.22)]">
        <div className="flex items-start justify-between gap-4 border-b border-[#ece6dc] px-6 py-5">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.24em] text-[#8f8477]">
              Anomaly Details
            </p>
            <h2 className="mt-2 text-2xl font-black tracking-tight text-[#2d241c]">
              {anomaly?.title ?? "Loading anomaly"}
            </h2>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="flex h-11 w-11 items-center justify-center rounded-2xl border border-[#ddd5c8] bg-white text-[#6f6254] transition hover:bg-[#f7f3ec]"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        <div className="max-h-[calc(92vh-92px)] overflow-y-auto px-6 py-5">
          {isLoading && (
            <div className="flex min-h-[320px] flex-col items-center justify-center">
              <Spinner />
              <p className="mt-4 text-[11px] font-black uppercase tracking-[0.24em] text-[#8f8477]">
                Loading anomaly details
              </p>
            </div>
          )}

          {!isLoading && error && (
            <Alert variant="error" title="Unable to load anomaly">
              {error}
            </Alert>
          )}

          {!isLoading && !error && anomaly && (
            <div className="space-y-6">
              <section className="rounded-[26px] border border-[#ddd5c8] bg-white px-5 py-5 shadow-[0_14px_35px_rgba(62,52,39,0.06)]">
                <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                  <div className="max-w-3xl">
                    <AnomalyStatusBadge
                      status={anomaly.status}
                      severity={anomaly.severity}
                    />
                    <p className="mt-4 text-sm leading-7 text-[#6f6254]">
                      {anomaly.description}
                    </p>
                  </div>

                  <div className="flex flex-col gap-3">
                    {canCreateRepairRequest ? (
                      <Button onClick={onOpenRepairRequest}>
                        <span className="material-symbols-outlined text-[18px]">
                          build_circle
                        </span>
                        Send Repair Request
                      </Button>
                    ) : anomaly.repair_request ? (
                      <div className="rounded-2xl border border-[#b9dfdc] bg-[#edf8f7] px-4 py-3 text-sm text-primary">
                        Repair request already sent.
                      </div>
                    ) : null}

                    <div className="rounded-2xl border border-[#ece6dc] bg-[#fcfaf7] px-4 py-3 text-sm text-[#6f6254]">
                      Reported on {formatDate(anomaly.created_at)}
                    </div>
                  </div>
                </div>
              </section>

              <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                <div className="rounded-2xl border border-[#ddd5c8] bg-white px-4 py-4 shadow-[0_14px_35px_rgba(62,52,39,0.05)]">
                  <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#988a79]">
                    Machine
                  </p>
                  <p className="mt-2 text-sm font-black text-[#2d241c]">
                    {anomaly.machine.name}
                  </p>
                  <p className="mt-1 text-xs text-[#7f7468]">
                    {anomaly.machine.code}
                  </p>
                </div>

                <div className="rounded-2xl border border-[#ddd5c8] bg-white px-4 py-4 shadow-[0_14px_35px_rgba(62,52,39,0.05)]">
                  <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#988a79]">
                    Location
                  </p>
                  <p className="mt-2 text-sm font-black text-[#2d241c]">
                    {anomaly.machine.location}
                  </p>
                </div>

                <div className="rounded-2xl border border-[#ddd5c8] bg-white px-4 py-4 shadow-[0_14px_35px_rgba(62,52,39,0.05)]">
                  <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#988a79]">
                    Technician
                  </p>
                  <p className="mt-2 text-sm font-black text-[#2d241c]">
                    {anomaly.reported_by.first_name} {anomaly.reported_by.last_name}
                  </p>
                  <p className="mt-1 text-xs text-[#7f7468]">
                    {anomaly.reported_by.email}
                  </p>
                </div>

                <div className="rounded-2xl border border-[#ddd5c8] bg-white px-4 py-4 shadow-[0_14px_35px_rgba(62,52,39,0.05)]">
                  <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#988a79]">
                    Checklist Template
                  </p>
                  <p className="mt-2 text-sm font-black text-[#2d241c]">
                    {anomaly.maintenance_task?.checklist_template?.name ??
                      "Not linked"}
                  </p>
                </div>
              </section>

              <section className="grid gap-6 xl:grid-cols-[1fr_1.1fr]">
                <div className="rounded-[26px] border border-[#ddd5c8] bg-white px-5 py-5 shadow-[0_16px_40px_rgba(62,52,39,0.06)]">
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-[#8f8477]">
                        Matched Maintenance Items
                      </p>
                      <p className="mt-1 text-sm text-[#6f6254]">
                        Checklist items marked as anomaly during this maintenance task.
                      </p>
                    </div>
                  </div>

                  <div className="mt-4 space-y-3">
                    {(anomaly.matched_check_items ?? []).length === 0 ? (
                      <div className="rounded-2xl border border-dashed border-[#d8d0c4] bg-[#fcfaf7] px-4 py-4 text-sm text-[#7f7468]">
                        No matched checklist items were returned for this anomaly.
                      </div>
                    ) : (
                      anomaly.matched_check_items?.map((item) => (
                        <div
                          key={item.id}
                          className="rounded-2xl border border-red-200 bg-red-50 px-4 py-4"
                        >
                          <p className="text-sm font-bold text-[#2d241c]">
                            {item.label ?? `Checklist #${item.checklist_item_id}`}
                          </p>
                          {item.comment && (
                            <p className="mt-2 text-sm leading-6 text-[#7b4b48]">
                              {item.comment}
                            </p>
                          )}
                        </div>
                      ))
                    )}
                  </div>
                </div>

                <div className="rounded-[26px] border border-[#ddd5c8] bg-white px-5 py-5 shadow-[0_16px_40px_rgba(62,52,39,0.06)]">
                  <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-[#8f8477]">
                    Full Maintenance Checklist
                  </p>
                  <p className="mt-1 text-sm text-[#6f6254]">
                    Scheduled on {formatDate(anomaly.maintenance_task?.scheduled_at)}
                  </p>

                  <div className="mt-4 space-y-3">
                    {(anomaly.maintenance_task?.check_items ?? []).map((item) => (
                      <div
                        key={item.checklist_item_id}
                        className={`rounded-2xl border px-4 py-4 ${getChecklistItemClasses(item)}`}
                      >
                        <div className="flex flex-col gap-2 md:flex-row md:items-start md:justify-between">
                          <div>
                            <p className="text-sm font-bold text-[#2d241c]">
                              {item.label}
                            </p>
                            {item.comment && (
                              <p className="mt-2 text-sm leading-6 text-[#6f6254]">
                                {item.comment}
                              </p>
                            )}
                          </div>

                          <span className="rounded-full border border-white/60 bg-white/70 px-3 py-1 text-[10px] font-black uppercase tracking-[0.16em] text-[#6f6254]">
                            {item.status ?? "not checked"}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </section>

              {anomaly.repair_request && (
                <section className="rounded-[26px] border border-[#ddd5c8] bg-white px-5 py-5 shadow-[0_16px_40px_rgba(62,52,39,0.06)]">
                  <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                    <div>
                      <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-[#8f8477]">
                        Repair Request
                      </p>
                      <h3 className="mt-2 text-lg font-black text-[#2d241c]">
                        {anomaly.repair_request.title}
                      </h3>
                      <p className="mt-2 text-sm leading-7 text-[#6f6254]">
                        {anomaly.repair_request.description}
                      </p>
                    </div>

                    <div className="rounded-2xl border border-[#ece6dc] bg-[#fcfaf7] px-4 py-4 text-sm text-[#6f6254]">
                      <p className="font-bold text-[#2d241c]">
                        Estimated cost: {Number(anomaly.repair_request.estimated_cost).toFixed(2)}
                      </p>
                      <p className="mt-1">
                        Status: {anomaly.repair_request.status.replace("_", " ")}
                      </p>
                    </div>
                  </div>
                </section>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
