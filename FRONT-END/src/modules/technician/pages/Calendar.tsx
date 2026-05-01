import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { useTechnicianCalendarTasks } from "@/features/technician-maintenance";
import { Alert } from "@/shared/components/feedback";
import { Spinner } from "@/shared/components/ui";
import { formatDate, formatDateTime } from "@/shared/utils/formatters";
import {
  formatDateInputValue,
  addDays,
  getTaskStatusClasses,
  getTaskStatusLabel,
  getWeekStart,
  parseDateTime,
  groupTasksByDate,
} from "../utils/calendar";

function CalendarPage() {

  const [weekStart, setWeekStart] = useState(() => {
    return formatDateInputValue(getWeekStart(new Date()));
  });

  const { tasks, isLoading, error } = useTechnicianCalendarTasks(weekStart);

  const weekDays = useMemo(() => {
    const start = parseDateTime(weekStart);

    return Array.from({ length: 7 }, (_, index) => {
      const date = addDays(start, index);

      return {
        date,
        key: formatDateInputValue(date),
      };
    });
  }, [weekStart]);

  const tasksByDate = groupTasksByDate(tasks) ; 
  const weekEnd = weekDays[6]?.date ?? parseDateTime(weekStart);
  const totalTasks = tasks.length;

  function goToPreviousWeek() {
    setWeekStart((currentWeekStart) => {
      return formatDateInputValue(addDays(parseDateTime(currentWeekStart), -7));
    });
  }

  function goToNextWeek() {
    setWeekStart((currentWeekStart) => {
      return formatDateInputValue(addDays(parseDateTime(currentWeekStart), 7));
    });
  }

  function goToCurrentWeek() {
    setWeekStart(formatDateInputValue(getWeekStart(new Date())));
  }

  return (
    <div className="mx-auto flex w-full max-w-7xl flex-col gap-6 font-['Inter',sans-serif]">
      <header className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-[10px] font-black uppercase tracking-[0.25em] text-primary">
            Weekly schedule
          </p>
          <h1 className="mt-2 text-3xl font-black text-text-main">
            Technician Calendar
          </h1>
          <p className="mt-2 text-sm text-text-muted">
            {formatDate(weekStart)} -{" "}
            {formatDate(formatDateInputValue(weekEnd))}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={goToPreviousWeek}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-neutral-gray bg-white text-text-main transition-colors hover:bg-background-light"
            aria-label="Previous week"
          >
            <span className="material-symbols-outlined text-[20px]">
              chevron_left
            </span>
          </button>
          <button
            type="button"
            onClick={goToCurrentWeek}
            className="rounded-full border border-neutral-gray bg-white px-4 py-2 text-sm font-bold text-[#607776] transition-colors hover:bg-background-light hover:text-text-main"
          >
            This week
          </button>
          <button
            type="button"
            onClick={goToNextWeek}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-neutral-gray bg-white text-text-main transition-colors hover:bg-background-light"
            aria-label="Next week"
          >
            <span className="material-symbols-outlined text-[20px]">
              chevron_right
            </span>
          </button>
        </div>
      </header>

      {error && (
        <Alert variant="error" title="Calendar unavailable">
          {error}
        </Alert>
      )}

      <section className="rounded-xl border border-neutral-gray bg-white shadow-sm">
        <div className="flex flex-col gap-3 border-b border-neutral-gray bg-background-light px-6 py-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-base font-bold text-text-main">
              Tasks for this week
            </h2>
            <p className="mt-1 text-xs font-medium text-text-muted">
              {totalTasks} assigned task{totalTasks === 1 ? "" : "s"}
            </p>
          </div>
          <span className="rounded-full border border-[#b9dfdc] bg-[#edf8f7] px-3 py-1 text-[10px] font-black uppercase tracking-[0.16em] text-primary">
            {weekStart}
          </span>
        </div>

        {isLoading ? (
          <div className="flex min-h-105 flex-col items-center justify-center px-6 py-12">
            <Spinner />
            <span className="mt-4 text-xs font-semibold uppercase tracking-widest text-text-muted">
              Loading calendar...
            </span>
          </div>
        ) : (
          <div className="grid grid-cols-1 divide-y divide-neutral-gray lg:grid-cols-7 lg:divide-x lg:divide-y-0">
            {weekDays.map((day) => {
              const dayTasks = tasksByDate[day.key] ?? [];

              return (
                <section key={day.key} className="min-h-90 bg-white">
                  <div className="border-b border-neutral-gray bg-[#fbfdfc] px-4 py-3">
                    <p className="text-[10px] font-black uppercase tracking-[0.18em] text-text-muted">
                      {day.date.toLocaleDateString("en-GB", {
                        weekday: "short",
                      })}
                    </p>
                    <p className="mt-1 text-sm font-black text-text-main">
                      {day.date.toLocaleDateString("en-GB", {
                        day: "2-digit",
                        month: "short",
                      })}
                    </p>
                  </div>

                  <div className="flex flex-col gap-3 p-3">
                    {dayTasks.length === 0 ? (
                      <div className="flex min-h-30 items-center justify-center rounded-lg border border-dashed border-neutral-gray bg-background-light px-3 text-center">
                        <p className="text-xs font-semibold text-text-muted">
                          No tasks
                        </p>
                      </div>
                    ) : (
                      dayTasks.map((task) => (
                        <Link
                          key={task.id}
                          to={`/technician/maintenance/${task.id}`}
                          className="rounded-lg border border-neutral-gray bg-white p-3 shadow-sm transition-colors hover:border-[#b9dfdc] hover:bg-[#f8fdfc]"
                        >
                          <div className="flex items-start justify-between gap-2">
                            <p className="text-sm font-black leading-5 text-text-main">
                              {task.machine.name}
                            </p>
                            <span
                              className={`shrink-0 rounded-full border px-2 py-0.5 text-[9px] font-black uppercase tracking-[0.12em] ${getTaskStatusClasses(
                                task.status,
                              )}`}
                            >
                              {getTaskStatusLabel(task.status)}
                            </span>
                          </div>

                          <p className="mt-1 text-[11px] font-bold text-text-muted">
                            {task.machine.code}
                          </p>
                          <p className="mt-2 text-xs leading-5 text-[#607776]">
                            {task.machine.location}
                          </p>

                          <div className="mt-3 flex items-center gap-2 text-[11px] font-bold text-text-main">
                            <span className="material-symbols-outlined text-[16px] text-primary">
                              schedule
                            </span>
                            <span>{formatDateTime(task.scheduled_at)}</span>
                          </div>

                          {typeof task.anomalies_count === "number" &&
                            task.anomalies_count > 0 && (
                              <div className="mt-3 rounded-md border border-red-100 bg-red-50 px-2 py-1 text-[10px] font-black uppercase tracking-[0.12em] text-red-600">
                                {task.anomalies_count} anomal
                                {task.anomalies_count === 1 ? "y" : "ies"}
                              </div>
                            )}
                        </Link>
                      ))
                    )}
                  </div>
                </section>
              );
            })}
          </div>
        )}
      </section>
    </div>
  );
}

export default CalendarPage;
