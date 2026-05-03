import { Alert } from "@/shared/components/feedback";
import { Button, Spinner } from "@/shared/components/ui";
import { formatDate } from "@/shared/utils/formatters";
import type { AnomalyDetailsModalProps } from "../types/anomaly";
import { AnomalyStatusBadge } from "./AnomalyStatusBadge";

export function AnomalyDetailsModal({
  anomaly,
  isOpen,
  isLoading,
  error,
  isReviewingPurchaseOrder,
  onClose,
  onOpenRepairRequest,
  onApprovePurchaseOrder,
  onRejectPurchaseOrder,
}: AnomalyDetailsModalProps) {
  if (!isOpen) return null;

  const repairRequests = Array.isArray(anomaly?.repair_request)
    ? anomaly.repair_request
    : [];
  const isOpenAnomaly =
    anomaly?.status === "open" || anomaly?.status === "pending";
  const canCreateRepairRequest = isOpenAnomaly && repairRequests.length === 0;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-sm p-4">
      <div className="max-h-[94vh] w-full max-w-5xl overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-2xl">
        <div className="flex items-center justify-between border-b border-slate-100 px-8 py-6">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-widest text-[#43968C]">
              Anomaly Specification
            </p>
            <h2 className="mt-1 text-2xl font-bold tracking-tight text-slate-900">
              {anomaly?.title ?? "Loading Details"}
            </h2>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-400 transition hover:bg-slate-50 hover:text-slate-600"
          >
            <span className="material-symbols-outlined text-[22px]">close</span>
          </button>
        </div>

        <div className="max-h-[calc(94vh-100px)] overflow-y-auto px-8 py-8 custom-scrollbar">
          {isLoading ? (
            <div className="flex min-h-75 flex-col items-center justify-center">
              <Spinner className="text-[#43968C]" />
              <p className="mt-4 text-[13px] font-medium text-slate-400 animate-pulse">
                Fetching anomaly data...
              </p>
            </div>
          ) : error ? (
            <Alert variant="error" title="Unable to load anomaly">
              {error}
            </Alert>
          ) : (
            anomaly && (
              <div className="space-y-8">
                <section className="rounded-2xl border border-slate-100 bg-slate-50/50 p-6">
                  <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
                    <div className="max-w-3xl min-w-0">
                      <AnomalyStatusBadge
                        status={anomaly.status}
                        severity={anomaly.severity}
                      />
                      <p className="mt-5 text-[15px] leading-relaxed text-slate-600">
                        {anomaly.description}
                      </p>
                    </div>

                    <div className="flex flex-col gap-3 min-w-60">
                      {canCreateRepairRequest ? (
                        <Button
                          onClick={onOpenRepairRequest}
                          className="w-full h-11 bg-[#43968C] hover:bg-[#388178]"
                        >
                          <div className="flex items-center gap-1">
                            <span className="material-symbols-outlined text-[18px]">
                              build_circle
                            </span>
                            <span>Create Repair Request</span>
                          </div>
                        </Button>
                      ) : (
                        repairRequests.length > 0 && (
                          <div className="rounded-xl border border-teal-100 bg-teal-50 px-4 py-3 text-[13px] font-semibold text-teal-700 flex items-center gap-2">
                            <span className="material-symbols-outlined text-[18px]">
                              check_circle
                            </span>
                            Request In Progress
                          </div>
                        )
                      )}
                      <div className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-[13px] font-medium text-slate-500">
                        Reported: {formatDate(anomaly.created_at)}
                      </div>
                    </div>
                  </div>
                </section>

                <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                  {[
                    {
                      label: "Machine",
                      val: anomaly.machine.name,
                      sub: anomaly.machine.code,
                      icon: "precision_manufacturing",
                    },
                    {
                      label: "Location",
                      val: anomaly.machine.location,
                      icon: "location_on",
                    },
                    {
                      label: "Technician",
                      val: `${anomaly.reported_by.first_name} ${anomaly.reported_by.last_name}`,
                      sub: anomaly.reported_by.email,
                      icon: "person",
                    },
                    {
                      label: "Checklist",
                      val:
                        anomaly.maintenance_task?.checklist_template?.name ??
                        "Not linked",
                      icon: "assignment",
                    },
                  ].map((item, i) => (
                    <div
                      key={i}
                      className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm transition-colors hover:border-slate-200"
                    >
                      <span className="material-symbols-outlined text-[20px] text-slate-300 mb-2 block">
                        {item.icon}
                      </span>
                      <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                        {item.label}
                      </p>
                      <p className="mt-1 text-[14px] font-bold text-slate-900 truncate">
                        {item.val}
                      </p>
                      {item.sub && (
                        <p className="text-[12px] text-slate-500 mt-0.5 truncate">
                          {item.sub}
                        </p>
                      )}
                    </div>
                  ))}
                </section>

                <section className="grid gap-6 lg:grid-cols-2">
                  <div className="flex flex-col">
                    <div className="mb-4">
                      <h3 className="text-[14px] font-bold text-slate-900">
                        Flagged Issues
                      </h3>
                      <p className="text-[12px] text-slate-500">
                        Items marked during inspection
                      </p>
                    </div>
                    <div className="space-y-3">
                      {(anomaly.matched_check_items ?? []).length === 0 ? (
                        <div className="rounded-xl border border-dashed border-slate-200 bg-slate-50/50 p-6 text-center text-[13px] text-slate-400">
                          No matched checklist items.
                        </div>
                      ) : (
                        anomaly.matched_check_items?.map((item) => (
                          <div
                            key={item.id}
                            className="rounded-xl border border-red-100 bg-red-50/30 p-4"
                          >
                            <p className="text-[13px] font-bold text-red-900">
                              {item.label ?? `Item #${item.checklist_item_id}`}
                            </p>
                            {item.comment && (
                              <p className="mt-1 text-[13px] text-red-700/80 leading-relaxed">
                                {item.comment}
                              </p>
                            )}
                          </div>
                        ))
                      )}
                    </div>
                  </div>

                  <div className="flex flex-col">
                    <div className="mb-4">
                      <h3 className="text-[14px] font-bold text-slate-900">
                        Task Overview
                      </h3>
                      <p className="text-[12px] text-slate-500">
                        Full inspection scheduled on{" "}
                        {formatDate(anomaly.maintenance_task?.scheduled_at)}
                      </p>
                    </div>
                    <div className="space-y-2 max-h-75 overflow-y-auto pr-2 custom-scrollbar">
                      {(anomaly.maintenance_task?.check_items ?? []).map(
                        (item) => (
                          <div
                            key={item.checklist_item_id}
                            className={`rounded-xl border p-3 flex items-center justify-between gap-4 ${item.status === "ok" ? "bg-white border-slate-100" : "bg-red-50/20 border-red-100"}`}
                          >
                            <div className="min-w-0">
                              <p className="text-[13px] font-medium text-slate-700 truncate">
                                {item.label}
                              </p>
                            </div>
                            <span
                              className={`text-[10px] font-bold uppercase px-2 py-1 rounded-md ${item.status === "ok" ? "bg-slate-100 text-slate-500" : "bg-red-100 text-red-600"}`}
                            >
                              {item.status ?? "N/A"}
                            </span>
                          </div>
                        ),
                      )}
                    </div>
                  </div>
                </section>

                {repairRequests.map((repairRequest) => (
                  <section
                    key={repairRequest.id}
                    className="rounded-2xl border border-slate-200 bg-white overflow-hidden shadow-sm"
                  >
                    <div className="bg-slate-50 px-6 py-4 border-b border-slate-100 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-[20px] text-[#43968C]">
                          engineering
                        </span>
                        <h3 className="text-[14px] font-bold text-slate-900">
                          Repair Workflow: {repairRequest.title}
                        </h3>
                      </div>
                      <span className="text-[11px] font-bold uppercase bg-white px-3 py-1 rounded-full border border-slate-200 text-slate-500">
                        {repairRequest.status?.replace("_", " ")}
                      </span>
                    </div>

                    <div className="p-6">
                      <div className="flex flex-col md:flex-row justify-between gap-6">
                        <p className="text-[14px] text-slate-600 leading-relaxed grow">
                          {repairRequest.description}
                        </p>
                        <div className="bg-slate-50 rounded-xl p-4 min-w-50">
                          <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                            Estimated Budget
                          </p>
                          <p className="text-xl font-bold text-slate-900 mt-1">
                            {Number(repairRequest.estimated_cost ?? 0).toFixed(
                              2,
                            )}{" "}
                            DH
                          </p>
                        </div>
                      </div>

                      {repairRequest.purchase_order && (
                        <div className="mt-6 rounded-2xl border border-slate-100 bg-slate-50/50 p-5">
                          <div className="flex items-center justify-between flex-wrap gap-4">
                            <div className="flex items-center gap-4">
                              <div className="h-10 w-10 bg-white rounded-lg flex items-center justify-center border border-slate-200">
                                <span className="material-symbols-outlined text-slate-400">
                                  description
                                </span>
                              </div>
                              <div>
                                <p className="text-[13px] font-bold text-slate-900">
                                  {
                                    repairRequest.purchase_order
                                      .original_file_name
                                  }
                                </p>
                                <p className="text-[12px] text-slate-500">
                                  Uploaded on{" "}
                                  {formatDate(
                                    repairRequest.purchase_order.created_at,
                                  )}
                                </p>
                              </div>
                            </div>

                            <div className="flex items-center gap-4">
                              <a
                                href={repairRequest.purchase_order.file_url}
                                target="_blank"
                                rel="noreferrer"
                                className="text-[13px] font-semibold text-[#43968C] hover:underline"
                              >
                                View Document
                              </a>
                              {repairRequest.status === "in_progress" &&
                                repairRequest.purchase_order.status ===
                                  "uploaded" && (
                                  <div className="flex gap-2">
                                    <Button
                                      size="sm"
                                      onClick={() =>
                                        onApprovePurchaseOrder(repairRequest.id)
                                      }
                                      isLoading={isReviewingPurchaseOrder}
                                      className="h-9 bg-teal-600"
                                    >
                                      Approve
                                    </Button>
                                    <Button
                                      size="sm"
                                      variant="danger"
                                      onClick={() =>
                                        onRejectPurchaseOrder(repairRequest.id)
                                      }
                                      disabled={isReviewingPurchaseOrder}
                                      className="h-9"
                                    >
                                      Reject
                                    </Button>
                                  </div>
                                )}
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </section>
                ))}
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
}
