import { Alert } from "@/shared/components/feedback";
import { Spinner } from "@/shared/components/ui";
import { formatDateTime } from "@/shared/utils/formatters";
import { useAdminDashboard } from "@/features/admin-dashboard";
import {
  formatNumber,
  formatStatus,
  getSystemHealthScore,
  getUserStatusClasses,
} from "@/features/admin-dashboard/utils/dashboardHelper";

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
  const { dashboard, isLoading, error, fetchDashboard } = useAdminDashboard();
  const stats = dashboard?.stats ?? emptyStats;
  const healthScore = getSystemHealthScore(
    stats.total_machines,
    stats.active_anomalies,
  );
  const recentUsers = dashboard?.recent_users ?? [];

  if (isLoading) {
    return (
      <div className="flex min-h-[70vh] flex-col items-center justify-center rounded-2xl border border-gray-100 bg-white shadow-sm">
        <Spinner size="lg" />
        <span className="mt-4 text-[10px] font-bold uppercase tracking-widest text-gray-400">
          Loading admin dashboard
        </span>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-gray-900">
            Admin Dashboard
          </h1>
          <p className="mt-1.5 text-sm text-gray-500">
            Live system overview for users, machines, anomalies, and repair
            requests.
          </p>
        </div>
      </div>

      {error && (
        <Alert variant="error" title="Dashboard unavailable">
          {error}
        </Alert>
      )}

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
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

      <div className="grid grid-cols-1 gap-6 pb-4 lg:grid-cols-3">
        <section className="rounded-2xl border border-gray-100 bg-white p-7 shadow-sm lg:col-span-2">
          <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
            <div>
              <h2 className="text-[16px] font-bold text-gray-800">
                System Health Overview
              </h2>
              <p className="mt-1 text-[12px] text-gray-400">
                Calculated from total machines and active anomalies.
              </p>
            </div>
            <span className="rounded-lg bg-[#eaf3f3] px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest text-[#398e8e]">
              {healthScore}% Healthy
            </span>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            <MetricTile
              label="Clients"
              value={stats.total_clients}
              icon="business_center"
            />
            <MetricTile
              label="Technicians"
              value={stats.total_technicians}
              icon="engineering"
            />
            <MetricTile
              label="Open Requests"
              value={stats.open_repair_requests}
              icon="build_circle"
              warning
            />
          </div>

          <div className="mt-6 rounded-xl border border-gray-100 bg-gray-50 p-4">
            <div className="mb-2 flex items-center justify-between text-[10px] font-bold uppercase tracking-widest text-gray-400">
              <span>Anomaly Pressure</span>
              <span>
                {formatNumber(stats.active_anomalies)} /{" "}
                {formatNumber(stats.total_machines)} machines
              </span>
            </div>
            <div className="h-2 overflow-hidden rounded-full bg-white">
              <div
                className="h-full rounded-full bg-[#398e8e]"
                style={{
                  width: `${Math.min(100, 100 - healthScore)}%`,
                }}
              />
            </div>
          </div>
        </section>

        <section className="rounded-2xl border border-gray-100 bg-white p-7 shadow-sm">
          <h2 className="text-[16px] font-bold text-gray-800">Recent Users</h2>
          <p className="mt-1 text-[12px] text-gray-400">
            Latest registered system accounts.
          </p>

          <div className="mt-5 space-y-3">
            {recentUsers.length === 0 && (
              <EmptyState label="No recent users found." />
            )}

            {recentUsers.map((user) => (
              <article
                key={user.id}
                className="rounded-xl border border-gray-100 p-4 transition-colors hover:bg-gray-50"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-[13px] font-bold text-gray-800">
                      {user.first_name} {user.last_name}
                    </p>
                    <p className="mt-1 text-[11px] font-medium text-gray-400">
                      {user.roles.map((role) => role.name).join(", ") ||
                        "No role"}
                    </p>
                  </div>
                  <span
                    className={`rounded px-2.5 py-1 text-[10px] font-bold uppercase ${getUserStatusClasses(
                      user.status,
                    )}`}
                  >
                    {formatStatus(user.status)}
                  </span>
                </div>
                <p className="mt-3 text-[10px] font-medium uppercase tracking-widest text-gray-300">
                  {formatDateTime(user.created_at)}
                </p>
              </article>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

function StatCard({
  icon,
  label,
  value,
  danger = false,
}: {
  icon: string;
  label: string;
  value: number;
  danger?: boolean;
}) {
  return (
    <div
      className={`flex flex-col justify-between rounded-2xl border bg-white p-5 shadow-sm ${
        danger ? "border-red-100" : "border-gray-100"
      }`}
    >
      <div className="mb-4 flex items-start justify-between">
        <div
          className={`flex h-9 w-9 items-center justify-center rounded-xl ${
            danger ? "bg-red-50 text-red-500" : "bg-[#eaf3f3] text-[#398e8e]"
          }`}
        >
          <span className="material-symbols-outlined text-[20px]">{icon}</span>
        </div>
      </div>
      <div>
        <p className="mb-1 text-[10px] font-bold uppercase tracking-wider text-gray-400">
          {label}
        </p>
        <h3 className="text-[28px] font-bold leading-none text-gray-800">
          {formatNumber(value)}
        </h3>
      </div>
    </div>
  );
}

function MetricTile({
  label,
  value,
  icon,
  warning = false,
}: {
  label: string;
  value: number;
  icon: string;
  warning?: boolean;
}) {
  return (
    <div className="rounded-xl border border-gray-100 bg-white p-4">
      <div className="flex items-center justify-between">
        <span
          className={`material-symbols-outlined text-[22px] ${
            warning ? "text-amber-600" : "text-[#398e8e]"
          }`}
        >
          {icon}
        </span>
        <span className="text-[10px] font-bold uppercase tracking-widest text-gray-300">
          Total
        </span>
      </div>
      <p className="mt-5 text-[10px] font-bold uppercase tracking-wider text-gray-400">
        {label}
      </p>
      <p className="mt-1 text-2xl font-black text-gray-800">
        {formatNumber(value)}
      </p>
    </div>
  );
}

function EmptyState({ label }: { label: string }) {
  return (
    <div className="rounded-xl border border-dashed border-gray-200 bg-gray-50 px-4 py-8 text-center text-sm font-medium text-gray-500">
      {label}
    </div>
  );
}

export default Dashboard;
