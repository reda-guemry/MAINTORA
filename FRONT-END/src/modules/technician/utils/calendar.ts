import type { TechnicianTaskStatus, TechnicianTaskSummary } from "@/features/technician-maintenance";

export function parseDateTime(value: string) {
  if (/^\d{4}-\d{2}-\d{2}$/.test(value)) {
    const [year, month, day] = value.split("-").map(Number);

    return new Date(year, month - 1, day);
  }

  return new Date(value.includes("T") ? value : value.replace(" ", "T"));
}

export function formatDateInputValue(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

export function getWeekStart(date: Date) {
  const nextDate = new Date(date);
  const day = nextDate.getDay();
  const diff = day === 0 ? -6 : 1 - day;

  nextDate.setHours(0, 0, 0, 0);
  nextDate.setDate(nextDate.getDate() + diff);

  return nextDate;
}

export function addDays(date: Date, days: number) {
  const nextDate = new Date(date);
  nextDate.setDate(nextDate.getDate() + days);

  return nextDate;
}

export function getTaskStatusClasses(status: TechnicianTaskStatus) {
  if (status === "completed") {
    return "border-emerald-200 bg-emerald-50 text-emerald-700";
  }

  if (status === "in_progress") {
    return "border-[#b9dfdc] bg-[#edf8f7] text-primary";
  }

  return "border-[#f4d7a1] bg-[#fff8e8] text-[#a46a16]";
}

export function getTaskStatusLabel(status: TechnicianTaskStatus) {
  return status.replace("_", " ");
}

export function groupTasksByDate(tasks: TechnicianTaskSummary[]) {
  return tasks.reduce<Record<string, TechnicianTaskSummary[]>>((groups, task) => {
    const scheduledDate = parseDateTime(task.scheduled_at);
    const dateKey = formatDateInputValue(scheduledDate);

    return {
      ...groups,
      [dateKey]: [...(groups[dateKey] ?? []), task],
    };
  }, {});
}