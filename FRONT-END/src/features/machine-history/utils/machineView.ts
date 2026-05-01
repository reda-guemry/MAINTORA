import type { MachineHistoryTaskStatus, MachineHistoryTaskSummary } from "../types/machineHistory";

export function getTaskStatusClasses(status: MachineHistoryTaskStatus) {
  if (status === "completed") return "bg-emerald-100 text-emerald-700";
  if (status === "in_progress") return "bg-[#eaf3f3] text-primary";
  return "bg-amber-100 text-amber-700";
}

export function formatStatus(status: string) {
  return status.replace("_", " ");
}

export function getTaskTitle(task: MachineHistoryTaskSummary) {
  return `Maintenance task #${task.id}`;
}
