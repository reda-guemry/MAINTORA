import type {
  MaintenanceDraft,
  TechnicianTaskDetails,
} from "../types/maintenance";

function getMaintenanceDraftKey(taskId: number) {
  return `technician-maintenance-draft:${taskId}`;
}

export function buildMaintenanceDraft(task: TechnicianTaskDetails): MaintenanceDraft {
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

export function readMaintenanceDraft(taskId: number) {
  const savedDraft = sessionStorage.getItem(getMaintenanceDraftKey(taskId));

  if (!savedDraft) {
    return null;
  }

  try {
    return JSON.parse(savedDraft) as MaintenanceDraft;
  } catch {
    sessionStorage.removeItem(getMaintenanceDraftKey(taskId));
    return null;
  }
}

export function saveMaintenanceDraft(taskId: number, draft: MaintenanceDraft) {
  sessionStorage.setItem(getMaintenanceDraftKey(taskId), JSON.stringify(draft));
}

export function clearMaintenanceDraft(taskId: number) {
  sessionStorage.removeItem(getMaintenanceDraftKey(taskId));
}
