import type { MaintenanceCycleFormState } from "../types/MaintenanceCycle";
import type { MaintenancePlanRepeatUnit } from "../types/maintenancePlan";



export function formatRecurrenceDay(
  startDate: string,
  repeatEvery: number,
  repeatUnit: MaintenanceCycleFormState["repeat_unit"],
) {
  const frequency = Number.isFinite(repeatEvery) && repeatEvery > 0 ? repeatEvery : 1;

  if (!startDate) {
    return "Select an effective date";
  }

  if (repeatUnit === "day") {
    return frequency === 1 ? "Every day" : `Every ${frequency} days`;
  }

  const date = new Date(`${startDate}T00:00:00`);

  if (Number.isNaN(date.getTime())) {
    return "Invalid effective date";
  }

  if (repeatUnit === "month") {
    return frequency === 1
      ? `Every month on day ${date.getDate()}`
      : `Every ${frequency} months on day ${date.getDate()}`;
  }

  const weekday = date.toLocaleDateString(undefined, { weekday: "long" });

  return frequency === 1 ? `Every ${weekday}` : `Every ${frequency} weeks on ${weekday}`;
}

export const frequencyOptions: Array<{
  icon: string;
  label: string;
  value: MaintenancePlanRepeatUnit;
}> = [
  {
    icon: "today",
    label: "Daily",
    value: "day",
  },
  {
    icon: "view_week",
    label: "Weekly",
    value: "week",
  },
  {
    icon: "calendar_month",
    label: "Monthly",
    value: "month",
  },
];

export function validateForm(values: MaintenanceCycleFormState) {
  if (!values.machine_id) {
    return "Please choose an industrial asset.";
  }

  if (!values.checklist_template_id) {
    return "Please select a checklist template.";
  }

  if (!values.assigned_to) {
    return "Please assign a technician.";
  }

  if (!Number.isFinite(values.repeat_every) || values.repeat_every < 1) {
    return "Repeat frequency must be at least 1.";
  }

  if (!values.start_date) {
    return "Please choose an effective date.";
  }

  if (!values.status) {
    return "Please choose a plan status.";
  }

  return null;
}
