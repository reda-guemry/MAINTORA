import { useMemo, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Alert } from "@/shared/components/feedback";
import { Spinner } from "@/shared/components/ui";
import {
  type AnomalySeverity,
  type MaintenanceDraft,
  type TechnicianTaskDetails,
  useTechnicianMaintenanceTask,
} from "@/features/technician-maintenance";

type MaintenanceAnomalyLocationState = {
  checks?: MaintenanceDraft;
};

type MaintenanceAnomalyFormProps = {
  checks: MaintenanceDraft;
  checklistItemId: number;
  task: TechnicianTaskDetails;
  taskId: number;
};

function createEmptyCheckDraft(): MaintenanceDraft[number] {
  return {
    status: null,
    comment: "",
    anomalyTitle: "",
    anomalyDescription: "",
    anomalySeverity: "low",
  };
}

function buildInitialChecks(task: TechnicianTaskDetails): MaintenanceDraft {
  return task.check_items.reduce<MaintenanceDraft>((draft, item) => {
    draft[item.checklist_item_id] = {
      status: item.status,
      comment: item.comment ?? "",
      anomalyTitle: "",
      anomalyDescription: "",
      anomalySeverity: "low",
    };

    return draft;
  }, {});
}

function MaintenanceAnomalyPage() {
  const location = useLocation();
  const { taskId, checklistItemId } = useParams();
  const parsedTaskId = taskId ? Number(taskId) : null;
  const parsedChecklistItemId = checklistItemId ? Number(checklistItemId) : null;
  const routeState = location.state as MaintenanceAnomalyLocationState | null;
  const { task, isLoading, error } = useTechnicianMaintenanceTask(parsedTaskId);

  const checklistItem = useMemo(() => {
    if (!task || !parsedChecklistItemId) {
      return null;
    }

    return (
      task.check_items.find((item) => {
        return item.checklist_item_id === parsedChecklistItemId;
      }) ?? null
    );
  }, [parsedChecklistItemId, task]);

  if (isLoading) {
    return (
      <div className="flex min-h-[70vh] w-full flex-col items-center justify-center rounded-[40px] border border-[#dce5e2] bg-[#f8faf9]">
        <Spinner />
        <p className="mt-4 text-[10px] font-black uppercase tracking-[0.3em] text-[#6ba5a5]">
          Loading Anomaly
        </p>
      </div>
    );
  }

  if (error || !task || !checklistItem || !parsedTaskId || !parsedChecklistItemId) {
    return (
      <Alert variant="error" title="Anomaly form unavailable">
        {error ?? "Checklist item could not be loaded."}
      </Alert>
    );
  }

  return (
    <MaintenanceAnomalyForm
      key={`${task.id}-${parsedChecklistItemId}-${Boolean(routeState?.checks)}`}
      checks={routeState?.checks ?? buildInitialChecks(task)}
      checklistItemId={parsedChecklistItemId}
      task={task}
      taskId={parsedTaskId}
    />
  );
}

function MaintenanceAnomalyForm({
  checks,
  checklistItemId,
  task,
  taskId,
}: MaintenanceAnomalyFormProps) {
  const navigate = useNavigate();
  const checklistItem = useMemo(() => {
    return (
      task.check_items.find((item) => {
        return item.checklist_item_id === checklistItemId;
      }) ?? task.check_items[0]
    );
  }, [checklistItemId, task.check_items]);
  const currentItemDraft = checks[checklistItemId];
  const [title, setTitle] = useState(currentItemDraft?.anomalyTitle ?? "");
  const [description, setDescription] = useState(currentItemDraft?.anomalyDescription ?? "");
  const [severity, setSeverity] = useState<AnomalySeverity>(
    currentItemDraft?.anomalySeverity ?? "low",
  );
  const [formError, setFormError] = useState<string | null>(null);

  function goBackToMaintenanceForm(nextChecks = checks) {
    navigate(`/technician/maintenance/${taskId}`, {
      state: {
        checks: nextChecks,
      },
    });
  }

  function handleSubmitAnomaly() {
    if (!title.trim() || !description.trim()) {
      setFormError("Please fill anomaly title and description.");
      return;
    }

    const currentDraft = checks[checklistItemId] ?? createEmptyCheckDraft();
    const nextChecks: MaintenanceDraft = {
      ...checks,
      [checklistItemId]: {
        ...currentDraft,
        status: "anomaly",
        anomalyTitle: title.trim(),
        anomalyDescription: description.trim(),
        anomalySeverity: severity,
      },
    };

    goBackToMaintenanceForm(nextChecks);
  }

  return (
    <div className="min-h-screen bg-[#F4F7F6] px-4 py-8 text-[#172033]">
      <div className="mx-auto max-w-4xl">
        <section className="rounded-xl border border-red-200 bg-red-50 p-5 text-red-900">
          <div className="flex items-start gap-3">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-red-500 text-white">
              <span className="material-symbols-outlined text-[20px]">emergency_home</span>
            </div>
            <div>
              <p className="text-sm font-black uppercase tracking-[0.08em]">
                Equipment Status: KO
              </p>
              <p className="mt-1 text-xs leading-5 text-red-800/80">
                {task.machine.name} - Checklist item #{checklistItem.checklist_item_id}.
                Report the detected failure before completing this maintenance round.
              </p>
            </div>
          </div>
        </section>

        <section className="mt-8 overflow-hidden rounded-xl border border-[#dbe5e2] bg-white shadow-sm">
          <div className="border-b border-[#eef2f1] px-6 py-5">
            <h1 className="text-xl font-black text-[#172033]">Report Anomaly</h1>
            <p className="mt-1 text-xs text-[#6f7f8f]">
              Provide detailed failure logs for this checklist item.
            </p>
          </div>

          {formError && (
            <div className="px-6 pt-5">
              <Alert variant="warning" title="Missing details">
                {formError}
              </Alert>
            </div>
          )}

          <div className="grid gap-6 px-6 py-6">
            <div className="grid gap-5 md:grid-cols-2">
              <div>
                <label className="text-[11px] font-black uppercase tracking-[0.14em] text-[#465364]">
                  Severity Level
                </label>
                <select
                  value={severity}
                  onChange={(event) => setSeverity(event.target.value as AnomalySeverity)}
                  className="mt-2 h-12 w-full rounded-xl border border-[#cfdce5] bg-[#f9fbfc] px-4 text-sm text-[#172033] outline-none transition focus:border-[#3D8D8D]"
                >
                  <option value="low">Low - Monitor</option>
                  <option value="medium">Medium - Needs attention</option>
                  <option value="high">High - Safety hazard / stop line</option>
                </select>
              </div>

              <div>
                <label className="text-[11px] font-black uppercase tracking-[0.14em] text-[#465364]">
                  Blueprint Reference
                </label>
                <input
                  value={`#${task.id} - ${checklistItem.label}`}
                  readOnly
                  className="mt-2 h-12 w-full rounded-xl border border-[#d7e1ea] bg-[#eef3f7] px-4 text-sm text-[#718093] outline-none"
                />
              </div>
            </div>

            <div>
              <label className="text-[11px] font-black uppercase tracking-[0.14em] text-[#465364]">
                Anomaly Title
              </label>
              <input
                value={title}
                onChange={(event) => setTitle(event.target.value)}
                placeholder="Example: abnormal vibration"
                className="mt-2 h-12 w-full rounded-xl border border-[#cfdce5] bg-[#f9fbfc] px-4 text-sm text-[#172033] outline-none transition focus:border-[#3D8D8D]"
              />
            </div>

            <div>
              <label className="text-[11px] font-black uppercase tracking-[0.14em] text-[#465364]">
                Failure Description
              </label>
              <textarea
                value={description}
                onChange={(event) => setDescription(event.target.value)}
                rows={7}
                placeholder="Describe the mechanical or software failure in detail..."
                className="mt-2 w-full resize-none rounded-xl border border-[#cfdce5] bg-[#f9fbfc] px-4 py-4 text-sm text-[#172033] outline-none transition focus:border-[#3D8D8D]"
              />
            </div>

           
          </div>

          <div className="flex flex-col gap-3 border-t border-[#eef2f1] px-6 py-5 sm:flex-row sm:justify-between">
            <button
              type="button"
              onClick={() => goBackToMaintenanceForm()}
              className="rounded-xl border border-[#dbe5e2] px-5 py-3 text-sm font-black text-[#5f7f7d] transition hover:bg-[#f6faf9]"
            >
              Back
            </button>
            <button
              type="button"
              onClick={handleSubmitAnomaly}
              className="rounded-xl bg-gradient-to-r from-[#C53A3A] to-[#EA7A00] px-8 py-3 text-sm font-black uppercase tracking-[0.14em] text-white shadow-lg shadow-orange-500/20 transition hover:opacity-95"
            >
              <span className="material-symbols-outlined mr-2 align-[-4px] text-[18px]">
                bolt
              </span>
              Escalate Alert To Chef
            </button>
          </div>
        </section>

        <footer className="mt-8 flex flex-wrap justify-between gap-3 text-[10px] font-bold uppercase tracking-[0.18em] text-[#9aabba]">
          <span>Session: Active</span>
          <span>Network: Encrypted</span>
          <span>ISO 9001 compliant report</span>
        </footer>
      </div>
    </div>
  );
}

export default MaintenanceAnomalyPage;
