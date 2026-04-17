import type { ChecklistTemplatesTableProps } from "../types/checklistTemplateComponents";
import { ChecklistTemplateRow } from "./ChecklistTemplateRow";

export function ChecklistTemplatesTable({
  templates,
  isLoading,
  error,
  onEdit,
  onDelete,
  children,
}: ChecklistTemplatesTableProps) {
  return (
    <div className="overflow-hidden rounded-[28px] border border-white/70 bg-white/90 shadow-[0_24px_60px_rgba(15,23,42,0.08)] backdrop-blur">
      <div className="overflow-x-auto">
        <table className="w-full min-w-215 text-left">
          <thead>
            <tr className="border-b border-slate-100">
              <th className="px-6 py-5 text-[11px] font-bold uppercase tracking-[0.24em] text-slate-400">
                Template
              </th>
              <th className="px-6 py-5 text-[11px] font-bold uppercase tracking-[0.24em] text-slate-400">
                Description
              </th>
              <th className="px-6 py-5 text-[11px] font-bold uppercase tracking-[0.24em] text-slate-400">
                Updated
              </th>
              <th className="px-6 py-5 text-right text-[11px] font-bold uppercase tracking-[0.24em] text-slate-400">
                Actions
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-100">
            {isLoading && (
              <tr>
                <td colSpan={4} className="py-10 text-center text-slate-500">
                  Loading checklist templates...
                </td>
              </tr>
            )}

            {!isLoading && error && (
              <tr>
                <td colSpan={4} className="py-10 text-center text-red-500">
                  {error}
                </td>
              </tr>
            )}

            {!isLoading && !error && templates.length === 0 && (
              <tr>
                <td colSpan={4} className="py-10 text-center text-slate-500">
                  No checklist templates found.
                </td>
              </tr>
            )}

            {!isLoading &&
              !error &&
              templates.map((template) => (
                <ChecklistTemplateRow
                  key={template.id}
                  template={template}
                  onEdit={onEdit}
                  onDelete={onDelete}
                />
              ))}
          </tbody>
        </table>
      </div>

      {children}
    </div>
  );
}
