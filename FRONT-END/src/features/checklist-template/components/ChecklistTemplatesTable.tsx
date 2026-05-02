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
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full min-w-200 text-left">
          <thead>
            <tr className="border-b border-gray-200 bg-gray-50">
              <th className="px-6 py-4 text-[11px] font-bold uppercase tracking-[0.15em] text-gray-500">
                Template
              </th>
              <th className="px-6 py-4 text-[11px] font-bold uppercase tracking-[0.15em] text-gray-500">
                Description
              </th>
              <th className="px-6 py-4 text-right text-[11px] font-bold uppercase tracking-[0.15em] text-gray-500">
                Actions
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-100 bg-white">
            {isLoading && (
              <tr>
                <td colSpan={3} className="py-10 text-center text-[13px] font-medium text-gray-500">
                  <div className="flex flex-col items-center justify-center gap-2">
                    <span className="material-symbols-outlined animate-spin text-[24px] text-[#388E8E]">
                      progress_activity
                    </span>
                    Loading checklist templates...
                  </div>
                </td>
              </tr>
            )}

            {!isLoading && error && (
              <tr>
                <td colSpan={3} className="py-10 text-center text-[13px] font-medium text-red-500">
                  <div className="flex items-center justify-center gap-2">
                    <span className="material-symbols-outlined text-[20px]">error</span>
                    {error}
                  </div>
                </td>
              </tr>
            )}

            {!isLoading && !error && templates.length === 0 && (
              <tr>
                <td colSpan={3} className="py-12 text-center">
                  <div className="flex flex-col items-center justify-center gap-3 text-gray-400">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-50">
                      <span className="material-symbols-outlined text-[24px]">folder_off</span>
                    </div>
                    <p className="text-[13px] font-medium text-gray-500">No checklist templates found.</p>
                  </div>
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