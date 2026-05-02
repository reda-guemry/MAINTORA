import { Alert } from "@/shared/components/feedback";
import { Spinner } from "@/shared/components/ui";
import { useAdminDashboard } from "@/features/admin-dashboard";
import { cn } from "@/shared/utils";
import {
  formatNumber,
  formatStatus,
  getSystemHealthScore,
  getUserStatusClasses,
} from "@/features/admin-dashboard/utils/dashboardHelper";
import MetricTile from "../components/MetricTile";
import StatCard from "../components/EmptyState copy";
import EmptyState from "../components/EmptyState";

const emptyStats = {
  total_users: 0,
  total_clients: 0,
  total_technicians: 0,
  total_machines: 0,
  active_anomalies: 0,
  open_repair_requests: 0,
  completed_maintenance_tasks: 0,
};

function Dashboard() {
  const { dashboard, isLoading, error } = useAdminDashboard();
  const stats = dashboard?.stats ?? emptyStats;
  const healthScore = getSystemHealthScore(stats.total_machines, stats.active_anomalies);
  const recentUsers = dashboard?.recent_users ?? [];

  if (isLoading) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center rounded-3xl border border-slate-100 bg-white">
        <Spinner className="text-[#43968C]" size="lg" />
        <span className="mt-4 text-[11px] font-bold uppercase tracking-widest text-slate-400">
          Loading system metrics...
        </span>
      </div>
    );
  }

  return (
    <div className="space-y-8 pb-10">
      <div className="flex flex-col gap-1.5">
        <h1 className="text-3xl font-black tracking-tight text-slate-900">
          Admin Dashboard
        </h1>
        <p className="text-sm font-medium text-slate-500">
          Live system overview for users, machines, and maintenance flow.
        </p>
      </div>

      {error && <Alert variant="error" title="Data Sync Error">{error}</Alert>}

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          icon="precision_manufacturing"
          label="Total Machines"
          value={stats.total_machines}
        />
        <StatCard icon="group" label="Total Users" value={stats.total_users} />
        <StatCard
          icon="error"
          label="Active Anomalies"
          value={stats.active_anomalies}
          danger
        />
        <StatCard
          icon="task_alt"
          label="Completed Tasks"
          value={stats.completed_maintenance_tasks}
        />
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        <section className="rounded-3xl border border-slate-200/60 bg-white p-8 shadow-sm lg:col-span-2">
          <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
            <div>
              <h2 className="text-lg font-bold text-slate-900">System Health Overview</h2>
              <p className="text-xs font-medium text-slate-400">Integrity based on machine status.</p>
            </div>
            <div className="rounded-2xl bg-teal-50 px-4 py-2">
              <span className="text-sm font-black text-[#43968C]">{healthScore}% Healthy</span>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            <MetricTile label="Clients" value={stats.total_clients} icon="business" />
            <MetricTile label="Technicians" value={stats.total_technicians} icon="engineering" />
            <MetricTile 
              label="Open Requests" 
              value={stats.open_repair_requests} 
              icon="build_circle" 
              warning 
            />
          </div>

          {/* Pressure Bar */}
          <div className="mt-8 space-y-3 rounded-2xl bg-slate-50 p-6 border border-slate-100">
            <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-widest text-slate-500">
              <span>Anomaly Pressure</span>
              <span>{stats.active_anomalies} / {stats.total_machines} Assets</span>
            </div>
            <div className="h-2.5 overflow-hidden rounded-full bg-white border border-slate-200/50">
              <div
                className="h-full rounded-full bg-[#43968C] transition-all duration-700"
                style={{ width: `${Math.min(100, 100 - healthScore)}%` }}
              />
            </div>
          </div>
        </section>

        {/* Recent Users Section */}
        <section className="rounded-3xl border border-slate-200/60 bg-white p-8 shadow-sm">
          <h2 className="text-lg font-bold text-slate-900">Recent Users</h2>
          <p className="mb-6 text-xs font-medium text-slate-400">Latest registrations.</p>

          <div className="space-y-4">
            {recentUsers.length === 0 ? (
              <EmptyState label="No new registrations." />
            ) : (
              recentUsers.map((user) => (
                <article
                  key={user.id}
                  className="group flex items-center gap-4 rounded-2xl border border-slate-50 p-3 transition-colors hover:bg-slate-50"
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-slate-400 group-hover:bg-[#43968C]/10 group-hover:text-[#43968C]">
                    <span className="material-symbols-outlined text-[20px]">person</span>
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-bold text-slate-800">
                      {user.first_name} {user.last_name}
                    </p>
                    <p className="truncate text-[10px] font-bold uppercase tracking-tight text-slate-400">
                      {user.roles?.[0]?.name || "No role"}
                    </p>
                  </div>
                  <span className={cn(
                    "rounded-lg px-2 py-1 text-[9px] font-black uppercase tracking-widest",
                    getUserStatusClasses(user.status)
                  )}>
                    {formatStatus(user.status)}
                  </span>
                </article>
              ))
            )}
          </div>
        </section>
      </div>
    </div>
  );
}

export default Dashboard;