import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Alert } from "@/shared/components/feedback";
import { Button, Spinner } from "@/shared/components/ui";
import { formatDate, formatDateTime } from "@/shared/utils/formatters";
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
    machineId,
  );
  const {
    task,
    isLoading: isLoadingTask,
    error: taskError,
  } = useMachineHistoryTask(apiPrefix, machineId, selectedTaskId);

  if (isLoading) {
    return (
      <div className="flex min-h-[70vh] flex-col items-center justify-center rounded-4xl border border-[#dce5e2] bg-white">
        <Spinner />
        <p className="mt-4 text-[10px] font-black uppercase tracking-[0.28em] text-primary">
          Loading machine history
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
      <header className="rounded-[30px] border border-[#dce5e2] bg-white p-6 shadow-[0_24px_60px_rgba(35,53,53,0.08)]">
        <div className="flex flex-col gap-5 md:flex-row md:items-start md:justify-between">
          <div>
            <button
              type="button"
              onClick={() => navigate(backPath)}
              className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#dce5e2] bg-[#f8faf9] px-3 py-2 text-[10px] font-black uppercase tracking-[0.18em] text-[#607776] transition-colors hover:text-primary"
            >
              <span className="material-symbols-outlined text-[16px]">
                arrow_back
              </span>
              Back
            </button>
            <p className="text-[10px] font-black uppercase tracking-[0.24em] text-primary">
              Machine history
            </p>
            <h1 className="mt-2 text-3xl font-black text-[#2d241c]">
              {history.machine.name}
            </h1>
            <p className="mt-2 text-sm font-semibold text-[#607776]">
              #{history.machine.code} - {history.machine.location}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            <div className="rounded-2xl border border-[#dce5e2] bg-[#f8faf9] px-4 py-3">
              <p className="text-[9px] font-black uppercase tracking-widest text-slate-400">
                Status
              </p>
              <p className="mt-1 text-sm font-black text-[#2d241c]">
                {history.machine.status}
              </p>
            </div>
            <div className="rounded-2xl border border-[#dce5e2] bg-[#f8faf9] px-4 py-3">
              <p className="text-[9px] font-black uppercase tracking-widest text-slate-400">
                Tasks
              </p>
              <p className="mt-1 text-sm font-black text-[#2d241c]">
                {history.tasks.total}
              </p>
            </div>
            <div className="rounded-2xl border border-[#dce5e2] bg-[#f8faf9] px-4 py-3">
              <p className="text-[9px] font-black uppercase tracking-widest text-slate-400">
                Page
              </p>
              <p className="mt-1 text-sm font-black text-[#2d241c]">
                {history.tasks.current_page}/{history.tasks.last_page}
              </p>
            </div>
          </div>
        </div>
      </header>

      <section className="overflow-hidden rounded-[28px] border border-[#dce5e2] bg-white shadow-sm">
        <div className="border-b border-[#dce5e2] bg-[#f8faf9] px-6 py-4">
          <h2 className="text-base font-black text-[#2d241c]">
            Maintenance tasks
          </h2>
          <p className="mt-1 text-xs font-medium text-[#607776]">
            Previous and current maintenance tasks for this machine.
          </p>
        </div>

        <div className="divide-y divide-[#eef3f1]">
          {tasks.length === 0 && (
            <div className="px-6 py-14 text-center">
              <span className="material-symbols-outlined text-4xl text-slate-300">
                event_busy
              </span>
              <p className="mt-2 text-sm font-bold text-[#2d241c]">
                No maintenance tasks found
              </p>
            </div>
          )}

          {tasks.map((task) => (
            <button
              key={task.id}
              type="button"
              onClick={() => setSelectedTaskId(task.id)}
              className="grid w-full gap-4 px-6 py-5 text-left transition-colors hover:bg-[#f8faf9] md:grid-cols-[1fr_180px_150px_120px]"
            >
              <div>
                <p className="text-sm font-black text-[#2d241c]">
                  {getTaskTitle(task)}
                </p>
                <p className="mt-1 text-xs font-semibold text-[#607776]">
                  Scheduled {formatDateTime(task.scheduled_at)}
                </p>
              </div>
              <div>
                <p className="text-[9px] font-black uppercase tracking-widest text-slate-400">
                  Completed
                </p>
                <p className="mt-1 text-xs font-bold text-[#2d241c]">
                  {task.completed_at ? formatDate(task.completed_at) : "Not completed"}
                </p>
              </div>
              <div>
                <p className="text-[9px] font-black uppercase tracking-widest text-slate-400">
                  Anomalies
                </p>
                <p className="mt-1 text-xs font-bold text-[#2d241c]">
                  {task.anomalies_count ?? 0}
                </p>
              </div>
              <div className="flex items-start md:justify-end">
                <span
                  className={`rounded px-2.5 py-1 text-[10px] font-black uppercase ${getTaskStatusClasses(
                    task.status,
                  )}`}
                >
                  {formatStatus(task.status)}
                </span>
              </div>
            </button>
          ))}
        </div>

        <div className="flex flex-col gap-3 border-t border-[#dce5e2] px-6 py-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs font-bold uppercase tracking-widest text-slate-400">
            Showing {history.tasks.from ?? 0}-{history.tasks.to ?? 0} of{" "}
            {history.tasks.total}
          </p>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              disabled={currentPage <= 1}
              onClick={() => setPage(currentPage - 1)}
            >
              Previous
            </Button>
            <Button
              variant="outline"
              size="sm"
              disabled={currentPage >= history.tasks.last_page}
              onClick={() => setPage(currentPage + 1)}
            >
              Next
            </Button>
          </div>
        </div>
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
