import { useMemo, useState } from "react";
import { AppPagination } from "@/shared/components";
import { Alert } from "@/shared/components/feedback";
import { Button, Input, Spinner } from "@/shared/components/ui";
import { formatDate } from "@/shared/utils/formatters";
import {
  AnomalyDetailsModal,
  AnomalyStatusBadge,
  CreateRepairRequestModal,
  useChefAnomalies,
  useChefAnomalyDetails,
  useCreateRepairRequest,
  useReviewRepairPurchaseOrder,
} from "@/features/anomaly";

export function AnomaliesPage() {
  const [statusFilter, setStatusFilter] = useState("");
  const [severityFilter, setSeverityFilter] = useState("");
  const [search, setSearch] = useState("");

  const [selectedAnomalyId, setSelectedAnomalyId] = useState<number | null>(
    null,
  );
  const [isRepairRequestModalOpen, setIsRepairRequestModalOpen] =
    useState(false);

  const {
    anomalies,
    paginate,
    currentPage,
    setPage,
    isLoading,
    error,
    updateAnomalyInList,
    refreshAnomalies,
  } = useChefAnomalies(statusFilter, severityFilter);

  const {
    anomaly: selectedAnomaly,
    isLoading: isLoadingSelectedAnomaly,
    error: selectedAnomalyError,
    refreshAnomaly,
  } = useChefAnomalyDetails(selectedAnomalyId);

  const {
    createRepairRequestCall,
    isLoading: isCreatingRepairRequest,
    error: createRepairRequestError,
  } = useCreateRepairRequest();

  const {
    reviewPurchaseOrderCall,
    isLoading: isReviewingPurchaseOrder,
    error: reviewPurchaseOrderError,
  } = useReviewRepairPurchaseOrder();

  const filteredAnomalies = useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase();
    if (!normalizedSearch) return anomalies;

    return anomalies.filter((anomaly) => {
      return (
        anomaly.title.toLowerCase().includes(normalizedSearch) ||
        anomaly.description.toLowerCase().includes(normalizedSearch) ||
        anomaly.machine.name.toLowerCase().includes(normalizedSearch) ||
        anomaly.machine.code.toLowerCase().includes(normalizedSearch) ||
        `${anomaly.reported_by.first_name} ${anomaly.reported_by.last_name}`
          .toLowerCase()
          .includes(normalizedSearch)
      );
    });
  }, [anomalies, search]);

  const openCount = anomalies.filter(
    (anomaly) => anomaly.status === "open" || anomaly.status === "pending",
  ).length;

  const inProgressCount = anomalies.filter(
    (anomaly) => anomaly.status === "in_progress",
  ).length;

  function handleOpenDetails(anomalyId: number) {
    setSelectedAnomalyId(anomalyId);
  }

  function handleCloseDetails() {
    setSelectedAnomalyId(null);
    setIsRepairRequestModalOpen(false);
  }

  async function handleCreateRepairRequest(payload: {
    title: string;
    description: string;
    estimated_cost: number;
  }) {
    if (!selectedAnomalyId) return;
    const response = await createRepairRequestCall(selectedAnomalyId, payload);
    if (!response) return;

    setIsRepairRequestModalOpen(false);
    const updatedAnomaly = await refreshAnomaly();
    if (updatedAnomaly) updateAnomalyInList(updatedAnomaly);
    await refreshAnomalies();
  }

  async function handleReviewPurchaseOrder(
    repairRequestId: number,
    decision: "approve" | "reject",
  ) {
    if (!repairRequestId) return;
    const response = await reviewPurchaseOrderCall(repairRequestId, decision);
    if (!response) return;

    const updatedAnomaly = await refreshAnomaly();
    if (updatedAnomaly) updateAnomalyInList(updatedAnomaly);
    await refreshAnomalies();
  }

  return (
    <div className="min-h-screen  p-4 md:p-8 space-y-10">
      <header className="grid grid-cols-1 lg:grid-cols-[2fr,3fr] items-center gap-8 bg-white p-6 rounded-3xl ">
        <div className="max-w-3xl">
          <p className="text-[12px] font-bold uppercase tracking-wider text-teal-600">
            Operations Workspace
          </p>
          <h1 className="mt-3 text-4xl font-extrabold tracking-tight text-slate-950 md:text-5xl">
            Anomalies Registry
          </h1>
          <p className="mt-5 max-w-2xl text-[16px] leading-relaxed text-slate-600">
            Centralized hub to review field reported anomalies, track their
            status, and seamlessy convert pending issues into repair requests.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            {
              label: "Total Machines",
              value: paginate?.total ?? 0,
              icon: "precision_manufacturing",
            },
            {
              label: "Open Now",
              value: openCount,
              icon: "pending_actions",
              isTeal: true,
            },
            {
              label: "In Progress",
              value: inProgressCount,
              icon: "published_with_changes",
            },
            { label: "Current Page", value: currentPage, icon: "find_in_page" },
          ].map((stat, i) => (
            <div
              key={i}
              className="rounded-3xl bg-white border border-slate-100 p-5 flex items-center gap-4 shadow-inner shadow-slate-50"
            >
              <div
                className={
                  stat.isTeal
                    ? "rounded-full bg-teal-50 text-teal-600 p-3"
                    : "rounded-full bg-slate-100 text-slate-600 p-3"
                }
              >
                <span className="material-symbols-outlined text-[24px] flex">
                  {stat.icon}
                </span>
              </div>
              <div>
                <p className="text-[12px] font-medium text-slate-500">
                  {stat.label}
                </p>
                <p
                  className={
                    stat.isTeal
                      ? "mt-1 text-3xl font-bold text-teal-600"
                      : "mt-1 text-3xl font-bold text-slate-950"
                  }
                >
                  {stat.value}
                </p>
              </div>
            </div>
          ))}
        </div>
      </header>

      <section className="rounded-3xl bg-white border border-slate-100 p-3 flex flex-col md:flex-row items-center gap-3 shadow-md shadow-slate-100">
        <div className="relative grow w-full md:w-auto">
          <span className="material-symbols-outlined pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[20px] text-slate-400">
            search
          </span>
          <Input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search anomalies, machines, or technicians..."
            className="border-none bg-slate-50 pl-12 h-13 rounded-2xl w-full text-[15px] focus:bg-white focus:ring-2  transition-colors"
          />
        </div>

        <div className="flex items-center gap-3 w-full md:w-auto">
          <select
            value={statusFilter}
            onChange={(event) => setStatusFilter(event.target.value)}
            className="grow md:grow-0 h-13 md:w-45 rounded-2xl border border-slate-200 bg-slate-50 px-5 text-[14px] font-medium text-slate-900 outline-none transition-all focus:border-[#43968C] focus:bg-white focus:ring-4 focus:ring-[#43968C]/10 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <option value="">All statuses</option>
            {["Open", "Pending", "In progress", "Resolved", "Rejected"].map(
              (s) => (
                <option key={s} value={s.toLowerCase().replace(" ", "_")}>
                  {s}
                </option>
              ),
            )}
          </select>

          <select
            value={severityFilter}
            onChange={(event) => setSeverityFilter(event.target.value)}
            className="grow md:grow-0 h-13 md:w-45 rounded-2xl border border-slate-200 bg-slate-50 px-5 text-[14px] font-medium text-slate-900 outline-none transition-all focus:border-[#43968C] focus:bg-white focus:ring-4 focus:ring-[#43968C]/10 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <option value="">All severities</option>
            {["Low severity", "Medium severity", "High severity"].map((s) => (
              <option key={s} value={s.toLowerCase().replace(" severity", "")}>
                {s}
              </option>
            ))}
          </select>
        </div>
      </section>

      {/* 3. CONTENT AREA */}
      {error && (
        <Alert variant="error" title="Anomalies unavailable">
          {error}
        </Alert>
      )}

      {isLoading && anomalies.length === 0 ? (
        <div className="flex min-h-96 flex-col items-center justify-center rounded-[40px] bg-white shadow-xl shadow-slate-100">
          <Spinner className="text-teal-600 w-10 h-10" />
          <p className="mt-5 text-[14px] font-semibold text-slate-500 animate-pulse">
            Loading real-time data...
          </p>
        </div>
      ) : filteredAnomalies.length === 0 ? (
        <div className="rounded-[40px] border-2 border-dashed border-slate-200 bg-slate-50/50 px-10 py-24 text-center shadow-inner">
          <span className="material-symbols-outlined text-[64px] text-slate-300">
            search_off
          </span>
          <p className="mt-6 text-[18px] font-bold text-slate-800">
            No anomalies match your criteria
          </p>
          <p className="mt-3 text-[15px] text-slate-600 max-w-md mx-auto">
            Try refining your search term or adjusting the status and severity
            filters to find what you're looking for.
          </p>
        </div>
      ) : (
        // OVERHAULED CARDS GRID
        <section className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
          {filteredAnomalies.map((anomaly) => (
            <article
              key={anomaly.id}
              className="group relative flex flex-col justify-between rounded-3xl bg-white p-7 shadow-xl shadow-slate-100 transition-all duration-300 hover:shadow-2xl hover:border-teal-100 hover:-translate-y-1"
            >
              <div>
                {/* Card Header */}
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-[12px] font-bold uppercase tracking-wider text-slate-400">
                      {anomaly.machine.code}
                    </p>
                    <h2 className="mt-2 text-2xl font-bold tracking-tight text-slate-950 line-clamp-1 group-hover:text-teal-700 transition-colors">
                      {anomaly.title}
                    </h2>
                  </div>
                  <AnomalyStatusBadge
                    status={anomaly.status}
                    severity={anomaly.severity}
                  />
                </div>

                <p className="mt-5 text-[15px] leading-relaxed text-slate-600 line-clamp-3">
                  {anomaly.description}
                </p>

                {/* Overhauled modern Data Grid */}
                <div className="grid grid-cols-2 gap-x-4 gap-y-3 pt-6 border-t border-slate-100 mt-6">
                  {[
                    {
                      label: "Machine",
                      value: anomaly.machine.name,
                      icon: "build",
                    },
                    {
                      label: "Technician",
                      value: `${anomaly.reported_by.first_name} ${anomaly.reported_by.last_name}`,
                      icon: "engineering",
                    },
                    {
                      label: "Checklist",
                      value:
                        anomaly.maintenance_task?.checklist_template?.name ??
                        "Not linked",
                      icon: "assignment",
                    },
                    {
                      label: "Reported at",
                      value: formatDate(anomaly.created_at),
                      icon: "event_available",
                    },
                  ].map((item, idx) => (
                    <div
                      key={idx}
                      className="flex flex-col gap-1.5 rounded-xl bg-slate-50/50 p-3 border border-slate-100"
                    >
                      <span className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-slate-400">
                        <span className="material-symbols-outlined text-[15px]">
                          {item.icon}
                        </span>
                        {item.label}
                      </span>
                      <span className="text-[13px] font-semibold text-slate-900 truncate">
                        {item.value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-8 flex items-center justify-between gap-4 pt-5 border-t border-slate-100">
                <div className="flex flex-col">
                  <span className="text-[12px] font-medium text-slate-500">
                    Status Context
                  </span>
                  <span className="mt-1 text-[13px] font-bold text-slate-900">
                    {anomaly.repair_request
                      ? "Repair request created"
                      : anomaly.status === "pending"
                        ? "Waiting for action"
                        : "Already processed"}
                  </span>
                </div>

                <Button
                  onClick={() => handleOpenDetails(anomaly.id)}
                  className="rounded-xl h-11 px-6 text-[14px] font-semibold bg-[#43968C] text-white flex items-center gap-2 hover:bg-[#367971] shadow-md shadow-teal-100 transition-all active:scale-95"
                >
                  <div className="flex items-center gap-1">
                    <span className="material-symbols-outlined text-[18px]">
                      visibility
                    </span>
                    <span>View Details</span>
                  </div>
                </Button>
              </div>
            </article>
          ))}
        </section>
      )}

      {paginate && paginate.last_page > 1 && (
        <section className="flex justify-center pt-8 border-t border-slate-100 mt-10">
          <div className="bg-white rounded-full px-2 py-1 shadow-md border border-slate-100">
            <AppPagination
              currentPage={currentPage}
              lastPage={paginate.last_page}
              from={paginate.from ?? 0}
              to={paginate.to ?? 0}
              total={paginate.total}
              isLoading={isLoading}
              label="anomalies"
              onPageChange={setPage}
            />
          </div>
        </section>
      )}

      <AnomalyDetailsModal
        anomaly={selectedAnomaly}
        isOpen={selectedAnomalyId !== null}
        isLoading={isLoadingSelectedAnomaly}
        error={selectedAnomalyError}
        reviewError={reviewPurchaseOrderError}
        isReviewingPurchaseOrder={isReviewingPurchaseOrder}
        onClose={handleCloseDetails}
        onOpenRepairRequest={() => setIsRepairRequestModalOpen(true)}
        onApprovePurchaseOrder={(repairRequestId) =>
          handleReviewPurchaseOrder(repairRequestId, "approve")
        }
        onRejectPurchaseOrder={(repairRequestId) =>
          handleReviewPurchaseOrder(repairRequestId, "reject")
        }
      />

      <CreateRepairRequestModal
        isOpen={isRepairRequestModalOpen}
        anomalyTitle={selectedAnomaly?.title}
        isLoading={isCreatingRepairRequest}
        error={createRepairRequestError}
        onClose={() => setIsRepairRequestModalOpen(false)}
        onSubmit={handleCreateRepairRequest}
      />
    </div>
  );
}
