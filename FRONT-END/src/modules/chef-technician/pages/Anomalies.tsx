import { useMemo, useState } from "react";
import { Alert } from "@/shared/components/feedback";
import { Button, Input, Spinner } from "@/shared/components/ui";
import {
  AnomalyDetailsModal,
  AnomalyStatusBadge,
  CreateRepairRequestModal,
  useChefAnomalies,
  useChefAnomalyDetails,
  useCreateRepairRequest,
} from "@/features/chef-anomaly";

function formatDate(value: string) {
  return new Date(value).toLocaleString();
}


export function AnomaliesPage() {


  const [statusFilter, setStatusFilter] = useState("");
  const [severityFilter, setSeverityFilter] = useState("");
  const [search, setSearch] = useState("");


  const [selectedAnomalyId, setSelectedAnomalyId] = useState<number | null>(
    null,
  );


  const [isRepairRequestModalOpen, setIsRepairRequestModalOpen] = useState(false);

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

  const filteredAnomalies = useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase();

    if (!normalizedSearch) {
      return anomalies;
    }

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

  const pendingCount = anomalies.filter(
    (anomaly) => anomaly.status === "pending",
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
    if (!selectedAnomalyId) {
      return;
    }

    const response = await createRepairRequestCall(selectedAnomalyId, payload);

    if (!response) {
      return;
    }

    setIsRepairRequestModalOpen(false);

    const updatedAnomaly = await refreshAnomaly();

    if (updatedAnomaly) {
      updateAnomalyInList(updatedAnomaly);
    }

    await refreshAnomalies();
  }

  return (
    <div className="space-y-6">
      <section className="rounded-[26px] border border-[#d9d1c5] bg-[linear-gradient(180deg,#eee7da_0%,#ece2d3_100%)] px-6 py-7 shadow-[0_18px_45px_rgba(62,52,39,0.08)]">
        <div className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
          <div className="max-w-3xl">
            <p className="text-[11px] font-bold uppercase tracking-[0.28em] text-[#948674]">
              Anomalies Workspace
            </p>
            <h1 className="mt-3 text-4xl font-black tracking-tight text-[#2d241c] md:text-[42px]">
              Review field anomalies and turn pending issues into repair
              requests.
            </h1>
            <p className="mt-4 max-w-2xl text-sm leading-7 text-[#6f6254]">
              Keep one clean page for anomaly follow-up, technician visibility,
              checklist context, and client repair request creation.
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-3 xl:grid-cols-2">
            <div className="rounded-2xl border border-white/70 bg-white/70 px-4 py-4">
              <p className="text-[10px] uppercase tracking-[0.24em] text-[#988a79]">
                Total machines
              </p>
              <p className="mt-3 text-3xl font-black text-[#2d241c]">{paginate?.total ?? 0}</p>
            </div>

            <div className="rounded-2xl border border-white/70 bg-white/70 px-4 py-4">
              <p className="text-[10px] uppercase tracking-[0.24em] text-[#988a79]">
                Pending now
              </p>
              <p className="mt-3 text-3xl font-black text-[#2d241c]">{pendingCount}</p>
            </div>

            <div className="rounded-2xl border border-white/70 bg-white/70 px-4 py-4">
              <p className="text-[10px] uppercase tracking-[0.24em] text-[#988a79]">
                In progress
              </p>
              <p className="mt-3 text-3xl font-black text-[#2d241c]">{inProgressCount}</p>
            </div>

            <div className="rounded-2xl border border-white/70 bg-white/70 px-4 py-4">
              <p className="text-[10px] uppercase tracking-[0.24em] text-[#988a79]">
                Current page
              </p>
              <p className="mt-3 text-3xl font-black text-[#2d241c]">{currentPage}</p>
            </div>


          </div>
        </div>
      </section>

      <section className="rounded-3xl border border-[#ddd5c8] bg-white p-5 shadow-[0_16px_40px_rgba(62,52,39,0.07)]">
        <div className="grid gap-4 xl:grid-cols-[1.4fr_0.8fr_0.8fr]">
          <div className="relative">
            <span className="material-symbols-outlined pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[#9d9388]">
              search
            </span>
            <Input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search by anomaly, machine, or technician..."
              className="border-[#ddd5c8] bg-[#fcfaf7] pl-10"
            />
          </div>

          <select
            value={statusFilter}
            onChange={(event) => setStatusFilter(event.target.value)}
            className="h-12 rounded-lg border border-[#ddd5c8] bg-[#fcfaf7] px-4 text-sm text-[#2d241c] outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/20"
          >
            <option value="">All statuses</option>
            <option value="pending">Pending</option>
            <option value="in_progress">In progress</option>
            <option value="resolved">Resolved</option>
            <option value="rejected">Rejected</option>
          </select>

          <select
            value={severityFilter}
            onChange={(event) => setSeverityFilter(event.target.value)}
            className="h-12 rounded-lg border border-[#ddd5c8] bg-[#fcfaf7] px-4 text-sm text-[#2d241c] outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/20"
          >
            <option value="">All severities</option>
            <option value="low">Low severity</option>
            <option value="medium">Medium severity</option>
            <option value="high">High severity</option>
          </select>
        </div>
      </section>

      {error && (
        <Alert variant="error" title="Anomalies unavailable">
          {error}
        </Alert>
      )}

      {isLoading && anomalies.length === 0 ? (
        <div className="flex min-h-70 flex-col items-center justify-center rounded-[30px] border border-[#ddd5c8] bg-white shadow-[0_16px_40px_rgba(62,52,39,0.07)]">
          <Spinner />
          <p className="mt-4 text-[11px] font-bold uppercase tracking-[0.24em] text-[#8f8477]">
            Loading anomalies
          </p>
        </div>
      ) : filteredAnomalies.length === 0 ? (
        <div className="rounded-[30px] border border-dashed border-[#d8d0c4] bg-white px-6 py-16 text-center shadow-[0_16px_40px_rgba(62,52,39,0.05)]">
          <p className="text-[11px] font-bold uppercase tracking-[0.24em] text-[#8f8477]">
            No anomalies found
          </p>
          <p className="mt-3 text-sm text-[#6f6254]">
            Try another filter or search term to view anomaly reports.
          </p>
        </div>
      ) : (
        <section className="grid gap-5 xl:grid-cols-3">
          {filteredAnomalies.map((anomaly) => (
            <article
              key={anomaly.id}
              className="flex h-full flex-col rounded-[28px] border border-[#ddd5c8] bg-white p-5 shadow-[0_16px_40px_rgba(62,52,39,0.07)]"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#988a79]">
                    {anomaly.machine.code}
                  </p>
                  <h2 className="mt-2 text-xl font-black tracking-tight text-[#2d241c]">
                    {anomaly.title}
                  </h2>
                </div>
                <AnomalyStatusBadge
                  status={anomaly.status}
                  severity={anomaly.severity}
                />
              </div>

              <p className="mt-4 text-sm leading-7 text-[#6f6254]">
                {anomaly.description}
              </p>

              <div className="mt-5 grid gap-3 rounded-[22px] bg-[#f7f3ec] px-4 py-4">
                <div className="flex items-center justify-between gap-3 text-sm">
                  <span className="text-[#8d8173]">Machine</span>
                  <span className="font-bold text-[#2d241c]">
                    {anomaly.machine.name}
                  </span>
                </div>

                <div className="flex items-center justify-between gap-3 text-sm">
                  <span className="text-[#8d8173]">Technician</span>
                  <span className="font-bold text-[#2d241c]">
                    {anomaly.reported_by.first_name}{" "}
                    {anomaly.reported_by.last_name}
                  </span>
                </div>

                <div className="flex items-center justify-between gap-3 text-sm">
                  <span className="text-[#8d8173]">Checklist</span>
                  <span className="font-bold text-right text-[#2d241c]">
                    {anomaly.maintenance_task?.checklist_template?.name ??
                      "Not linked"}
                  </span>
                </div>

                <div className="flex items-center justify-between gap-3 text-sm">
                  <span className="text-[#8d8173]">Reported at</span>
                  <span className="font-bold text-right text-[#2d241c]">
                    {formatDate(anomaly.created_at)}
                  </span>
                </div>
              </div>

              <div className="mt-5 flex items-center justify-between gap-3">
                <div className="text-sm text-[#6f6254]">
                  {anomaly.repair_request
                    ? "Repair request already created"
                    : anomaly.status === "pending"
                      ? "Waiting for action"
                      : "Already processed"}
                </div>

                <Button
                  variant="secondary"
                  onClick={() => handleOpenDetails(anomaly.id)}
                >
                  <span className="material-symbols-outlined text-[18px]">
                    visibility
                  </span>
                  View details
                </Button>
              </div>
            </article>
          ))}
        </section>
      )}

      {paginate && paginate.last_page > 1 && (
        <section className="flex flex-col gap-3 rounded-3xl border border-[#ddd5c8] bg-white px-5 py-4 shadow-[0_16px_40px_rgba(62,52,39,0.07)] sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-[#6f6254]">
            Showing {paginate.from ?? 0} to {paginate.to ?? 0} of{" "}
            {paginate.total} anomalies.
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

      <AnomalyDetailsModal
        anomaly={selectedAnomaly}
        isOpen={selectedAnomalyId !== null}
        isLoading={isLoadingSelectedAnomaly}
        error={selectedAnomalyError}
        onClose={handleCloseDetails}
        onOpenRepairRequest={() => setIsRepairRequestModalOpen(true)}
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
