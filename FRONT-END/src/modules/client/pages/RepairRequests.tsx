import { useMemo, useState } from "react";
import { Alert } from "@/shared/components/feedback";
import { Button, Input, Spinner } from "@/shared/components/ui";
import {
  UploadPurchaseOrderModal,
  usePaginateClientRepairRequests,
  useUploadRepairPurchaseOrder,
  type ClientRepairRequest,
} from "@/features/client-repair-request";

function getStatusClasses(status: string) {
  if (status === "open") {
    return "border border-[#f4d6b3] bg-[#fff3e4] text-[#b46a1f]";
  }

  if (status === "in_progress") {
    return "border border-[#b9dfdc] bg-[#edf8f7] text-primary";
  }

  if (status === "completed") {
    return "border border-emerald-200 bg-emerald-50 text-emerald-700";
  }

  return "border border-red-200 bg-red-50 text-red-600";
}

function formatDate(value: string) {
  return new Date(value).toLocaleString();
}

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
    (item) => item.status === "in_progress",
  ).length;
  const completedCount = repairRequests.filter(
    (item) => item.status === "completed",
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
    <div className="space-y-6">
      <section className="rounded-[28px] border border-[#d9d1c5] bg-[linear-gradient(180deg,#f2eee7_0%,#ece5d9_100%)] px-6 py-7 shadow-[0_18px_45px_rgba(62,52,39,0.08)]">
        <div className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
          <div className="max-w-3xl">
            <p className="text-[11px] font-bold uppercase tracking-[0.28em] text-[#948674]">
              Repair Requests
            </p>
            <h1 className="mt-3 text-4xl font-black tracking-tight text-[#2d241c] md:text-[42px]">
              Follow every machine repair request sent from the maintenance team.
            </h1>
            <p className="mt-4 max-w-2xl text-sm leading-7 text-[#6f6254]">
              Review request status, linked anomaly, estimated cost, and prepare the next client-side step.
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-3">
            {[
              { label: "Open", value: openCount },
              { label: "In progress", value: inProgressCount },
              { label: "Completed", value: completedCount },
            ].map((item) => (
              <div
                key={item.label}
                className="rounded-2xl border border-white/70 bg-white/70 px-4 py-4"
              >
                <p className="text-[10px] uppercase tracking-[0.24em] text-[#988a79]">
                  {item.label}
                </p>
                <p className="mt-3 text-3xl font-black text-[#2d241c]">
                  {item.value}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="rounded-3xl border border-[#ddd5c8] bg-white p-5 shadow-[0_16px_40px_rgba(62,52,39,0.07)]">
        <div className="grid gap-4 lg:grid-cols-[1.4fr_0.8fr]">
          <div className="relative">
            <span className="material-symbols-outlined pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[#9d9388]">
              search
            </span>
            <Input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search by request, machine, or anomaly..."
              className="border-[#ddd5c8] bg-[#fcfaf7] pl-10"
            />
          </div>

          <select
            value={statusFilter}
            onChange={(event) => setStatusFilter(event.target.value)}
            className="h-12 rounded-lg border border-[#ddd5c8] bg-[#fcfaf7] px-4 text-sm text-[#2d241c] outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/20"
          >
            <option value="">All statuses</option>
            <option value="open">Open</option>
            <option value="in_progress">In progress</option>
            <option value="completed">Completed</option>
            <option value="rejected">Rejected</option>
          </select>
        </div>
      </section>

      {error && (
        <Alert variant="error" title="Repair requests unavailable">
          {error}
        </Alert>
      )}

      {isLoading && repairRequests.length === 0 ? (
        <div className="flex min-h-[280px] flex-col items-center justify-center rounded-[30px] border border-[#ddd5c8] bg-white shadow-[0_16px_40px_rgba(62,52,39,0.07)]">
          <Spinner />
          <p className="mt-4 text-[11px] font-bold uppercase tracking-[0.24em] text-[#8f8477]">
            Loading repair requests
          </p>
        </div>
      ) : filteredRepairRequests.length === 0 ? (
        <div className="rounded-[30px] border border-dashed border-[#d8d0c4] bg-white px-6 py-16 text-center shadow-[0_16px_40px_rgba(62,52,39,0.05)]">
          <p className="text-[11px] font-bold uppercase tracking-[0.24em] text-[#8f8477]">
            No repair requests found
          </p>
          <p className="mt-3 text-sm text-[#6f6254]">
            There is no repair request matching the current search or filter.
          </p>
        </div>
      ) : (
        <section className="grid gap-5 xl:grid-cols-2">
          {filteredRepairRequests.map((repairRequest) => (
            <article
              key={repairRequest.id}
              className="rounded-[28px] border border-[#ddd5c8] bg-white p-5 shadow-[0_16px_40px_rgba(62,52,39,0.07)]"
            >
              <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#988a79]">
                    {repairRequest.machine.code}
                  </p>
                  <h2 className="mt-2 text-xl font-black tracking-tight text-[#2d241c]">
                    {repairRequest.title}
                  </h2>
                  <p className="mt-1 text-sm font-semibold text-[#6f6254]">
                    {repairRequest.machine.name}
                  </p>
                </div>

                <span
                  className={`rounded-full px-3 py-1 text-[10px] font-black uppercase tracking-[0.16em] ${getStatusClasses(repairRequest.status)}`}
                >
                  {repairRequest.status.replace("_", " ")}
                </span>
              </div>

              <p className="mt-4 text-sm leading-7 text-[#6f6254]">
                {repairRequest.description}
              </p>

              <div className="mt-5 grid gap-3 rounded-[22px] bg-[#f7f3ec] px-4 py-4">
                <div className="flex items-center justify-between gap-3 text-sm">
                  <span className="text-[#8d8173]">Linked anomaly</span>
                  <span className="font-bold text-right text-[#2d241c]">
                    {repairRequest.anomaly?.title ?? "Not linked"}
                  </span>
                </div>

                <div className="flex items-center justify-between gap-3 text-sm">
                  <span className="text-[#8d8173]">Reported by</span>
                  <span className="font-bold text-right text-[#2d241c]">
                    {repairRequest.anomaly?.reported_by
                      ? `${repairRequest.anomaly.reported_by.first_name} ${repairRequest.anomaly.reported_by.last_name}`
                      : "Unknown"}
                  </span>
                </div>

                <div className="flex items-center justify-between gap-3 text-sm">
                  <span className="text-[#8d8173]">Estimated cost</span>
                  <span className="font-bold text-right text-[#2d241c]">
                    {Number(repairRequest.estimated_cost).toFixed(2)}
                  </span>
                </div>

                <div className="flex items-center justify-between gap-3 text-sm">
                  <span className="text-[#8d8173]">Created at</span>
                  <span className="font-bold text-right text-[#2d241c]">
                    {formatDate(repairRequest.created_at)}
                  </span>
                </div>
              </div>

              {repairRequest.purchase_order && (
                <div className="mt-5 rounded-2xl border border-[#dce5e2] bg-[#f8fbfb] px-4 py-4">
                  <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
                    <div>
                      <p className="text-[10px] font-black uppercase tracking-[0.16em] text-[#988a79]">
                        Purchase order
                      </p>
                      <p className="mt-1 text-sm font-bold text-[#2d241c]">
                        {repairRequest.purchase_order.original_file_name}
                      </p>
                    </div>

                    <div className="flex items-center gap-3">
                      <span
                        className={`rounded-full px-3 py-1 text-[10px] font-black uppercase tracking-[0.16em] ${getStatusClasses(repairRequest.purchase_order.status === "uploaded" ? "in_progress" : repairRequest.purchase_order.status)}`}
                      >
                        {repairRequest.purchase_order.status}
                      </span>
                      <a
                        href={repairRequest.purchase_order.file_url}
                        target="_blank"
                        rel="noreferrer"
                        className="text-sm font-bold text-primary underline-offset-4 hover:underline"
                      >
                        Open file
                      </a>
                    </div>
                  </div>
                </div>
              )}

              {repairRequest.status === "open" ? (
                <div className="mt-5 grid gap-3 md:grid-cols-2">
                  <Button
                    variant="secondary"
                    className="rounded-2xl text-[10px] uppercase tracking-widest"
                    onClick={() => setSelectedRepairRequest(repairRequest)}
                  >
                    <span className="material-symbols-outlined text-[18px]">
                      upload_file
                    </span>
                    Upload Purchase Order
                  </Button>
                  <Button
                    variant="outline"
                    className="rounded-2xl text-[10px] uppercase tracking-widest"
                    onClick={() => {}}
                  >
                    <span className="material-symbols-outlined text-[18px]">
                      arrow_forward
                    </span>
                    Next Step
                  </Button>
                </div>
              ) : (
                <div className="mt-5 rounded-2xl border border-[#ece6dc] bg-[#fcfaf7] px-4 py-3 text-sm text-[#6f6254]">
                  Purchase order flow will be completed in the next step.
                </div>
              )}
            </article>
          ))}
        </section>
      )}

      {paginate && paginate.last_page > 1 && (
        <section className="flex flex-col gap-3 rounded-3xl border border-[#ddd5c8] bg-white px-5 py-4 shadow-[0_16px_40px_rgba(62,52,39,0.07)] sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-[#6f6254]">
            Showing {paginate.from ?? 0} to {paginate.to ?? 0} of {paginate.total} repair requests.
          </p>

          <div className="flex items-center gap-3">
            <Button
              variant="secondary"
              onClick={() => setPage(currentPage - 1)}
              disabled={currentPage === 1}
            >
              Previous
            </Button>
            <span className="text-sm font-bold text-[#2d241c]">
              Page {currentPage} / {paginate.last_page}
            </span>
            <Button
              variant="secondary"
              onClick={() => setPage(currentPage + 1)}
              disabled={currentPage === paginate.last_page}
            >
              Next
            </Button>
          </div>
        </section>
      )}

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
