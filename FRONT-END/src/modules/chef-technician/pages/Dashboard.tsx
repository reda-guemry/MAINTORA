import { useChefTechnicianDashboard } from "@/features/chef-dashboard";
import { Alert } from "@/shared/components/feedback";
import { Button, Spinner } from "@/shared/components/ui";

function formatDate(value: string | null | undefined) {
  if (!value) {
    return "Not scheduled";
  }

  return new Intl.DateTimeFormat(undefined, {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date(value));
}

function formatDateTime(value: string | null | undefined) {
  if (!value) {
    return "No date";
  }

  return new Intl.DateTimeFormat(undefined, {
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    month: "short",
  }).format(new Date(value));
}

function getPercent(value: number, total: number) {
  if (total <= 0) {
    return 0;
  }

  return Math.round((value / total) * 100);
}

function formatPerson(firstName?: string | null, lastName?: string | null) {
  const fullName = `${firstName ?? ""} ${lastName ?? ""}`.trim();

  return fullName || "Unassigned";
}

function formatMachine(code?: string | null, name?: string | null) {
  const parts = [code, name].filter(Boolean);

  return parts.length > 0 ? parts.join(" - ") : "Unknown machine";
}

function EmptyState({ message }: { message: string }) {
  return (
    <div className="rounded-xl border border-dashed border-gray-200 bg-gray-50 px-4 py-6 text-center text-sm font-medium text-gray-500">
      {message}
    </div>
  );
}

export function Dashboard() {
  const { dashboard, error, fetchDashboard, isLoading } =
    useChefTechnicianDashboard();

  if (isLoading && !dashboard) {
    return (
      <div className="flex min-h-96 flex-col items-center justify-center rounded-2xl border border-gray-200 bg-white shadow-sm">
        <Spinner />
        <p className="mt-4 text-[11px] font-black uppercase tracking-[0.22em] text-[#388E8E]">
          Loading dashboard statistics
        </p>
      </div>
    );
  }

  if (error && !dashboard) {
    return (
      <Alert variant="error" title="Dashboard unavailable">
        {error}
      </Alert>
    );
  }

  if (!dashboard) {
    return (
      <Alert variant="warning" title="No dashboard data">
        No dashboard statistics are available right now.
      </Alert>
    );
  }

  const { stats } = dashboard;
  const automatedPercent = getPercent(
    stats.active_maintenance_plans,
    stats.total_machines,
  );
  const machineActivePercent = getPercent(
    stats.active_machines,
    stats.total_machines,
  );
  const roundCompletionPercent = getPercent(
    stats.completed_rounds,
    stats.pending_rounds + stats.completed_rounds,
  );
  const summaryCards = [
    {
      icon: "precision_manufacturing",
      iconColor: "#388E8E",
      label: "Total machines",
      value: stats.total_machines,
    },
    {
      icon: "engineering",
      iconColor: "#6B7280",
      label: "Technicians",
      value: stats.total_technicians,
    },
    {
      icon: "cycle",
      iconColor: "#388E8E",
      label: "Active cycles",
      value: stats.active_maintenance_plans,
    },
    {
      icon: "warning",
      iconColor: "#EF4444",
      label: "Open anomalies",
      value: stats.open_anomalies,
    },
  ];

  return (
    <div className="w-full space-y-6 md:space-y-8">
      {error && (
        <Alert variant="warning" title="Dashboard refresh failed">
          {error}
        </Alert>
      )}

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {summaryCards.map((card) => (
          <div
            key={card.label}
            className="group flex flex-col rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition-all hover:shadow-md md:p-6"
          >
            <div className="flex items-center justify-between">
              <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-gray-500 md:text-[11px]">
                {card.label}
              </p>
              <span
                className="material-symbols-outlined text-[18px] md:text-[20px]"
                style={{ color: card.iconColor }}
              >
                {card.icon}
              </span>
            </div>
            <p className="mt-4 text-[32px] font-black leading-none tracking-tight text-[#1A1A1A] md:text-[36px]">
              {card.value}
            </p>
          </div>
        ))}
      </section>

      <section className="grid gap-6 xl:grid-cols-[1fr_1.5fr] xl:gap-8">
        <div className="flex flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
          <div className="flex items-center justify-between border-b border-gray-100 bg-gray-50/50 px-6 py-4 md:px-6 md:py-5">
            <p className="text-[11px] font-bold uppercase tracking-[0.15em] text-[#1A1A1A]">
              Recent anomalies
            </p>
            <div className="flex h-6 items-center justify-center rounded-md border border-red-100 bg-red-50 px-2.5 text-[10px] font-bold text-red-600">
              {stats.critical_anomalies} HIGH
            </div>
          </div>

          <div className="flex flex-col overflow-y-auto">
            {dashboard.recent_anomalies.length === 0 ? (
              <div className="p-5 md:p-6">
                <EmptyState message="No anomalies have been reported yet." />
              </div>
            ) : (
              dashboard.recent_anomalies.map((anomaly, index) => (
                <div
                  key={anomaly.id}
                  className={`flex items-start justify-between gap-4 border-b border-gray-100 p-5 transition-colors last:border-0 hover:bg-gray-50 md:px-6 md:py-5 ${
                    index === 0 ? "relative bg-[#eef7f6]/30" : ""
                  }`}
                >
                  {index === 0 && (
                    <div className="absolute bottom-0 left-0 top-0 w-1 bg-[#388E8E]" />
                  )}
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-[13px] font-bold text-[#1A1A1A] md:text-[14px]">
                      {anomaly.title}
                    </p>
                    <p className="mt-1 flex items-center gap-1.5 text-[11px] font-medium text-gray-500 md:text-[12px]">
                      <span className="h-1.5 w-1.5 rounded-full bg-gray-300" />
                      {formatMachine(anomaly.machine.code, anomaly.machine.name)}
                    </p>
                  </div>
                  <div className="flex shrink-0 flex-col items-end gap-1">
                    <span className="rounded-md bg-gray-100 px-2 py-1 text-[10px] font-bold uppercase text-gray-500 md:text-[11px]">
                      {anomaly.status}
                    </span>
                    <span className="text-[10px] font-bold uppercase tracking-[0.12em] text-red-500">
                      {anomaly.severity}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        <div className="flex flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
          <div className="flex flex-col gap-4 border-b border-gray-100 px-6 py-6 md:px-8 md:py-6 lg:flex-row lg:items-start lg:justify-between">
            <div>
              <h2 className="text-[20px] font-black tracking-tight text-[#1A1A1A] md:text-[24px]">
                Maintenance overview
              </h2>
              <p className="mt-1 text-[13px] font-medium text-gray-500 md:text-[14px]">
                Live operating snapshot from machines, cycles, rounds, and anomalies.
              </p>
            </div>
          </div>

          <div className="flex-1 p-6 md:p-8">
            <div className="grid gap-3 sm:grid-cols-3 md:gap-4">
              {[
                ["Active machines", `${stats.active_machines}/${stats.total_machines}`, "inventory_2"],
                ["Templates", stats.total_checklist_templates, "description"],
                ["Pending rounds", stats.pending_rounds, "pending_actions"],
              ].map(([label, value, icon]) => (
                <div
                  key={label}
                  className="flex flex-col rounded-xl border border-gray-100 bg-gray-50 p-4"
                >
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-[16px] text-gray-400">
                      {icon}
                    </span>
                    <p className="text-[9px] font-bold uppercase tracking-[0.15em] text-gray-500 md:text-[10px]">
                      {label}
                    </p>
                  </div>
                  <p className="mt-2 text-[13px] font-bold text-[#1A1A1A] md:mt-2 md:text-[14px]">
                    {value}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-8 grid gap-4 lg:grid-cols-3">
              {[
                ["Machine health", machineActivePercent, `${stats.inactive_machines} non-active machines`],
                ["Cycle automation", automatedPercent, `${stats.active_maintenance_plans} active plans`],
                ["Round completion", roundCompletionPercent, `${stats.completed_rounds} completed rounds`],
              ].map(([label, percent, caption]) => (
                <div
                  key={label}
                  className="rounded-xl border border-gray-100 bg-white p-4 shadow-sm"
                >
                  <div className="flex items-center justify-between gap-3">
                    <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-gray-500">
                      {label}
                    </p>
                    <p className="text-lg font-black text-[#1A1A1A]">
                      {percent}%
                    </p>
                  </div>
                  <div className="mt-3 h-2 overflow-hidden rounded-full bg-gray-100">
                    <div
                      className="h-full rounded-full bg-[#388E8E]"
                      style={{ width: `${percent}%` }}
                    />
                  </div>
                  <p className="mt-3 text-xs font-medium text-gray-500">
                    {caption}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-8 grid gap-6 lg:grid-cols-2">
              <div>
                <div className="mb-4 flex items-center gap-2">
                  <span className="material-symbols-outlined text-[18px] text-[#388E8E] md:text-[20px]">
                    cycle
                  </span>
                  <h3 className="text-[11px] font-bold uppercase tracking-[0.15em] text-[#388E8E]">
                    Recent maintenance plans
                  </h3>
                </div>

                <div className="space-y-3">
                  {dashboard.recent_maintenance_plans.length === 0 ? (
                    <EmptyState message="No maintenance plans have been created yet." />
                  ) : (
                    dashboard.recent_maintenance_plans.map((plan) => (
                      <div
                        key={plan.id}
                        className="rounded-xl border border-gray-200 bg-white p-4"
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div className="min-w-0">
                            <p className="truncate text-sm font-black text-[#1A1A1A]">
                              {plan.checklist_template.name ?? "Maintenance plan"}
                            </p>
                            <p className="mt-1 text-xs font-medium text-gray-500">
                              {formatMachine(plan.machine.code, plan.machine.name)}
                            </p>
                          </div>
                          <span className="rounded-md bg-[#eef7f6] px-2 py-1 text-[10px] font-black uppercase text-[#388E8E]">
                            {plan.status}
                          </span>
                        </div>
                        <p className="mt-3 text-xs font-medium text-gray-500">
                          Every {plan.repeat_every} {plan.repeat_unit}
                          {plan.repeat_every > 1 ? "s" : ""} · starts{" "}
                          {formatDate(plan.start_date)}
                        </p>
                        <p className="mt-1 text-xs font-bold text-gray-600">
                          {formatPerson(
                            plan.assigned_to.first_name,
                            plan.assigned_to.last_name,
                          )}
                        </p>
                      </div>
                    ))
                  )}
                </div>
              </div>

              <div>
                <div className="mb-4 flex items-center gap-2">
                  <span className="material-symbols-outlined text-[18px] text-[#388E8E] md:text-[20px]">
                    fact_check
                  </span>
                  <h3 className="text-[11px] font-bold uppercase tracking-[0.15em] text-[#388E8E]">
                    Recent rounds
                  </h3>
                </div>

                <div className="space-y-3">
                  {dashboard.recent_rounds.length === 0 ? (
                    <EmptyState message="No maintenance rounds have been generated yet." />
                  ) : (
                    dashboard.recent_rounds.map((round) => (
                      <div
                        key={round.id}
                        className="flex items-center justify-between gap-4 rounded-xl border border-gray-200 bg-white p-4"
                      >
                        <div className="min-w-0">
                          <p className="truncate text-sm font-bold text-[#1A1A1A]">
                            {formatMachine(round.machine.code, round.machine.name)}
                          </p>
                          <p className="mt-1 text-xs font-medium text-gray-500">
                            {formatDateTime(round.scheduled_at)} ·{" "}
                            {formatPerson(
                              round.assigned_to.first_name,
                              round.assigned_to.last_name,
                            )}
                          </p>
                        </div>
                        <span className="shrink-0 rounded-md bg-gray-100 px-2 py-1 text-[10px] font-black uppercase text-gray-500">
                          {round.status}
                        </span>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>

            <div className="mt-6 rounded-xl border border-red-100 bg-red-50 px-4 py-3 text-xs font-bold text-red-700">
              Overdue rounds: {stats.overdue_rounds}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
