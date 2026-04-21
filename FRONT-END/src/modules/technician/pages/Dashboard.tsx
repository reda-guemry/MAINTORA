import { useTechnicianStatistics } from "@/features/technician-dashboard/hooks/useStatististics";
import { Alert } from "@/shared/components/feedback";
import { Spinner } from "@/shared/components/ui";

function formatDate(value: string | null) {
  if (!value) {
    return "No round scheduled";
  }

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(date);
}

function formatDateTime(value: string) {
  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
}

function DashboardPage() {

  const { statistics, isLoading, error } = useTechnicianStatistics();

  

  if (isLoading) {
    return (
      <div className="flex min-h-85 items-center justify-center rounded-[26px] border border-[#ddd5c8] bg-white shadow-[0_16px_40px_rgba(62,52,39,0.07)]">
        <div className="flex items-center gap-3 text-sm font-semibold text-[#6f6254]">
          <Spinner />
          <span>Loading dashboard...</span>
        </div>
      </div>
    );
  }

  if (error || !statistics) {
    return (
      <Alert variant="error" title="Dashboard unavailable">
        {error ?? "Failed to load technician statistics."}
      </Alert>
    );
  }

  return (
    <div className="space-y-6">
      <section className="rounded-[26px] border border-[#d9d1c5] bg-[linear-gradient(180deg,#eee7da_0%,#ece2d3_100%)] px-6 py-7 shadow-[0_18px_45px_rgba(62,52,39,0.08)]">
        <p className="text-[11px] font-bold uppercase tracking-[0.28em] text-[#8f8477]">
          Technician dashboard
        </p>
        <h1 className="mt-3 text-[34px] font-black tracking-tight text-[#2d241c] md:text-[40px]">
          Field execution snapshot for your assigned rounds.
        </h1>
        <p className="mt-3 max-w-2xl text-sm leading-7 text-[#6f6254]">
          Follow your next intervention, monitor pending workload, and keep a
          quick eye on what is already completed before moving to the detailed
          pages.
        </p>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        <article className="rounded-[22px] border border-[#ddd5c8] bg-white px-5 py-5 shadow-[0_16px_40px_rgba(62,52,39,0.07)]">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#998d7e]">
                Next round
              </p>
              <p className="mt-4 text-[28px] font-black tracking-tight text-[#2d241c]">
                {formatDate(statistics.next_round_date)}
              </p>
            </div>
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#eef7f7] text-[#2f7e7b]">
              <span className="material-symbols-outlined text-[24px]">
                event_upcoming
              </span>
            </div>
          </div>
          <p className="mt-3 text-sm text-[#7f7468]">
            The closest pending intervention currently assigned to you.
          </p>
        </article>

        <article className="rounded-[22px] border border-[#ddd5c8] bg-white px-5 py-5 shadow-[0_16px_40px_rgba(62,52,39,0.07)]">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#998d7e]">
                Pending tasks
              </p>
              <p className="mt-4 text-[32px] font-black tracking-tight text-[#2d241c]">
                {statistics.pending_tasks_count}
              </p>
            </div>
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#fff4e8] text-[#a1622f]">
              <span className="material-symbols-outlined text-[24px]">
                schedule
              </span>
            </div>
          </div>
          <p className="mt-3 text-sm text-[#7f7468]">
            Tasks still waiting to be started on your side.
          </p>
        </article>

        <article className="rounded-[22px] border border-[#ddd5c8] bg-white px-5 py-5 shadow-[0_16px_40px_rgba(62,52,39,0.07)]">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#998d7e]">
                Completed tasks
              </p>
              <p className="mt-4 text-[32px] font-black tracking-tight text-[#2d241c]">
                {statistics.total_completed_tasks}
              </p>
            </div>
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#edf9f0] text-[#2e7d4f]">
              <span className="material-symbols-outlined text-[24px]">
                task_alt
              </span>
            </div>
          </div>
          <p className="mt-3 text-sm text-[#7f7468]">
            Total tasks already completed by this technician account.
          </p>
        </article>
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
        <article className="rounded-[24px] border border-[#ddd5c8] bg-white shadow-[0_16px_40px_rgba(62,52,39,0.07)]">
          <div className="border-b border-[#f0ebe2] px-5 py-4">
            <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#998d7e]">
              Upcoming rounds
            </p>
            <h2 className="mt-2 text-xl font-black text-[#2d241c]">
              Your next 5 pending interventions
            </h2>
          </div>

          <div className="divide-y divide-[#f0ebe2]">
            {statistics.five_next_rounde.length === 0 ? (
              <div className="px-5 py-10 text-center text-sm text-[#7f7468]">
                No upcoming rounds for now.
              </div>
            ) : (
              statistics.five_next_rounde.map((rounde, index) => (
                <div
                  key={rounde.id}
                  className={`px-5 py-4 ${
                    index === 0 ? "bg-[#eef7f7]" : "bg-white"
                  }`}
                >
                  <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                    <div>
                      <p className="text-sm font-bold text-[#2d241c]">
                        Round #{rounde.id}
                      </p>
                      <p className="mt-1 text-[12px] text-[#7f7468]">
                        Machine #{rounde.machine_id} • Plan #
                        {rounde.maintenance_plan_id}
                      </p>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className="rounded-full bg-[#f7f3ec] px-3 py-1 text-[11px] font-bold uppercase tracking-[0.15em] text-[#8d7f6e]">
                        {rounde.status}
                      </span>
                      <span className="text-[12px] font-semibold text-[#6d6257]">
                        {formatDateTime(rounde.scheduled_at)}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </article>

        <article className="rounded-[24px] border border-[#ddd5c8] bg-white px-5 py-5 shadow-[0_16px_40px_rgba(62,52,39,0.07)]">
          <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#998d7e]">
            Workload summary
          </p>

          <div className="mt-5 rounded-[22px] bg-[#f7f3ec] px-5 py-5">
            <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#a09282]">
              Pending share
            </p>
            <p className="mt-2 text-3xl font-black text-[#2d241c]">
              {statistics.pending_tasks_count}
            </p>
            <div className="mt-4 h-3 overflow-hidden rounded-full bg-[#e9dece]">
              <div
                className="h-full rounded-full bg-[#4b9c99]"
                style={{
                  width: `${
                    statistics.pending_tasks_count +
                      statistics.total_completed_tasks >
                    0
                      ? (statistics.pending_tasks_count /
                          (statistics.pending_tasks_count +
                            statistics.total_completed_tasks)) *
                        100
                      : 0
                  }%`,
                }}
              />
            </div>
          </div>

          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            <div className="rounded-2xl border border-[#e6ddd0] px-4 py-4">
              <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#a09282]">
                Next date
              </p>
              <p className="mt-2 text-sm font-bold text-[#2d241c]">
                {formatDate(statistics.next_round_date)}
              </p>
            </div>

            <div className="rounded-2xl border border-[#e6ddd0] px-4 py-4">
              <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#a09282]">
                Upcoming slots
              </p>
              <p className="mt-2 text-sm font-bold text-[#2d241c]">
                {statistics.five_next_rounde.length} planned rounds
              </p>
            </div>
          </div>

          <p className="mt-5 text-sm leading-7 text-[#7f7468]">
            This dashboard stays focused on a quick daily overview. The detailed
            machines and task workflows can stay on their own pages without
            crowding the home screen.
          </p>
        </article>
      </section>
    </div>
  );
}

export default DashboardPage;
