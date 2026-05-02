import { useMemo, useState } from "react";
import { AppPagination } from "@/shared/components";
import { Alert } from "@/shared/components/feedback";
import { Button, Input, Spinner } from "@/shared/components/ui";
import { formatDate } from "@/shared/utils/formatters";
import { getRepairStatusClasses } from "@/shared/utils/statusHelpers";
import { cn } from "@/shared/utils";
import {
  UploadPurchaseOrderModal,
  usePaginateClientRepairRequests,
  useUploadRepairPurchaseOrder,
  type ClientRepairRequest,
} from "@/features/client-repair-request";

export default function RepairRequestsPage() {
  const [statusFilter, setStatusFilter] = useState("");
  const [search, setSearch] = useState("");
  const [selectedRepairRequest, setSelectedRepairRequest] =
    useState<ClientRepairRequest | null>(null);

  const {
    repairRequests,
    paginate,
    currentPage,
    setPage,
    isLoading,
    error,
    updateRepairRequestInList,
    fetchRepairRequests,
  } = usePaginateClientRepairRequests(statusFilter);

  const {
    uploadPurchaseOrderCall,
    isUploading,
    error: uploadError,
  } = useUploadRepairPurchaseOrder();

  const filteredRepairRequests = useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase();

    if (!normalizedSearch) {
      return repairRequests;
    }

    return repairRequests.filter((repairRequest) => {
      return (
        repairRequest.title.toLowerCase().includes(normalizedSearch) ||
        repairRequest.description.toLowerCase().includes(normalizedSearch) ||
        repairRequest.machine.name.toLowerCase().includes(normalizedSearch) ||
        repairRequest.machine.code.toLowerCase().includes(normalizedSearch) ||
        (repairRequest.anomaly?.title ?? "")
          .toLowerCase()
          .includes(normalizedSearch)
      );
    });
  }, [repairRequests, search]);

  const openCount = repairRequests.filter((item) => item.status === "open").length;
  const inProgressCount = repairRequests.filter(
    (item) => item.status === "in_progress"
  ).length;
  const completedCount = repairRequests.filter(
    (item) => item.status === "completed"
  ).length;

  async function handleUploadPurchaseOrder(file: File) {
    if (!selectedRepairRequest) {
      return;
    }

    const response = await uploadPurchaseOrderCall(selectedRepairRequest.id, file);

    if (!response) {
      return;
    }

    updateRepairRequestInList(response.data);
    await fetchRepairRequests();
    setSelectedRepairRequest(null);
  }

  return (
    <div className="space-y-6 pb-8">
      {/* Header Section */}
      <section className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        <div className="flex items-center gap-4">
          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-teal-50 text-[#43968C] shadow-sm">
            <span className="material-symbols-outlined text-[28px]">
              home_repair_service
            </span>
          </div>
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
              Repair Requests
            </h1>
            <p className="mt-1 text-xs font-medium text-slate-500 sm:text-sm">
              Review status, estimated costs, and upload purchase orders.
            </p>
          </div>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-3 gap-3 sm:gap-4">
          {[
            { label: "Open", value: openCount, color: "text-blue-600", bg: "bg-blue-50" },
            { label: "In Progress", value: inProgressCount, color: "text-amber-600", bg: "bg-amber-50" },
            { label: "Completed", value: completedCount, color: "text-teal-600", bg: "bg-teal-50" },
          ].map((item) => (
            <div
              key={item.label}
              className="flex flex-col items-center justify-center rounded-2xl border border-slate-200 bg-white p-3 shadow-sm sm:items-start sm:p-4"
            >
              <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
                {item.label}
              </p>
              <div className="mt-1 flex items-baseline gap-2">
                <p className="text-xl font-black text-slate-900 sm:text-2xl">
                  {item.value}
                </p>
                <span className={cn("hidden h-2 w-2 rounded-full sm:block", item.bg)}></span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Filters Section */}
      <section className="rounded-[24px] border border-slate-200 bg-white p-4 shadow-sm">
        <div className="flex flex-col gap-4 sm:flex-row">
          <div className="relative flex-1">
            <span className="material-symbols-outlined pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
              search
            </span>
            <Input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search by request, machine, or anomaly..."
              className="h-12 w-full rounded-xl border-slate-200 bg-slate-50 pl-12 text-sm focus:border-[#43968C] focus:bg-white focus:ring-2 focus:ring-[#43968C]/20 transition-all"
            />
          </div>

          <div className="relative w-full sm:w-64 shrink-0">
            <span className="material-symbols-outlined pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
              filter_list
            </span>
            <select
              value={statusFilter}
              onChange={(event) => setStatusFilter(event.target.value)}
              className="h-12 w-full appearance-none rounded-xl border border-slate-200 bg-slate-50 pl-12 pr-10 text-sm font-medium text-slate-900 outline-none transition-all focus:border-[#43968C] focus:bg-white focus:ring-4 focus:ring-[#43968C]/10 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <option value="">All Statuses</option>
              <option value="open">Open</option>
              <option value="in_progress">In Progress</option>
              <option value="completed">Completed</option>
              <option value="rejected">Rejected</option>
            </select>
            <span className="material-symbols-outlined pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-slate-400">
              expand_more
            </span>
          </div>
        </div>
      </section>

      {/* Content Section */}
      {error && (
        <Alert variant="error" title="Repair requests unavailable">
          {error}
        </Alert>
      )}

      {isLoading && repairRequests.length === 0 ? (
        <div className="flex min-h-[300px] flex-col items-center justify-center rounded-[24px] border border-slate-200 bg-white shadow-sm">
          <Spinner className="text-[#43968C]" size="lg" />
          <p className="mt-4 text-[11px] font-bold uppercase tracking-widest text-slate-400 animate-pulse">
            Loading repair requests...
          </p>
        </div>
      ) : filteredRepairRequests.length === 0 ? (
        <div className="flex min-h-[300px] flex-col items-center justify-center rounded-[24px] border border-dashed border-slate-300 bg-slate-50 px-6 py-16 text-center shadow-sm">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white shadow-sm">
            <span className="material-symbols-outlined text-[32px] text-slate-400">
              search_off
            </span>
          </div>
          <p className="mt-4 text-[11px] font-bold uppercase tracking-widest text-slate-500">
            No repair requests found
          </p>
          <p className="mt-2 max-w-sm text-sm text-slate-400">
            There are no repair requests matching your current search or filters. Try adjusting them.
          </p>
        </div>
      ) : (
        <section className="grid gap-6 xl:grid-cols-2">
          {filteredRepairRequests.map((repairRequest) => (
            <article
              key={repairRequest.id}
              className="group flex flex-col rounded-[24px] border border-slate-200 bg-white p-6 shadow-sm transition-all hover:border-slate-300 hover:shadow-md"
            >
              {/* Card Header */}
              <div className="flex items-start justify-between gap-4 border-b border-slate-100 pb-5">
                <div className="flex gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-slate-50 text-slate-500 transition-colors group-hover:bg-teal-50 group-hover:text-[#43968C]">
                    <span className="material-symbols-outlined text-[24px]">
                      precision_manufacturing
                    </span>
                  </div>
                  <div>
                    <h2 className="text-base font-bold leading-tight text-slate-900 line-clamp-1">
                      {repairRequest.title}
                    </h2>
                    <div className="mt-1 flex flex-wrap items-center gap-2">
                      <p className="text-sm font-medium text-slate-600">
                        {repairRequest.machine.name}
                      </p>
                      <span className="h-1 w-1 rounded-full bg-slate-300"></span>
                      <p className="font-mono text-[10px] font-bold uppercase tracking-widest text-slate-400">
                        {repairRequest.machine.code}
                      </p>
                    </div>
                  </div>
                </div>
                <span
                  className={cn(
                    "shrink-0 rounded-lg px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest shadow-sm",
                    getRepairStatusClasses(repairRequest.status)
                  )}
                >
                  {repairRequest.status.replace("_", " ")}
                </span>
              </div>

              {/* Card Body */}
              <div className="flex-1 py-5">
                <p className="text-sm leading-relaxed text-slate-600 line-clamp-2">
                  {repairRequest.description}
                </p>

                {/* Details Grid */}
                <div className="mt-6 grid grid-cols-2 gap-3 rounded-xl border border-slate-100 bg-slate-50 p-4">
                  <div>
                    <span className="block text-[10px] font-bold uppercase tracking-widest text-slate-400">
                      Linked Anomaly
                    </span>
                    <span className="mt-1 block text-sm font-semibold text-slate-900 truncate">
                      {repairRequest.anomaly?.title ?? "Not linked"}
                    </span>
                  </div>
                  <div>
                    <span className="block text-[10px] font-bold uppercase tracking-widest text-slate-400">
                      Reported By
                    </span>
                    <span className="mt-1 block text-sm font-semibold text-slate-900 truncate">
                      {repairRequest.anomaly?.reported_by
                        ? `${repairRequest.anomaly.reported_by.first_name} ${repairRequest.anomaly.reported_by.last_name}`
                        : "Unknown"}
                    </span>
                  </div>
                  <div>
                    <span className="block text-[10px] font-bold uppercase tracking-widest text-slate-400">
                      Est. Cost
                    </span>
                    <span className="mt-1 block text-sm font-bold text-teal-700">
                      {Number(repairRequest.estimated_cost).toFixed(2)}
                    </span>
                  </div>
                  <div>
                    <span className="block text-[10px] font-bold uppercase tracking-widest text-slate-400">
                      Created At
                    </span>
                    <span className="mt-1 block text-sm font-semibold text-slate-900">
                      {formatDate(repairRequest.created_at)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Purchase Order Section */}
              <div className="border-t border-slate-100 pt-5">
                {repairRequest.purchase_order ? (
                  <div className="flex items-center justify-between gap-4 rounded-xl border border-slate-200 bg-white p-3 shadow-sm transition-all hover:bg-slate-50">
                    <div className="flex items-center gap-3 overflow-hidden">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-teal-50 text-teal-600">
                        <span className="material-symbols-outlined text-[20px]">
                          description
                        </span>
                      </div>
                      <div className="overflow-hidden">
                        <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
                          Purchase Order
                        </p>
                        <p className="truncate text-xs font-bold text-slate-900">
                          {repairRequest.purchase_order.original_file_name}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 shrink-0">
                      <span
                        className={cn(
                          "hidden sm:block rounded-md px-2 py-1 text-[10px] font-bold uppercase tracking-widest",
                          getRepairStatusClasses(
                            repairRequest.purchase_order.status === "uploaded"
                              ? "in_progress"
                              : repairRequest.purchase_order.status
                          )
                        )}
                      >
                        {repairRequest.purchase_order.status}
                      </span>
                      <a
                        href={repairRequest.purchase_order.file_url}
                        target="_blank"
                        rel="noreferrer"
                        className="flex h-8 items-center justify-center rounded-lg bg-white border border-slate-200 px-3 text-xs font-bold text-[#43968C] shadow-sm transition-all hover:bg-teal-50"
                      >
                        View
                      </a>
                    </div>
                  </div>
                ) : repairRequest.status === "open" ? (
                  <Button
                    variant="outline"
                    className="w-full justify-center rounded-xl border-slate-200 bg-white py-2.5 text-xs font-bold uppercase tracking-widest text-slate-700 shadow-sm transition-all hover:border-[#43968C]/30 hover:bg-teal-50 hover:text-[#43968C]"
                    onClick={() => setSelectedRepairRequest(repairRequest)}
                  >
                    <div className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-[18px]">
                        upload_file
                      </span>
                      <span>Upload Purchase Order</span>
                    </div>
                  </Button>
                ) : (
                  <div className="flex items-center gap-2 rounded-xl bg-slate-50 px-4 py-3">
                    <span className="material-symbols-outlined text-[18px] text-slate-400">
                      info
                    </span>
                    <p className="text-xs font-medium text-slate-500">
                      Purchase order flow will be completed in the next step.
                    </p>
                  </div>
                )}
              </div>
            </article>
          ))}
        </section>
      )}

      {/* Pagination */}
      {paginate && paginate.last_page > 1 && (
        <section className="flex justify-center pt-4">
          <div className="rounded-[20px] border border-slate-200 bg-white p-2 shadow-sm">
            <AppPagination
              currentPage={currentPage}
              lastPage={paginate.last_page}
              from={paginate.from ?? 0}
              to={paginate.to ?? 0}
              total={paginate.total}
              isLoading={isLoading}
              label="requests"
              onPageChange={setPage}
            />
          </div>
        </section>
      )}

      {/* Modal */}
      <UploadPurchaseOrderModal
        repairRequest={selectedRepairRequest}
        isOpen={selectedRepairRequest !== null}
        isUploading={isUploading}
        error={uploadError}
        onClose={() => setSelectedRepairRequest(null)}
        onSubmit={handleUploadPurchaseOrder}
      />
    </div>
  );
}