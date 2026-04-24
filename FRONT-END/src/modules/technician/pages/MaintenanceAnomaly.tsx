import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Alert } from "@/shared/components/feedback";
import { Spinner } from "@/shared/components/ui";
import {
  buildMaintenanceDraft,
  readMaintenanceDraft,
  saveMaintenanceDraft,
  type AnomalySeverity,
  type MaintenanceDraft,
  useTechnicianMaintenanceTask,
} from "@/features/technician-maintenance";

function MaintenanceAnomalyPage() {


  const navigate = useNavigate();

  
  const { taskId, checklistItemId } = useParams();

  const parsedTaskId = taskId ? Number(taskId) : null;
  const parsedChecklistItemId = checklistItemId ? Number(checklistItemId) : null;


  const { task, isLoading, error } = useTechnicianMaintenanceTask(parsedTaskId);
  const [draft, setDraft] = useState<MaintenanceDraft>({});
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [severity, setSeverity] = useState<AnomalySeverity>("low");
  const [formError, setFormError] = useState<string | null>(null);

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

  useEffect(() => {
    if (!task || !parsedTaskId || !parsedChecklistItemId) {
      return;
    }

    const savedDraft = readMaintenanceDraft(parsedTaskId);
    const nextDraft = savedDraft ?? buildMaintenanceDraft(task);
    const currentItemDraft = nextDraft[parsedChecklistItemId];

    setDraft(nextDraft);
    setTitle(currentItemDraft?.anomalyTitle ?? "");
    setDescription(currentItemDraft?.anomalyDescription ?? "");
    setSeverity(currentItemDraft?.anomalySeverity ?? "low");
    saveMaintenanceDraft(parsedTaskId, nextDraft);
  }, [parsedChecklistItemId, parsedTaskId, task]);

  function goBackToMaintenanceForm() {
    if (!parsedTaskId) {
      navigate("/technician/map");
      return;
    }

    navigate(`/technician/maintenance/${parsedTaskId}`);
  }

  function handleSave() {
    if (!parsedTaskId || !parsedChecklistItemId) {
      return;
    }

    if (!title.trim() || !description.trim()) {
      setFormError("Please fill anomaly title and description.");
      return;
    }

    const nextDraft: MaintenanceDraft = {
      ...draft,
      [parsedChecklistItemId]: {
        status: "anomaly",
        comment: draft[parsedChecklistItemId]?.comment ?? "",
        anomalyTitle: title.trim(),
        anomalyDescription: description.trim(),
        anomalySeverity: severity,
      },
    };

    saveMaintenanceDraft(parsedTaskId, nextDraft);
    goBackToMaintenanceForm();
  }

  function handleRemoveAnomaly() {
    if (!parsedTaskId || !parsedChecklistItemId) {
      return;
    }

    const nextDraft: MaintenanceDraft = {
      ...draft,
      [parsedChecklistItemId]: {
        status: null,
        comment: draft[parsedChecklistItemId]?.comment ?? "",
        anomalyTitle: "",
        anomalyDescription: "",
        anomalySeverity: "low" as AnomalySeverity,
      },
    };

    saveMaintenanceDraft(parsedTaskId, nextDraft);
    goBackToMaintenanceForm();
  }

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

  if (error || !task || !checklistItem) {
    return (
      <Alert variant="error" title="Anomaly form unavailable">
        {error ?? "Checklist item could not be loaded."}
      </Alert>
    );
  }

  return (
    <div className="mx-auto grid w-full max-w-6xl gap-5 lg:grid-cols-[0.85fr_1.15fr]">
      <section className="rounded-[34px] border border-[#dce5e2] bg-white p-6 shadow-[0_24px_60px_rgba(35,53,53,0.08)]">
        <p className="text-[10px] font-black uppercase tracking-[0.25em] text-red-500">
          Anomaly declaration
        </p>
        <h1 className="mt-3 text-3xl font-black tracking-tight text-[#2d241c]">
          {task.machine.name}
        </h1>
        <div className="mt-5 rounded-3xl border border-red-100 bg-red-50 p-5">
          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-red-500">
            Checklist item
          </p>
          <p className="mt-2 text-lg font-black text-[#2d241c]">
            {checklistItem.label}
          </p>
        </div>
        <p className="mt-5 text-sm leading-7 text-[#648080]">
          Fill the anomaly details here. Saving will attach this anomaly to the
          checklist item and return you to the maintenance form.
        </p>
      </section>

      <section className="rounded-[34px] border border-[#dce5e2] bg-white p-6 shadow-[0_24px_60px_rgba(35,53,53,0.08)]">
        {formError && (
          <div className="mb-4">
            <Alert variant="warning" title="Missing details">
              {formError}
            </Alert>
          </div>
        )}

        <div className="grid gap-4">
          <div>
            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-[#9d9388]">
              Anomaly title
            </label>
            <input
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              placeholder="Example: abnormal vibration"
              className="mt-2 w-full rounded-[18px] border border-[#dce5e2] bg-[#fbfdfd] px-4 py-3 text-sm outline-none focus:border-red-300"
            />
          </div>

          <div>
            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-[#9d9388]">
              Severity
            </label>
            <select
              value={severity}
              onChange={(event) => setSeverity(event.target.value as AnomalySeverity)}
              className="mt-2 w-full rounded-[18px] border border-[#dce5e2] bg-[#fbfdfd] px-4 py-3 text-sm outline-none focus:border-red-300"
            >
              <option value="low">Low severity</option>
              <option value="medium">Medium severity</option>
              <option value="high">High severity</option>
            </select>
          </div>

          <div>
            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-[#9d9388]">
              Description
            </label>
            <textarea
              value={description}
              onChange={(event) => setDescription(event.target.value)}
              rows={7}
              placeholder="Describe what happened and what you observed..."
              className="mt-2 w-full rounded-[18px] border border-[#dce5e2] bg-[#fbfdfd] px-4 py-3 text-sm outline-none focus:border-red-300"
            />
          </div>
        </div>

        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-between">
          <button
            type="button"
            onClick={goBackToMaintenanceForm}
            className="rounded-[18px] border border-[#dce5e2] px-5 py-3 text-sm font-black text-[#5f7f7d]"
          >
            Back
          </button>

          <div className="flex flex-col gap-3 sm:flex-row">
            <button
              type="button"
              onClick={handleRemoveAnomaly}
              className="rounded-[18px] border border-red-100 bg-red-50 px-5 py-3 text-sm font-black text-red-600"
            >
              Remove anomaly
            </button>
            <button
              type="button"
              onClick={handleSave}
              className="rounded-[18px] bg-[#2d241c] px-6 py-3 text-sm font-black uppercase tracking-[0.14em] text-white"
            >
              Save anomaly
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

export default MaintenanceAnomalyPage;
