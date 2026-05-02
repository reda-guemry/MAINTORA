import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppPagination } from "@/shared/components";
import { Alert } from "@/shared/components/feedback";
import { Spinner } from "@/shared/components/ui";
import { formatDate, formatDateTime } from "@/shared/utils/formatters";
import { cn } from "@/shared/utils";
import { useMachineHistory } from "../hooks/useMachineHistory";
import { useMachineHistoryTask } from "../hooks/useMachineHistoryTask";
import { MachineHistoryTaskModal } from "./MachineHistoryTaskModal";
import { getTaskTitle } from "../utils/machineView";
import { formatStatus, getTaskStatusClasses } from "../utils/machineHistoryModal";
import type { MachineHistoryViewProps } from "../types/machineHistory";

export function MachineHistoryView({
  apiPrefix,
  backPath,
  machineId,
}: MachineHistoryViewProps) {
  const navigate = useNavigate();
  const [selectedTaskId, setSelectedTaskId] = useState<number | null>(null);
  
  const { history, currentPage, setPage, isLoading, error } = useMachineHistory(
    apiPrefix,
    machineId
  );
  
  const {
    task,
    isLoading: isLoadingTask,
    error: taskError,
  } = useMachineHistoryTask(apiPrefix, machineId, selectedTaskId);

  if (isLoading) {
    return (
      <div className="flex min-h-[50vh] flex-col items-center justify-center rounded-3xl border border-slate-200 bg-white shadow-sm">
        <Spinner className="text-[#43968C]" size="lg" />
        <p className="mt-4 text-[11px] font-bold uppercase tracking-widest text-slate-400 animate-pulse">
          Loading machine history...
        </p>
      </div>
    );
  }

  if (error || !history) {
    return (
      <Alert variant="error" title="Machine history unavailable">
        {error ?? "Unable to load this machine history."}
      </Alert>
    );
  }

  const tasks = history.tasks.data;

  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 pb-8">
      <header className="flex flex-col gap-6 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm lg:flex-row lg:items-end lg:justify-between">
        <div className="flex flex-col items-start">
          <button
            type="button"
            onClick={() => navigate(backPath)}
            className="mb-4 inline-flex h-8 items-center gap-1.5 rounded-lg bg-slate-50 px-3 text-[11px] font-bold uppercase tracking-widest text-slate-500 transition-colors hover:bg-teal-50 hover:text-[#43968C]"
          >
            <span className="material-symbols-outlined text-[16px]">
              arrow_back
            </span>
            Back
          </button>

          <div className="flex items-center gap-4">
            <div className="hidden h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-slate-50 text-slate-400 sm:flex">
              <span className="material-symbols-outlined text-[28px]">
                history
              </span>
            </div>
            <div>
              <p className="text-[10px] font-bold uppercase tracking-widest text-[#43968C]">
                Machine History
              </p>
              <h1 className="mt-1 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
                {history.machine.name}
              </h1>
              <div className="mt-1 flex items-center gap-2 text-sm font-medium text-slate-500">
                <span className="font-mono text-xs font-bold uppercase tracking-widest text-slate-400">
                  #{history.machine.code}
                </span>
                <span className="h-1 w-1 rounded-full bg-slate-300"></span>
                <span>{history.machine.location}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
          {[
            { label: "Status", value: history.machine.status, isStatus: true },
            { label: "Total Tasks", value: history.tasks.total },
            { label: "Page", value: `${history.tasks.current_page}/${history.tasks.last_page}` },
          ].map((item, idx) => (
            <div
              key={idx}
              className="flex flex-col items-start justify-center rounded-2xl border border-slate-100 bg-slate-50 p-4"
            >
              <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
                {item.label}
              </p>
              <p className={cn(
                "mt-1 text-base font-black sm:text-lg",
                item.isStatus ? "capitalize text-slate-900" : "text-slate-900"
              )}>
                {item.value}
              </p>
            </div>
          ))}
        </div>
      </header>

      <section className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
        <div className="border-b border-slate-100 bg-white px-6 py-5">
          <h2 className="text-base font-bold text-slate-900">
            Maintenance Tasks
          </h2>
          <p className="mt-1 text-xs text-slate-500">
            A complete log of previous and current maintenance tasks for this machine.
          </p>
        </div>

        <div className="flex flex-col divide-y divide-slate-100">
          {tasks.length === 0 ? (
            <div className="flex flex-col items-center justify-center px-6 py-16 text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-slate-50">
                <span className="material-symbols-outlined text-[32px] text-slate-300">
                  event_busy
                </span>
              </div>
              <p className="mt-4 text-[11px] font-bold uppercase tracking-widest text-slate-500">
                No tasks found
              </p>
              <p className="mt-2 text-sm text-slate-400">
                This machine has no maintenance history yet.
              </p>
            </div>
          ) : (
            tasks.map((task) => (
              <button
                key={task.id}
                type="button"
                onClick={() => setSelectedTaskId(task.id)}
                className="grid w-full gap-4 px-6 py-5 text-left transition-colors hover:bg-slate-50 sm:items-center md:grid-cols-[1.5fr_1fr_1fr_auto]"
              >
                <div>
                  <p className="text-sm font-bold text-slate-900">
                    {getTaskTitle(task)}
                  </p>
                  <div className="mt-1 flex items-center gap-1.5 text-xs font-medium text-slate-500">
                    <span className="material-symbols-outlined text-[14px]">
                      calendar_today
                    </span>
                    <span>Scheduled {formatDateTime(task.scheduled_at)}</span>
                  </div>
                </div>

                <div>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
                    Completed
                  </p>
                  <p className={cn(
                    "mt-1 text-sm font-semibold",
                    task.completed_at ? "text-slate-900" : "text-slate-400"
                  )}>
                    {task.completed_at ? formatDate(task.completed_at) : "Pending"}
                  </p>
                </div>

                <div>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
                    Anomalies
                  </p>
                  <div className="mt-1 flex items-center gap-1.5">
                    <span className={cn(
                      "text-sm font-bold",
                      (task.anomalies_count ?? 0) > 0 ? "text-red-600" : "text-slate-900"
                    )}>
                      {task.anomalies_count ?? 0}
                    </span>
                  </div>
                </div>

                <div className="flex items-start sm:justify-end">
                  <span
                    className={cn(
                      "rounded-lg px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest shadow-sm",
                      getTaskStatusClasses(task.status)
                    )}
                  >
                    {formatStatus(task.status)}
                  </span>
                </div>
              </button>
            ))
          )}
        </div>

        {history.tasks.last_page > 1 && (
          <div className="border-t border-slate-100 bg-slate-50 p-4">
            <AppPagination
              currentPage={currentPage}
              lastPage={history.tasks.last_page}
              from={history.tasks.from ?? 0}
              to={history.tasks.to ?? 0}
              total={history.tasks.total}
              label="tasks"
              onPageChange={setPage}
            />
          </div>
        )}
      </section>

      {selectedTaskId && (
        <MachineHistoryTaskModal
          task={task}
          isLoading={isLoadingTask}
          error={taskError}
          onClose={() => setSelectedTaskId(null)}
        />
      )}
    </div>
  );
}