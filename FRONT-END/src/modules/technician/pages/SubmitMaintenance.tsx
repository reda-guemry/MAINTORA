import { useMemo, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Alert } from "@/shared/components/feedback";
import { Spinner } from "@/shared/components/ui";
import {
  type MaintenanceDraft,
  type TechnicianCheckStatus,
  type TechnicianTaskDetails,
  useSubmitMaintenanceTask,
  useTechnicianMaintenanceTask,
} from "@/features/technician-maintenance";

type SubmitMaintenanceLocationState = {
  checks?: MaintenanceDraft;
};

type SubmitMaintenanceFormProps = {
  task: TechnicianTaskDetails;
  taskId: number;
  initialChecks?: MaintenanceDraft;
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

function formatScheduledTime(scheduledAt: string) {
  const date = new Date(scheduledAt);

  if (Number.isNaN(date.getTime())) {
    return scheduledAt;
  }

  return date.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
}

function SubmitMaintenancePage() {
  const location = useLocation();
  const { taskId } = useParams();
  const parsedTaskId = taskId ? Number(taskId) : null;
  const { task, isLoading, error } = useTechnicianMaintenanceTask(parsedTaskId);
  const routeState = location.state as SubmitMaintenanceLocationState | null;

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Spinner />
      </div>
    );
  }

  if (error || !task || !parsedTaskId) {
    return <Alert variant="error">{error ?? "Task not found"}</Alert>;
  }

  return (
    <SubmitMaintenanceForm
      key={`${task.id}-${Boolean(routeState?.checks)}`}
      task={task}
      taskId={parsedTaskId}
      initialChecks={routeState?.checks}
    />
  );
}

function SubmitMaintenanceForm({
  task,
  taskId,
  initialChecks,
}: SubmitMaintenanceFormProps) {
  const navigate = useNavigate();
  const {
    submitMaintenanceTask,
    isSubmitting,
    error: submitError,
  } = useSubmitMaintenanceTask();

  const [checks, setChecks] = useState<MaintenanceDraft>(() => {
    return initialChecks ?? buildInitialChecks(task);
  });
  const [formError, setFormError] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const sortedItems = useMemo(() => {
    return [...task.check_items].sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
  }, [task]);

  const completedCount = sortedItems.filter((item) => {
    return checks[item.checklist_item_id]?.status;
  }).length;
  const progressPercent = sortedItems.length > 0 ? (completedCount / sortedItems.length) * 100 : 0;
  const scheduledTime = formatScheduledTime(task.scheduled_at);

  function updateCheck(checklistItemId: number, data: Partial<MaintenanceDraft[number]>) {
    setChecks((prev) => {
      const currentDraft = prev[checklistItemId] ?? createEmptyCheckDraft();

      return {
        ...prev,
        [checklistItemId]: {
          ...currentDraft,
          ...data,
        },
      };
    });
  }

  function updateCheckStatus(
    checklistItemId: number,
    status: TechnicianCheckStatus,
  ) {
    if (status === "anomaly") {
      const currentDraft = checks[checklistItemId] ?? createEmptyCheckDraft();
      const nextChecks: MaintenanceDraft = {
        ...checks,
        [checklistItemId]: {
          ...currentDraft,
          status: "anomaly",
        },
      };

      setChecks(nextChecks);
      navigate(`/technician/maintenance/${taskId}/anomaly/${checklistItemId}`, {
        state: {
          checks: nextChecks,
        },
      });
      return;
    }

    updateCheck(checklistItemId, {
      status,
      anomalyTitle: "",
      anomalyDescription: "",
      anomalySeverity: "low",
    });
  }

  async function handleSubmit() {
    const hasMissing = sortedItems.some((item) => {
      return !checks[item.checklist_item_id]?.status;
    });

    if (hasMissing) {
      setFormError("Please complete all control points.");
      return;
    }

    const missingAnomalyDetails = sortedItems.find((item) => {
      const draft = checks[item.checklist_item_id];

      if (draft?.status !== "anomaly") {
        return false;
      }

      return (
        !draft.anomalyTitle.trim()
        || !draft.anomalyDescription.trim()
        || !draft.anomalySeverity
      );
    });

    if (missingAnomalyDetails) {
      setFormError("Please complete the anomaly report before completing the round.");
      return;
    }

    setFormError(null);

    const response = await submitMaintenanceTask(taskId, {
      checks: sortedItems.map((item) => {
        const draft = checks[item.checklist_item_id];
        const payload = {
          checklist_item_id: item.checklist_item_id,
          status: draft.status as TechnicianCheckStatus,
          comment: draft.comment.trim(),
        };

        if (draft.status !== "anomaly") {
          return payload;
        }

        return {
          ...payload,
          anomaly: {
            title: draft.anomalyTitle.trim(),
            description: draft.anomalyDescription.trim(),
            severity: draft.anomalySeverity,
          },
        };
      }),
    });

    if (response?.data) {
      setIsSubmitted(true);
    }
  }

  return (
    <div className="min-h-screen bg-[#F4F7F6] pb-32 font-sans text-[#2D3748]">
      <div className="mx-auto max-w-3xl px-4 pt-8">
        <header className="mb-8 flex items-center justify-between rounded-xl bg-white p-6 shadow-sm">
          <div>
            <h1 className="text-xl font-bold text-[#1A202C]">{task.machine.name}</h1>
            <p className="mt-1 text-xs font-medium text-gray-500">
              Round ID: #{task.id} - Scheduled: {scheduledTime}
            </p>
          </div>
          <span className="rounded-lg bg-[#E6F4F1] px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-[#3D8D8D]">
            In Progress
          </span>
        </header>

        <h2 className="mb-4 text-[11px] font-black uppercase tracking-[0.15em] text-gray-500">
          Critical Control Points
        </h2>

        <div className="space-y-4">
          {sortedItems.map((item) => {
            const draft = checks[item.checklist_item_id];
            const isOk = draft?.status === "ok";
            const isNotOk = draft?.status === "not_ok";
            const isAnomaly = draft?.status === "anomaly";
            const hasAnomalyDetails = Boolean(
              draft?.anomalyTitle.trim() && draft.anomalyDescription.trim(),
            );

            return (
              <article
                key={item.checklist_item_id}
                className="rounded-2xl bg-white p-6 shadow-sm transition-all"
              >
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#F0F9F8] text-[#3D8D8D]">
                    <span className="material-symbols-outlined">settings_suggest</span>
                  </div>
                  <div>
                    <h3 className="font-bold text-[#1A202C]">{item.label}</h3>
                    <p className="text-xs text-gray-500">Perform standard visual inspection</p>
                  </div>
                </div>

                <div className="mt-6 grid gap-3 sm:grid-cols-3">
                  <button
                    type="button"
                    onClick={() => updateCheckStatus(item.checklist_item_id, "ok")}
                    className={`flex items-center justify-center gap-2 rounded-xl border-2 py-4 text-sm font-bold transition-all ${
                      isOk
                        ? "border-[#3D8D8D] bg-[#3D8D8D] text-white"
                        : "border-gray-100 bg-white text-gray-600 hover:border-gray-200"
                    }`}
                  >
                    <span className="material-symbols-outlined text-lg">check_circle</span>
                    OK
                  </button>
                  <button
                    type="button"
                    onClick={() => updateCheckStatus(item.checklist_item_id, "not_ok")}
                    className={`flex items-center justify-center gap-2 rounded-xl border-2 py-4 text-sm font-bold transition-all ${
                      isNotOk
                        ? "border-[#F97316] bg-[#FFF7ED] text-[#C2410C]"
                        : "border-gray-100 bg-white text-gray-600 hover:border-gray-200"
                    }`}
                  >
                    <span className="material-symbols-outlined text-lg">report</span>
                    Not OK
                  </button>
                  <button
                    type="button"
                    onClick={() => updateCheckStatus(item.checklist_item_id, "anomaly")}
                    className={`flex items-center justify-center gap-2 rounded-xl border-2 py-4 text-sm font-bold transition-all ${
                      isAnomaly
                        ? "border-[#F56565] bg-white text-[#F56565]"
                        : "border-gray-100 bg-white text-gray-600 hover:border-gray-200"
                    }`}
                  >
                    <span className="material-symbols-outlined text-lg">warning</span>
                    {isAnomaly ? "Edit Anomaly" : "Anomaly"}
                  </button>
                </div>

                {(isNotOk || isAnomaly) && (
                  <div className="mt-4 animate-in fade-in slide-in-from-top-2">
                    <div
                      className={`rounded-xl border p-4 ${
                        isAnomaly ? "border-red-100 bg-red-50" : "border-orange-100 bg-orange-50"
                      }`}
                    >
                      <div
                        className={`flex items-center gap-2 ${
                          isAnomaly ? "text-[#C53030]" : "text-[#C2410C]"
                        }`}
                      >
                        <span className="material-symbols-outlined text-sm">
                          {isAnomaly ? "warning" : "info"}
                        </span>
                        <span className="text-[10px] font-black uppercase tracking-wider">
                          {isAnomaly
                            ? hasAnomalyDetails
                              ? "Anomaly Report Attached"
                              : "Anomaly Report Required"
                            : "Observation"}
                        </span>
                      </div>

                      {isAnomaly ? (
                        hasAnomalyDetails ? (
                          <div className="mt-3 rounded-lg bg-white/70 px-3 py-2 text-sm text-[#1A202C]">
                            <p className="font-bold">{draft.anomalyTitle}</p>
                            <p className="mt-1 text-xs uppercase tracking-[0.14em] text-red-500">
                              Severity: {draft.anomalySeverity}
                            </p>
                          </div>
                        ) : (
                          <p className="mt-3 rounded-lg bg-white/70 px-3 py-2 text-sm font-semibold text-[#C53030]">
                            Open the anomaly report page to complete title, severity, and description.
                          </p>
                        )
                      ) : (
                        <textarea
                          value={draft?.comment ?? ""}
                          onChange={(event) => {
                            updateCheck(item.checklist_item_id, {
                              comment: event.target.value,
                            });
                          }}
                          placeholder="Add observation for this failed check..."
                          className="mt-3 w-full border-none bg-transparent p-0 text-sm text-[#1A202C] outline-none placeholder-orange-300 focus:ring-0"
                          rows={2}
                        />
                      )}
                    </div>
                  </div>
                )}
              </article>
            );
          })}
        </div>
      </div>

      <footer className="fixed inset-x-0 bottom-0 z-50 border-t border-gray-100 bg-white p-4 shadow-[0_-10px_30px_rgba(0,0,0,0.03)]">
        <div className="mx-auto flex max-w-3xl flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-1 flex-col gap-1">
            <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest text-gray-400">
              <span>Progress</span>
              <span>{Math.round(progressPercent)}%</span>
            </div>
            <div className="h-1.5 w-full overflow-hidden rounded-full bg-gray-100">
              <div
                className="h-full bg-[#3D8D8D] transition-all duration-500"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          <button
            type="button"
            onClick={handleSubmit}
            disabled={isSubmitting || isSubmitted}
            className="flex items-center justify-center gap-2 rounded-xl bg-[#3D8D8D] px-10 py-4 text-sm font-bold text-white shadow-lg shadow-[#3D8D8D]/20 transition-all hover:bg-[#347a7a] active:scale-95 disabled:opacity-50"
          >
            <span className="material-symbols-outlined text-lg">fact_check</span>
            {isSubmitting ? "Submitting..." : isSubmitted ? "Round Completed" : "Complete Round"}
          </button>

          {isSubmitted && (
            <button
              type="button"
              onClick={() => navigate("/technician/map")}
              className="flex items-center justify-center gap-2 rounded-xl border border-[#dbe5e2] px-6 py-4 text-sm font-bold text-[#607776] transition-colors hover:bg-[#f2f7f7] hover:text-text-main"
            >
              <span className="material-symbols-outlined text-lg">map</span>
              Back to Map
            </button>
          )}
        </div>
      </footer>

      {(formError || submitError || isSubmitted) && (
        <div className="fixed bottom-24 left-1/2 z-50 w-[calc(100%-2rem)] max-w-md -translate-x-1/2">
          {isSubmitted ? (
            <Alert variant="success" title="Completed">
              Maintenance round submitted successfully.
            </Alert>
          ) : (
            <Alert
              variant={submitError ? "error" : "warning"}
              title={submitError ? "Submit failed" : "Incomplete"}
            >
              {submitError ?? formError}
            </Alert>
          )}
        </div>
      )}
    </div>
  );
}

export default SubmitMaintenancePage;
