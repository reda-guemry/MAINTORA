import { useTechnicianStatistics } from "@/features/technician-dashboard/hooks/useStatistics";
import { Alert } from "@/shared/components/feedback";
import { Spinner } from "@/shared/components/ui";

function formatDate(value: string | null) {
  if (!value) return "Unscheduled";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;

  return new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  }).format(date);
}

function formatDateTime(value: string) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;

  return new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
}

function DashboardPage() {
  const { statistics, isLoading, error } = useTechnicianStatistics();

  const displayStats = statistics || {
    next_round_date: null,
    pending_tasks_count: 0,
    total_completed_tasks: 0,
    five_next_rounde: [],
  };

  const totalTasks = displayStats.pending_tasks_count + displayStats.total_completed_tasks;
  const completedPercentage = totalTasks > 0 ? (displayStats.total_completed_tasks / totalTasks) * 100 : 0;

  if (isLoading) {
    return (
      <div className="flex min-h-[70vh] w-full flex-col items-center justify-center rounded-xl bg-background-light border border-neutral-gray">
        <Spinner />
        <span className="mt-4 text-xs font-semibold uppercase tracking-widest text-text-muted">
          Loading Data...
        </span>
      </div>
    );
  }

  return (
    <div className="mx-auto flex w-full max-w-7xl flex-col gap-6 font-['Inter',sans-serif]">
      {error && (
        <Alert variant="error" title="Connection Issue">
          {error ?? "Unable to fetch latest data. Displaying cached statistics."}
        </Alert>
      )}

      <header className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between mb-2">
        <div>
          <h1 className="text-3xl font-black text-text-main">
            Technician Dashboard
          </h1>
          <p className="mt-2 text-sm text-text-muted">
            Monitor your pending workload and upcoming field interventions.
          </p>
        </div>
        <div className="flex items-center gap-4 rounded-xl border border-neutral-gray bg-white p-4 shadow-sm">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-background-light text-primary">
            <span className="material-symbols-outlined text-[20px]">event</span>
          </div>
          <div>
            <p className="text-[10px] font-bold uppercase tracking-wider text-text-muted">
              Next Round
            </p>
            <p className="text-sm font-bold text-text-main">
              {formatDate(displayStats.next_round_date)}
            </p>
          </div>
        </div>
      </header>

      <section className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <div className="flex flex-col justify-between rounded-xl border border-neutral-gray bg-white p-6 shadow-sm">
          <div className="mb-4 flex items-start justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-text-muted">
              Pending Tasks
            </span>
            <span className="material-symbols-outlined text-primary">
              pending_actions
            </span>
          </div>
          <p className="text-4xl font-black text-text-main">
            {displayStats.pending_tasks_count}
          </p>
        </div>

        <div className="flex flex-col justify-between rounded-xl border border-neutral-gray bg-white p-6 shadow-sm">
          <div className="mb-4 flex items-start justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-text-muted">
              Completed Tasks
            </span>
            <span className="material-symbols-outlined text-primary">
              task_alt
            </span>
          </div>
          <p className="text-4xl font-black text-text-main">
            {displayStats.total_completed_tasks}
          </p>
        </div>

        <div className="flex flex-col justify-between rounded-xl border border-neutral-gray bg-white p-6 shadow-sm">
          <div className="mb-4 flex items-end justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-text-muted">
              Completion Rate
            </span>
            <span className="text-sm font-black text-text-main">
              {completedPercentage.toFixed(0)}%
            </span>
          </div>
          <div className="h-2.5 w-full overflow-hidden rounded-full border border-neutral-gray bg-background-light">
            <div
              className="h-full bg-primary transition-all duration-1000 ease-out"
              style={{ width: `${completedPercentage}%` }}
            ></div>
          </div>
          <div className="mt-4 flex gap-4 text-xs font-medium text-text-muted">
            <div className="flex items-center gap-1.5">
              <div className="h-2 w-2 rounded-full bg-primary"></div>
              <span>Done</span>
            </div>
            <div className="flex items-center gap-1.5"> 
              <div className="h-2 w-2 rounded-full bg-background-light"></div>
              <span>Pending</span>
            </div>
          </div>
        </div>
      </section>

      <section className="overflow-hidden rounded-xl border border-neutral-gray bg-white shadow-sm">
        <div className="border-b border-neutral-gray bg-background-light px-6 py-4">
          <h2 className="text-base font-bold text-text-main">Upcoming Schedule</h2>
        </div>

        <div className="flex flex-col">
          {displayStats.five_next_rounde.length === 0 ? (
            <div className="flex flex-col items-center justify-center px-6 py-12 text-center">
              <span className="material-symbols-outlined mb-2 text-3xl text-neutral-gray">
                event_busy
              </span>
              <p className="text-sm font-medium text-text-main">No schedule found</p>
              <p className="mt-1 text-xs text-text-muted">You have no upcoming rounds assigned.</p>
            </div>
          ) : (
            displayStats.five_next_rounde.map((rounde) => (
              <div
                key={rounde.id}
                className="flex flex-col justify-between gap-4 border-b border-neutral-gray px-6 py-5 transition-colors hover:bg-background-light last:border-0 md:flex-row md:items-center"
              >
                <div className="flex items-center gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-sm bg-background-light border border-neutral-gray text-xs font-bold text-text-main">
                    #{rounde.id}
                  </div>
                  <div>
                    <p className="text-sm font-bold text-text-main">
                      Machine: {rounde.machine_id}
                    </p>
                    <p className="mt-0.5 text-xs font-medium text-text-muted">
                      Plan: {rounde.maintenance_plan_id}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-6">
                  <div className="text-left md:text-right">
                    <p className="text-[10px] font-bold uppercase tracking-wider text-text-muted">
                      Scheduled
                    </p>
                    <p className="text-[13px] font-bold text-text-main">
                      {formatDateTime(rounde.scheduled_at)}
                    </p>
                  </div>
                  <span className="rounded-full border border-neutral-gray bg-white px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-primary">
                    {rounde.status}
                  </span>
                </div>
              </div>
            ))
          )}
        </div>
      </section>
    </div>
  );
}

export default DashboardPage;
