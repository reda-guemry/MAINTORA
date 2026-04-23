import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Alert } from "@/shared/components/feedback";
import { Spinner } from "@/shared/components/ui";
import {
  useSubmitMaintenanceTask,
  useTechnicianMaintenanceTask,
} from "@/features/technician-maintenance";
import { getStatusClasses } from "../utils/getStatus";

type CheckDraft = {
  status: boolean | null;
  comment: string;
  isCommentOpen: boolean;
};

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
  
  const [checks, setChecks] = useState<Record<number, CheckDraft>>({});
  const [formError, setFormError] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    if (!task) {
      return;
    }

    const nextChecks = task.check_items.reduce<Record<number, CheckDraft>>(
      (accumulator, item) => {
        accumulator[item.checklist_item_id] = {
          status: item.status,
          comment: item.comment ?? "",
          isCommentOpen: Boolean(item.comment),
        };

        return accumulator;
      },
      {},
    );

    setChecks(nextChecks);
  }, [task]);

  const sortedItems = useMemo(() => {
    if (!task) {
      return [];
    }

    return [...task.check_items].sort((firstItem, secondItem) => {
      return (firstItem.order ?? 0) - (secondItem.order ?? 0);
    });
  }, [task]);

  function updateCheck(checklistItemId: number, data: Partial<CheckDraft>) {
    setChecks((currentChecks) => ({
      ...currentChecks,
      [checklistItemId]: {
        status: currentChecks[checklistItemId]?.status ?? null,
        comment: currentChecks[checklistItemId]?.comment ?? "",
        isCommentOpen: currentChecks[checklistItemId]?.isCommentOpen ?? false,
        ...data,
      },
    }));
  }

  async function handleSubmit() {
    if (!task || !parsedTaskId) {
      return;
    }

    const hasMissingStatus = sortedItems.some((item) => {
      return checks[item.checklist_item_id]?.status === null;
    });

    if (hasMissingStatus) {
      setFormError("Please choose OK or Not OK for every checklist item.");
      return;
    }

    setFormError(null);

    const response = await submitMaintenanceTask(parsedTaskId, {
      checks: sortedItems.map((item) => ({
        checklist_item_id: item.checklist_item_id,
        status: Boolean(checks[item.checklist_item_id]?.status),
        comment: checks[item.checklist_item_id]?.comment?.trim() ?? "",
      })),
    });

    if (response?.data) {
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
      <header className="flex flex-col gap-4 rounded-4xl border border-[#dce5e2] bg-white p-6 shadow-[0_24px_60px_rgba(35,53,53,0.08)] md:flex-row md:items-start md:justify-between">
        <div>
          <p className="text-[10px] font-black uppercase tracking-[0.25em] text-[#6ba5a5]">
            Submit maintenance
          </p>
          <h1 className="mt-2 text-3xl font-black tracking-tight text-[#2d241c]">
            {task.machine.name}
          </h1>
          <div className="mt-4 flex flex-wrap gap-2">
            <span
              className={`rounded-full border px-3 py-1 text-[10px] font-black uppercase tracking-[0.16em] ${getStatusClasses(task.machine.status)}`}
            >
              {task.machine.status}
            </span>
            <span className="rounded-full border border-[#b9dfdc] bg-[#edf8f7] px-3 py-1 text-[10px] font-black uppercase tracking-[0.16em] text-primary">
              En maintenance aujourd'hui
            </span>
          </div>
        </div>

        <button
          type="button"
          className="rounded-[22px] border border-[#f2d7b4] bg-[#fff3e5] px-5 py-4 text-left shadow-sm"
        >
          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[#c77422]">
            Static
          </p>
          <p className="mt-1 text-base font-black text-[#2d241c]">
            Announce anomaly
          </p>
        </button>
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
            isCommentOpen: false,
          };

          return (
            <article
              key={item.checklist_item_id}
              className="rounded-[28px] border border-[#dce5e2] bg-white p-5 shadow-[0_18px_40px_rgba(35,53,53,0.06)]"
            >
              <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                <div>
                  <p className="text-[10px] font-black uppercase tracking-[0.22em] text-[#9d9388]">
                    Checklist item {index + 1}
                  </p>
                  <h2 className="mt-2 text-lg font-black text-[#2d241c]">
                    {item.label}
                  </h2>
                </div>

                <div className="flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={() =>
                      updateCheck(item.checklist_item_id, { status: true })
                    }
                    className={`rounded-full px-4 py-2 text-[11px] font-black uppercase tracking-[0.14em] ${
                      draft.status === true
                        ? "bg-primary text-white"
                        : "border border-[#b9dfdc] bg-[#edf8f7] text-primary"
                    }`}
                  >
                    OK
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      updateCheck(item.checklist_item_id, { status: false })
                    }
                    className={`rounded-full px-4 py-2 text-[11px] font-black uppercase tracking-[0.14em] ${
                      draft.status === false
                        ? "bg-[#d97706] text-white"
                        : "border border-[#f2d7b4] bg-[#fff3e5] text-[#c77422]"
                    }`}
                  >
                    Not OK
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      updateCheck(item.checklist_item_id, {
                        isCommentOpen: !draft.isCommentOpen,
                      })
                    }
                    className="rounded-full border border-[#dce5e2] bg-[#f8fbfb] px-4 py-2 text-[11px] font-black uppercase tracking-[0.14em] text-[#5f7f7d]"
                  >
                    Description
                  </button>
                </div>
              </div>

              {draft.isCommentOpen && (
                <textarea
                  value={draft.comment}
                  onChange={(event) =>
                    updateCheck(item.checklist_item_id, {
                      comment: event.target.value,
                    })
                  }
                  rows={3}
                  placeholder="Add a note if needed..."
                  className="mt-4 w-full rounded-[18px] border border-[#dce5e2] bg-[#fbfdfd] px-4 py-3 text-sm text-[#2d241c] outline-none focus:border-[#8fc6c3]"
                />
              )}
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
