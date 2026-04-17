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
    <div className="overflow-hidden rounded-3xl border border-[#e8e0d4] bg-white shadow-[0_18px_45px_rgba(62,52,39,0.08)]">
      <div className="overflow-x-auto">
        <table className="w-full min-w-215 text-left">
          <thead>
            <tr className="border-b border-[#f0ebe2] bg-[#fcfaf7]">
              <th className="px-6 py-5 text-[11px] font-bold uppercase tracking-[0.24em] text-[#9d9388]">
                Template
              </th>
              <th className="px-6 py-5 text-[11px] font-bold uppercase tracking-[0.24em] text-[#9d9388]">
                Description
              </th>
              <th className="px-6 py-5 text-[11px] font-bold uppercase tracking-[0.24em] text-[#9d9388]">
                Updated
              </th>
              <th className="px-6 py-5 text-right text-[11px] font-bold uppercase tracking-[0.24em] text-[#9d9388]">
                Actions
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-[#f0ebe2]">
            {isLoading && (
              <tr>
                <td colSpan={4} className="py-10 text-center text-[#7f7468]">
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
                <td colSpan={4} className="py-10 text-center text-[#7f7468]">
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
