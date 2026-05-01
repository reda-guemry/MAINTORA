import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Alert } from "@/shared/components/feedback";
import { Spinner } from "@/shared/components/ui";
import {
  buildMaintenanceDraft,
  clearMaintenanceDraft,
  type MaintenanceDraft,
  type TechnicianCheckStatus,
  useSubmitMaintenanceTask,
  useTechnicianMaintenanceTask,
  readMaintenanceDraft,
  saveMaintenanceDraft,
} from "@/features/technician-maintenance";
import { getStatusClasses } from "../utils/getStatus";
import { getCheckStatusClasses } from "@/shared/utils/statusHelpers";

function SubmitMaintenancePage() {
  const navigate = useNavigate();
  const { taskId } = useParams();
  const parsedTaskId = taskId ? Number(taskId) : null;
  const { task, isLoading, error } = useTechnicianMaintenanceTask(parsedTaskId);
  const {
    submitMaintenanceTask,
    isSubmitting,
    error: submitError,
  } = useSubmitMaintenanceTask();
  const [checks, setChecks] = useState<MaintenanceDraft>({});
  const [formError, setFormError] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    if (!task || !parsedTaskId) {
      return;
    }

    const savedDraft = readMaintenanceDraft(parsedTaskId);
    const nextDraft = savedDraft ?? buildMaintenanceDraft(task);

    setChecks(nextDraft);
    saveMaintenanceDraft(parsedTaskId, nextDraft);
  }, [parsedTaskId, task]);

  const sortedItems = useMemo(() => {
    if (!task) {
      return [];
    }

    return [...task.check_items].sort((firstItem, secondItem) => {
      return (firstItem.order ?? 0) - (secondItem.order ?? 0);
    });
  }, [task]);

  const completedChecksCount = sortedItems.filter((item) => {
    return checks[item.checklist_item_id]?.status !== null;
  }).length;

  function updateCheck(
    checklistItemId: number,
    data: Partial<MaintenanceDraft[number]>,
  ) {
    if (!parsedTaskId) {
      return;
    }

    setChecks((currentChecks) => {
      const nextChecks = {
        ...currentChecks,
        [checklistItemId]: {
          status: currentChecks[checklistItemId]?.status ?? null,
          comment: currentChecks[checklistItemId]?.comment ?? "",
          anomalyTitle: currentChecks[checklistItemId]?.anomalyTitle ?? "",
          anomalyDescription:
            currentChecks[checklistItemId]?.anomalyDescription ?? "",
          anomalySeverity: currentChecks[checklistItemId]?.anomalySeverity ?? "low",
          ...data,
        },
      };

      saveMaintenanceDraft(parsedTaskId, nextChecks);

      return nextChecks;
    });
  }

  function openAnomalyPage(checklistItemId: number) {
    if (!parsedTaskId) {
      return;
    }

    saveMaintenanceDraft(parsedTaskId, checks);
    navigate(`/technician/maintenance/${parsedTaskId}/anomaly/${checklistItemId}`);
  }

  async function handleSubmit() {
    if (!task || !parsedTaskId) {
      return;
    }

    const hasMissingStatus = sortedItems.some((item) => {
      return checks[item.checklist_item_id]?.status === null;
    });

    if (hasMissingStatus) {
      setFormError("Please choose OK, Not OK, or Anomaly for every checklist item.");
      return;
    }

    const missingAnomalyData = sortedItems.find((item) => {
      const draft = checks[item.checklist_item_id];

      return (
        draft?.status === "anomaly" &&
        (!draft.anomalyTitle.trim() ||
          !draft.anomalyDescription.trim() ||
          !draft.anomalySeverity)
      );
    });

    if (missingAnomalyData) {
      setFormError("Please complete anomaly details before submitting.");
      return;
    }

    setFormError(null);

    const response = await submitMaintenanceTask(parsedTaskId, {
      checks: sortedItems.map((item) => {
        const draft = checks[item.checklist_item_id];

        return {
          checklist_item_id: item.checklist_item_id,
          status: draft.status as TechnicianCheckStatus,
          comment: draft.comment.trim(),
          ...(draft.status === "anomaly"
            ? {
                anomaly: {
                  title: draft.anomalyTitle.trim(),
                  description: draft.anomalyDescription.trim(),
                  severity: draft.anomalySeverity,
                },
              }
            : {}),
        };
      }),
    });

    if (response?.data) {
      clearMaintenanceDraft(parsedTaskId);
      setIsSubmitted(true);
    }
  }

  if (isLoading) {
    return (
      <div className="flex min-h-[70vh] w-full flex-col items-center justify-center rounded-[40px] border border-[#dce5e2] bg-[#f8faf9]">
        <Spinner />
        <p className="mt-4 text-[10px] font-black uppercase tracking-[0.3em] text-[#6ba5a5]">
          Loading Maintenance
        </p>
      </div>
    );
  }

  if (error || !task) {
    return (
      <Alert variant="error" title="Maintenance unavailable">
        {error ?? "Maintenance task could not be loaded."}
      </Alert>
    );
  }

  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-5 pb-8">
      <header className="overflow-hidden rounded-[34px] border border-[#dce5e2] bg-white shadow-[0_24px_60px_rgba(35,53,53,0.08)]">
        <div className="grid gap-4 bg-[linear-gradient(135deg,#f7fbfb_0%,#eef7f6_48%,#fff7ed_100%)] p-6 md:grid-cols-[1fr_280px] md:p-7">
          <div>
            <p className="text-[10px] font-black uppercase tracking-[0.25em] text-[#6ba5a5]">
              Submit maintenance
            </p>
            <h1 className="mt-2 text-3xl font-black tracking-tight text-[#2d241c]">
              {task.machine.name}
            </h1>
            <p className="mt-3 max-w-2xl text-sm leading-7 text-[#648080]">
              Mark every checklist item. If an item has an anomaly, open the
              anomaly page, fill the details, then come back to complete the
              maintenance form.
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              <span
                className={`rounded-full border px-3 py-1 text-[10px] font-black uppercase tracking-[0.16em] ${getStatusClasses(task.machine.status)}`}
              >
                {task.machine.status}
              </span>
              <span className="rounded-full border border-[#b9dfdc] bg-[#edf8f7] px-3 py-1 text-[10px] font-black uppercase tracking-[0.16em] text-primary">
                En maintenance aujourd&apos;hui
              </span>
            </div>
          </div>

          <div className="rounded-[26px] border border-white/80 bg-white/80 p-4 shadow-sm backdrop-blur">
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[#9d9388]">
              Progress
            </p>
            <p className="mt-2 text-3xl font-black text-[#2d241c]">
              {completedChecksCount}/{sortedItems.length}
            </p>
            <div className="mt-4 h-2 overflow-hidden rounded-full bg-[#dce5e2]">
              <div
                className="h-full rounded-full bg-primary transition-all"
                style={{
                  width:
                    sortedItems.length > 0
                      ? `${(completedChecksCount / sortedItems.length) * 100}%`
                      : "0%",
                }}
              />
            </div>
          </div>
        </div>
      </header>

      {formError && (
        <Alert variant="warning" title="Checklist incomplete">
          {formError}
        </Alert>
      )}

      {submitError && (
        <Alert variant="error" title="Submit failed">
          {submitError}
        </Alert>
      )}

      {isSubmitted && (
        <Alert variant="success" title="Maintenance submitted">
          The maintenance round was submitted successfully.
        </Alert>
      )}

      <section className="grid gap-4">
        {sortedItems.map((item, index) => {
          const draft = checks[item.checklist_item_id] ?? {
            status: null,
            comment: "",
            anomalyTitle: "",
            anomalyDescription: "",
            anomalySeverity: "low",
          };

          return (
            <article
              key={item.checklist_item_id}
              className="rounded-[28px] border border-[#dce5e2] bg-white p-5 shadow-[0_18px_40px_rgba(35,53,53,0.06)]"
            >
              <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                <div className="min-w-0">
                  <p className="text-[10px] font-black uppercase tracking-[0.22em] text-[#9d9388]">
                    Checklist item {index + 1}
                  </p>
                  <h2 className="mt-2 text-lg font-black text-[#2d241c]">
                    {item.label}
                  </h2>
                  {draft.status === "anomaly" && (
                    <div className="mt-3 rounded-2xl border border-red-100 bg-red-50 px-4 py-3">
                      <p className="text-[10px] font-black uppercase tracking-[0.18em] text-red-600">
                        Anomaly attached
                      </p>
                      <p className="mt-1 text-sm font-bold text-[#2d241c]">
                        {draft.anomalyTitle}
                      </p>
                    </div>
                  )}
                </div>

                <div className="flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={() =>
                      updateCheck(item.checklist_item_id, {
                        status: "ok",
                        anomalyTitle: "",
                        anomalyDescription: "",
                        anomalySeverity: "low",
                      })
                    }
                    className={`rounded-full px-4 py-2 text-[11px] font-black uppercase tracking-[0.14em] ${getCheckStatusClasses(
                      draft.status,
                      "ok",
                    )}`}
                  >
                    OK
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      updateCheck(item.checklist_item_id, {
                        status: "not_ok",
                        anomalyTitle: "",
                        anomalyDescription: "",
                        anomalySeverity: "low",
                      })
                    }
                    className={`rounded-full px-4 py-2 text-[11px] font-black uppercase tracking-[0.14em] ${getCheckStatusClasses(
                      draft.status,
                      "not_ok",
                    )}`}
                  >
                    Not OK
                  </button>
                  <button
                    type="button"
                    onClick={() => openAnomalyPage(item.checklist_item_id)}
                    className={`rounded-full px-4 py-2 text-[11px] font-black uppercase tracking-[0.14em] ${getCheckStatusClasses(
                      draft.status,
                      "anomaly",
                    )}`}
                  >
                    {draft.status === "anomaly" ? "Edit anomaly" : "Anomaly"}
                  </button>
                </div>
              </div>

              <textarea
                value={draft.comment}
                onChange={(event) =>
                  updateCheck(item.checklist_item_id, {
                    comment: event.target.value,
                  })
                }
                rows={2}
                placeholder="Add a maintenance note if needed..."
                className="mt-4 w-full rounded-[18px] border border-[#dce5e2] bg-[#fbfdfd] px-4 py-3 text-sm text-[#2d241c] outline-none focus:border-[#8fc6c3]"
              />
            </article>
          );
        })}
      </section>

      <div className="sticky bottom-4 z-10 flex justify-between gap-3 rounded-3xl border border-white/70 bg-white/85 p-3 shadow-[0_20px_40px_rgba(35,53,53,0.12)] backdrop-blur-xl">
        <button
          type="button"
          onClick={() => navigate("/technician/map")}
          className="rounded-[18px] border border-[#dce5e2] px-5 py-3 text-sm font-black text-[#5f7f7d]"
        >
          Back
        </button>
        <button
          type="button"
          onClick={handleSubmit}
          disabled={isSubmitting || isSubmitted}
          className="rounded-[18px] bg-[#2d241c] px-6 py-3 text-sm font-black uppercase tracking-[0.14em] text-white disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isSubmitting ? "Submitting..." : "Submit"}
        </button>
      </div>
    </div>
  );
}

export default SubmitMaintenancePage;
