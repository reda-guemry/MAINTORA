import { Alert } from "@/shared/components/feedback";
import { Spinner } from "@/shared/components/ui";
import { formatDateTime } from "@/shared/utils/formatters";
import {
  useClientDashboard,
} from "@/features/client-dashboard";
import { formatCost, formatStatus, getHealthLabel, getHealthScore, getSeverityClasses } from "@/features/client-dashboard/utils/dashboardHelper";
import { getAnomalyStatusClasses, getRepairStatusClasses } from "@/shared/utils/statusHelpers";


function DashboardPage() {
  const { dashboard, isLoading, error, fetchDashboard } = useClientDashboard();

  const stats = dashboard?.stats ?? {
    total_machines: 0,
    active_anomalies: 0,
    pending_repair_requests: 0,
    completed_tasks: 0,
  };
  const healthScore = getHealthScore(
    stats.total_machines,
    stats.active_anomalies,
  );
  const healthOffset = 251.2 - (251.2 * healthScore) / 100;

  if (isLoading) {
    return (
      <div className="flex min-h-[70vh] flex-col items-center justify-center rounded-2xl border border-slate-200 bg-white">
        <Spinner size="lg" />
        <span className="mt-4 text-xs font-bold uppercase tracking-widest text-slate-400">
          Loading dashboard...
        </span>
      </div>
    );
  }

  return (
    <div className="mx-auto">
      <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <h1 className="text-3xl font-black tracking-tight text-slate-800">
            Fleet Status Overview
          </h1>
          <p className="mt-1 text-slate-500">
            Real-time preventive maintenance and machine health diagnostics.
          </p>
        </div>
        <div className="flex gap-3">
          <button
            type="button"
            onClick={() => fetchDashboard(false)}
            className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-white hover:bg-primary/90"
          >
            <span className="material-symbols-outlined text-[20px]">
              refresh
            </span>
            Live Sync
          </button>
        </div>
      </div>

      {error && (
        <Alert variant="error" title="Dashboard unavailable" className="mb-6">
          {error}
        </Alert>
      )}

      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-12 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm lg:col-span-4">
          <h3 className="mb-6 text-sm font-bold uppercase tracking-widest text-slate-400">
            Fleet Health Score
          </h3>
          <div className="flex flex-col items-center justify-center py-4">
            <div className="relative h-48 w-48">
              <svg
                className="h-full w-full rotate-90"
                viewBox="0 0 100 100"
              >
                <circle
                  className="stroke-slate-100"
                  cx="50"
                  cy="50"
                  fill="transparent"
                  r="40"
                  strokeWidth="8"
                />
                <circle
                  className="stroke-primary"
                  cx="50"
                  cy="50"
                  fill="transparent"
                  r="40"
                  strokeWidth="8"
                  strokeDasharray="251.2"
                  strokeDashoffset={healthOffset}
                  strokeLinecap="round"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-4xl font-black text-slate-800">
                  {healthScore}%
                </span>
                <span className="text-xs font-bold uppercase tracking-tighter text-emerald-600">
                  {getHealthLabel(healthScore)}
                </span>
              </div>
            </div>
            <div className="mt-6 grid w-full grid-cols-3 gap-3 border-t border-slate-50 pt-4">
              <div className="text-center">
                <p className="text-[10px] font-bold uppercase text-slate-400">
                  Machines
                </p>
                <p className="text-sm font-bold text-slate-700">
                  {stats.total_machines}
                </p>
              </div>
              <div className="text-center">
                <p className="text-[10px] font-bold uppercase text-slate-400">
                  Anomalies
                </p>
                <p className="text-sm font-bold text-slate-700">
                  {stats.active_anomalies}
                </p>
              </div>
              <div className="text-center">
                <p className="text-[10px] font-bold uppercase text-slate-400">
                  Completed
                </p>
                <p className="text-sm font-bold text-emerald-600">
                  {stats.completed_tasks}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="col-span-12 flex flex-col justify-between rounded-2xl border border-slate-200 bg-white p-6 shadow-sm md:col-span-6 lg:col-span-3">
          <div>
            <h3 className="mb-2 text-sm font-bold uppercase tracking-widest text-slate-400">
              Active Anomalies
            </h3>
            <p className="text-xs text-slate-500">
              Open or currently under repair review.
            </p>
          </div>
          <div className="mt-4 flex items-center justify-between">
            <div className="flex h-16 w-20 items-center justify-center rounded-xl bg-[#b91c1c] text-white">
              <span className="text-3xl font-black">
                {stats.active_anomalies}
              </span>
            </div>
            <div className="text-right">
              <p className="text-xs font-bold text-slate-700">
                Latest:{" "}
                <span className="font-black text-[#b91c1c]">
                  {dashboard?.recent_anomalies.length ?? 0}
                </span>
              </p>
              <p className="text-xs font-medium text-slate-500">
                Showing last 5 anomalies
              </p>
            </div>
          </div>
        </div>

        <div className="col-span-12 flex flex-col rounded-2xl border border-slate-800 bg-slate-900 p-6 text-white shadow-sm md:col-span-6 lg:col-span-5">
          <div className="flex items-start justify-between">
            <div>
              <h3 className="mb-1 text-sm font-bold uppercase tracking-widest text-slate-400">
                Maintenance Progress
              </h3>
              <p className="text-3xl font-black">{stats.completed_tasks}</p>
            </div>
            <span className="material-symbols-outlined text-4xl text-primary">
              task_alt
            </span>
          </div>
          <div className="mt-auto pt-8">
            <div className="mb-2 flex justify-between text-xs">
              <span className="font-medium text-slate-400">
                Pending repair requests
              </span>
              <span className="font-bold text-slate-200">
                {stats.pending_repair_requests}
              </span>
            </div>
            <div className="h-2 w-full overflow-hidden rounded-full bg-slate-800">
              <div
                className="h-full bg-primary"
                style={{
                  width: `${Math.min(stats.pending_repair_requests * 10, 100)}%`,
                }}
              />
            </div>
            <div className="mt-4 grid grid-cols-2 gap-4">
              <div className="rounded-lg border border-slate-700/50 bg-slate-800/50 p-3">
                <p className="text-[10px] font-bold uppercase text-slate-500">
                  Completed Tasks
                </p>
                <p className="text-lg font-bold">{stats.completed_tasks}</p>
              </div>
              <div className="rounded-lg border border-slate-700/50 bg-slate-800/50 p-3">
                <p className="text-[10px] font-bold uppercase text-slate-500">
                  Open Requests
                </p>
                <p className="text-lg font-bold">
                  {stats.pending_repair_requests}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 grid grid-cols-12 gap-6 pb-12">
        <section className="col-span-12 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm lg:col-span-6">
          <div className="mb-6">
            <h2 className="text-xl font-bold text-slate-800">
              Recent Anomalies
            </h2>
            <p className="text-sm text-slate-500">
              Latest issues reported on your machines.
            </p>
          </div>

          <div className="space-y-4">
            {dashboard?.recent_anomalies.length === 0 && (
              <div className="rounded-xl border border-dashed border-slate-200 bg-slate-50 px-4 py-8 text-center text-sm font-medium text-slate-500">
                No recent anomalies found.
              </div>
            )}

            {dashboard?.recent_anomalies.map((anomaly) => (
              <article
                key={anomaly.id}
                className="rounded-xl border border-slate-100 px-4 py-4 transition-colors hover:bg-slate-50"
              >
                <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <p className="text-sm font-black text-slate-800">
                      {anomaly.title}
                    </p>
                    <p className="mt-1 text-xs font-medium text-slate-500">
                      {anomaly.machine.name} - #{anomaly.machine.code}
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <span
                      className={`rounded px-2.5 py-1 text-[10px] font-bold uppercase ${getSeverityClasses(
                        anomaly.severity,
                      )}`}
                    >
                      {anomaly.severity}
                    </span>
                    <span
                      className={`rounded px-2.5 py-1 text-[10px] font-bold uppercase ${getAnomalyStatusClasses(
                        anomaly.status,
                      )}`}
                    >
                      {formatStatus(anomaly.status)}
                    </span>
                  </div>
                </div>
                <p className="mt-3 text-[11px] font-semibold uppercase tracking-widest text-slate-400">
                  {formatDateTime(anomaly.created_at)}
                </p>
              </article>
            ))}
          </div>
        </section>

        <section className="col-span-12 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm lg:col-span-6">
          <div className="mb-6">
            <h2 className="text-xl font-bold text-slate-800">
              Recent Repair Requests
            </h2>
            <p className="text-sm text-slate-500">
              Latest repair requests created for your fleet.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-155 text-left">
              <thead>
                <tr className="border-b border-slate-100 text-[10px] font-black uppercase text-slate-400">
                  <th className="px-2 py-3">Request</th>
                  <th className="px-2 py-3">Machine</th>
                  <th className="px-2 py-3">Cost</th>
                  <th className="px-2 py-3">Status</th>
                </tr>
              </thead>
              <tbody className="text-xs">
                {dashboard?.recent_repair_requests.length === 0 && (
                  <tr>
                    <td
                      colSpan={4}
                      className="py-10 text-center font-medium text-slate-500"
                    >
                      No recent repair requests found.
                    </td>
                  </tr>
                )}

                {dashboard?.recent_repair_requests.map((repairRequest) => (
                  <tr
                    key={repairRequest.id}
                    className="border-b border-slate-50 transition-colors hover:bg-slate-50"
                  >
                    <td className="px-2 py-4">
                      <p className="font-bold text-slate-700">
                        {repairRequest.title}
                      </p>
                      <p className="mt-1 text-[10px] uppercase tracking-widest text-slate-400">
                        {formatDateTime(repairRequest.created_at)}
                      </p>
                    </td>
                    <td className="px-2 py-4 text-slate-500">
                      {repairRequest.machine.name}
                    </td>
                    <td className="px-2 py-4 font-bold text-slate-700">
                      {formatCost(repairRequest.estimated_cost)}
                    </td>
                    <td className="px-2 py-4">
                      <span
                        className={`rounded px-2 py-1 text-[9px] font-bold uppercase ${getRepairStatusClasses(
                          repairRequest.status,
                        )}`}
                      >
                        {formatStatus(repairRequest.status)}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </div>
  );
}

export default DashboardPage;
