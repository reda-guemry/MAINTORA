import { Alert } from "@/shared/components/feedback";
import { Spinner } from "@/shared/components/ui";
import { formatDateTime } from "@/shared/utils/formatters";
import type { MachineHistoryTaskModalProps } from "../types/machineHistory";
import {
  formatCost,
  formatStatus,
  getCheckStatusClasses,
  getRepairStatusClasses,
  getSeverityClasses,
  getTaskStatusClasses,
} from "../utils/machineHistoryModal";

export function MachineHistoryTaskModal({
  task,
  isLoading,
  error,
  onClose,
}: MachineHistoryTaskModalProps) {
  return (
    <div className="fixed inset-0 z-70 flex items-center justify-center bg-[#2d2d2d]/50 p-4">
      <div className="flex max-h-[90vh] w-full max-w-5xl flex-col overflow-hidden rounded-[30px] border border-[#dce5e2] bg-white shadow-[0_30px_90px_rgba(0,0,0,0.25)]">
        <div className="flex items-start justify-between gap-4 border-b border-[#dce5e2] bg-[#f8faf9] px-6 py-5">
          <div>
            <p className="text-[10px] font-black uppercase tracking-[0.22em] text-primary">
              Maintenance task details
            </p>
            <h3 className="mt-1 text-xl font-black text-[#2d241c]">
              {task ? `Task #${task.id}` : "Loading task"}
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-full border border-[#dce5e2] bg-white p-2 text-[#607776] transition-colors hover:bg-[#edf8f7] hover:text-primary"
            aria-label="Close task details"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        <div className="overflow-y-auto px-6 py-5">
          {isLoading && (
            <div className="flex min-h-90 flex-col items-center justify-center">
              <Spinner />
              <p className="mt-4 text-xs font-bold uppercase tracking-widest text-slate-400">
                Loading details...
              </p>
            </div>
          )}

          {!isLoading && error && (
            <Alert variant="error" title="Task unavailable">
              {error}
            </Alert>
          )}

          {!isLoading && task && (
            <div className="space-y-6">
              <section className="grid gap-4 rounded-2xl border border-[#dce5e2] bg-[#fbfdfc] p-4 md:grid-cols-4">
                <div>
                  <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                    Status
                  </p>
                  <span
                    className={`mt-2 inline-flex rounded px-2.5 py-1 text-[10px] font-black uppercase ${getTaskStatusClasses(
                      task.status,
                    )}`}
                  >
                    {formatStatus(task.status)}
                  </span>
                </div>
                <div>
                  <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                    Scheduled
                  </p>
                  <p className="mt-2 text-sm font-bold text-[#2d241c]">
                    {formatDateTime(task.scheduled_at)}
                  </p>
                </div>
                <div>
                  <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                    Completed
                  </p>
                  <p className="mt-2 text-sm font-bold text-[#2d241c]">
                    {task.completed_at
                      ? formatDateTime(task.completed_at)
                      : "Not completed"}
                  </p>
                </div>
                <div>
                  <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                    Checklist
                  </p>
                  <p className="mt-2 text-sm font-bold text-[#2d241c]">
                    {task.checklist_template?.name ?? "No template"}
                  </p>
                </div>
              </section>

              <section>
                <h4 className="text-sm font-black uppercase tracking-[0.18em] text-[#607776]">
                  Checklist results
                </h4>
                <div className="mt-3 grid gap-3 md:grid-cols-2">
                  {(task.check_items ?? []).length === 0 && (
                    <div className="rounded-2xl border border-dashed border-slate-200 bg-slate-50 px-4 py-8 text-center text-sm font-medium text-slate-500 md:col-span-2">
                      No checklist items found for this task.
                    </div>
                  )}

                  {(task.check_items ?? []).map((item) => (
                    <article
                      key={item.checklist_item_id}
                      className={`rounded-2xl border px-4 py-4 ${getCheckStatusClasses(
                        item.status,
                      )}`}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <p className="text-sm font-black">{item.label}</p>
                        <span className="shrink-0 rounded-full bg-white/70 px-2 py-1 text-[9px] font-black uppercase">
                          {formatStatus(item.status)}
                        </span>
                      </div>
                      {item.comment && (
                        <p className="mt-3 text-xs font-medium leading-5">
                          {item.comment}
                        </p>
                      )}
                    </article>
                  ))}
                </div>
              </section>

              <section>
                <h4 className="text-sm font-black uppercase tracking-[0.18em] text-[#607776]">
                  Anomalies
                </h4>
                <div className="mt-3 space-y-3">
                  {(task.anomalies ?? []).length === 0 && (
                    <div className="rounded-2xl border border-dashed border-slate-200 bg-slate-50 px-4 py-8 text-center text-sm font-medium text-slate-500">
                      No anomalies were created during this maintenance task.
                    </div>
                  )}

                  {(task.anomalies ?? []).map((anomaly) => (
                    <article
                      key={anomaly.id}
                      className="rounded-2xl border border-red-100 bg-red-50/40 p-4"
                    >
                      <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                        <div>
                          <p className="text-base font-black text-[#2d241c]">
                            {anomaly.title}
                          </p>
                          <p className="mt-2 text-sm leading-6 text-[#6f6254]">
                            {anomaly.description}
                          </p>
                        </div>
                        <div className="flex shrink-0 flex-wrap gap-2">
                          <span
                            className={`rounded px-2.5 py-1 text-[10px] font-black uppercase ${getSeverityClasses(
                              anomaly.severity,
                            )}`}
                          >
                            {anomaly.severity}
                          </span>
                          <span className="rounded bg-white px-2.5 py-1 text-[10px] font-black uppercase text-slate-600">
                            {formatStatus(anomaly.status)}
                          </span>
                        </div>
                      </div>

                      <div className="mt-4 rounded-xl border border-white bg-white/75 p-3">
                        <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                          Linked repair requests
                        </p>
                        {anomaly.repair_requests.length === 0 ? (
                          <p className="mt-2 text-xs font-medium text-slate-500">
                            No repair request linked.
                          </p>
                        ) : (
                          <div className="mt-3 space-y-2">
                            {anomaly.repair_requests.map((repairRequest) => (
                              <div
                                key={repairRequest.id}
                                className="flex flex-col gap-2 rounded-lg border border-slate-100 bg-white px-3 py-3 md:flex-row md:items-center md:justify-between"
                              >
                                <div>
                                  <p className="text-sm font-black text-[#2d241c]">
                                    {repairRequest.title}
                                  </p>
                                  <p className="mt-1 text-xs text-slate-500">
                                    {formatCost(repairRequest.estimated_cost)}
                                  </p>
                                </div>
                                <span
                                  className={`w-fit rounded px-2 py-1 text-[9px] font-black uppercase ${getRepairStatusClasses(
                                    repairRequest.status,
                                  )}`}
                                >
                                  {formatStatus(repairRequest.status)}
                                </span>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </article>
                  ))}
                </div>
              </section>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
