import { Alert } from "@/shared/components/feedback";
import { Spinner } from "@/shared/components/ui";
import { formatDateTime } from "@/shared/utils/formatters";
import { useClientDashboard } from "@/features/client-dashboard";
import {
  formatCost,
  formatStatus,
  getHealthLabel,
  getHealthScore,
  getSeverityClasses,
} from "@/features/client-dashboard/utils/dashboardHelper";
import {
  getAnomalyStatusClasses,
  getRepairStatusClasses,
} from "@/shared/utils/statusHelpers";

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
      <div className="flex min-h-[70vh] flex-col items-center justify-center rounded-2xl border border-slate-200 bg-white shadow-sm">
        <Spinner className="text-[#43968C]" size="lg" />
        <span className="mt-4 text-[11px] font-bold uppercase tracking-widest text-slate-400 animate-pulse">
          Loading dashboard...
        </span>
      </div>
    );
  }

  return (
    <div className="mx-auto">
      <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">
            Fleet Status Overview
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            Real-time preventive maintenance and machine health diagnostics.
          </p>
        </div>
        <div className="flex gap-3">
          
        </div>
      </div>

      {error && (
        <Alert variant="error" title="Dashboard unavailable" className="mb-6">
          {error}
        </Alert>
      )}

      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-12 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm lg:col-span-4">
          <h3 className="mb-6 text-[11px] font-bold uppercase tracking-widest text-slate-400">
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
                  className="stroke-[#43968C] transition-all duration-1000 ease-out"
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
                <span className="text-4xl font-bold text-slate-900">
                  {healthScore}%
                </span>
                <span className="mt-1 text-[10px] font-bold uppercase tracking-widest text-[#43968C]">
                  {getHealthLabel(healthScore)}
                </span>
              </div>
            </div>
            <div className="mt-6 grid w-full grid-cols-3 gap-3 border-t border-slate-100 pt-5">
              <div className="text-center">
                <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  Machines
                </p>
                <p className="mt-1 text-base font-bold text-slate-700">
                  {stats.total_machines}
                </p>
              </div>
              <div className="text-center">
                <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  Anomalies
                </p>
                <p className="mt-1 text-base font-bold text-slate-700">
                  {stats.active_anomalies}
                </p>
              </div>
              <div className="text-center">
                <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  Completed
                </p>
                <p className="mt-1 text-base font-bold text-[#43968C]">
                  {stats.completed_tasks}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="col-span-12 flex flex-col justify-between rounded-2xl border border-slate-200 bg-white p-6 shadow-sm md:col-span-6 lg:col-span-3">
          <div>
            <h3 className="mb-2 text-[11px] font-bold uppercase tracking-widest text-slate-400">
              Active Anomalies
            </h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Open or currently under repair review.
            </p>
          </div>
          <div className="mt-4 flex items-center justify-between">
            <div className="flex h-16 w-16 items-center justify-center rounded-xl border border-red-100 bg-red-50 text-red-600">
              <span className="text-3xl font-bold">
                {stats.active_anomalies}
              </span>
            </div>
            <div className="text-right">
              <p className="text-xs font-bold text-slate-700">
                Latest:{" "}
                <span className="font-bold text-red-600">
                  {dashboard?.recent_anomalies.length ?? 0}
                </span>
              </p>
              <p className="mt-0.5 text-[11px] font-medium text-slate-400">
                Showing last 5
              </p>
            </div>
          </div>
        </div>

        <div className="col-span-12 flex flex-col rounded-2xl border border-slate-800 bg-slate-900 p-6 text-white shadow-sm md:col-span-6 lg:col-span-5 relative overflow-hidden">
          <div className="flex items-start justify-between relative z-10">
            <div>
              <h3 className="mb-1 text-[11px] font-bold uppercase tracking-widest text-slate-400">
                Maintenance Progress
              </h3>
              <p className="text-3xl font-bold mt-2">{stats.completed_tasks}</p>
            </div>
            <span className="material-symbols-outlined text-4xl text-[#43968C]">
              task_alt
            </span>
          </div>
          <div className="mt-auto pt-8 relative z-10">
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
                className="h-full bg-[#43968C] transition-all duration-500"
                style={{
                  width: `${Math.min(stats.pending_repair_requests * 10, 100)}%`,
                }}
              />
            </div>
            <div className="mt-5 grid grid-cols-2 gap-4">
              <div className="rounded-xl border border-slate-700/50 bg-slate-800/50 p-4 transition-colors hover:bg-slate-800">
                <p className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                  Completed Tasks
                </p>
                <p className="mt-1 text-lg font-bold text-white">{stats.completed_tasks}</p>
              </div>
              <div className="rounded-xl border border-slate-700/50 bg-slate-800/50 p-4 transition-colors hover:bg-slate-800">
                <p className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                  Open Requests
                </p>
                <p className="mt-1 text-lg font-bold text-white">
                  {stats.pending_repair_requests}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-12 gap-6 pb-12">
        <section className="col-span-12 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm lg:col-span-6">
          <div className="mb-6">
            <h2 className="text-[15px] font-bold text-slate-900">
              Recent Anomalies
            </h2>
            <p className="mt-1 text-xs text-slate-500">
              Latest issues reported on your machines.
            </p>
          </div>

          <div className="space-y-3">
            {dashboard?.recent_anomalies.length === 0 && (
              <div className="rounded-xl border border-dashed border-slate-200 bg-slate-50 p-8 text-center text-sm font-medium text-slate-400">
                No recent anomalies found.
              </div>
            )}

            {dashboard?.recent_anomalies.map((anomaly) => (
              <article
                key={anomaly.id}
                className="rounded-xl border border-slate-100 bg-white p-4 transition-all hover:border-slate-200 hover:bg-slate-50"
              >
                <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <p className="text-[14px] font-bold text-slate-900">
                      {anomaly.title}
                    </p>
                    <p className="mt-1 text-xs font-medium text-slate-500">
                      {anomaly.machine.name} - #{anomaly.machine.code}
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <span
                      className={`rounded-md px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider ${getSeverityClasses(
                        anomaly.severity,
                      )}`}
                    >
                      {anomaly.severity}
                    </span>
                    <span
                      className={`rounded-md px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider ${getAnomalyStatusClasses(
                        anomaly.status,
                      )}`}
                    >
                      {formatStatus(anomaly.status)}
                    </span>
                  </div>
                </div>
                <p className="mt-4 text-[10px] font-bold uppercase tracking-widest text-slate-400">
                  {formatDateTime(anomaly.created_at)}
                </p>
              </article>
            ))}
          </div>
        </section>

        <section className="col-span-12 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm lg:col-span-6">
          <div className="mb-6">
            <h2 className="text-[15px] font-bold text-slate-900">
              Recent Repair Requests
            </h2>
            <p className="mt-1 text-xs text-slate-500">
              Latest repair requests created for your fleet.
            </p>
          </div>

          <div className="overflow-x-auto custom-scrollbar">
            <table className="w-full min-w-[500px] text-left">
              <thead>
                <tr className="border-b border-slate-100 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  <th className="px-3 py-3">Request</th>
                  <th className="px-3 py-3">Machine</th>
                  <th className="px-3 py-3">Cost</th>
                  <th className="px-3 py-3 text-right">Status</th>
                </tr>
              </thead>
              <tbody className="text-[13px]">
                {dashboard?.recent_repair_requests.length === 0 && (
                  <tr>
                    <td
                      colSpan={4}
                      className="py-10 text-center font-medium text-slate-400"
                    >
                      No recent repair requests found.
                    </td>
                  </tr>
                )}

                {dashboard?.recent_repair_requests.map((repairRequest) => (
                  <tr
                    key={repairRequest.id}
                    className="border-b border-slate-50 transition-colors last:border-0 hover:bg-slate-50/80"
                  >
                    <td className="px-3 py-4">
                      <p className="font-bold text-slate-900">
                        {repairRequest.title}
                      </p>
                      <p className="mt-1 text-[10px] font-semibold uppercase tracking-wider text-slate-400">
                        {formatDateTime(repairRequest.created_at)}
                      </p>
                    </td>
                    <td className="px-3 py-4 text-slate-500 font-medium">
                      {repairRequest.machine.name}
                    </td>
                    <td className="px-3 py-4 font-bold text-slate-900">
                      {formatCost(repairRequest.estimated_cost)}
                    </td>
                    <td className="px-3 py-4 text-right">
                      <span
                        className={`inline-block rounded-md px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider ${getRepairStatusClasses(
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